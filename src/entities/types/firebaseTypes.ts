export interface Turn {
  id: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  hour: string;
  userId: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string
}

export interface Service {
  id?: string;
  name: string;
  isDirectService: boolean;
  duration?: number;
  eyebrow?: string;
  description?: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CourseIntroduction {
  generalPresentation: string;    // Presentación general del curso
  courseObjectives: string;       // Objetivos del curso
}

export interface Module {
  title: string;
  content: string;
}

export interface Course {
  id?: string
  boughtByUserIds: string[]; // Array de cada usuario que compro el curso
  title: string;            // Título del curso
  description: string;      // Descripción general del curso
  targetAudience: string;   // Público objetivo del curso
  introduction: CourseIntroduction;  // Introducción al curso
  modules: Module[];        // Lista de módulos del curso
}