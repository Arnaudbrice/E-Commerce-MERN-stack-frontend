# 🛍️ Bon Marché — E-Commerce Platform (Frontend)

This is the frontend for **Bon Marché**, a modern, full-featured E-Commerce web application built with React and the MERN stack. It delivers a premium, responsive shopping experience with an AI-powered shopping assistant, secure payments via Stripe, and a comprehensive admin dashboard.

![React](https://img.shields.io/badge/React-18+-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/daisyUI-4-5A0EF8?logo=daisyui)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![License](https://img.shields.io/badge/License-MIT-green)

---

### **🌐 Live Demo**

> **live:** [https://e-commerce-mern-stack-frontend-q5j0.onrender.com](https://e-commerce-mern-stack-frontend-q5j0.onrender.com)

---

### **📸 Screenshots**

|            Home Page             |             Product Detail             |           AI Chat Assistant           |
| :------------------------------: | :------------------------------------: | :-----------------------------------: |
|                                  |                                        |                                       |
| _A clean and modern storefront._ | _Detailed product views with ratings._ | _AI-powered conversational shopping._ |

---

## ✨ Key Features

### 🛒 Shopping Experience

- **Dynamic Product Catalog**: Browse products with category filtering, search, and pagination.
- **Advanced Search**: Real-time suggestions and typo correction.
- **Detailed Product Pages**: View image galleries, descriptions, stock status, and user reviews.
- **Interactive Shopping Cart**: Add, update, and remove products with real-time price calculations.
- **Wishlist / Favorites**: Save products for later by clicking the heart icon.
- **Star Rating System**: Leave reviews with ratings and comments.

### 🤖 AI-Powered Shopping Assistant

- **Conversational Chatbot**: Powered by Groq (LLaMA 3.1) for fast, natural language interaction.
- **Intelligent Product Recommendations**: Find products by describing what you want (e.g., "a cheap gift for my son").
- **Multilingual Support**: Auto-detects English and German.
- **Context-Aware Responses**: Uses Retrieval-Augmented Generation (RAG) for relevant suggestions.

### 💳 Secure Payments & User Management

- **Stripe Integration**: Securely pay with credit cards, PayPal, Klarna, and more.
- **JWT Authentication**: Secure login and registration with HttpOnly cookies.
- **Role-Based Access Control**: Differentiates between `user` and `admin` roles.
- **User Profile Management**: Update personal information and upload an avatar to Cloudinary.
- **Order History**: View past orders and download PDF invoices.
- **Password Reset**: Securely reset your password via email link.

### 🛡️ Admin Dashboard

- **Full Product Management (CRUD)**: Create, read, update, and delete products.
- **Order Management**: View and manage all customer orders.
- **User Management**: View all registered users and manage roles.

### 📄 UI/UX & Content Pages

- **Fully Responsive Design**: Looks great on mobile, tablet, and desktop.
- **Dark/Light Mode**: Toggle between themes with system preference detection.
- **User Feedback**: Toast notifications for actions like adding to cart or errors.
- **Loading Skeletons**: Improves perceived performance while data is loading.
- **Comprehensive Static Pages**: Includes About Us, FAQ, Privacy Policy, Terms of Service, Shipping Policy, and Returns & Refunds.

---

## 🛠️ Tech Stack

| Category              | Technology                                                      |
| :-------------------- | :-------------------------------------------------------------- |
| **Core**              | React 18, React Router v6, Vite                                 |
| **Styling**           | TailwindCSS, DaisyUI, React Icons                               |
| **State Management**  | React Context API (with custom hooks like `useAuth`, `useCart`) |
| **Payments**          | Stripe.js, React Stripe.js                                      |
| **API Communication** | `fetch` API                                                     |
| **UI/UX**             | React-Toastify (notifications), React-Markdown                  |

---

## 📁 Project Structure

The project follows a feature-based structure, separating concerns into components, pages, contexts, and custom hooks.

```
src/
├── assets/         # Static assets like images and logos
├── components/     # Reusable UI components (Navbar, Footer, Dialogs)
├── context/        # Global state management (AuthContext, CartContext, etc.)
├── hooks/          # Custom hooks for consuming context (useAuth, useCart)
├── pages/          # Top-level page components for each route
│   ├── admin/      # Admin dashboard pages
│   ├── AboutUs.jsx
│   ├── Cart.jsx
│   ├── Home.jsx
│   └── ...
├── utils/          # Utility functions (e.g., custom error messages)
├── App.jsx         # Main application component with routing
└── main.jsx        # Entry point of the React application
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or a compatible package manager
- A running instance of the [backend server](https://github.com/Arnaudbrice/Project-Mern-stack-e-commerce/tree/main/E-Commerce-MERN-stack-backend).

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Arnaudbrice/Project-Mern-stack-e-commerce.git
    cd Project-Mern-stack-e-commerce/E-Commerce-React-Project-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the `E-Commerce-React-Project-frontend` root and add the following variables.

    ```env
    # The base URL of your backend API
    VITE_API_BASE_URL=http://localhost:3000

    # Your public key from Stripe
    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🗺️ Roadmap

- [x] Product catalog with CRUD operations
- [x] User authentication & authorization
- [x] Shopping cart & checkout with Stripe
- [x] AI Shopping Assistant with Groq
- [x] Product reviews & ratings system
- [x] Dark mode / Light mode
- [x] Fully responsive design
- [x] Comprehensive legal & info pages
- [ ] Order tracking with real-time status updates
- [ ] Wishlist sharing functionality
- [ ] Full i18n for multi-language support
- [ ] PWA support for offline capabilities

---

## 👨‍💻 Author

**Brice Arnaud Habenicht**

- 🌐 [Portfolio](https://brice-arnaud-habenicht-portfolio.netlify.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/brice-arnaud-habenicht/)
- 🐙 [GitHub](https://github.com/Arnaudbrice)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
