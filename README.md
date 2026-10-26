# Mega Store – React E-Commerce App

A small online store built with **React** while learning the framework milestone by milestone. It loads real product data from the [Fake Store API](https://fakestoreapi.com/), lets you browse, search and filter products, view product details, and manage a shopping cart.

## Features

- **Product list** – fetched from the Fake Store API and shown in a responsive grid
- **Search and category filter** – filter products by name and/or category, instantly, without extra API calls
- **Product details page** – a dedicated page for each product (`/product/:id`)
- **Shopping cart**
  - Add products from the list or the details page
  - Change quantities with − / + buttons
  - Remove single items, or clear the whole cart (with a confirmation dialog)
  - Live item count in the header and a running total
  - Saved in the browser's local storage, so the cart survives a page reload
- **Favorite button** on each product card
- **Loading and error states** – a spinner while data loads, and a friendly error message with a **Try Again** button if the API fails
- **UI feedback** – hover effects on product cards and buttons, and an "✓ Added!" confirmation when adding to the cart

## Tech Stack

- [React 19](https://react.dev/) with function components and hooks (`useState`, `useEffect`, `useContext`)
- [Vite](https://vite.dev/) for the dev server and build
- [React Router](https://reactrouter.com/) for page navigation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) for code quality

## React Concepts Practised

| Milestone | Concepts                                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1         | Components, JSX, project setup                                                                                                                                                       |
| 2         | Props, state (`useState`), side effects (`useEffect`), fetching data from an API, routing with React Router                                                                          |
| 3         | Global state with the **Context API** (`CartContext` + `useCart()` hook) instead of prop drilling, error handling with `try/catch`, fallback UI, search and filtering, local storage |

## Project Structure

```
src/
├── App.jsx                 # Routes, wrapped in CartProvider
├── Header.jsx              # Store title and cart link with item count
├── ProductCard.jsx         # A single product in the grid
├── Spinner.jsx             # Loading spinner
├── ErrorMessage.jsx        # Error message with a "Try Again" button
├── context/
│   └── CartContext.jsx     # Global cart state: add, remove, update quantity, clear
└── pages/
    ├── HomePage.jsx        # Product list with search and category filter
    ├── ProductDetails.jsx  # Single product page
    └── CartPage.jsx        # Cart with quantities, total and "Clear Cart"
```

## Getting Started

You need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/SaleemKaseer/E-Commerce-Store.git
cd E-Commerce-Store
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

Other commands:

- `npm run build` – build the app for production
- `npm run lint` – check the code with ESLint

## Acknowledgements

This project was built as part of a React learning course. Parts of it were developed with the assistance of **[Claude](https://claude.ai)**, an AI assistant by Anthropic, which helped implement features, explain React concepts, and test the app.
