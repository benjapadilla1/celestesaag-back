"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coursePayment_1 = require("../payment/course/coursePayment");
const turnPayment_1 = require("../payment/turn/turnPayment");
const defineWebhook_1 = __importDefault(require("../payment/defineWebhook"));
const router = (0, express_1.Router)();
router.post("/turn", turnPayment_1.createTurnPayment);
router.post("/course", coursePayment_1.createCoursePayment);
router.post("/webhook", defineWebhook_1.default);
exports.default = router;
