import { prisma } from "../../lib/prisma";
import { ICreateContactMessage } from "./contact.interface";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createMessage = async (payload: ICreateContactMessage) => {
   // Bots fill the hidden field. Pretend it worked, but store nothing.
   if (payload.website && payload.website.trim() !== "") {
      return null;
   }

   const name = payload.name?.trim() ?? "";
   const email = payload.email?.trim() ?? "";
   const subject = payload.subject?.trim() ?? "";
   const message = payload.message?.trim() ?? "";

   if (name.length < 2 || name.length > 100) {
      throw new Error("Name must be between 2 and 100 characters");
   }

   if (!EMAIL_PATTERN.test(email) || email.length > 255) {
      throw new Error("Enter a valid email address");
   }

   if (subject.length < 3 || subject.length > 200) {
      throw new Error("Subject must be between 3 and 200 characters");
   }

   if (message.length < 10 || message.length > 2000) {
      throw new Error("Message must be between 10 and 2000 characters");
   }

   return await prisma.contactMessage.create({
      data: { name, email, subject, message },
   });
};

const getAllMessages = async () => {
   return await prisma.contactMessage.findMany({
      orderBy: {
         createdAt: "desc",
      },
   });
};

export const contactService = {
   createMessage,
   getAllMessages,
};
