import { CourseForm } from '@/components/course-form'

export default function CreateCoursePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-foreground">
          Criar Curso
        </h1>
        <CourseForm />
      </div>
    </div>
  )
}
