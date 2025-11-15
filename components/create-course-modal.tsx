'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveCourse } from '@/app/actions/courses'
import { X } from 'lucide-react'

interface CreateCourseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateCourseModal({ isOpen, onClose }: CreateCourseModalProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveCourse({ name, description, active })
      router.refresh()
      // Reset form and close modal
      setName('')
      setDescription('')
      setActive(true)
      onClose()
    } catch (error) {
      console.error('Error saving course:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg rounded-2xl bg-card shadow-2xl ring-1 ring-border/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
            <h2 className="text-xl font-semibold text-card-foreground">
              Criar Novo Curso
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="modal-name"
                  className="mb-2 block text-sm font-medium text-card-foreground"
                >
                  Nome do Curso
                </label>
                <input
                  type="text"
                  id="modal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Fundamentos de React"
                />
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="modal-description"
                  className="mb-2 block text-sm font-medium text-card-foreground"
                >
                  Descrição
                </label>
                <textarea
                  id="modal-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full rounded-lg border-0 bg-input px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Descreva o conteúdo do curso"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                <div>
                  <label
                    htmlFor="modal-active"
                    className="block text-sm font-medium text-card-foreground"
                  >
                    Status do Curso
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {active ? 'Curso ativo e visível' : 'Curso inativo'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => setActive(!active)}
                  className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card ${
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
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
              >
                {loading ? 'Criando...' : 'Criar Curso'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
