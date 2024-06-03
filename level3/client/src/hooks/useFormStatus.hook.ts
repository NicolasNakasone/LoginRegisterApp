import { useState } from 'react'

export const useFormStatus = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  return { isLoading, setIsLoading, error, setError }
}
