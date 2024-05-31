import { useState, ChangeEvent } from 'react'

interface FormValues {
  [key: string]: any
}

type UseFormProps<T> = T

export const useForm = <T extends FormValues>(initialValues: UseFormProps<T>) => {
  const [formValues, setFormValues] = useState<T>(initialValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return { formValues, handleChange, setFormValues }
}
