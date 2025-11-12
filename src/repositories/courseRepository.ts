import { Course } from "src/entities/types/firebaseTypes";
import { db } from "../config/firebase.config";

const coursesCollection = db.collection("courses");

export class CourseRepository {
  async getAllCourses(): Promise<Course[]> {
    const snapshot = await coursesCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
  }

  async getCourseById(id: string): Promise<Course | null> {
    const doc = await coursesCollection.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Course) : null;
  }

  async createCourse(course: Course): Promise<string> {
    const courseRef = await coursesCollection.add({
      ...course,
      createdAt: new Date(),
    });
    return courseRef.id;
  }

  async updateCourse(id: string, courseData: Partial<Course>): Promise<void> {
    const courseRef = coursesCollection.doc(id);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new Error("Course does not exist");
    }

    await courseRef.update({ ...courseData, updatedAt: new Date() });
  }

  async deleteCourse(id: string): Promise<void> {
    const courseRef = coursesCollection.doc(id);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new Error("Course does not exist");
    }

    await courseRef.delete();
  }
}

export const courseRepository = new CourseRepository();
