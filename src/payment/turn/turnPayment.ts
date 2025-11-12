import { Request, Response } from "express";
import { Preference } from "mercadopago";
import { v4 as uuidv4 } from "uuid";
import { MPClient } from "../../config/mercadopago";

export const createTurnPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, date, hour, serviceId, serviceName, phoneNumber } = req.body;
    const paymentUrl = await createPaymentPreference(userId, date, hour, serviceId, serviceName, phoneNumber);

    res.status(201).json({ url: paymentUrl });
    return;
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Error creating payment" });
    return;
  }
};

const createPaymentPreference = async (userId: string, date: Date, hour: string, serviceId: string, serviceName: string, phoneNumber: string) => {
  const preference = new Preference(MPClient);

  const response = await preference.create({
    body: {
      items: [
        {
          id: uuidv4(),
          title: 'Reserva de Turno',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 15000,
        },
      ],
      metadata: { userId, date, hour, serviceId, serviceName, type: 'turn', phoneNumber },
      auto_return: 'approved',
      back_urls: {
        success: 'http://localhost:3000/turnos',
        failure: 'http://localhost:3000/failure'
      },
    },
  });

  return response.init_point;
};
