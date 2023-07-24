import React, { useState, useRef, useId, type ElementType } from 'react'
import {
  useFloating,
  FloatingPortal,
  arrow,
  shift,
  offset,
  type Placement
} from '@floating-ui/react-dom-interactions'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  placement?: Placement
  as?: ElementType
  initialOpen?: boolean
}

const Popover = ({
  children,
  renderPopover,
  className,
  placement = 'bottom-end',
  as: Element = 'div',
  initialOpen
}: Props) => {
  const [open, setOpen] = useState(initialOpen || false)

  const arrowRef = useRef<HTMLElement>(null)

  const id = useId()

  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopoever = () => {
    setOpen(false)
  }
  return (
    <Element
      className={className}
      ref={reference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopoever}
    >
      {children}
      <FloatingPortal id={id}>
        {open && (
          <motion.div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              transformOrigin: `${middlewareData.arrow?.x}px top`
            }}
            initial={{ opacity: 0, transform: 'scale(0)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0)' }}
            transition={{ duration: 0.2 }}
          >
            <span
              ref={arrowRef}
              className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
              style={{
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y
              }}
            ></span>
            {renderPopover}
          </motion.div>
        )}
      </FloatingPortal>
    </Element>
  )
}

export default Popover
