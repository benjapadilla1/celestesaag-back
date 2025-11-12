import { CourseRepository } from "../../repositories/courseRepository";

export const deleteCourseUseCase = async (id: string, repository: CourseRepository) => {
  return await repository.deleteCourse(id);
};
