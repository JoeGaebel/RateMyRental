import { InjectClient } from 'nest-postgres'
import { Client, QueryResult } from 'pg'
import { Injectable } from '@nestjs/common'
import { Property } from './app.controller'
import * as format from 'pg-format'
import { FIXTURE_PROPERTIES } from './property.fixture'

@Injectable()
export class TestDBService {
  constructor (@InjectClient() private readonly pg: Client) {
    if (pg.database !== 'ratemyrental-test') {
      throw new Error('TestDBService must only be used against the test db')
    }
  }

  async ensureFixtures(): Promise<void> {
    for (const property of FIXTURE_PROPERTIES) {
      const exists = await this.propertyExistsByAddress(property.address)
      if (!exists) {
        await this.insertProperty(property)
      }
    }
  }

  private async propertyExistsByAddress (address: string): Promise<boolean> {
    const result: QueryResult<{ exists: boolean }> = await this.pg.query<{ exists: boolean }>(`
        SELECT EXISTS(
            SELECT 1
            FROM properties
            WHERE address = '${address}'
        );
    `)
    return result.rows[0].exists
  }

  async insertProperty (property: Omit<Property, 'id'>): Promise<void> {
    await this.pg.query(`
        INSERT INTO properties(address, comment)
        VALUES ('${property.address}', '${property.comment}');
    `)
  }

  async insertProperties (properties: Omit<Property, 'id'>[]): Promise<void> {
    const formattedProperties = properties.map(property => [property.address, property.comment])
    const query = format('INSERT INTO properties (address, comment) VALUES %L', formattedProperties)
    await this.pg.query(query)
  }
}
