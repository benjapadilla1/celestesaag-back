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
exports.createCoursePayment = void 0;
const mercadopago_1 = require("mercadopago");
const uuid_1 = require("uuid");
const mercadopago_2 = require("../../config/mercadopago");
const createCoursePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId, coursePrice } = req.body;
        const paymentUrl = yield createPaymentPreference(userId, courseId, coursePrice);
        res.status(201).json({ url: paymentUrl });
        return;
    }
    catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ message: "Error creating payment" });
        return;
    }
});
exports.createCoursePayment = createCoursePayment;
const createPaymentPreference = (userId, courseId, coursePrice) => __awaiter(void 0, void 0, void 0, function* () {
    const preference = new mercadopago_1.Preference(mercadopago_2.MPClient);
    const response = yield preference.create({
        body: {
            items: [
                {
                    id: (0, uuid_1.v4)(),
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
});
