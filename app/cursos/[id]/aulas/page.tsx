import Link from 'next/link'
import { coursesService, lessonsService } from '@/lib/courses'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { DeleteLessonButton } from '@/components/delete-lesson-button'
import { CreateLessonModal } from '@/components/create-lesson-modal'
import { EditLessonModal } from '@/components/edit-lesson-modal'

export default async function CourseLessonsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = coursesService.getById(id)

  if (!course) {
    notFound()
  }

  const lessons = lessonsService.getByCourseId(id)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Back Button */}
        <Link
          href="/cursos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Cursos
        </Link>

        {/* Course Info */}
        <div className="mb-8 rounded-lg bg-card p-6 ring-1 ring-border/50">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-card-foreground">
              {course.name}
            </h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                course.active
                  ? 'bg-accent/20 text-accent'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {course.active ? 'Ativo' : 'Inativo'}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Aulas</h2>
          <CreateLessonModal courseId={id} courseName={course.name} />
        </div>

        {/* Lessons List */}
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between rounded-lg bg-card p-5 ring-1 ring-border/50 transition-all hover:shadow-sm"
            >
              <div className="flex-1">
                <h3 className="font-medium text-card-foreground">
                  {lesson.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lesson.duration} minutos
                </p>
              </div>

              <div className="flex gap-2">
                <EditLessonModal
                  courseId={id}
                  courseName={course.name}
                  lesson={lesson}
                />
                <DeleteLessonButton lessonId={lesson.id} courseId={id} />
              </div>
            </div>
          ))}

          {lessons.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                Nenhuma aula cadastrada ainda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
