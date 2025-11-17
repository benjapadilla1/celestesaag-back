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
exports.deleteService = exports.updateService = exports.createService = exports.getServiceById = exports.getAllServices = void 0;
const serviceRepository_1 = require("../repositories/serviceRepository");
const createService_1 = require("../useCases/services/createService");
const deleteService_1 = require("../useCases/services/deleteService");
const getServiceById_1 = require("../useCases/services/getServiceById");
const getServices_1 = require("../useCases/services/getServices");
const updateService_1 = require("../useCases/services/updateService");
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield (0, getServices_1.getServicesUseCase)(serviceRepository_1.serviceRepository);
        res.status(200).json(services);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error getting services", error });
        return;
    }
});
exports.getAllServices = getAllServices;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield (0, getServiceById_1.getServiceByIdUseCase)(req.params.id, serviceRepository_1.serviceRepository);
        if (!service) {
            res.status(404).json({ message: "Service not found" });
            return;
        }
        res.status(200).json(service);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error getting service", error });
        return;
    }
});
exports.getServiceById = getServiceById;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = yield (0, createService_1.createServiceUseCase)(req.body, serviceRepository_1.serviceRepository);
        res
            .status(201)
            .json({ id: serviceId, message: "Service successfully created" });
        return;
    }
    catch (error) {
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, updateService_1.updateServiceUseCase)(req.params.id, req.body, serviceRepository_1.serviceRepository);
        res.status(200).json({ message: "Service successfully updated" });
        return;
    }
    catch (error) {
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deleteService_1.deleteServiceUseCase)(req.params.id, serviceRepository_1.serviceRepository);
        res.status(200).json({ message: "Service successfully deleted" });
        return;
    }
    catch (error) {
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.deleteService = deleteService;
