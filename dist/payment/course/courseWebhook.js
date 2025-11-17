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
exports.courseWebhook = void 0;
const courseRepository_1 = require("../../repositories/courseRepository");
const getCourseById_1 = require("../../useCases/courses/getCourseById");
const updateCourse_1 = require("../../useCases/courses/updateCourse");
const courseWebhook = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id: userId, course_id: courseId } = paymentInfo.metadata;
    const course = yield (0, getCourseById_1.getCourseByIdUseCase)(courseId, courseRepository_1.courseRepository);
    if (!course) {
        console.error("Curso no encontrado:", courseId);
        return;
    }
    const updatedBoughtByUserIds = Array.isArray(course.boughtByUserIds)
        ? [...new Set([...course.boughtByUserIds, userId])]
        : [userId];
    yield (0, updateCourse_1.updateCourseUseCase)(courseId, { boughtByUserIds: updatedBoughtByUserIds }, courseRepository_1.courseRepository);
    console.log(`Curso ${courseId} actualizado con el usuario ${userId}`);
});
exports.courseWebhook = courseWebhook;
