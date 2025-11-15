'use client'

import { useState } from 'react'
import { Edit, X } from 'lucide-react'
import { saveLesson } from '@/app/actions/lessons'
import { useRouter } from 'next/navigation'
import { Lesson } from '@/lib/courses'

interface EditLessonModalProps {
  courseId: string
  courseName: string
  lesson: Lesson
}

export function EditLessonModal({ courseId, courseName, lesson }: EditLessonModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(lesson.title)
  const [duration, setDuration] = useState(lesson.duration)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveLesson({
        id: lesson.id,
        courseId,
        title,
        duration,
      })
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-secondary p-2 text-secondary-foreground transition-colors hover:bg-secondary/80"
        title="Editar"
      >
        <Edit className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
            <div className="rounded-xl bg-card p-6 shadow-2xl ring-1 ring-border/50">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-card-foreground">
                  Editar Aula
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Course Name (Disabled) */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Curso
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    disabled
                    className="w-full rounded-lg border-0 bg-muted px-4 py-3 text-muted-foreground ring-1 ring-border"
                  />
                </div>

                {/* Title Field */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Título da Aula
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ex: Introdução aos Hooks"
                  />
                </div>

                {/* Duration Field */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                    min="1"
                    className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="30"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
                  >
                    {loading ? 'Salvando...' : 'Atualizar Aula'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
