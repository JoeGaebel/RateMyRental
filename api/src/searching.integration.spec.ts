import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { TestDBService } from './testDB.service'
import { PropertyService } from './property.service'
import { BLUES_POINT, RAE_STREET } from './property.fixture'

describe('Searching', () => {
  let testDBService: TestDBService
  let propertyService: PropertyService


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule.register()],
      providers: [TestDBService, PropertyService],
    }).compile()

    testDBService = app.get<TestDBService>(TestDBService)
    propertyService = app.get<PropertyService>(PropertyService)

    await testDBService.ensureFixtures()
  })

  describe('matching full to partial', () => {
    it.each([
      'U35 90 Blues Point Rd',
      '35 90 Blues Point Rd',
      '90 Blues Point Rd',
      'Blues Point Rd'
    ])('matches %s', async (query: string) => {
      const results = await propertyService.searchProperties(query)

      expect(results[0]).toEqual(expect.objectContaining(BLUES_POINT))
    })
  })

  it('allows unmatched words', async () => {
    const [result] = await propertyService.searchProperties('Blues Point Road')
    expect(result).toEqual(expect.objectContaining(BLUES_POINT))
  })

  it('does not match different addresses', async () => {
    const results = await propertyService.searchProperties('Blues Point Road')
    expect(results.map(r => r.address)).not.toContain(RAE_STREET.address)
  })
})
