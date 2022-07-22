import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { TestDBService } from './testDB.service'
import { AddressService } from './address.service'
import { BLUES_POINT, RAE_STREET } from 'db/TestDBUtility'

describe('Searching', () => {
  let testDBService: TestDBService
  let addressService: AddressService


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule.register()],
      providers: [TestDBService, AddressService],
    }).compile()

    testDBService = app.get<TestDBService>(TestDBService)
    addressService = app.get<AddressService>(AddressService)

    await testDBService.ensureFixtures()
  })

  describe('matching full to partial', () => {
    it.each([
      'U35 90 Blues Point Rd',
      '35 90 Blues Point Rd',
      '90 Blues Point Rd',
      'Blues Point Rd'
    ])('matches %s', async (query: string) => {
      const results = await addressService.searchByAddress(query)

      expect(results[0]).toEqual(expect.objectContaining({address: BLUES_POINT}))
    })
  })

  it('allows unmatched words', async () => {
    const [result] = await addressService.searchByAddress('Blues Point Road')
    expect(result).toEqual(expect.objectContaining({address: BLUES_POINT}))
  })

  it('does not match different addresses', async () => {
    const results = await addressService.searchByAddress('Blues Point Road')
    expect(results.map(r => r.address)).not.toContain(RAE_STREET)
  })
})
