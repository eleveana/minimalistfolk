# ClickUp Setup for `tt`

One-time setup so the `scripts/tt` CLI can log time against ClickUp.

## 1. Create the workspace structure

On https://app.clickup.com:

1. **Workspace** — if you don't already have one for client work, create one (e.g. "Eleve Freelance")
2. **Space** — create a Space called **`minimalist`**
3. **List** — inside the Space, create a List called **`Build`** (this is what `tt tasks` will show)

Suggested initial task list (you can create more):
- Discovery & brand alignment
- Design system → Relay theme settings
- Homepage layout
- Product page customization
- Collection / category pages
- Asset prep (logo, hero imagery)
- Header / footer customization
- Cart & checkout polish
- Mobile QA
- Launch handoff

For each task, set an estimate so ClickUp can show you "actual vs. estimate" later.

## 2. Enable time tracking + billable rate

Workspace **Settings → ClickApps → Time Tracking** → turn on.
Then **Settings → Billable rates** → set your hourly rate (used for invoice exports).

## 3. Get your API token

1. Click your avatar (top right) → **Settings**
2. **Apps** (left sidebar) → **API Token**
3. Click **Generate** (or **Copy** if one exists)
4. This is a personal token — treat it like a password.

## 4. Get the team ID and list ID

Easiest: look at any ClickUp URL.

- **Team ID**: in URL like `https://app.clickup.com/<TEAM_ID>/v/l/...`
- **List ID**: open the "Build" list and check the URL → `https://app.clickup.com/<team>/v/l/<LIST_ID>`

Or via API:

```bash
# Team ID
curl -H "Authorization: <YOUR_TOKEN>" https://api.clickup.com/api/v2/team

# Then list spaces in that team, then lists in the space — see ClickUp API docs
```

## 5. Fill in `.env`

```bash
cp .env.example .env
# Edit .env and paste the three values
```

## 6. Add `scripts/` to your PATH (optional but nice)

So you can type `tt start ...` from anywhere in the project:

```bash
# ~/.zshrc
export PATH="$HOME/Documents/minimalist/scripts:$PATH"
```

Reload: `source ~/.zshrc`.

## 7. Verify

```bash
tt tasks                              # should list your ClickUp tasks
tt start "verify the cli works"
tt status                             # shows the running timer
tt stop                               # stops it
tt log --today                        # shows today's entries
```

## Share progress with the client

In ClickUp: open the **Build** list → **Share** (top right) → **Public sharing** → toggle on. Send the link to the client. They get a read-only view of tasks, statuses, and (if you enable it) time tracked. They never need an account.

## Daily workflow

```bash
tt start "design system → settings_data.json"
# ...work...
tt stop                  # at end of session or when switching tasks
tt log --today           # see what you've logged today
tt report --week         # weekly hours grouped by description (paste into invoice)
```

## Attaching time to a specific task

```bash
tt tasks --query "design system"      # find the task id
tt start "tweak sage palette" --task abc123xyz
```

Time then shows up against that task in ClickUp's time tracking view.
