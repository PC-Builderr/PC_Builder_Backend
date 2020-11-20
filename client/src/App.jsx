import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProductCard } from './components/ProductCard'
import { useFetch } from './hooks/useFetch'

export const App = props => {
    const [value, setValue] = useState('')
    const [data, loading, error, fetchData] = useFetch()

    useEffect(() => {
        fetchData(`product?filters=${value}`, { method: 'GET' })
    }, [value, fetchData])

    useEffect(() => {
        console.log(`Data: ${data} --- Loading: ${loading} --- Error: ${error}`)
    }, [data, loading, error])

    return (
        <Switch>
            <Route path='/1' exact>
                <div>
                    <input type='text' value={value} onChange={e => setValue(e.target.value)} />
                    {loading ? (
                        <h1>LOADING...</h1>
                    ) : (
                        error ||
                        data?.products.map(p => {
                            return <ProductCard key={p.id} product={p} />
                        })
                    )}
                </div>
            </Route>
        </Switch>
    )
}
