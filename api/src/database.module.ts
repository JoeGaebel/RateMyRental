import { DynamicModule, Module } from '@nestjs/common'
import { PostgresModule } from 'nest-postgres'

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const sharedConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: parseInt(process.env.DB_PORT),
    }

    if (process.env.NODE_ENV === 'test') {
      return PostgresModule.forRoot({
        ...sharedConfig,
        database: process.env.DB_TEST_NAME,
      })
    } else {
      return PostgresModule.forRoot({
        ...sharedConfig,
        database: process.env.DB_NAME,
      })
    }
  }
}
