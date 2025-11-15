'use server'

import { coursesService } from '@/lib/courses'
import { revalidatePath } from 'next/cache'

export async function saveCourse(data: {
  id?: string
  name: string
  description: string
  active: boolean
}) {
  if (data.id) {
    coursesService.update(data.id, {
      name: data.name,
      description: data.description,
      active: data.active,
    })
  } else {
    coursesService.create({
      name: data.name,
      description: data.description,
      active: data.active,
    })
  }

  revalidatePath('/cursos')
  revalidatePath(`/cursos/${data.id}`)
}

export async function deleteCourse(id: string) {
  coursesService.delete(id)
  revalidatePath('/cursos')
}
