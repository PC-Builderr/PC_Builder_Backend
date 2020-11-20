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

interface Action {
    type: string
    payload?: any
}

const defaultOptions: RequestOptions = { method: 'GET', headers: null, body: null }

const LOADING = 'LOADING'
const ERROR = 'ERROR'
const DATA = 'DATA'

const reducer = (state: State, action: Action): State => {
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
    any,
    boolean,
    string | null,
    (resource: string, options?: RequestOptions) => void
] => {
    let isVisible = useRef<boolean>(true)
    useEffect((): (() => void) => {
        return (): boolean => (isVisible.current = false)
    }, [])

    const [state, dispatch] = useReducer(reducer, { data: null, loading: true, error: null })

    const fetchData = useCallback(
        async (resource: string, options: RequestOptions = defaultOptions) => {
            dispatch({ type: LOADING })
            try {
                const response: Response = await fetch(`http://localhost:4000/api/${resource}`, {
                    method: options.method,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    body: options.body
                })
                const resData: any = await response.json()
                console.log(resData)
                if (!isVisible.current) return
                if (!response.ok) throw new Error(resData.message)

                dispatch({ type: DATA, payload: resData })
            } catch (error) {
                dispatch({ type: ERROR, payload: error.message })
            }
        },
        []
    )
    return [state.data, state.loading, state.error, fetchData]
}
