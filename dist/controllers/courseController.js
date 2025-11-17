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
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
const courseRepository_1 = require("../repositories/courseRepository");
const createCourse_1 = require("../useCases/courses/createCourse");
const deleteCourse_1 = require("../useCases/courses/deleteCourse");
const getCourseById_1 = require("../useCases/courses/getCourseById");
const getCourses_1 = require("../useCases/courses/getCourses");
const updateCourse_1 = require("../useCases/courses/updateCourse");
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📚 Getting all courses...");
        const courses = yield (0, getCourses_1.getCoursesUseCase)(courseRepository_1.courseRepository);
        console.log(`📚 Found ${courses.length} courses`);
        res.status(200).json(courses);
        return;
    }
    catch (error) {
        console.error("❌ Error getting courses:", error);
        res.status(500).json({ message: "Error getting courses", error: error instanceof Error ? error.message : String(error) });
        return;
    }
});
exports.getAllCourses = getAllCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield (0, getCourseById_1.getCourseByIdUseCase)(req.params.id, courseRepository_1.courseRepository);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json(course);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error getting course", error });
        return;
    }
});
exports.getCourseById = getCourseById;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = yield (0, createCourse_1.createCourseUseCase)(req.body, courseRepository_1.courseRepository);
        res
            .status(201)
            .json({ id: serviceId, message: "Course successfully created" });
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
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, updateCourse_1.updateCourseUseCase)(req.params.id, req.body, courseRepository_1.courseRepository);
        res.status(200).json({ message: "Course successfully updated" });
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
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deleteCourse_1.deleteCourseUseCase)(req.params.id, courseRepository_1.courseRepository);
        res.status(200).json({ message: "Course successfully deleted" });
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
exports.deleteCourse = deleteCourse;
