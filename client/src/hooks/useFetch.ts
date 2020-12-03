import { useCallback, useEffect, useReducer, useRef } from 'react'

interface State {
    data: any
    loading: boolean
    error: string | null
}

interface RequestOptions {
    method: string
    headers: Record<string, string> | null
    body: string | null
}

const LOADING: 'LOADING' = 'LOADING'
const ERROR: 'ERROR' = 'ERROR'
const DATA: 'DATA' = 'DATA'

type Actions =
    | { type: typeof LOADING }
    | { type: typeof ERROR; payload: string }
    | { type: typeof DATA; payload: Object }

const defaultOptions = { method: 'GET', headers: null, body: null }

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case LOADING:
            return { data: null, loading: true, error: null }
        case ERROR:
            return { data: null, loading: false, error: action.payload }
        case DATA:
            return { data: action.payload, loading: false, error: null }
        default:
            return state
    }
}

export const useFetch = (): [
    data: any,
    loading: boolean,
    error: string | null,
    fetchData: (url: string, options?: RequestOptions) => void
] => {
    let isVisible = useRef(true)
    useEffect((): (() => void) => {
        return () => (isVisible.current = false)
    }, [])

    const [state, dispatch] = useReducer(reducer, { data: null, loading: true, error: null })

    const fetchData = useCallback(async (url: string, options: RequestOptions = defaultOptions) => {
        dispatch({ type: LOADING })
        try {
            const response = await fetch(url, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body
            })
            const resData = await response.json()
            console.log(resData)
            if (!isVisible.current) return
            if (!response.ok) throw new Error(resData.message)

            dispatch({ type: DATA, payload: resData })
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message })
        }
    }, [])
    return [state.data, state.loading, state.error, fetchData]
}
