export interface JwtPayload {
    user: User
}
interface User {
    name: string
    email: string
}
