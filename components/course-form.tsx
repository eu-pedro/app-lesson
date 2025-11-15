'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Course } from '@/lib/courses'
import { saveCourse } from '@/app/actions/courses'
import Link from 'next/link'

interface CourseFormProps {
  course?: Course
}

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter()
  const [name, setName] = useState(course?.name || '')
  const [description, setDescription] = useState(course?.description || '')
  const [active, setActive] = useState(course?.active ?? true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveCourse({ id: course?.id, name, description, active })
      router.push('/cursos')
      router.refresh()
    } catch (error) {
      console.error('Error saving course:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6 rounded-lg bg-card p-8 ring-1 ring-border/50">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-card-foreground"
          >
            Nome do Curso
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ex: Fundamentos de React"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-card-foreground"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Descreva o conteúdo do curso"
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="active"
              className="block text-sm font-medium text-card-foreground"
            >
              Status do Curso
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              {active ? 'Curso ativo e visível' : 'Curso inativo'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={() => setActive(!active)}
            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
              active ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 translate-y-1 rounded-full bg-white shadow-sm ring-0 transition-transform ${
                active ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
        >
          {loading ? 'Salvando...' : course ? 'Atualizar Curso' : 'Criar Curso'}
        </button>
        <Link
          href="/cursos"
          className="rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
