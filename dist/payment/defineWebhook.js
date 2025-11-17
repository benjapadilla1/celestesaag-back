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
const mercadopago_1 = require("mercadopago");
const mercadopago_2 = require("../config/mercadopago");
const courseWebhook_1 = require("./course/courseWebhook");
const turnWebhook_1 = require("./turn/turnWebhook");
const defineWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const paymentId = ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.id) || req.query["data.id"];
        if (!paymentId || typeof paymentId !== "string") {
            res.status(400).json({ error: "Invalid payment ID" });
            return;
        }
        yield handleWebhook(paymentId, (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
            const { type } = paymentInfo.metadata;
            if (type === "course") {
                yield (0, courseWebhook_1.courseWebhook)(paymentInfo);
            }
            else if (type === "turn") {
                yield (0, turnWebhook_1.turnWebhook)(paymentInfo);
            }
            else {
                console.warn("Unknown payment type:", type);
            }
        }));
        res.sendStatus(200);
    }
    catch (error) {
        console.error("Error processing Mercado Pago webhook:", error);
        res.sendStatus(500);
    }
});
const handleWebhook = (paymentId, processPayment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentInfo = yield new mercadopago_1.Payment(mercadopago_2.MPClient).get({ id: paymentId });
        if (paymentInfo.status !== "approved") {
            console.warn(`Payment ${paymentId} was not approved.`);
            return;
        }
        yield processPayment(paymentInfo);
    }
    catch (error) {
        console.error(`Error processing webhook for payment ${paymentId}:`, error);
    }
});
exports.default = defineWebhook;
