import { Test, TestingModule } from '@nestjs/testing'
import { PropertyService } from './property.service'
import { TestDBService } from './testDB.service'
import { DatabaseModule } from './database.module'
import { ConfigModule } from '@nestjs/config'

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

    await testDBService.clearProperties()
  })

  it('gets properties based on the query', async () => {
    await testDBService.insertProperty({
      address: 'Unit 2 20 Rae Street',
      comment: 'Strata ignored a serious gas leak'
    })

    await testDBService.insertProperty({
      address: '90 Blues Point Rd',
      comment: 'Beautiful view'
    })

    const properties = await propertyService.getProperties('Rae')
    expect(properties).toEqual([
      {
        id: expect.any(Number),
        address: 'Unit 2 20 Rae Street',
        comment: 'Strata ignored a serious gas leak',
      }
    ])
  })
})
