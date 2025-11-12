import { Router } from "express";
import { createCoursePayment } from "../payment/course/coursePayment";
import { createTurnPayment } from "../payment/turn/turnPayment";
import defineWebhook from "../payment/defineWebhook";

const router = Router();

router.post("/turn", createTurnPayment);

router.post("/course", createCoursePayment);

router.post("/webhook", defineWebhook);

export default router;
