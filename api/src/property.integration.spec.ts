import { Test, TestingModule } from '@nestjs/testing'
import { PropertyService } from './property.service'
import { TestDBService } from './testDB.service'
import { DatabaseModule } from './database.module'
import { ConfigModule } from '@nestjs/config'
import { KERR_CLOSE } from 'db/TestDBUtility'

describe('Property Integration', () => {
  let propertyService: PropertyService
  let testDBService: TestDBService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule.register()],
      providers: [PropertyService, TestDBService],
    }).compile()

    propertyService = app.get<PropertyService>(PropertyService)
    testDBService = app.get<TestDBService>(TestDBService)

    await testDBService.ensureFixtures()
  })

  it('gets properties based on the query', async () => {
    const properties = await propertyService.searchProperties(KERR_CLOSE.address)
    expect(properties).toContainEqual({
      id: expect.any(Number),
      ...KERR_CLOSE
    })
  })
})
