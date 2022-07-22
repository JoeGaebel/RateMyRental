import { Injectable } from '@nestjs/common'
import { AddressRecord } from './address.controller'
import { Client, QueryResult } from 'pg'
import { InjectClient } from 'nest-postgres'

@Injectable()
export class AddressService {
  constructor(@InjectClient() private readonly pg: Client) {}

  async searchByAddress(query: string): Promise<AddressRecord[]> {
    const results: QueryResult<AddressRecord> = await this.pg.query<AddressRecord>(`
        SELECT *
        FROM addresses
        WHERE levenshtein(address, '${query}') <= 10
        ORDER BY levenshtein(address, '${query}') ASC
        LIMIT 5;
    `)
    return results.rows
  }
}
