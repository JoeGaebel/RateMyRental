import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { Response } from 'supertest'
import { AppModule } from '../src/app.module'
import { TestDBService } from '../src/testDB.service'
import { PropertyResponse } from '../src/app.controller'
import { BLUES_POINT, KERR_CLOSE } from 'db/TestDBUtility'

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
    await testDBService.ensureFixtures()
  })

  it('searches properties', () => {
    return request(app.getHttpServer())
      .get('/api/properties?q=90 Blues Point')
      .expect(200)
      .expect((response: Response) => {
        const returnedPropertyAddresses = (response.body as PropertyResponse).properties.map(prop => prop.address)

        expect(returnedPropertyAddresses.includes(BLUES_POINT.address)).toEqual(true)
        expect(returnedPropertyAddresses.includes(KERR_CLOSE.address)).toEqual(false)
      })
  })
})
