import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const expectedResponse = {
        properties: [
          {
            address: 'Unit 2 20 Rae Street',
            comment: 'Strata ignored a serious gas leak',
          },
        ],
      }
      expect(appController.getHello()).toEqual(expectedResponse)
    })
  })
})
