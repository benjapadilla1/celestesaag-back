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
exports.turnWebhook = void 0;
const turnRepository_1 = require("../../repositories/turnRepository");
const createTurn_1 = require("../../useCases/turns/createTurn");
const turnWebhook = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id: userId, service_id: serviceId, service_name: serviceName, hour, date, phone_number: phoneNumber } = paymentInfo.metadata;
    const turn = {
        id: "test",
        serviceName,
        serviceId,
        hour,
        userId,
        date,
        phoneNumber
    };
    yield (0, createTurn_1.createTurnUseCase)(turn, turnRepository_1.turnRepository);
    console.log(`Turno reservado para ${userId} en el servicio ${serviceName} el ${date} a las ${hour}`);
});
exports.turnWebhook = turnWebhook;
