#!/usr/bin/env bash
# PreToolUse(Bash) guard for `shopify theme push`.
#
# The store owner edits content/config JSON (config/settings_data.json and
# templates/*.json) through the Shopify admin, so the remote Relay theme drifts
# ahead of the local checkout. A push that includes those files would overwrite
# the owner's work. This guard refreshes owner JSON from the remote right before
# any push that could touch it, so the push never clobbers admin edits.
#
# Behavior:
#   - Non-push command, or a `--only` push that names only non-JSON paths -> allow silently.
#   - Push that can touch owner JSON, owner JSON is clean locally -> pull it fresh, then allow.
#   - Push that can touch owner JSON, but owner JSON has uncommitted local edits,
#     or the refresh pull fails -> ask the human first (never silently clobber).
set -uo pipefail

STORE="the-mini-malist-apparel.myshopify.com"
THEME="139581489246"
THEME_DIR="${CLAUDE_PROJECT_DIR:-/Users/anaborba/Documents/minimalist}/theme"

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')

# Only theme pushes are relevant.
case "$cmd" in
  *"shopify theme push"*) ;;
  *) exit 0 ;;
esac

# A `--only` push that names no config/templates JSON cannot touch owner files.
if printf '%s' "$cmd" | grep -q -- '--only'; then
  if ! printf '%s' "$cmd" | grep -Eq -- 'config/settings_data\.json|templates/'; then
    exit 0
  fi
fi

# Owner JSON with uncommitted local edits can't be auto-refreshed without losing
# that work — defer to a human.
dirty=$(cd "$THEME_DIR" 2>/dev/null && git status --porcelain -- config/settings_data.json templates/ 2>/dev/null | awk '{print $2}')
if [ -n "$dirty" ]; then
  reason=$(printf 'This push can overwrite owner-edited JSON, and these config/template JSON files have UNCOMMITTED local edits, so I will not auto-refresh them:\n%s\n\nThe owner edits these via the Shopify admin. Review them first. To discard local and take the remote version: cd theme && shopify theme pull --store %s --theme %s --only config/settings_data.json --only "templates/*.json"' "$dirty" "$STORE" "$THEME")
  jq -n --arg r "$reason" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"ask",permissionDecisionReason:$r}}'
  exit 0
fi

# Clean: refresh owner JSON from the remote so the push pushes identical content.
if (cd "$THEME_DIR" && shopify theme pull --store "$STORE" --theme "$THEME" \
      --only config/settings_data.json --only "templates/*.json" >/tmp/shopify-push-guard.log 2>&1); then
  jq -n '{systemMessage:"🛟 shopify-push-guard: pulled owner JSON (config/settings_data.json + templates/*.json) from remote before push — admin edits preserved."}'
else
  reason="Before pushing, I tried to refresh owner JSON from the remote and the pull FAILED (see /tmp/shopify-push-guard.log). Pushing now could overwrite the owner's admin edits. Fix the pull first, then retry."
  jq -n --arg r "$reason" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"ask",permissionDecisionReason:$r}}'
fi
exit 0
