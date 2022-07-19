import { Injectable } from '@nestjs/common'
import { Property } from './app.controller'
import { Client, QueryResult } from 'pg'
import { InjectClient } from 'nest-postgres'

@Injectable()
export class PropertyService {
  constructor(@InjectClient() private readonly pg: Client) {}

  async getProperties(): Promise<Property[]> {
    const results: QueryResult<Property> = await this.pg.query<Property>('select * from properties')
    return results.rows
  }
}