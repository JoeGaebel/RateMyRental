import { Client, QueryResult } from 'pg'

export const BLUES_POINT = 'U35 90 Blues Point Rd'

export const RAE_STREET = 'Unit 2, 20 Rae Street'

export const KERR_CLOSE =  '5 Kerr Close'

export const FIXTURE_PROPERTIES: string[] = [
  BLUES_POINT, RAE_STREET, KERR_CLOSE
]

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
    for (const address of FIXTURE_PROPERTIES) {
      const exists = await this.propertyExistsByAddress(address)
      if (!exists) {
        await this.insertProperty(address)
      }
    }
  }

  private async propertyExistsByAddress(address: string): Promise<boolean> {
    const result: QueryResult<{ exists: boolean }> = await this.pgClient.query<{ exists: boolean }>(`
        SELECT EXISTS(
            SELECT 1
            FROM addresses
            WHERE address = '${address}'
        );
    `)
    return result.rows[0].exists
  }

  async insertProperty(address: string): Promise<void> {
    await this.pgClient.query(`
        INSERT INTO addresses(address)
        VALUES ('${address}');
    `)
  }
}
