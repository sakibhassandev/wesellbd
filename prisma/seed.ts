import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.create({
    data: {
      id: "user_123",
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://example.com/john.png",
      email: "john@example.com",
    },
  });

  // Create category and product
  const product = await prisma.product.create({
    data: {
      name: "Gaming Mouse",
      slug: "gaming-mouse",
      description: "High precision gaming mouse",
      basePrice: 49.99,
      brand: "LogiTech",
      images: ["https://example.com/mouse.png"],
      tags: ["gaming", "accessory"],
      category: {
        create: {
          name: "Accessories",
          slug: "accessories",
        },
      },
      variants: {
        create: [
          {
            option: "Black",
            price: 49.99,
            stock: 20,
          },
        ],
      },
    },
  });

  // Create coupon
  const coupon = await prisma.coupon.create({
    data: {
      code: "SAVE10",
      discountType: "PERCENTAGE",
      discountValue: 10,
      maxUsage: 100,
    },
  });

  // Create a coupon that applies to specific products
  const applicableCoupon = await prisma.coupon.create({
    data: {
      code: "SAVE20",
      discountType: "PERCENTAGE",
      discountValue: 20,
      maxUsage: 50,
      appliesToAll: false,
    },
  });

  // Create a product with the coupon applied
  await prisma.couponProduct.create({
    data: {
      couponId: applicableCoupon.id,
      productId: product.id,
    },
  });

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      items: {
        create: [
          {
            productId: product.id,
            quantity: 2,
            price: 49.99,
            totalPrice: 99.98,
          },
        ],
      },
      totalAmount: 89.98, // 10% discount on 99.98 = 89.98
      discountAmount: 10.0,
      address: {
        street: "123 Main St",
        city: "Dhaka",
        state: "Dhaka",
        zipCode: "1205",
        country: "Bangladesh",
      },
      paymentMethod: "COD",
      status: "PENDING",
      couponId: coupon.id,
    },
  });

  console.log("Seeding completed 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
