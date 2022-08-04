import { Client } from 'pg';
export declare const BLUES_POINT = "U35 90 Blues Point Rd";
export declare const RAE_STREET = "Unit 2, 20 Rae Street";
export declare const KERR_CLOSE = "5 Kerr Close";
export declare const FIXTURE_PROPERTIES: string[];
export default class TestDBUtility {
    private readonly pgClient;
    constructor(pgClient: Client);
    private ensureTestEnvironment;
    ensureFixtures(): Promise<void>;
    private propertyExistsByAddress;
    insertProperty(address: string): Promise<void>;
}
