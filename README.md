# 🛍️ Clothify — Full-Stack E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Storage-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**Clothify** is a modern, responsive, full-stack MERN e-commerce application designed for seamless online shopping and comprehensive store management. Built with a decoupled architecture featuring a customer-facing storefront, an administrative dashboard, and a robust Express/MongoDB REST API.

---

## 📑 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Key Features](#-key-features)
  - [Customer Storefront](#1-customer-storefront-frontend)
  - [Admin Management Panel](#2-admin-management-panel-admin)
  - [Backend & APIs](#3-backend-rest-api-backend)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
  - [3. Admin Panel Setup](#3-admin-panel-setup)
- [Deployment](#-deployment)
- [Author & Acknowledgments](#-author--acknowledgments)

---

## 🏛️ Architecture Overview

The repository is structured as a modular multi-package application:

```
                          ┌───────────────────────────┐
                          │   MongoDB Atlas Database  │
                          └─────────────▲─────────────┘
                                        │
                                        │ (Mongoose)
┌───────────────────────┐         ┌─────┴──────────────┐         ┌───────────────────────┐
│                       │  HTTP   │                    │  HTTP   │                       │
│  Customer Storefront  ├────────►│  Node/Express API  │◄────────┤      Admin Panel      │
│  (React 19 + Vite)    │  (JWT)  │  (Port 4000)       │  (JWT)  │  (React 19 + Vite)    │
│                       │         │                    │         │                       │
└───────────────────────┘         └─────┬──────────────┘         └───────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
              ┌─────────────────────┐       ┌─────────────────────┐
              │  Cloudinary Media   │       │   Stripe Checkout   │
              └─────────────────────┘       └─────────────────────┘
```

---

## ✨ Key Features

### 1. Customer Storefront (`/frontend`)
- **Interactive Product Catalog**: Browse collections with filter by Category (*Men, Women, Kids*) and Subcategory (*Topwear, Bottomwear, Winterwear*).
- **Search & Sort**: Real-time search bar across the product catalog and price sorting (Low to High, High to Low).
- **Product Detail View**: Image gallery previews, size selector (`S`, `M`, `L`, `XL`, `XXL`), description, and related product recommendations.
- **Persistent Cart & Badges**: Add-to-cart with size specification, real-time quantity adjusters, subtotal calculation with delivery fees, and navbar badge indicators.
- **Secure Authentication**: User sign-up and login with JWT stored in local storage, form validation, and toast feedback.
- **User Profile Dashboard**:
  - Live statistics (*Total Orders placed, Cart Items count, Lifetime Spent*).
  - Profile name editing.
  - Automatically remembered default delivery address.
  - Quick action links for tracking orders, browsing collections, and customer support.
- **Flexible Checkout & Payments**:
  - **Cash on Delivery (COD)**.
  - **Stripe Checkout**: Integrated card payments with automated session verification (`/verify`).
- **Order Tracking**: Detailed purchase history with order item breakdown, shipping address, date, payment method, and live status badges (*Order Placed, Packing, Shipped, Out for delivery, Delivered*).

### 2. Admin Management Panel (`/admin`)
- **Secure Admin Authentication**: Dedicated administrator login credentials.
- **Product Management**:
  - Add products with multi-image upload (up to 4 images) automatically uploaded to Cloudinary.
  - Set product name, category, subcategory, pricing, sizes, bestseller status, and description.
  - Real-time product list table with removal capabilities.
- **Order Processing**:
  - View all customer orders with customer details, item breakdowns, quantities, and payment status.
  - Dynamic order status updater dropdown (*Order Placed*, *Packing*, *Shipped*, *Out for delivery*, *Delivered*).

### 3. Backend REST API (`/backend`)
- **Express 5 REST Architecture**: Modular routing for users, products, carts, and orders.
- **Security & Authorization**:
  - Password hashing with `bcrypt`.
  - Token-based stateless authentication with `jsonwebtoken` (JWT).
  - Role-based middleware separating customer routes (`auth.js`) from admin routes (`adminAuth.js`).
- **File Uploads**: `multer` middleware for processing multi-image multipart form requests.
- **Cloud Integrations**:
  - **Cloudinary**: Cloud-hosted image storage and optimization.
  - **Stripe**: Hosted checkout session generation and order verification.
  - **MongoDB Atlas**: Scalable cloud database via Mongoose ODM.

---

## 🛠️ Tech Stack

### Frontend & Admin Panel
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI library with functional components & hooks |
| **Vite 6** | Ultra-fast build tool and local development server |
| **React Router 7** | Client-side routing and page navigation |
| **Tailwind CSS 3** | Utility-first responsive CSS styling |
| **Axios** | Promise-based HTTP client for API communication |
| **React-Toastify** | Customizable toast notifications |

### Backend & Database
| Technology | Description |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment |
| **Express 5** | Minimalist web application framework |
| **MongoDB & Mongoose** | NoSQL database and object modeling layer |
| **Cloudinary SDK** | Media asset upload and management |
| **Stripe SDK** | Online payment processing |
| **JWT & Bcrypt** | Secure user authentication and password hashing |
| **Multer** | Multipart/form-data upload handling |

---

## 📁 Project Structure

```text
E-commerce/
├── backend/                  # Express REST API Server
│   ├── config/               # DB and Cloudinary connection setup
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   ├── controllers/          # Business logic handlers
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/           # Auth and upload middleware
│   │   ├── adminAuth.js
│   │   ├── auth.js
│   │   └── multer.js
│   ├── models/               # Mongoose data schemas
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/               # API route definitions
│   │   ├── cartRoute.js
│   │   ├── orderRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── server.js             # API entrypoint
│   └── package.json
│
├── frontend/                 # Customer-facing Storefront
│   ├── public/               # Public assets and favicon
│   ├── src/
│   │   ├── assets/           # UI icons and mock assets
│   │   ├── components/       # Reusable components (NavBar, Hero, CartTotal, etc.)
│   │   ├── context/          # ShopContext state management
│   │   ├── pages/            # Application pages (Home, Collection, Cart, Profile, etc.)
│   │   ├── App.jsx           # Main routing component
│   │   ├── index.css         # Global Tailwind directives
│   │   └── main.jsx          # React DOM entry
│   └── package.json
│
├── admin/                    # Store Administrator Panel
│   ├── public/               # Admin favicon and static assets
│   ├── src/
│   │   ├── assets/           # Admin icons and graphics
│   │   ├── components/       # Navbar, Sidebar, Admin Login
│   │   ├── pages/            # Add Product, Product List, Orders
│   │   ├── App.jsx           # Admin root component
│   │   └── main.jsx          # React DOM entry
│   └── package.json
│
└── README.md                 # Project documentation
```

---

## 🔌 API Endpoints

### User Routes (`/api/user`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Public | Register a new customer account |
| `POST` | `/api/user/login` | Public | Authenticate existing customer and issue JWT |
| `POST` | `/api/user/admin` | Public | Authenticate store administrator |
| `POST` | `/api/user/profile` | User Auth | Fetch authenticated user profile details |
| `POST` | `/api/user/update-profile` | User Auth | Update user profile information |

### Product Routes (`/api/product`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/product/list` | Public | Fetch all available products |
| `POST` | `/api/product/add` | Admin Auth | Upload product with up to 4 images |
| `POST` | `/api/product/remove` | Admin Auth | Remove a product by ID |
| `POST` | `/api/product/single` | Admin Auth | Fetch details for a specific product |

### Cart Routes (`/api/cart`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/cart/get` | User Auth | Retrieve authenticated user's cart data |
| `POST` | `/api/cart/add` | User Auth | Add item with selected size to cart |
| `POST` | `/api/cart/update` | User Auth | Update quantity of a cart item |

### Order Routes (`/api/order`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/order/place` | User Auth | Place order using Cash on Delivery (COD) |
| `POST` | `/api/order/stripe` | User Auth | Initiate Stripe Checkout session |
| `POST` | `/api/order/verifyStripe` | User Auth | Verify Stripe payment status |
| `POST` | `/api/order/userorders` | User Auth | Retrieve orders for authenticated user |
| `POST` | `/api/order/list` | Admin Auth | Fetch all customer orders (Admin) |
| `POST` | `/api/order/status` | Admin Auth | Update shipping status of an order |

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### Frontend (`frontend/.env`)
```env
VITE_BACKEND_URL=http://localhost:4000
```

### Admin Panel (`admin/.env`)
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Cloudinary Account](https://cloudinary.com/) (For product media uploads)
- [Stripe Account](https://stripe.com/) (For test card checkout)

---

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file based on the [Environment Variables](#backend-backendenv) section:
   ```bash
   cp .env.example .env   # or create .env directly
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The API will start listening on `http://localhost:4000`.*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or verify `frontend/.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The storefront will be available at `http://localhost:5173`.*

---

### 3. Admin Panel Setup

1. Open another terminal and navigate to the `admin` folder:
   ```bash
   cd admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or verify `admin/.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```
4. Start the admin development server:
   ```bash
   npm run dev
   ```
   *The admin portal will run (typically on `http://localhost:5174` or as designated by Vite).*

---

## 🚢 Deployment

All three modules (`backend`, `frontend`, and `admin`) include preconfigured `vercel.json` files for effortless deployment to [Vercel](https://vercel.com/):

- **Backend**: Configured with `@vercel/node` to run `server.js` as a serverless API function. Ensure all backend environment variables are added in the Vercel dashboard.
- **Frontend & Admin**: Configured with SPA rewrite rules (`/(.*) -> /`) so React Router navigation operates without 404 errors on refresh.

---

## 👨‍💻 Author & Acknowledgments

- **Developer**: [Satyabrata Pradhan](https://github.com/satyabratapradhan01)
- **Repository**: [Clothify E-commerce](https://github.com/satyabratapradhan01/E-commerce)

---

Made with ❤️ using the **MERN** stack.
