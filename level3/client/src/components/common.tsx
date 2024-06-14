import { ChangeEvent, memo, useState } from 'react'

import { Link } from 'react-router-dom'

interface PasswordInputProps {
  hasRePassword?: boolean
}

type IsPatternValid = {
  [key: string]: {
    pattern: RegExp
    displayText: string
  }
}

const minLengthPattern = /^.{8,}$/
const lowerCasePattern = /^(?=.*[a-z]).*$/
const upperCasePattern = /^(?=.*[A-Z]).*$/
const numberPattern = /^(?=.*\d).*$/
const specialCharPattern = /^(?=.*[@$!%*?&]).*$/

const isPatternValid: IsPatternValid = {
  minLengthPattern: {
    pattern: minLengthPattern,
    displayText: '❌ Debe incluir al menos 8 caracteres',
  },
  lowerCasePattern: {
    pattern: lowerCasePattern,
    displayText: '❌ Debe incluir al menos una minúscula',
  },
  upperCasePattern: {
    pattern: upperCasePattern,
    displayText: '❌ Debe incluir al menos una mayúscula',
  },
  numberPattern: {
    pattern: numberPattern,
    displayText: '❌ Debe incluir al menos un número',
  },
  specialCharPattern: {
    pattern: specialCharPattern,
    displayText: '❌ Debe incluir al menos un símbolo (ej: !@#)',
  },
}

const toggleDisplayedEmoji = (text: string, isValid: boolean) => {
  const fromEmoji = isValid ? '❌' : '✅'
  const toEmoji = isValid ? '✅' : '❌'
  return text.replace(fromEmoji, toEmoji)
}

export const PasswordInput = memo(({ hasRePassword }: PasswordInputProps): JSX.Element => {
  const [passwordConstraints, setPasswordConstraints] = useState(isPatternValid)

  const [isPassword, setIsPassword] = useState(true)

  const handleChange = ({ target: { value: passwordValue } }: ChangeEvent<HTMLInputElement>) => {
    if (!passwordValue) return setPasswordConstraints(isPatternValid)

    setPasswordConstraints(prevConstraints => {
      const mappedConstraints = structuredClone(prevConstraints)

      Object.keys(mappedConstraints).forEach(patternKey => {
        const currentPattern = mappedConstraints[patternKey]
        const isValidPattern = currentPattern.pattern.test(passwordValue)

        mappedConstraints[patternKey] = {
          ...currentPattern,
          displayText: toggleDisplayedEmoji(currentPattern.displayText, isValidPattern),
        }
      })
      return mappedConstraints
    })
  }

  const togglePassword = () => {
    setIsPassword(prevPassword => !prevPassword)
  }

  return (
    <>
      <input
        name="password"
        type={isPassword ? 'password' : 'text'}
        placeholder="Contraseña"
        onChange={handleChange}
      />
      {hasRePassword && (
        <input
          name="re_password"
          type={isPassword ? 'password' : 'text'}
          placeholder="Repetir contraseña"
        />
      )}
      <button type="button" onClick={togglePassword}>
        {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
      </button>
      <ul>
        {Object.keys(passwordConstraints).map(key => {
          return <li key={key}>{passwordConstraints[key].displayText}</li>
        })}
      </ul>
    </>
  )
})

interface MemoizedLinkProps {
  title: string
  route: string
}

export const MemoizedLink = memo(({ route, title }: MemoizedLinkProps): JSX.Element => {
  return <Link to={route}>{title}</Link>
})
