'use server'

import { lessonsService } from '@/lib/courses'
import { revalidatePath } from 'next/cache'

export async function saveLesson(data: {
  id?: string
  courseId: string
  title: string
  duration: number
}) {
  if (data.id) {
    lessonsService.update(data.id, {
      title: data.title,
      duration: data.duration,
    })
  } else {
    lessonsService.create({
      courseId: data.courseId,
      title: data.title,
      duration: data.duration,
    })
  }

  revalidatePath(`/cursos/${data.courseId}/aulas`)
  revalidatePath(`/cursos/${data.courseId}`)
}

export async function deleteLesson(id: string) {
  lessonsService.delete(id)
  revalidatePath('/cursos')
}
