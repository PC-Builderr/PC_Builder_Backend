import React from 'react'
import { ProductCard } from './components/ProductCard'

export const App = props => {
    const product = {
        image: 'https://desktop.bg/system/images/226619/normal/amd_ryzen_7_3800x.png',
        name: 'AMD RYZEN 7 3800X',
        price: 799,
        brand: 'AMD',
        id: 2
    }
    const product2 = {
        image: 'https://desktop.bg/system/images/239171/normal/amd_ryzen_9_3950x.jpg',
        name: 'MSI GeForcee GTX 1650 SUPER',
        price: 1649,
        brand: 'MSI',
        id: 1
    }

    return (
        <>
            <ProductCard product={product} />
            <ProductCard product={product2} />
        </>
    )
}
