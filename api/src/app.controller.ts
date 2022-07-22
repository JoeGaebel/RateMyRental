import { Controller, Get, Query } from '@nestjs/common'
import { PropertyService } from './property.service'

export interface Property {
  id: number
  address: string;
  comment: string;
}

export interface PropertyAttributes {
  address: string;
  comment: string;
}

export interface PropertyResponse {
  properties: Property[];
}

@Controller()
export class AppController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('/api/properties')
  async getProperties(@Query('q') addressQuery: string): Promise<PropertyResponse> {
    const properties = await this.propertyService.searchProperties(addressQuery)
    return {properties}
  }
}
