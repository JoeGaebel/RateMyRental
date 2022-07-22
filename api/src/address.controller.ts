import { Controller, Get, Query } from '@nestjs/common'
import { AddressService } from './address.service'

export interface AddressRecord {
  id: number
  address: string;
}

export interface PropertyResponse {
  addresses: AddressRecord[];
}

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/api/address')
  async getAddresses(@Query('q') addressQuery: string): Promise<PropertyResponse> {
    const addresses = await this.addressService.searchByAddress(addressQuery)
    return {addresses}
  }
}
