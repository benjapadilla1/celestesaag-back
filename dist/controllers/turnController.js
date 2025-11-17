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
exports.updateTurn = exports.createTurn = exports.getUserTurns = void 0;
const turnRepository_1 = require("../repositories/turnRepository");
const createTurn_1 = require("../useCases/turns/createTurn");
const getUserTurns_1 = require("../useCases/turns/getUserTurns");
const updateTurn_1 = require("../useCases/turns/updateTurn");
const getUserTurns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const turns = yield (0, getUserTurns_1.getTurnsUseCase)(userId, turnRepository_1.turnRepository);
        res.status(200).json(turns);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error getting turns", error });
        return;
    }
});
exports.getUserTurns = getUserTurns;
const createTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const turnId = yield (0, createTurn_1.createTurnUseCase)(req.body, turnRepository_1.turnRepository);
        res
            .status(201)
            .json({ id: turnId, message: "Turn was successfully created" });
        return;
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
        return;
    }
});
exports.createTurn = createTurn;
const updateTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, updateTurn_1.updateTurnUseCase)(req.params.id, req.body, turnRepository_1.turnRepository);
        res.status(200).json({ message: "Turn was successfully updated" });
        return;
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
        return;
    }
});
exports.updateTurn = updateTurn;
