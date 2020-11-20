import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProductCard } from './components/ProductCard'
import { useFetch } from './hooks/useFetch'

export const App = props => {
    const [value, setValue] = useState('')
    const [data, loading, error] = useFetch(value)
    return (
        <>
            <input type='text' value={value} onChange={e => setValue(e.target.value)} />
            <Switch>
                <Route path='/1' exact>
                    <div>
                        {loading ? (
                            <h1>LOADING...</h1>
                        ) : (
                            error.message ||
                            data?.products.map(p => {
                                return <ProductCard key={p.id} product={p} />
                            })
                        )}
                    </div>
                </Route>
            </Switch>
        </>
    )
}
