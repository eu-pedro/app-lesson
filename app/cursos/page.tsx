'use client'

import Link from 'next/link'
import { coursesService, lessonsService } from '@/lib/courses'
import { Plus, Edit, Eye } from 'lucide-react'
import { CreateCourseModal } from '@/components/create-course-modal'
import { useState } from 'react'

export default function CoursesPage() {
  const courses = coursesService.getAll()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Cursos
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Criar Curso
          </button>
        </div>

        {/* Courses List */}
        <div className="space-y-3">
          {courses.map((course) => {
            const lessonCount = lessonsService.getByCourseId(course.id).length
            
            return (
              <div
                key={course.id}
                className="group rounded-lg bg-card p-6 shadow-sm ring-1 ring-border/50 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="text-xl font-medium text-card-foreground">
                        {course.name}
                      </h2>
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
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {lessonCount} {lessonCount === 1 ? 'aula' : 'aulas'}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/cursos/${course.id}/editar`}
                      className="rounded-lg bg-secondary p-2 text-secondary-foreground transition-colors hover:bg-secondary/80"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/cursos/${course.id}/aulas`}
                      className="rounded-lg bg-secondary p-2 text-secondary-foreground transition-colors hover:bg-secondary/80"
                      title="Ver Aulas"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          {courses.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                Nenhum curso cadastrado ainda
              </p>
            </div>
          )}
        </div>
      </div>

      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
