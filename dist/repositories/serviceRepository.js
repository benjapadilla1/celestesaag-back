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
exports.serviceRepository = exports.ServiceRepository = void 0;
const firebase_config_1 = require("../config/firebase.config");
const servicesCollection = firebase_config_1.db.collection("services");
class ServiceRepository {
    getAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield servicesCollection.get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    getServiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield servicesCollection.doc(id).get();
            return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
        });
    }
    createService(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceRef = yield servicesCollection.add(Object.assign(Object.assign({}, service), { createdAt: new Date() }));
            return serviceRef.id;
        });
    }
    updateService(id, serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceRef = servicesCollection.doc(id);
            const serviceDoc = yield serviceRef.get();
            if (!serviceDoc.exists) {
                throw new Error("Service does not exist");
            }
            yield serviceRef.update(Object.assign(Object.assign({}, serviceData), { updatedAt: new Date() }));
        });
    }
    deleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceRef = servicesCollection.doc(id);
            const serviceDoc = yield serviceRef.get();
            if (!serviceDoc.exists) {
                throw new Error("Service does not exist");
            }
            yield serviceRef.delete();
        });
    }
}
exports.ServiceRepository = ServiceRepository;
exports.serviceRepository = new ServiceRepository();
