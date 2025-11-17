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
exports.getAvailableHours = void 0;
const firebase_config_1 = require("src/config/firebase.config");
const availableHoursCollection = firebase_config_1.db.collection("availableHours");
const getAvailableHours = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield availableHoursCollection.get();
    const availableHours = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        if (data.availableHours) {
            availableHours.push(...data.availableHours);
        }
    });
    return availableHours;
});
exports.getAvailableHours = getAvailableHours;
