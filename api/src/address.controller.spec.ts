import { Test, TestingModule } from '@nestjs/testing'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'

describe('AddressController', () => {
  let addressController: AddressController
  let addressService: AddressService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [{
        provide: AddressService,
        useFactory: () => ({searchByAddress: jest.fn()})
      }],
    }).compile()

    addressController = app.get<AddressController>(AddressController)
    addressService = app.get<AddressService>(AddressService)
  })

  describe('root', () => {
    beforeEach(() => {
      (addressService.searchByAddress as jest.Mock).mockResolvedValue([{
        id: 1,
        address: 'Unit 2 20 Rae Street'
      }])
    })

    it('should return the properties', async () => {
      const expectedResponse = {
        addresses: [
          {
            id: 1,
            address: 'Unit 2 20 Rae Street'
          },
        ],
      }

      const result = await addressController.getAddresses('Blues')
      expect(result).toEqual(expectedResponse)
    })
  })
})
