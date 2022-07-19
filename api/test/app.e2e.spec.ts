import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { Response } from 'supertest'
import { AppModule } from '../src/app.module'
import { TestDBService } from '../src/testDB.service'
import { PropertyResponse } from '../src/app.controller'

describe('AppController', () => {
  let app: INestApplication
  let testDBService: TestDBService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestDBService]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    testDBService = app.get<TestDBService>(TestDBService)
    await testDBService.clearProperties()
    await testDBService.insertProperty({
      address: '90 Blues Point Rd',
      comment: 'Beautiful view'
    })
    await testDBService.insertProperty({
      address: '5 Kerr Close',
      comment: 'Geckos in the garage'
    })
  })

  it('searches properties', () => {
    const blues = '90 Blues Point Rd'
    const kerr = '5 Kerr Close'

    return request(app.getHttpServer())
      .get('/api/properties?q=Blues')
      .expect(200)
      .expect((response: Response) => {
        const returnedPropertyAddresses = (response.body as PropertyResponse).properties.map(prop => prop.address)

        expect(returnedPropertyAddresses.includes(blues)).toEqual(true)
        expect(returnedPropertyAddresses.includes(kerr)).toEqual(false)
      })
  })
})
