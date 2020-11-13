export interface RegisterResponse {
    authToken: string
}

export interface LoginResponse {
    authToken: string
    adminToken?: string
}
