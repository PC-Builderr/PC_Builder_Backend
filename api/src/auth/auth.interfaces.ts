export interface RegisterResponse {
    authToken: string
}

export interface LoginResponse {
    authToken: string
    adminToken: string | null
}

export interface JwtPayload {
    email: string
}
