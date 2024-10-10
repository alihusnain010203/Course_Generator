"use client";
import React, { useEffect, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js';

import axios from 'axios';
import { useUser } from '@clerk/nextjs';
const UpgradePage = () => {
  const { user } = useUser();
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    } else {
      console.error('Stripe publishable key is not defined');
    }
  }, [])

  const handleCheckout = async () => {

    try {
      const { data } = await axios.post(`/api/payments/create-checkout-session`,
        { email: user?.primaryEmailAddress?.emailAddress, date: new Date().toISOString() });

      if (data.sessionId) {
        const stripe = await stripePromise;

        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });

        return response
      } else {
        console.error('Failed to create checkout session');

        return
      }
    } catch (error) {
      console.error('Error during checkout:', error);

      return
    }
  };
  return (
    <div className='flex justify-center items-center w-full'><div className="grid px-8 gap-10 text-zinc-800 mt-10">

      <div
        className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-300 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-purple-400 max-w-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
          className="w-20 h-20 absolute -top-11 -left-11 fill-primary">
          <path fill-rule="evenodd"
            d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
            clip-rule="evenodd"></path>
        </svg>
        <p className="mono text-sm absolute -top-4 bg-primary text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">
          POPULAR
        </p>
        <div>
          <div className="flex gap-4 justify-center">
            <p className="font-extrabold text-3xl mb-2">Pro

            </p>
          </div>
          <p className="opacity-60 text-center">For Students</p>
          <p className="opacity-60 text-center">
          </p>
          <div className="flex gap-4 justify-center">
            <div className="flex flex-col items-center my-8">
              <p className="font-extrabold text-4xl">$5

              </p>
              <p className="text-sm opacity-60">/month

              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
            <path fill-rule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clip-rule="evenodd"></path>
          </svg>
            <b>Unlimited Course Generation</b>
          </p>
          <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
            <path fill-rule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clip-rule="evenodd"></path>
          </svg>
            <b>Early Beta Features&nbsp;</b>
          </p>

          <div className="flex justify-center mt-8">
            <button  onClick={()=>{
              handleCheckout()
            }} className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-100 rounded-xl">Get
              Started
            </button>
          </div>
        </div>
      </div>
    </div></div>

  )
}

export default UpgradePage