import { coursesService } from '@/lib/courses'
import { CourseForm } from '@/components/course-form'
import { notFound } from 'next/navigation'

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = coursesService.getById(id)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-foreground">
          Editar Curso
        </h1>
        <CourseForm course={course} />
      </div>
    </div>
  )
}
