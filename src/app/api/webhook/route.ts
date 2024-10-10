import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/config/db/db";
import { TransactionSchema } from "@/config/db/schemas/TransactionScema";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey);

export async function POST(req:NextRequest) {  console.log("Webhook called");
    console.log("req.headers", req.headers);
  const sig = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK;

  
  console.log("sig", sig);
  if (!webhookSecret) {
    throw new Error("Webhook secret is not defined");
  }

  let event;

  try {
    if (!sig) {
      console.error('Stripe signature is missing.');
      return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(await req.text(), sig, webhookSecret);
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

    const res = await db.insert(TransactionSchema).values({
        //@ts-ignore
        email,
        supscription_date:date,
        expiry_date:expiryDate,
        amount,
    })

   
    try {
     
    } catch (error) {
      console.error("Error storing transaction:", error);
    }
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}