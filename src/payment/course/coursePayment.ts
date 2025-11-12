import { Request, Response } from "express";
import { Preference } from "mercadopago";
import { v4 as uuidv4 } from "uuid";
import { MPClient } from "../../config/mercadopago";

export const createCoursePayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, courseId, coursePrice } = req.body;
    const paymentUrl = await createPaymentPreference(
      userId,
      courseId,
      coursePrice
    );

    res.status(201).json({ url: paymentUrl });

    return;
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Error creating payment" });
    return;
  }
};

const createPaymentPreference = async (
  userId: string,
  courseId: string,
  coursePrice: number
) => {
  const preference = new Preference(MPClient);

  const response = await preference.create({
    body: {
      items: [
        {
          id: uuidv4(),
          title: "Compra de curso",
          quantity: 1,
          currency_id: "ARS",
          unit_price: coursePrice,
        },
      ],
      metadata: { userId, courseId, type: "course" },
      auto_return: "approved",
      back_urls: {
        success: `https://celestesaag.vercel.app/cursos`,
        failure: `https://celestesaag.vercel.app/cursos`,
      },
    },
  });

  return response.init_point;
};
