'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lesson } from '@/lib/courses'
import { saveLesson } from '@/app/actions/lessons'
import Link from 'next/link'

interface LessonFormProps {
  courseId: string
  courseName: string
  lesson?: Lesson
}

export function LessonForm({ courseId, courseName, lesson }: LessonFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(lesson?.title || '')
  const [duration, setDuration] = useState(lesson?.duration || 30)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveLesson({
        id: lesson?.id,
        courseId,
        title,
        duration,
      })
      router.push(`/cursos/${courseId}/aulas`)
      router.refresh()
    } catch (error) {
      console.error('Error saving lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6 rounded-lg bg-card p-8 ring-1 ring-border/50">
        {/* Course Name (Disabled) */}
        <div>
          <label
            htmlFor="course"
            className="mb-2 block text-sm font-medium text-card-foreground"
          >
            Curso
          </label>
          <input
            type="text"
            id="course"
            value={courseName}
            disabled
            className="w-full rounded-lg border-0 bg-muted px-4 py-3 text-muted-foreground ring-1 ring-border"
          />
        </div>

        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-card-foreground"
          >
            Título da Aula
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ex: Introdução aos Hooks"
          />
        </div>

        {/* Duration Field */}
        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-medium text-card-foreground"
          >
            Duração (minutos)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            min="1"
            className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="30"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
        >
          {loading ? 'Salvando...' : lesson ? 'Atualizar Aula' : 'Criar Aula'}
        </button>
        <Link
          href={`/cursos/${courseId}/aulas`}
          className="rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
