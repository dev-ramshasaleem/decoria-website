## 🛍️ Decoria

Decoria is a modern full-stack ecommerce web application built with Next.js, Prisma, and Clerk authentication. It provides a smooth shopping experience with product browsing, search functionality, cart management, and favorites system.

---

## 🚀 Features
- 🛒 Product listing & detailed product pages
- 🔍 Real-time search with suggestions
- ❤️ Add/remove favorites system
- 🛍️ Shopping cart functionality
- 🔐 Authentication with Clerk
- 📦 Order checkout flow
- ⚡ Fast and optimized with Next.js App Router
- 🗄️ Database powered by Prisma
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack
- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Next.js API Routes
- Database: PostgreSQL (via Prisma ORM)
- Authentication: Clerk
- Icons/UI: Lucide React, ShadCN UI

---

## ⚙️ Installation & Setup
Follow these steps to run the project locally:

## Clone the repository:
```bash
git clone https://github.com/dev-ramshasaleem/decoria-website.git
```
## Navigate to the project folder:
```bash
cd decoria-website
```
## Install dependencies:
```bash
npm install
```
## Setup environment variables
```bash
Create a .env file:
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```
## Run Prisma migrations:
```bash
npx prisma generate
npx prisma migrate dev
```
## Run the development server:
```bash
npm run dev
```
---

## 🛒 Core Pages
- / → Home page
- /shop → Product listing with filters/search
- /cart → Shopping cart
- /heart → Favorites page
- /checkout → Order placement

---

🌐 Live Demo

👉 https://decoria-ruby.vercel.app/

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.







