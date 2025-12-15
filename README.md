# VapeNova - E-Commerce Website

A modern, full-featured e-commerce website built with Next.js 14, TypeScript, TailwindCSS, and MongoDB.

## Features

- 🛍️ **Full E-Commerce Functionality**
  - Product catalog with categories and subcategories
  - Shopping cart with persistent storage
  - Custom checkout with multiple payment methods (PayPal, PayID, Revolut Pay, Bank Transfer)
  - Order management system

- 👤 **User Authentication**
  - User registration and login
  - Secure password hashing with bcrypt
  - Session management with Next Auth

- 🔐 **Admin Panel**
  - Secure admin authentication
  - Product management (CRUD operations)
  - Order management
  - User management
  - Blog management (CMS-ready)

- 🎨 **Modern UI/UX**
  - Responsive design (mobile, tablet, desktop)
  - Beautiful animations with Framer Motion
  - Neon vape-themed styling
  - Smooth scrolling and transitions

- 📄 **Complete Pages**
  - Homepage with hero, featured sections, and promotions
  - Shop page with filtering
  - Dynamic product pages
  - Cart and checkout
  - Account management
  - About, Contact, FAQs
  - Legal pages (Terms, Privacy, Refund, Shipping)
  - Blog system

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Shadcn UI
- **Database:** MongoDB with Mongoose
- **Authentication:** Next Auth (Credentials Provider)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Image Upload:** Cloudinary (ready to configure)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vapenova
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/vapenova

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Cloudinary (optional, for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
vapenova/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin panel pages
│   ├── account/           # User account pages
│   ├── shop/              # Shop and product pages
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── navbar.tsx        # Navigation bar
│   └── footer.tsx        # Footer component
├── lib/                  # Utility functions
│   ├── models/          # MongoDB models
│   ├── mongodb.ts       # Database connection
│   └── utils.ts         # Helper functions
├── store/               # Zustand stores
└── types/              # TypeScript types
```

## Categories

- **Vapes**
  - CBD Vapes
  - STHL Vapes

- **Vaporizers**
  - Mighty Vaporizers

- **Gummies**
  - Mushroom Edibles

## Admin Access

To create an admin user, you can either:
1. Manually create one in MongoDB with `role: "admin"`
2. Use the registration API and update the user's role in the database

Default admin credentials (if set up):
- Email: admin@vapenova.com
- Password: admin123

**Note:** Change these credentials in production!

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Make sure to set up your MongoDB database (MongoDB Atlas recommended for production).

## License

This project is private and proprietary.

## Support

For support, contact support@vapenova.com

