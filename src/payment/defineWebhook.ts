import { Request, Response } from "express";
import { Payment } from "mercadopago";
import { MPClient } from "../config/mercadopago";
import { courseWebhook } from "./course/courseWebhook";

const defineWebhook = async (req: Request, res: Response) => {
  try {
    const paymentId = req.body?.data?.id || req.query["data.id"];

    if (!paymentId || typeof paymentId !== "string") {
      res.status(400).json({ error: "Invalid payment ID" });
      return;
    }

    await handleWebhook(paymentId, async (paymentInfo) => {
      const { type } = paymentInfo.metadata;
      if (type === "course") {
        await courseWebhook(paymentInfo);
      } else {
        console.warn("Unknown payment type:", type);
      }
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing Mercado Pago webhook:", error);
    res.sendStatus(500);
  }
};

const handleWebhook = async (
  paymentId: string,
  processPayment: (paymentInfo: any) => Promise<void>
) => {
  try {
    const paymentInfo = await new Payment(MPClient).get({ id: paymentId });

    if (paymentInfo.status !== "approved") {
      console.warn(`Payment ${paymentId} was not approved.`);
      return;
    }

    await processPayment(paymentInfo);
  } catch (error) {
    console.error(`Error processing webhook for payment ${paymentId}:`, error);
  }
};

export default defineWebhook;
