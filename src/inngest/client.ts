import { prisma } from "@/lib/prisma";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "wesellbd" });

// Inngest function to save user data to the database
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const userData = {
      userId: id,
      firstName: first_name,
      lastName: last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };

    await prisma.user.create({
      data: userData,
    });
  }
);

// Inngest function to update user data to the database
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const userData = {
      userId: id,
      firstName: first_name,
      lastName: last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };

    await prisma.user.update({
      where: { userId: id },
      data: userData,
    });
  }
);

// Inngest function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await prisma.user.delete({
      where: { userId: id },
    });
  }
);
