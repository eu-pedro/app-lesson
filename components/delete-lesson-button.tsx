'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteLesson } from '@/app/actions/lessons'
import { useState } from 'react'

interface DeleteLessonButtonProps {
  lessonId: string
  courseId: string
}

export function DeleteLessonButton({ lessonId, courseId }: DeleteLessonButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta aula?')) {
      return
    }

    setLoading(true)
    try {
      await deleteLesson(lessonId)
      router.refresh()
    } catch (error) {
      console.error('Error deleting lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg bg-destructive/10 p-2 text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50"
      title="Excluir"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
