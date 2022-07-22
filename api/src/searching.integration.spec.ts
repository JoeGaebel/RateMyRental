import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { TestDBService } from './testDB.service'
import { PropertyService } from './property.service'

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

    await testDBService.clearProperties()

  })

  describe('matching full to partial', () => {
    it.each([
      'U35 90 Blues Point Rd',
      '35 90 Blues Point Rd',
      '90 Blues Point Rd',
      'Blues Point Rd',
      'Blues Point',
    ])('matches %s', async (query: string) => {
      const propertyListing = {
        address: 'U35 90 Blues Point Rd',
        comment: 'asd'
      }
      await testDBService.insertProperty(propertyListing)
      const results = await propertyService.searchProperties(query)

      expect(results[0]).toEqual(expect.objectContaining(propertyListing))
      expect(results).toHaveLength(1)
    })
  })

  it('allows unmatched words', async () => {
    const propertyListing = {
      address: 'U35 90 Blues Point Rd',
      comment: 'asd'
    }
    await testDBService.insertProperty(propertyListing)

    const [result] = await propertyService.searchProperties('Blues Point Road')
    expect(result).toEqual(expect.objectContaining(propertyListing))
  })

  it('limits the number of results to 5', async () => {
    const propertyListing = {
      address: '90 Blues Point Rd',
      comment: 'asd'
    }

    await testDBService.insertProperties(
      [propertyListing, propertyListing, propertyListing, propertyListing, propertyListing, propertyListing]
    )

    const results = await propertyService.searchProperties('Blues Point Road')
    expect(results).toHaveLength(5)
  })

  it('does not match different addresses', async () => {
    const properties = [
      { address: '90 Blues Point Rd', comment: 'asd' },
      { address: 'Unit 2, 20 Rae St', comment: 'def'}
    ]

    await testDBService.insertProperties(properties)

    const results = await propertyService.searchProperties('Blues Point Road')
    expect(results.map(r => r.address)).not.toContain('Unit 2, 20 Rae St')
  })
})
