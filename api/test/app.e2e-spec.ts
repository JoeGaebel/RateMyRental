import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { TestDBService } from '../src/testDB.service'

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
  })

  it('gets properties', () => {
    const expectedResponse = {
      properties: [
        {
          id: expect.any(Number),
          address: '90 Blues Point Rd',
          comment: 'Beautiful view',
        },
      ],
    }

    return request(app.getHttpServer())
      .get('/api/properties')
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toEqual(expectedResponse)
      })
  })
})
