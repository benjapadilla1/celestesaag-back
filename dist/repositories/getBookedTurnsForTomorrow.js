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
exports.getBookedTurnsForTomorrow = void 0;
const firebase_config_1 = require("../config/firebase.config");
const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};
const getBookedTurnsForTomorrow = () => __awaiter(void 0, void 0, void 0, function* () {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = formatDate(tomorrow);
    const turnsCollection = firebase_config_1.db.collection("turns");
    const snapshot = yield turnsCollection
        .where("date", "==", formattedTomorrow)
        .get();
    if (snapshot.empty) {
        console.log("No hay turnos para mañana.");
        return [];
    }
    return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
});
exports.getBookedTurnsForTomorrow = getBookedTurnsForTomorrow;
