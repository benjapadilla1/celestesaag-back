"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const availableHoursController_1 = require("src/controllers/availableHoursController");
const router = (0, express_1.Router)();
router.get("/", availableHoursController_1.getAvailableHours);
exports.default = router;
