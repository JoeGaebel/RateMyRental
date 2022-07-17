import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    const expectedResponse = {
      properties: [
        {
          address: 'Unit 2 20 Rae Street',
          comment: 'Strata ignored a serious gas leak',
        },
      ],
    }

    return request(app.getHttpServer())
      .get('/api/properties')
      .expect(200)
      .expect(expectedResponse)
  })
})
