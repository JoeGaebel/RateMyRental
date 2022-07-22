import { Client, QueryResult } from 'pg'
import * as format from 'pg-format'

export const BLUES_POINT = Object.freeze({
  address: 'U35 90 Blues Point Rd',
  comment: 'Beautiful views'
})

export const RAE_STREET = Object.freeze({
  address: 'Unit 2, 20 Rae Street',
  comment: 'Strata refused to fix a serious gas leak'
})

export const KERR_CLOSE = Object.freeze({
  address: '5 Kerr Close',
  comment: 'Geckos in the garage'
})

export const FIXTURE_PROPERTIES: PropertyAttributes[] = [
  BLUES_POINT, RAE_STREET, KERR_CLOSE
]

export interface PropertyAttributes {
  address: string;
  comment: string;
}

export default class TestDBUtility {
  constructor(private readonly pgClient: Client) {
    this.ensureTestEnvironment().then()
  }

  private async ensureTestEnvironment() {
    const dbInfo = await this.pgClient.query<{current_database: string}>(`SELECT current_database();`)
    if (dbInfo.rows[0].current_database !== 'ratemyrental-test') {
      throw new Error('TestDBUtility must only be used against the test db')
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

  private async propertyExistsByAddress(address: string): Promise<boolean> {
    const result: QueryResult<{ exists: boolean }> = await this.pgClient.query<{ exists: boolean }>(`
        SELECT EXISTS(
            SELECT 1
            FROM properties
            WHERE address = '${address}'
        );
    `)
    return result.rows[0].exists
  }

  async insertProperty(property: PropertyAttributes): Promise<void> {
    await this.pgClient.query(`
        INSERT INTO properties(address, comment)
        VALUES ('${property.address}', '${property.comment}');
    `)
  }

  async insertProperties(properties: PropertyAttributes[]): Promise<void> {
    const formattedProperties = properties.map(property => [property.address, property.comment])
    // @ts-ignore
    const query = format('INSERT INTO properties (address, comment) VALUES %L', formattedProperties)
    await this.pgClient.query(query)
  }
}
