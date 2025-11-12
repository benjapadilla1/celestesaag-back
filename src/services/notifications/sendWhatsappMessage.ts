import { twilioClient } from "../../config/twilio";

const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

export const sendWhatsAppMessage = async (userPhone: string, time: string) => {
  try {
    const message = await twilioClient.messages.create({
      from: `whatsapp:${whatsappNumber}`,
      to: `whatsapp:${userPhone}`,
      body: `¡Hola! Te recordamos que tienes un turno agendado para mañana a las ${time}. No olvides asistir. En el caso de no asistir, tu seña no es reembolsable sin niguna excepción.`,
    });

    console.log("Mensaje enviado:", message.sid);
    return message.sid;
  } catch (error) {
    console.error("Error enviando mensaje de WhatsApp:", error);
    throw error;
  }
};
