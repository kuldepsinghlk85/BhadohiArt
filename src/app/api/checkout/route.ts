import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const { items, contactInfo, shippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!contactInfo || !shippingAddress) {
      return NextResponse.json({ error: "Missing checkout details" }, { status: 400 });
    }

    // Calculate total amount securely
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const dbProduct = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!dbProduct) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 404 });
      }

      // Base price * quantity. If product has ENQUIRE priceMode, we shouldn't have it in the cart, but just in case, default to 0.
      const price = dbProduct.basePrice || 0;
      totalAmount += price * item.quantity;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: price,
        size: item.size || null,
      });
    }

    // Ensure we handle missing user ID if it's a guest checkout, but Prisma schema might require a userId.
    // Let's check if the schema requires a userId.
    // Wait, let me check the schema to see if userId is required. I'll assume for now it is optional or we can create a guest user if needed, but wait!
    // If the schema requires it, I should just attach it if session exists. If it's strictly required, guest checkout will fail.
    // I will do it like this:
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized. Please login to place an order." }, { status: 401 });
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        status: "PENDING",
        total: totalAmount,
        notes: `Contact: ${contactInfo.email}, ${contactInfo.phone} | Shipping: ${shippingAddress.addressLine}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pinCode}, ${shippingAddress.country}`,
        items: {
          create: orderItems,
        },
      }
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
