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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnRepository = exports.TurnRepository = void 0;
const uuid_1 = require("uuid");
const firebase_config_1 = require("../config/firebase.config");
const turnsCollection = firebase_config_1.db.collection("turns");
class TurnRepository {
    getTurns(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield turnsCollection.where("userId", "==", userId).get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    createTurn(turn) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, id } = turn, rest = __rest(turn, ["date", "id"]);
            const turnRef = yield turnsCollection.add(Object.assign({ date: new Date(date).toISOString().split("T")[0], createdAt: new Date(), id: (0, uuid_1.v4)() }, rest));
            return turnRef.id;
        });
    }
    updateTurn(id, turnData) {
        return __awaiter(this, void 0, void 0, function* () {
            const turnRef = turnsCollection.doc(id);
            const turnDoc = yield turnRef.get();
            if (!turnDoc.exists) {
                throw new Error("Turn does not exist");
            }
            yield turnRef.update(Object.assign(Object.assign({}, turnData), { updatedAt: new Date() }));
        });
    }
}
exports.TurnRepository = TurnRepository;
exports.turnRepository = new TurnRepository();
