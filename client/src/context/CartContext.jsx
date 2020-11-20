import React, { useState } from 'react'

export const CartContext = React.createContext({
    products: [],
    modifyProducts: product => {}
})

export const CartContextProvider = props => {
    const [products, setProducts] = useState([])
    const modifyProducts = product =>
        setProducts(oldProducts => {
            return oldProducts.includes(product)
                ? oldProducts.filter(p => p.id !== product.id)
                : [...oldProducts, product]
        })

    return (
        <CartContext.Provider value={{ products, modifyProducts }}>
            {props.children}
        </CartContext.Provider>
    )
}
