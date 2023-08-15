import { useState } from 'react'
import InputNumber from '../inputNumber'
import { InputNumberProps } from '../inputNumber/InputNumber'

interface Props extends InputNumberProps {
  max: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (Value: number) => void
  classNameWrapper?: string
}

const QuantityController = ({
  max,
  value,
  onFocusOut,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-10',
  ...rest
}: Props) => {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleDecrease = () => {
    let _value = Number(value || localValue) - 1

    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)

    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.target.value))
  }

  const handleIncrease = () => {
    let _value = Number(value || localValue) + 1

    if (max !== undefined && _value > max) {
      _value = max
    }

    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={`${classNameWrapper} flex items-center`}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-md border border-gray-300
      text-gray-600
      '
        onClick={handleDecrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button
        className='border0gray-300 flex h-8 w-8 items-center justify-center rounded-r-md border'
        onClick={handleIncrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
    </div>
  )
}

export default QuantityController
