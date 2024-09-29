'use client'

import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="icon" disabled={pending}>
      <Send className="h-4 w-4" />
      <span className="sr-only">Send</span>
    </Button>
  )
}
