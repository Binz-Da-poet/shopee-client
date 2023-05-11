import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
const Input = ({
  value,
  name,
  register,
  type,
  className,
  errorMessage,
  placeholder,
  rules,
  classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'text-red-600 mt-1 text-sm'
}: Props) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        {...registerResult}
        className={classNameInput}
        placeholder={placeholder}
        value={value}
        autoComplete=''
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
