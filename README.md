
# Axiom Trade Replica: Token Discovery Table

A high-performance replica of a token discovery and tracking interface, designed to showcase real-time data updates, filtering, and modern UI/UX principles. This project is built using Next.js and utilizes a three-column Kanban-style layout to track tokens across different stages.

## ✨ Features

* **Multi-Column Token Tracking:** Displays tokens categorized into distinct columns: "New Pairs," "Final Stretch," and "Migrated" (based on `token.status`).
* **Real-time Data Simulation:** Token prices, market cap, volume, and price changes are updated every second using a mock WebSocket service (`WebSocketMock.ts`).
* **Performance Optimization:** Leverages React's **React Compiler** (via `next.config.ts`) and `React.memo` (in `TokenCard.tsx`) for minimal re-renders and optimal performance.
* **Dynamic Sorting:** Each column supports sorting based on metrics like `age`, `marketCap`, `volume`, and `priceChange` with ascending/descending directions, configured using Redux Toolkit.
* **Modern UI:** A sleek dark theme inspired by the "Axiom Trade Dark Theme" is implemented using Tailwind CSS and Shadcn UI components (Card, Tooltip, Popover, Badge, ScrollArea).
* **Data Formatting:** Custom utility functions are used to format currency, market figures (K, M notation), and time elapsed (`formatTimeAgo`).

## 🛠️ Tech Stack

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **UI Components:** [Radix UI](https://www.radix-ui.com/) primitives wrapped with custom styles (Card, Tooltip, Popover, ScrollArea, Button, Badge).
* **Icons:** [Lucide React](https://lucide.dev/icons/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) and [React Redux](https://react-redux.js.org/) for managing global and column-specific filters.
* **Data Fetching/State:** [@tanstack/react-query](https://tanstack.com/query/latest) (Setup in `providers.tsx`).
* **Compiler/Runtime:** [React Compiler](https://react.dev/blog/2024/11/01/introducing-react-compiler) enabled in `next.config.ts` for automatic memoization.
* **Fonts:** [Vercel Geist Fonts](https://vercel.com/font) (`geist-sans` and `geist-mono`) are used for a crisp modern look.

## 🚀 Getting Started

First, install the dependencies and run the development server:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
````

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Deployed : Open https://eterna-axiom-traders.vercel.app/ with your browser to see the result.

## 📁 Project Structure Highlights

| File | Description |
| :--- | :--- |
| `src/app/page.tsx` | The main layout containing the `TokenTable` and header controls. |
| `src/components/features/TokenTable/index.tsx` | Fetches mock token data, simulates WebSocket updates, and renders the three `TokenColumn` components. |
| `src/components/features/TokenTable/TokenColumn.tsx` | Handles per-column logic including sorting based on Redux state. |
| `src/components/features/TokenTable/TokenCard.tsx` | Displays individual token data, implements a price-change visual 'flash' effect. |
| `src/store/slices/tableSlice.ts` | Redux slice for managing per-column sorting and filtering state. |
| `src/lib/mockData.ts` | Contains `generateMockTokens` for initial data generation. |
| `src/services/websocketMock.ts` | Mock WebSocket implementation for simulating real-time price updates. |
| `src/app/globals.css` | Global styles, including Tailwind configuration and the Axiom Trade dark color palette. |
![My Image](https://github.com/AnoopKeepCoding/Eterna-Axiom-Traders/blob/main/Screenshot%202025-11-28%20172323.png)
![My Image](https://github.com/AnoopKeepCoding/Eterna-Axiom-Traders/blob/main/Screenshot%202025-11-28%20171810.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

  * [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
  * [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome\!

