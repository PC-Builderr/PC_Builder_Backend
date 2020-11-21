import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProductCard } from './components/ProductCard'
import { useFetch } from './hooks/useFetch'
import { Product } from './interfaces/product.interface'

interface Props {}

export const App: React.FC<Props> = () => {
    const [data, loading, error, fetchData] = useFetch()

    useEffect(() => {
        fetchData(`product`)
    }, [fetchData])

    useEffect(() => {
        console.log(`Data: ${data} --- Loading: ${loading} --- Error: ${error}`)
    }, [data, loading, error])

    return (
        <Switch>
            <Route path='/1' exact>
                <div>
                    {loading ? (
                        <h1>LOADING...</h1>
                    ) : (
                        error ||
                        data?.products.map((p: Product) => {
                            return <ProductCard key={p.id} product={p} />
                        })
                    )}
                </div>
            </Route>
        </Switch>
    )
}
