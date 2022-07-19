import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { PropertyService } from './property.service'

describe('AppController', () => {
  let appController: AppController
  let propertyService: PropertyService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: PropertyService,
        useFactory: () => ({getProperties: jest.fn()})
      }],
    }).compile()

    appController = app.get<AppController>(AppController)
    propertyService = app.get<PropertyService>(PropertyService)
  })

  describe('root', () => {
    beforeEach(() => {
      (propertyService.getProperties as jest.Mock).mockResolvedValue([{
        id: 1,
        address: 'Unit 2 20 Rae Street',
        comment: 'Strata ignored a serious gas leak',
      }])
    })

    it('should return the properties', async () => {
      const expectedResponse = {
        properties: [
          {
            id: 1,
            address: 'Unit 2 20 Rae Street',
            comment: 'Strata ignored a serious gas leak',
          },
        ],
      }

      const result = await appController.getProperties('Blues')
      expect(result).toEqual(expectedResponse)
    })
  })
})
