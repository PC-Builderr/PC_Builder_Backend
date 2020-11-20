import { useEffect, useState } from 'react'

export const useFetch = (resource, options = { method: 'GET', headers: null, body: null }) => {
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    useEffect(() => {
        let response
        setloading(true)
        fetch(`http://localhost:4000/api/${resource}`, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: options.body
        })
            .then(res => {
                response = res
                return res.json()
            })
            .then(resData => {
                if (!response.ok) throw new Error(resData.message)
                setData(resData)
            })
            .catch(error => setError(error))
            .finally(() => {
                setloading(false)
            })
    }, [resource, options.headers, options.method, options.body])

    return [data, loading, error]
}
