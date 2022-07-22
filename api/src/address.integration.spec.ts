import { Test, TestingModule } from '@nestjs/testing'
import { AddressService } from './address.service'
import { TestDBService } from './testDB.service'
import { DatabaseModule } from './database.module'
import { ConfigModule } from '@nestjs/config'
import { KERR_CLOSE } from 'db/TestDBUtility'

describe('Address Integration', () => {
  let addressService: AddressService
  let testDBService: TestDBService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule.register()],
      providers: [AddressService, TestDBService],
    }).compile()

    addressService = app.get<AddressService>(AddressService)
    testDBService = app.get<TestDBService>(TestDBService)

    await testDBService.ensureFixtures()
  })

  it('gets addresses based on the query', async () => {
    const addresses = await addressService.searchByAddress(KERR_CLOSE)
    expect(addresses).toContainEqual({
      id: expect.any(Number),
      address: KERR_CLOSE
    })
  })
})
