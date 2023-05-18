import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { Input as InputUi } from '@material-tailwind/react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  labelText?: string
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
  labelText,
  classNameError = 'text-red-600 mt-1 text-sm'
}: Props) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <InputUi
        size='md'
        id={name}
        type={type}
        {...registerResult}
        placeholder={placeholder}
        value={value}
        autoComplete=''
        name={name}
        label={labelText}
        color='blue-gray'
        variant='outlined'
      ></InputUi>

      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
