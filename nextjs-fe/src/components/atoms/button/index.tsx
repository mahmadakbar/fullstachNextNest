import React from 'react'

export default function Button({
  disabled = false,
  color = 'bg-main',
  title,
  ...props
}: Readonly<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>) {
  return (
    <button
      disabled={disabled}
      className={`flex-1 ${color} px-7 py-2 rounded-xl text-white ${disabled ? 'opacity-50' : ''}`}
      {...props}
    >
      <p>{title}</p>
    </button>
  )
}
