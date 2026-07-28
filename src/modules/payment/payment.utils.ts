import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import config from "../../config";

export const createCheckoutSession = async (
   amount: number,
   bookingId: string,
): Promise<Stripe.Checkout.Session> => {
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
         {
            price_data: {
               currency: "usd",
               product_data: {
                  name: `Booking ${bookingId}`,
               },
               unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
         },
      ],

      success_url: `${config.app_url}/payment/success`,
      cancel_url: `${config.app_url}/payment/cancel`,

      metadata: {
         bookingId,
      },
   });

   return session;
};
