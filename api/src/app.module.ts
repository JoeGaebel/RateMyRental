import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PropertyService } from './property.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.register()
  ],
  controllers: [AppController],
  providers: [PropertyService],
})
export class AppModule {
}
