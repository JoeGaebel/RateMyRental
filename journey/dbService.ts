import { Client } from 'pg'

export interface Property {
  id: number
  address: string;
  comment: string;
}

export class DBService {
  private pg: Client

  constructor () {
    this.pg = new Client({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_TEST_NAME,
      port: parseInt(process.env.DB_PORT!),
      host: process.env.DB_HOST
    })
  }

  async connect () {
    return await this.pg.connect()
  }

  async clearProperties (): Promise<void> {
    await this.pg.query('DELETE FROM properties')
  }

  async insertProperty (property: Omit<Property, 'id'>): Promise<void> {
    await this.pg.query(`
        INSERT INTO properties(address, comment)
        VALUES ('${property.address}', '${property.comment}');
    `)
  }
}
