export interface Course {
  id: string
  name: string
  description: string
  active: boolean
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  duration: number
}

// Mock data storage
let courses: Course[] = [
  {
    id: '1',
    name: 'Fundamentos de React',
    description: 'Aprenda os conceitos básicos do React e construa aplicações modernas',
    active: true
  },
  {
    id: '2',
    name: 'Next.js Avançado',
    description: 'Domine o framework Next.js com App Router e Server Components',
    active: true
  },
  {
    id: '3',
    name: 'TypeScript Essencial',
    description: 'TypeScript do básico ao avançado para desenvolvimento profissional',
    active: false
  }
]

let lessons: Lesson[] = [
  { id: '1', courseId: '1', title: 'Introdução ao React', duration: 30 },
  { id: '2', courseId: '1', title: 'Componentes e Props', duration: 45 },
  { id: '3', courseId: '1', title: 'Estado e Ciclo de Vida', duration: 60 },
  { id: '4', courseId: '2', title: 'App Router Overview', duration: 40 },
  { id: '5', courseId: '2', title: 'Server Components', duration: 50 },
]

export const coursesService = {
  getAll: () => courses,
  getById: (id: string) => courses.find(c => c.id === id),
  create: (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: Date.now().toString() }
    courses.push(newCourse)
    return newCourse
  },
  update: (id: string, course: Partial<Course>) => {
    const index = courses.findIndex(c => c.id === id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...course }
      return courses[index]
    }
    return null
  },
  delete: (id: string) => {
    courses = courses.filter(c => c.id !== id)
    lessons = lessons.filter(l => l.courseId !== id)
  }
}

export const lessonsService = {
  getAll: () => lessons,
  getByCourseId: (courseId: string) => lessons.filter(l => l.courseId === courseId),
  getById: (id: string) => lessons.find(l => l.id === id),
  create: (lesson: Omit<Lesson, 'id'>) => {
    const newLesson = { ...lesson, id: Date.now().toString() }
    lessons.push(newLesson)
    return newLesson
  },
  update: (id: string, lesson: Partial<Lesson>) => {
    const index = lessons.findIndex(l => l.id === id)
    if (index !== -1) {
      lessons[index] = { ...lessons[index], ...lesson }
      return lessons[index]
    }
    return null
  },
  delete: (id: string) => {
    lessons = lessons.filter(l => l.id !== id)
  }
}
