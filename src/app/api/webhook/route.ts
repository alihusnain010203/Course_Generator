import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/config/db/db";
import { TransactionSchema } from "@/config/db/schemas/TransactionScema";
import { eq } from "drizzle-orm";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey);

export async function POST(req:NextRequest) {
const body=await req.text();
  const sig = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK;
  if (!webhookSecret) {
    throw new Error("Webhook secret is not defined");
  }

  let event;

  try {
    if (!sig) {
      console.error('Stripe signature is missing.');
      return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err);
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

    const existingTransaction = await db.select().from(TransactionSchema).where(eq(TransactionSchema.email,email));

    if (existingTransaction) {
      await db.update(TransactionSchema).set({
        supscription_date: date,
        expiry_date: expiryDate,
        amount,
      }).where(
        eq(TransactionSchema.email,email)
      );
    } else {
      await db.insert(TransactionSchema).values({
        email,
        supscription_date: date,
        expiry_date: expiryDate,
        amount,
      });
    }

   
    try {
     
    } catch (error) {
      console.error("Error storing transaction:", error);
    }
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}