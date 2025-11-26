import { Router } from "express";
import { createCoursePayment } from "../payment/course/coursePayment";
import defineWebhook from "../payment/defineWebhook";

const router = Router();

router.post("/course", createCoursePayment);

router.post("/webhook", defineWebhook);

export default router;
