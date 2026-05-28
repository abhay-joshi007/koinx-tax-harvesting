# KoinX – Tax Harvesting Tool

A crypto tax harvesting simulator built with React and TypeScript. It helps investors identify which holdings to sell in order to offset capital gains and reduce their tax liability.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white&style=flat-square)
![CRA](https://img.shields.io/badge/Create_React_App-5.0-09D3AC?style=flat-square)

---

## Screenshots

<!-- Add your screenshots here -->
| Light Mode | Dark Mode |
|---|---|
| ![Light](screenshots/light.png) | ![Dark](screenshots/dark.png) |

---

## What is Tax Harvesting?

Tax-loss harvesting is the practice of selling assets at a loss to offset capital gains from other investments, reducing the total tax you owe. This tool lets you:

- See your **current capital gains** (pre-harvesting)
- Select holdings with unrealized losses
- Instantly see how your **tax liability changes** (after-harvesting)
- Know exactly **how much you'd save** in taxes

---

## Features

### Pre vs After Harvesting Summary Cards
Two side-by-side cards show a real-time comparison of your capital gains before and after selecting holdings for harvesting. The "After Harvesting" card updates instantly as you check/uncheck holdings.

### Short-Term & Long-Term Gains Breakdown
Both cards break down your gains into:
- **Short-Term Capital Gains (STCG)** — assets held for less than 1 year
- **Long-Term Capital Gains (LTCG)** — assets held for more than 1 year

Each shows profits, losses, and net capital gains separately.

### Tax Savings Estimate
When you select harvestable holdings, a green banner appears on the After Harvesting card showing exactly how much tax you would save.

### Sortable Holdings Table
The holdings table can be sorted by:
- **Short-Term Gain/Loss** — ascending, descending, or default
- **Long-Term Gain/Loss** — ascending, descending, or default

Click the column header to cycle through sort directions.

### Select & Deselect Holdings
- Click any row or its checkbox to toggle a holding for harvesting
- Use the **Select All** checkbox in the header to select or deselect all holdings at once
- The checkbox shows an indeterminate state when only some holdings are selected

### Amount to Sell Column
When a holding is selected and has harvestable losses, the table shows the exact units and INR value you would need to sell to realize the loss.

### Show More / Show Less
The table displays 7 holdings by default. Click **"View all"** to expand and see all holdings, and **"Show Less"** to collapse back.

### Dark Mode
A full light/dark theme toggle is available in the navbar. All components — cards, table, disclaimer panel — switch themes seamlessly.

### Collapsible Disclaimer Panel
An expandable disclaimer section at the top reminds users that this tool is for informational purposes only and does not constitute financial or tax advice.

---

## Project Structure

```
koinx-tax/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── mockData.ts         # Simulated API for holdings & capital gains data
│   ├── components/
│   │   ├── Navbar.tsx           # Top bar with logo and dark mode toggle
│   │   ├── SummaryCard.tsx      # Pre/After harvesting summary cards
│   │   └── HoldingsTable.tsx    # Sortable, selectable holdings table
│   ├── utils/
│   │   └── tax.ts               # Tax calculations, formatting, sorting logic
│   ├── types.ts                 # Shared TypeScript interfaces
│   ├── App.tsx                  # Root component — state, data fetching, layout
│   └── index.tsx                # React entry point
├── screenshots/                 # App screenshots
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/abhay-joshi007/koinx-tax-harvesting.git
cd koinx-tax-harvesting

# Install dependencies
npm install

# Start the development server
npm start
```

App runs at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

Output goes into the `build/` folder.

---

## Deployment

### Netlify (Recommended)
1. Push the repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import an existing project**
3. Connect GitHub and select this repo
4. Set:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`
5. Click **Deploy**

### Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo
3. Framework preset: **Create React App**
4. Click **Deploy**

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript 4.9 | Type safety |
| Create React App | Build tooling |
| Intl.NumberFormat | INR currency formatting |
| CSS-in-JS (inline styles) | Styling — no external UI library |

---

## Data

All data is currently mocked via `src/api/mockData.ts` with a simulated network delay. The mock includes 15 crypto holdings with realistic STCG/LTCG values — a mix of gains and losses — to demonstrate the harvesting flow.

---

## Disclaimer

This tool is for **informational purposes only** and does not constitute financial or tax advice. Always consult a qualified tax professional before making investment decisions.

---

## License

MIT
