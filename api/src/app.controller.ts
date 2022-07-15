import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Property {
  address: string;
  comment: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/properties')
  getHello(): Property[] {
    return [
      {
        address: 'Unit 2 20 Rae Street',
        comment: 'Strata ignored a serious gas leak',
      },
    ];
  }
}
