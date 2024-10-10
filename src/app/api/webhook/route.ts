import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/config/db/db";
import { TransactionSchema } from "@/config/db/schemas/TransactionScema";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey);

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK;
  if (!webhookSecret) {
    throw new Error("Webhook secret is not defined");
  }

  let event;

  // Buffer function to capture raw request body
//   @ts-ignore
  async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

  try {
    const buf = await buffer(req.body); // Capture raw body as buffer
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret); // Verify signature
  } catch (err) {
    // @ts-ignore
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata;
    if (!metadata) {
      console.error('Session metadata is missing.');
      return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
    }
    const email = metadata.email;
    const date = metadata.date;
    const expiryDate = metadata.dateAfterMonth;
    const amount = session.amount_total?.toString() || '';

    try {
      const res = await db.insert(TransactionSchema).values({
        //@ts-ignore
        email,
        supscription_date: date,
        expiry_date: expiryDate,
        amount,
      });
    } catch (error) {
      console.error("Error storing transaction:", error);
    }
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
