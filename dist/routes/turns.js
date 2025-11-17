"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnController_1 = require("../controllers/turnController");
const router = (0, express_1.Router)();
router.get("/:userId", turnController_1.getUserTurns);
router.post("/", turnController_1.createTurn);
router.put("/:id", turnController_1.updateTurn);
exports.default = router;
