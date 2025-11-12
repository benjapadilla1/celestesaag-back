import { CourseRepository } from "../../repositories/courseRepository";

export const getCourseByIdUseCase = async (id: string, repository: CourseRepository) => {
  return await repository.getCourseById(id);
};
