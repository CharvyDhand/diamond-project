# Diamond E-Commerce - Setup & Admin Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase & PayPal

#### Firebase Setup
Your Firebase is already configured in `.env.local`. No changes needed.

#### PayPal Setup (IMPORTANT)
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Create a **Sandbox App** (for testing)
3. Copy your **Client ID**
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
   ```

### 3. Deploy Firebase Security Rules
```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select Firestore)
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

Copy the contents from `firestore.rules` to your Firebase console or use the CLI.

### 4. Create Admin User

You need to create an admin account manually in Firebase:

**Option A: Using Firebase Console**
1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `diamondbackend-e713`
3. Navigate to **Authentication** → **Users** → **Add User**
4. Create a user with email/password (e.g., `admin@yourdomain.com`)
5. Copy the **UID** of the created user
6. Go to **Firestore Database** → **Start Collection**
7. Collection ID: `admins`
8. Document ID: [paste the UID you copied]
9. Fields:
   ```
   email: "admin@yourdomain.com"
   role: "admin"
   createdAt: [current timestamp]
   ```

**Option B: Using Firebase Admin SDK** (recommended for multiple admins)
Create a script `scripts/create-admin.js` and run it once.

### 5. Run the Application
```bash
npm run dev
```

Visit:
- **Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## 👥 Admin Panel Access

### Login Credentials
- **URL**: `/admin/login`
- **Email**: The admin email you created in Firebase
- **Password**: The password you set

### Features
- ✅ **Dashboard**: View revenue, orders, and statistics
- ✅ **Orders Management**: View all customer orders in real-time
- ✅ **Products Management**: (Coming soon)
- ✅ **Secure Access**: Only authenticated admins can access

### Sharing with Owner
The owner can access the admin panel without your Firebase account:
1. Give them the URL: `https://yourdomain.com/admin/login`
2. Create their admin account in Firebase (see Step 4 above)
3. Share only their email and password - they don't need Firebase access!

---

## 💳 Payment Integration

### PayPal Setup
- **Status**: ✅ Integrated
- **Supports**: PayPal accounts + Credit/Debit cards
- **Testing**: Use PayPal Sandbox accounts

### Testing Payments
1. Get PayPal Sandbox test accounts from [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/accounts)
2. Use test credit card or PayPal account during checkout
3. Orders will be saved to Firestore automatically
4. Check admin panel to see the order

---

## 📦 Next Steps

### Phase 4: Product Management
- [ ] Upload product images to Firebase Storage
- [ ] Create product management UI in admin panel
- [ ] Migrate static products to Firestore

### Phase 5: Enhancements
- [ ] Set up email notifications for new orders
- [ ] Add order status updates
- [ ] Export order data to CSV

---

## 🔐 Security

- ✅ Firebase Security Rules protect data
- ✅ Admin authentication required
- ✅ Customer data encrypted in transit
- ✅ Role-based access control

---

## 🆘 Troubleshooting

### "PayPal button not showing"
- Check that `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set in `.env.local`
- Restart dev server after changing environment variables

### "Admin login failed"
- Verify the user exists in Firebase Authentication
- Ensure the user's UID is added to the `admins` collection in Firestore

### "Orders not showing in admin panel"
- Complete a test order first
- Check Firestore Database to confirm orders were saved
- Verify Firebase Security Rules are deployed

---

## 📞 Support

For issues:
1. Check browser console for errors
2. Verify Firebase configuration
3. Ensure all environment variables are set
