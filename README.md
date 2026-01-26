# ShopHub - Full Stack E-Commerce Platform

## 🚀 Live Demo
((https://shophub-ten-coral.vercel.app/))](https://shophub-ten-coral.vercel.app/)

## 📖 About
ShopHub is a production-ready e-commerce platform built with the modern Next.js tech stack. It features a complete shopping experience, including secure authentication, a dedicated admin dashboard for product management, and real-time payment processing via Stripe.

## ✨ Key Features
- **🛍️ Full E-Commerce Flow:** Browse products, add to cart, and checkout.
- **🔐 Secure Authentication:** Google OAuth & Email/Password login (via Better-Auth).
- **💳 Real Payments:** Integrated Stripe for secure credit card processing (Test Mode).
- **⚡ Admin Dashboard:** Custom CMS to Add/Edit/Delete products and manage inventory.
- **🖼️ Image Optimization:** Cloudinary integration for blazing fast images.
- **🎨 Responsive UI:** Built with Tailwind CSS and ShadCN patterns.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon DB) + Prisma ORM
- **Styling:** Tailwind CSS
- **Payments:** Stripe
- **Auth:** Better-Auth

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Database URL

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/techboy-s/shophub.git
2. Install package
   ```bash
   npm install
3. Set up environment variables
   ```bash
   cp .env.example .env
# Add your Database URL, Stripe Keys, and Google Auth Keys
5. Run the server
   ```bash
   npm run dev
