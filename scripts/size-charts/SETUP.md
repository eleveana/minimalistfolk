# Size charts — manual setup in Shopify admin

Builds the per-product size-chart system without the Admin API. ~30 min, one-time.

The Relay theme code is already wired to read this; nothing shows on the live store until Relay is published.


---

## 1. Create the metaobject definition

Settings → Custom data → Metaobjects → **Add definition**.

- **Name:** `Size chart`  (this sets type/handle `size_chart`)

- Add these fields (Field key must match exactly):


| Field name | Field key | Type | Notes |
|---|---|---|---|
| Name | `name` | Single line text | Chart title, e.g. *Summer Set (Top)* |
| Unit | `unit` | Single line text | e.g. `inches` |
| Note | `note` | Single line text | Optional fit note |
| Data | `data` | JSON | The table (paste from section 3) |

- Set the **entry display name** to the `name` field.

- Save.


---

## 2. Create the product metafield

Settings → Custom data → **Products** → Add definition.

- **Name:** `Size charts`

- **Namespace and key:** `custom.size_charts`  ← must be exact

- **Type:** Metaobject → **Size chart**, and turn ON **List of entries** (so sets can show two tabs).

- Save.


---

## 3. Create one metaobject entry per chart

Content → Metaobjects → Size chart → **Add entry**. For each below: set **Name**, set **Unit** = `inches`, and paste the JSON into **Data**.


### Summer Set (Top)
- **Name:** `Summer Set (Top)`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Chest", "Length", "Sleeve"], "rows": [["2-3", "16.5", "14", "4.5"], ["4-5", "17.7", "15", "5"], ["6-7", "18.3", "16", "5.2"], ["8", "19.4", "18", "5.5"], ["10", "20.6", "19.8", "5.9"], ["12", "21.8", "21.8", "6.2"], ["14", "22.4", "22.8", "6.5"]]}
```

### Summer Set (Bottom)
- **Name:** `Summer Set (Bottom)`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Hip", "Waist"], "rows": [["2-3", "7.8", "12.4", "9"], ["4-5", "8.8", "14", "9.8"], ["6-7", "9.2", "14.4", "10.6"], ["8", "10.2", "16", "11"], ["10", "11.2", "17.3", "11.8"], ["12", "12", "18.7", "12.6"], ["14", "12.6", "18.4", "13.3"]]}
```

### The June Jumpsuit
- **Name:** `The June Jumpsuit`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Width"], "rows": [["2-3Y", "30", "12.4"], ["4-5Y", "35", "13.4"], ["6-7Y", "40", "14.4"], ["8-9Y", "45.2", "15.4"], ["10-11Y", "50.4", "16.4"], ["12-13Y", "55.6", "17.3"]]}
```

### Mia Dress
- **Name:** `Mia Dress`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Pit to Pit"], "rows": [["2-3Y", "20.5", "16.5"], ["4-5Y", "21.5", "17"], ["6-7Y", "23.5", "17.5"], ["8-9Y", "25", "19"], ["10-11Y", "25.5", "19.5"], ["12-13Y", "27.5", "21"]]}
```

### Track Shorts
- **Name:** `Track Shorts`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Waist"], "rows": [["2Y", "8", "8.5"], ["3-4Y", "9", "9.5"], ["5Y", "9.5", "10"], ["6-7Y", "10", "11"], ["8Y", "10.5", "11.5"], ["10Y", "11", "12"], ["12Y", "12", "12.5"], ["14Y", "13.5", "13"]]}
```

### Luna Set (Top)
- **Name:** `Luna Set (Top)`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Width", "Length"], "rows": [["2-3", "16", "11"], ["4-5", "17", "12"], ["6-7", "18", "13"], ["8-9", "19.5", "14"], ["10-11", "20", "15"], ["12-13", "20.5", "16"]]}
```

