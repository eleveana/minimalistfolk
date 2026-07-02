#!/usr/bin/env python3
"""Normalize Size option values across all products.

Collapses case/spelling duplicates (SMALL / small / Small, x large / X LARGE /
xlarge ...) into one canonical spelling so collection filters and size pickers
show a single clean list.

Usage:
  python3 scripts/normalize_sizes.py            # dry run: show what would change
  python3 scripts/normalize_sizes.py --apply    # actually rename values

Needs in .env (repo root):
  SHOPIFY_STORE=the-mini-malist-apparel.myshopify.com
  SHOPIFY_ADMIN_TOKEN=shpat_...   (custom app token with write_products)
"""

import json
import re
import sys
import urllib.request
from pathlib import Path

API_VERSION = "2025-07"

# Canonical spellings. Keys are the comparison form: lowercased, with all
# hyphens/underscores/extra spaces collapsed to single spaces.
CANONICAL = {
    "xx small": "XX-Small",
    "x small": "X-Small",
    "xsmall": "X-Small",
    "small": "Small",
    "medium": "Medium",
    "large": "Large",
    "x large": "X-Large",
    "xlarge": "X-Large",
    "xx large": "XX-Large",
    "xxlarge": "XX-Large",
    "xxx large": "XXX-Large",
    "xxxlarge": "XXX-Large",
}


def comparison_key(value: str) -> str:
    return re.sub(r"[\s_\-]+", " ", value.strip().lower())


def load_env() -> dict:
    env = {}
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if not env_path.exists():
        sys.exit("No .env file found at repo root")
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, val = line.partition("=")
            env[key.strip()] = val.strip().strip("'\"")
    return env


def graphql(store: str, token: str, query: str, variables: dict) -> dict:
    req = urllib.request.Request(
        f"https://{store}/admin/api/{API_VERSION}/graphql.json",
        data=json.dumps({"query": query, "variables": variables}).encode(),
        headers={
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": token,
        },
    )
    with urllib.request.urlopen(req) as resp:
        body = json.load(resp)
    if body.get("errors"):
        sys.exit(f"GraphQL errors: {json.dumps(body['errors'], indent=2)}")
    return body["data"]


PRODUCTS_QUERY = """
query($cursor: String) {
  products(first: 100, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id
      title
      options {
        id
        name
        optionValues { id name }
      }
    }
  }
}
"""

UPDATE_MUTATION = """
mutation($productId: ID!, $option: OptionUpdateInput!, $valuesToUpdate: [OptionValueUpdateInput!]) {
  productOptionUpdate(productId: $productId, option: $option, optionValuesToUpdate: $valuesToUpdate) {
    userErrors { field message }
  }
}
"""


def main() -> None:
    apply_changes = "--apply" in sys.argv
    env = load_env()
    store = env.get("SHOPIFY_STORE")
    token = env.get("SHOPIFY_ADMIN_TOKEN")
    if not store or not token:
        sys.exit("Set SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN in .env")

    products = []
    cursor = None
    while True:
        data = graphql(store, token, PRODUCTS_QUERY, {"cursor": cursor})
        page = data["products"]
        products.extend(page["nodes"])
        if not page["pageInfo"]["hasNextPage"]:
            break
        cursor = page["pageInfo"]["endCursor"]

    total_renames = 0
    skipped = []
    for product in products:
        for option in product["options"]:
            if option["name"].strip().lower() != "size":
                continue
            existing_keys = {comparison_key(v["name"]) for v in option["optionValues"]}
            renames = []
            for value in option["optionValues"]:
                canonical = CANONICAL.get(comparison_key(value["name"]))
                if not canonical or canonical == value["name"]:
                    continue
                # If this product somehow has BOTH spellings as separate
                # values, renaming would collide - flag for manual merge.
                clash = any(
                    v["name"] == canonical and v["id"] != value["id"]
                    for v in option["optionValues"]
                )
                if clash:
                    skipped.append(f"{product['title']}: '{value['name']}' and '{canonical}' both exist")
                    continue
                renames.append((value, canonical))

            if not renames:
                continue
            for value, canonical in renames:
                print(f"{product['title']}: '{value['name']}' -> '{canonical}'")
                total_renames += 1
            if apply_changes:
                result = graphql(store, token, UPDATE_MUTATION, {
                    "productId": product["id"],
                    "option": {"id": option["id"]},
                    "valuesToUpdate": [
                        {"id": v["id"], "name": canonical}
                        for v, canonical in renames
                    ],
                })
                errors = result["productOptionUpdate"]["userErrors"]
                if errors:
                    print(f"  !! {errors}")

    mode = "RENAMED" if apply_changes else "DRY RUN - would rename"
    print(f"\n{mode}: {total_renames} value(s) across {len(products)} products")
    if skipped:
        print("\nNeeds manual merge (same product has both spellings):")
        for line in skipped:
            print(f"  - {line}")
    if not apply_changes and total_renames:
        print("\nRun again with --apply to make the changes.")


if __name__ == "__main__":
    main()
