# 🏠 Hostel Management Web App

A modern web application designed to simplify hostel operations, enabling tenants to pay rent, track payments, and submit complaints, while providing administrators with tools to manage residents efficiently.

---

## 🚀 Features

### 🌐 Landing Page

- Hostel overview and features
- Pricing information
- Call-to-action for registration and login

### 👤 Tenant Dashboard

- View rent status
- Track payment history
- Submit and monitor complaints

### 💳 Payment System

- Secure rent payment integration (Paystack/Flutterwave)
- Payment verification via backend
- Transaction history and receipt tracking

### 📝 Complaint Management

- Submit complaints with optional attachments
- Track complaint status (Pending, Resolved, etc.)

### 🛠️ Admin Panel

- Manage tenants
- View and verify payments
- Respond to and update complaints

---

## 🏗️ Tech Stack

| Layer          | Technology             |
| -------------- | ---------------------- |
| Frontend       | Next.js (App Router)   |
| Styling        | Tailwind CSS           |
| Backend        | Next.js API Routes     |
| Database       | PostgreSQL             |
| ORM            | Prisma                 |
| Authentication | NextAuth.js            |
| Payments       | Paystack / Flutterwave |

---

## 📁 Project Structure

```
/app
  /auth
  /dashboard
  /payments
  /complaints
  /admin
/components
/lib
/prisma
/public
/styles
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hostel-app.git
cd hostel-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret
```

### 4. Setup Database

```bash
npx prisma migrate dev
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🔐 Authentication

- Uses **NextAuth.js**
- Supports role-based access:
  - `TENANT`
  - `ADMIN`

---

## 💳 Payment Flow

1. Tenant initiates payment
2. Redirect to payment gateway (Paystack/Flutterwave)
3. Payment is processed
4. Backend verifies transaction via webhook
5. Payment status is updated in the database

---

## 📊 Database Models (Overview)

- **User**
- **Payment**
- **Complaint**

Managed using **Prisma ORM**

---

## 🚀 Deployment

Recommended platform: **Vercel**

### Steps:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

---

## 🧪 Future Improvements

- Email/SMS notifications
- Room allocation system
- Multi-hostel support
- Analytics dashboard
- Mobile app version

---

## ⚠️ Security Considerations

- Always verify payments on the backend
- Protect API routes with authentication middleware
- Hash user passwords securely
- Validate all user inputs

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions or support, please contact:
**Your Name**
Email: [your-email@example.com](mailto:your-email@example.com)

---

## ⭐ Acknowledgements

- Next.js Team
- Tailwind CSS
- Prisma
- Paystack / Flutterwave

---

> Built to streamline hostel management and improve tenant experience.
