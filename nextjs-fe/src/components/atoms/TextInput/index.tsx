import IcoPlus from '@assets/icons/IconPlus'
import React from 'react'

type joinProps = HTMLInputElement & HTMLTextAreaElement
interface InputText extends React.InputHTMLAttributes<joinProps> {
  tittle: string
  className?: string
  type?: string
  placeholder?: string
  error?: string
  rows?: number
}

const TextInput = React.forwardRef<joinProps, InputText>(
  ({ className, tittle, type, placeholder, error, rows, ...props }, ref) => (
    <div className={`flex flex-col flex-1 ${className}`}>
      {type !== 'checkbox' && <p className="text-sm">{tittle}</p>}
      {type === 'file' && (
        <label
          htmlFor={type}
          className="flex cursor-pointer justify-center items-center border border-[#C2C2C2] rounded-md p-2 w-full h-full bg-white"
        >
          <IcoPlus className="w-6 h-6" />
        </label>
      )}

      <div className="flex flex-row items-center mt-2">
        {type === 'textArea' ? (
          <textarea
            ref={ref}
            id={type}
            rows={rows}
            placeholder={placeholder}
            className="text-sm rounded-md p-2 border border-[#C2C2C2] w-full"
            {...props}
          />
        ) : (
          <input
            id={type}
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`text-sm rounded-md p-2 border border-[#C2C2C2] ${type === 'checkbox' ? '' : 'w-full'} ${
              type === 'file' ? 'hidden' : ''
            }`}
            {...props}
          />
        )}
        {type === 'checkbox' && <p className="text-sm ml-3">{tittle}</p>}
      </div>

      <span className="text-sm text-red-500">{error}</span>
    </div>
  )
)

TextInput.displayName = 'TextInput'
export default TextInput
