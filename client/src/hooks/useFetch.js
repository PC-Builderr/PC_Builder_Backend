import { useCallback, useState } from 'react'

export const useFetch = () => {
    const [state, setState] = useState({ data: null, loading: true, error: null })

    const fetchData = useCallback(
        (resource, options = { method: 'GET', headers: null, body: null }) => {
            let response
            setState(currentState => {
                return {
                    data: currentState.data,
                    loading: true,
                    error: null
                }
            })
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
                    setState({ data: resData, loading: false, error: null })
                })
                .catch(error => setState({ data: null, loading: false, error: error.message }))
        },
        []
    )

    return [state.data, state.loading, state.error, fetchData]
}
