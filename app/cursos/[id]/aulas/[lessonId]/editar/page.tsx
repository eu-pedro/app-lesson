import { coursesService, lessonsService } from '@/lib/courses'
import { LessonForm } from '@/components/lesson-form'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>
}) {
  const { id, lessonId } = await params
  const course = coursesService.getById(id)
  const lesson = lessonsService.getById(lessonId)

  if (!course || !lesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href={`/cursos/${id}/aulas`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Aulas
        </Link>

        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-foreground">
          Editar Aula
        </h1>
        <LessonForm
          courseId={id}
          courseName={course.name}
          lesson={lesson}
        />
      </div>
    </div>
  )
}
