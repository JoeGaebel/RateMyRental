import { InjectClient } from 'nest-postgres'
import { Client } from 'pg'
import { Injectable } from '@nestjs/common'
import { Property } from './app.controller'

@Injectable()
export class TestDBService {
  constructor(@InjectClient() private readonly pg: Client) {
    if (pg.database !== 'ratemyrental-test') {
      throw new Error('TestDBService must only be used against the test db')
    }
  }

  async clearProperties(): Promise<void> {
    await this.pg.query('DELETE FROM properties')
  }

  async insertProperty(property: Omit<Property, 'id'>): Promise<void> {
    await this.pg.query(`
        INSERT INTO properties(address, comment)
        VALUES ('${property.address}', '${property.comment}');
    `)
  }
}
