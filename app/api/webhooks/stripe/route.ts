import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const priceId = session.metadata?.priceId;

    if (userId) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const meta = user.publicMetadata as { pt_credits?: number; pt_session_expires?: number };

      if (priceId === process.env.STRIPE_PRICE_2_TRICKS) {
        await client.users.updateUserMetadata(userId, {
          publicMetadata: { pt_credits: (meta.pt_credits ?? 0) + 2 },
        });
      } else if (priceId === process.env.STRIPE_PRICE_SESSION) {
        await client.users.updateUserMetadata(userId, {
          publicMetadata: { pt_session_expires: Date.now() + 4 * 60 * 1000 },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
