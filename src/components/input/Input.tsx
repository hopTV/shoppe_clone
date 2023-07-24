import React, { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
}

const Input = ({
  type,
  errorMessage,
  className,
  name,
  placeholder,
  rules,
  autoComplete,
  register,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: Props) => {
  const registeResult = register && name ? register(name, rules) : null

  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registeResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
