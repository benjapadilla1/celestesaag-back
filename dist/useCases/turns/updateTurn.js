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
exports.updateTurnUseCase = void 0;
const updateTurnUseCase = (id, turnData, repository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!turnData.userId &&
        !turnData.serviceId &&
        !turnData.date &&
        !turnData.hour) {
        throw new Error("At least one field is required to update a turn.");
    }
    yield repository.updateTurn(id, turnData);
});
exports.updateTurnUseCase = updateTurnUseCase;
