import { InjectClient } from 'nest-postgres'
import { Client } from 'pg'
import { Injectable } from '@nestjs/common'
import TestDBUtility from 'db/TestDBUtility'

@Injectable()
export class TestDBService extends TestDBUtility {
  constructor (@InjectClient() private readonly pg: Client) {
    if (pg.database !== 'ratemyrental-test') {
      throw new Error('TestDBService must only be used against the test db')
    }
    super(pg)
  }
}
