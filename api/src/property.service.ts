import { Injectable } from '@nestjs/common'
import { Property } from './app.controller'
import { Client, QueryResult } from 'pg'
import { InjectClient } from 'nest-postgres'

@Injectable()
export class PropertyService {
  constructor(@InjectClient() private readonly pg: Client) {}

  async searchProperties(query: string): Promise<Property[]> {
    const results: QueryResult<Property> = await this.pg.query<Property>(`
        SELECT *
        FROM properties
        WHERE levenshtein(address, '${query}') <= 10
        ORDER BY levenshtein(address, '${query}') ASC
        LIMIT 5;
    `)
    return results.rows
  }
}
