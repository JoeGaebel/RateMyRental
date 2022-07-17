import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

interface Property {
  address: string;
  comment: string;
}

interface PropertyResponse {
  properties: Property[];
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/properties')
  getHello(): PropertyResponse {
    return {
      properties: [
        {
          address: 'Unit 2 20 Rae Street',
          comment: 'Strata ignored a serious gas leak',
        },
      ],
    }
  }
}
