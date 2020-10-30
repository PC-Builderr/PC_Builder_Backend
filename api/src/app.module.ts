import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConnectionService } from './database.service'
import { Connection } from 'typeorm'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConnectionService
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor(private connection: Connection) {}
}
