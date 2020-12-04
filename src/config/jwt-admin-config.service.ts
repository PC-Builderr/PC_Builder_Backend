import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

export class JwtAdminConfigService implements JwtOptionsFactory {
    createJwtOptions(): JwtModuleOptions {
        return {
            secret: process.env.JWT_ADMIN,
            signOptions: {
                expiresIn: '1h'
            }
        }
    }
}
