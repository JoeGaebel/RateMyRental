import { Client } from 'pg'
import TestDBUtility from 'db/TestDBUtility'

export class DBService extends TestDBUtility {
  private readonly pg: Client

  constructor () {
    const dbClient = new Client({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_TEST_NAME,
      port: parseInt(process.env.DB_PORT!),
      host: process.env.DB_HOST
    })

    super(dbClient)
    this.pg = dbClient
  }

  async connect () {
    return await this.pg.connect()
  }
}
