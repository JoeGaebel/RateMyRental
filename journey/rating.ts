import { fixture, Selector } from 'testcafe'
import { DBService } from './dbService'

fixture`RateMyRental`
  .page('http://localhost:3000')
  .before(async ctx => {
    ctx.dbService = new DBService()
    await ctx.dbService.connect()
  })

test('Searching results and rendering the id', async t => {
  await t.fixtureCtx.dbService.ensureFixtures()

  await t.expect(Selector('title').withText('Rate My Rental').exists).ok()

  await t.typeText('[aria-label="address search"]', '20 Rae Street')
  await t.click(Selector('button').withText('Search'))

  const kerr = Selector('[aria-label="address listing"]').withText('5 Kerr Close')
  const randwick = Selector('[aria-label="address listing"]').withText('20 Rae Street')

  await t.expect(randwick.exists).ok()
  await t.expect(kerr.exists).notOk()

  await t.click(randwick)
  await t.expect(Selector('[aria-label="address title"]').withText(/\d*/).exists).ok()
})