### Luna Set (Bottom)
- **Name:** `Luna Set (Bottom)`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Width", "Length"], "rows": [["2-3", "8", "25.5"], ["4-5", "9", "27"], ["6-7", "9.5", "30.5"], ["8-9", "10", "34.5"], ["10-11", "10.5", "36"], ["12-13", "11", "38.5"]]}
```

### Kids Pajamas
- **Name:** `Kids Pajamas`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Top Length", "Sleeves", "Pit to Pit", "Waist", "Bottom Length"], "rows": [["2Y", "14", "12", "10", "9", "20"], ["3Y", "14.5", "13", "10", "9.2", "20.5"], ["4Y", "15.5", "13.5", "10.5", "9.5", "21.5"], ["5Y", "16", "13.5", "10.5", "9.5", "22"], ["6-7Y", "18", "16.5", "11.5", "10.5", "27"], ["8-9Y", "19.5", "18.5", "12.5", "11.5", "30"], ["10-11Y", "21", "19.5", "13.5", "12.5", "33"]]}
```

### Kids Joggers
- **Name:** `Kids Joggers`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Waist"], "rows": [["2Y", "22.5", "9.5"], ["3-4Y", "25", "10"], ["5Y", "26.5", "11"], ["6-7Y", "29.5", "11.5"], ["8Y", "31", "12"], ["10Y", "33", "12.5"], ["12Y", "34.5", "13"], ["14Y", "38.5", "13.5"]]}
```

### Adult Joggers
- **Name:** `Adult Joggers`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Waist"], "rows": [["S", "39", "12.5"], ["M", "40", "13"], ["L", "40.5", "14"], ["XL", "41.5", "15"]]}
```

### Mini Skirt
- **Name:** `Mini Skirt`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Waist"], "rows": [["2Y", "8", "7.5"], ["3Y", "9", "8"], ["4Y", "9.5", "8.5"], ["5Y", "10", "9"], ["6-7Y", "11", "9.5"], ["8Y", "12", "10"], ["10Y", "13", "10.5"], ["12Y", "14", "11.5"]]}
```

### Clementine Dress
- **Name:** `Clementine Dress`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Pit to Pit", "Sleeves"], "rows": [["1-2Y", "18", "12.5", "13"], ["2-3Y", "18.5", "13", "14"], ["3-4Y", "20", "13.5", "15"], ["4-5Y", "21", "14.5", "16.5"], ["6-7Y", "23", "15", "18.5"], ["8-9Y", "26", "16", "21.5"]]}
```

### Maya Set (Top)
- **Name:** `Maya Set (Top)`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Width", "Length", "Sleeves"], "rows": [["3Y", "15", "13.5", "12"], ["4-5Y", "17", "14.5", "14"], ["6-7Y", "17.5", "15.5", "16"], ["8-9Y", "18.5", "17", "17.5"], ["10-11Y", "19", "18", "18"], ["12-13Y", "19.5", "18.5", "20"]]}
```

### Maya Set (Bottom)
- **Name:** `Maya Set (Bottom)`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Inseam", "Waist"], "rows": [["3Y", "23.5", "16", "9"], ["4-5Y", "25.5", "17.5", "9.5"], ["6-7Y", "27.5", "19", "10.5"], ["8-9Y", "32", "23", "11"], ["10-11Y", "34", "24.5", "12"], ["12-13Y", "36", "25.5", "12.7"]]}
```

### Kids Tees
- **Name:** `Kids Tees`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Pit to Pit", "Length"], "rows": [["6-12M", "11.5", "13.5"], ["9-18M", "11.5", "14"], ["2-3Y", "12", "15"], ["4-5Y", "14.5", "17"], ["6-7Y", "16", "18"], ["8-9Y", "17", "19.5"], ["10-11Y", "17.5", "21"], ["12-13Y", "18", "22.5"]]}
```

### Adult Tees
- **Name:** `Adult Tees`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Pit to Pit", "Length"], "rows": [["S", "19.5", "23.5"], ["M", "20", "24"], ["L", "22", "24.5"], ["XL", "23", "25"]]}
```

### Kids Pullovers
- **Name:** `Kids Pullovers`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Pit to Pit", "Length", "Sleeve"], "rows": [["6-12M Bubble Romper", "13.5", "13", "12.5"], ["1-2Y", "14", "14.5", "15"], ["2-4Y", "15", "16", "18"], ["4-6Y", "16", "18", "20"], ["6-8Y", "17", "19.5", "22"], ["8-10Y", "18.5", "20.5", "24"], ["10-12Y", "19", "21", "26"], ["12-14Y", "21", "24", "21"]]}
```

### Women's Fit Pullover
- **Name:** `Women's Fit Pullover`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Sleeve", "Length", "Pit to Pit"], "rows": [["S", "24.5", "24", "21"], ["M", "25", "25", "22"], ["L", "25.5", "25.5", "23"], ["XL", "26", "27", "24"]]}
```

### Adult Unisex Oversized Pullover
- **Name:** `Adult Unisex Oversized Pullover`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Sleeve", "Length", "Pit to Pit"], "rows": [["S", "25", "27.5", "24"], ["M", "25.2", "28", "25"], ["L", "26", "29", "25.5"], ["XL", "26.2", "30", "26.5"]]}
```

