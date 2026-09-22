# Snapdeal Clone - Razorpay Integration

## Payment flow

Cart → Checkout → Create Order in MongoDB → Razorpay Checkout → Server-side Signature Verification → Payment saved in MongoDB → Order marked paid/confirmed → Cart cleared.

Cash on Delivery is also supported.

## 1. Backend

Open a terminal:

```bash
cd backend
npm install
```

Edit `backend/.env`:

```env
PORT=8095
MONGO_URI=mongodb://localhost:27017/snepdeal
JWT_SECRET=snepdeal_secret_key_change_this_in_production

RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

Use your **Razorpay Test Mode** API keys. Never put `RAZORPAY_KEY_SECRET` in the React frontend.

Start MongoDB, then:

```bash
npm run dev
```

Backend runs on:

`http://localhost:8095`

## 2. Frontend

Open another terminal:

```bash
cd frontend/frontend
npm install
npm run dev
```

The frontend API is already configured for:

`http://localhost:8095`

## 3. Razorpay test payment

On Checkout, select **Razorpay**.

Razorpay Checkout will open and provide UPI/Card/Netbanking test options according to your Razorpay test account.

The backend verifies:

- Razorpay order ID
- Razorpay payment ID
- Razorpay signature

Only after successful signature verification is the MongoDB order marked `paid` and the cart cleared.

## Important

The uploaded project originally cleared the cart and reduced stock when the application order was created. This version changes that flow so stock/cart are finalized only after successful payment (or COD confirmation). This prevents a failed/cancelled Razorpay payment from incorrectly consuming stock.

Do not commit `.env` or real Razorpay secrets to GitHub.
