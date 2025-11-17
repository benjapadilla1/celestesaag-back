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
exports.courseRepository = exports.CourseRepository = void 0;
const firebase_config_1 = require("../config/firebase.config");
const coursesCollection = firebase_config_1.db.collection("courses");
class CourseRepository {
    getAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield coursesCollection.get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield coursesCollection.doc(id).get();
            return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
        });
    }
    createCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRef = yield coursesCollection.add(Object.assign(Object.assign({}, course), { createdAt: new Date() }));
            return courseRef.id;
        });
    }
    updateCourse(id, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRef = coursesCollection.doc(id);
            const courseDoc = yield courseRef.get();
            if (!courseDoc.exists) {
                throw new Error("Course does not exist");
            }
            yield courseRef.update(Object.assign(Object.assign({}, courseData), { updatedAt: new Date() }));
        });
    }
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRef = coursesCollection.doc(id);
            const courseDoc = yield courseRef.get();
            if (!courseDoc.exists) {
                throw new Error("Course does not exist");
            }
            yield courseRef.delete();
        });
    }
}
exports.CourseRepository = CourseRepository;
exports.courseRepository = new CourseRepository();
