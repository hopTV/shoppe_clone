import React from 'react'
import CartHeader from 'src/components/cartHeader'
import Footer from 'src/components/footer'

interface Props {
  children: React.ReactNode
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}

export default CartLayout