### Ma-Me-Mi Two Piece Swim Top
- **Name:** `Ma-Me-Mi Two Piece Swim Top`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Chest"], "rows": [["3-4", "5.7", "10.2"], ["5-6", "6.2", "10.6"], ["7-8", "6.8", "11.4"], ["9-10", "7.4", "11.9"], ["11-12", "8", "12.2"]]}
```

### Ma-Me-Mi Two Piece Swim Bottom
- **Name:** `Ma-Me-Mi Two Piece Swim Bottom`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Waist"], "rows": [["3-4", "9", "9.7"], ["5-6", "9.4", "10.2"], ["7-8", "9.8", "10.6"], ["9-10", "10.2", "11.3"], ["11-12", "10.6", "11.8"]]}
```

### Ma-Me-Mi One Piece Swim
- **Name:** `Ma-Me-Mi One Piece Swim`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length (from shoulder)", "Chest"], "rows": [["3-4", "19", "11.4"], ["5-6", "20", "11.8"], ["7-8", "21.2", "12.5"], ["9-10", "22.4", "13"], ["11-12", "23.6", "13.7"]]}
```

### Ma-Me-Mi Boardshorts
- **Name:** `Ma-Me-Mi Boardshorts`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Waist"], "rows": [["3-4", "7.8", "8.6"], ["5-6", "9", "9.4"], ["7-8", "10.2", "9.8"], ["9-10", "11.4", "10.6"], ["11-12", "12.5", "11"]]}
```

### Kids Sweatshirt Dress
- **Name:** `Kids Sweatshirt Dress`
- **Unit:** `inches`
- **Data:**
```json
{"headers": ["Size", "Length", "Pit to Pit", "Sleeves"], "rows": [["1-2Y", "16", "14.5", "14"], ["2-4Y", "21", "17", "18"], ["4-6Y", "22.5", "19.5", "20"], ["6-8Y", "25", "20", "21"], ["8-10Y", "27", "21", "23"], ["10-12Y", "29", "21.5", "24"], ["12-14Y", "30", "22.5", "25"]]}
```

---

## 4. Assign charts to products

Use the bulk editor: Products → select all products of a style → **Edit** → add the **Size charts** column → pick the matching entry/entries. Sets get two (Top + Bottom), in order.


Suggested mapping (by product title containing):


| If the product is… | Assign these charts (in order) |
|---|---|
| “summer set” | Summer Set (Top) + Summer Set (Bottom) |
| “june jumpsuit” | The June Jumpsuit |
| “mia dress” | Mia Dress |
| “track shorts” | Track Shorts |
| “luna set” | Luna Set (Top) + Luna Set (Bottom) |
| “pajama” | Kids Pajamas |
| “kids joggers” | Kids Joggers |
| “adult joggers” | Adult Joggers |
| “mini skirt” | Mini Skirt |
| “clementine” | Clementine Dress |
| “maya set” | Maya Set (Top) + Maya Set (Bottom) |
| “kids tee” | Kids Tees |
| “adult tee” | Adult Tees |
| “kids pullover” | Kids Pullovers |
| “women's fit pullover” | Women's Fit Pullover |
| “unisex oversized pullover” | Adult Unisex Oversized Pullover |
| “two piece swim” | Ma-Me-Mi Two Piece Swim Top + Ma-Me-Mi Two Piece Swim Bottom |
| “one piece swim” | Ma-Me-Mi One Piece Swim |
| “boardshort” | Ma-Me-Mi Boardshorts |
| “sweatshirt dress” | Kids Sweatshirt Dress |

Products that share measurements (e.g. every color of the Mia Dress) all point at the same single entry — create the chart once, assign to many.


> The theme falls back to the existing all-sizes page for any product you haven't assigned yet, so you can migrate gradually.
