import React, { useState } from 'react'
import { ProductList } from './ProductList'

export const Home = () => {

    // Set user
    const [user, setUser] = useState('user')

    // Set user authatication
    const [isUserAuth, setUserAuth] = useState(false)
  return (
    <div>
      <ProductList/>
    </div>
  )
}
