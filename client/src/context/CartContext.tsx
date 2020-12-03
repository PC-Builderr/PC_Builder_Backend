import React, { useEffect, useState } from 'react'
import { Product } from '../interfaces/product.interface'

interface Context {
    products: Product[]
    modifyProducts: (product: Product) => void
}

export const CartContext = React.createContext<Context>({
    products: [],
    modifyProducts: (product: Product) => {}
})

interface Props {}

export const CartContextProvider: React.FC<Props> = props => {
    const [products, setProducts] = useState<Product[]>(() => {
        return JSON.parse(localStorage.getItem('products') || '[]')
    })

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products))
    }, [products])

    const modifyProducts = (product: Product) =>
        setProducts(oldProducts => {
            return oldProducts.find(p => p.id === product.id)
                ? oldProducts.filter(p => p.id !== product.id)
                : [...oldProducts, product]
        })
    return (
        <CartContext.Provider value={{ products, modifyProducts }}>
            {props.children}
        </CartContext.Provider>
    )
}
