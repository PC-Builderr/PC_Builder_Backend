import React, { useEffect, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ProductCard } from './components/ProductCard'
import { useFetch } from './hooks/useFetch'
import { Product } from './interfaces/product.interface'
import { SignIn } from './pages/SignIn'

interface Props {}

export const App: React.FC<Props> = () => {
    const [data, loading, error, fetchData] = useFetch()

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URL}/product`)
    }, [fetchData])

    useEffect(() => {
        console.log(`Data: ${data} --- Loading: ${loading} --- Error: ${error}`)
    }, [data, loading, error])

    const products = data?.products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
    ))

    return (
        <Switch>
            <Route path='/' exact>
                <Suspense fallback={'Loading...'}>
                    {error ? <Redirect to='/error' /> : products}
                </Suspense>
            </Route>
            <Route path='/sign-in' exact>
                <SignIn />
            </Route>
        </Switch>
    )
}
