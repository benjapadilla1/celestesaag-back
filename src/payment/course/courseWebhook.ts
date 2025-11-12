import { courseRepository } from "../../repositories/courseRepository";
import { getCourseByIdUseCase } from "../../useCases/courses/getCourseById";
import { updateCourseUseCase } from "../../useCases/courses/updateCourse";

export const courseWebhook = async (paymentInfo: any) => {
  const { user_id: userId, course_id: courseId } = paymentInfo.metadata;

  const course = await getCourseByIdUseCase(courseId, courseRepository);
  if (!course) {
    console.error("Curso no encontrado:", courseId);
    return;
  }

  const updatedBoughtByUserIds = Array.isArray(course.boughtByUserIds)
    ? [...new Set([...course.boughtByUserIds, userId])]
    : [userId];

  await updateCourseUseCase(courseId, { boughtByUserIds: updatedBoughtByUserIds }, courseRepository);
  console.log(`Curso ${courseId} actualizado con el usuario ${userId}`);
};
