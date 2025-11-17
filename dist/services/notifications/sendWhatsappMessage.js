"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = void 0;
const twilio_1 = require("../../config/twilio");
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const sendWhatsAppMessage = (userPhone, time) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield twilio_1.twilioClient.messages.create({
            from: `whatsapp:${whatsappNumber}`,
            to: `whatsapp:${userPhone}`,
            body: `¡Hola! Te recordamos que tienes un turno agendado para mañana a las ${time}. No olvides asistir. En el caso de no asistir, tu seña no es reembolsable sin niguna excepción.`,
        });
        console.log("Mensaje enviado:", message.sid);
        return message.sid;
    }
    catch (error) {
        console.error("Error enviando mensaje de WhatsApp:", error);
        throw error;
    }
});
exports.sendWhatsAppMessage = sendWhatsAppMessage;
