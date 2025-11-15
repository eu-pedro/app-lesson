import Link from 'next/link'
import { coursesService, lessonsService } from '@/lib/courses'
import { ArrowLeft, Edit } from 'lucide-react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const courses = coursesService.getAll()
  return courses.map((course) => ({
    id: course.id,
  }))
}

export const dynamic = 'force-dynamic'

export default async function CourseDetailPage({
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

        {/* Course Card */}
        <div className="mb-8 rounded-lg bg-card p-8 ring-1 ring-border/50">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <h1 className="text-4xl font-semibold tracking-tight text-card-foreground">
                  {course.name}
                </h1>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    course.active
                      ? 'bg-accent/20 text-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {course.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <p className="text-base text-muted-foreground">
                {course.description}
              </p>
            </div>

            <Link
              href={`/cursos/${id}/editar`}
              className="rounded-lg bg-secondary p-2.5 text-secondary-foreground transition-colors hover:bg-secondary/80"
              title="Editar Curso"
            >
              <Edit className="h-5 w-5" />
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            {lessons.length} {lessons.length === 1 ? 'aula' : 'aulas'}
          </div>
        </div>

        {/* Lessons Section */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Aulas do Curso
          </h2>

          {lessons.length > 0 ? (
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-4 rounded-lg bg-card p-5 ring-1 ring-border/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">
                      {lesson.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {lesson.duration} minutos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-card py-16 text-center ring-1 ring-border/50">
              <p className="text-muted-foreground">
                Nenhuma aula cadastrada ainda
              </p>
              <Link
                href={`/cursos/${id}/aulas`}
                className="mt-4 inline-block text-sm text-primary hover:underline"
              >
                Adicionar aulas
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
