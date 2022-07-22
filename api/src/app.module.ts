import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.register()
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AppModule {
}
