import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_SECRET_KEY is not defined in environment variables");
}
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);



export async function POST(req: NextRequest) {
    const { date, email } = await req.json();

    const amount = 500;
    const currency = "usd";
    console.log("date", date);
    console.log("email", email);
    console.log("After 1 month", new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)).toISOString());

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: "Subscription",
                            
                        },
                        unit_amount: amount,
                    
                    },
                    quantity: 1,
                },
            ],
            metadata: { date, email,dateAfterMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)).toISOString() },
            
            mode: "payment",
            success_url: `https://course-generator-beta.vercel.app/`,
            cancel_url: `https://course-generator-beta.vercel.app/`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Failed to create checkout session" });
    }
}