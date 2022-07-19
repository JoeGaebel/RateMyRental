import { fixture, Selector } from 'testcafe'
import { DBService } from './dbService'

fixture`RateMyRental`
  .page('http://localhost:3000')
  .before(async ctx => {
    ctx.dbService = new DBService()
    await ctx.dbService.connect()
  })

test('Rendering results', async t => {
  await t.fixtureCtx.dbService.clearProperties()
  await t.fixtureCtx.dbService.insertProperty({
    address: '5 Kerr Close',
    comment: 'Geckos in the garage'
  })

  await t.expect(Selector('title').withText('Rate My Rental').exists).ok()

  await t.typeText('[aria-label="property search"]', '5 Kerr Close')
  await t.click(Selector('button').withText('Search'))

  const randwick = Selector('[aria-label="property listing"]').withText('5 Kerr Close')
  await t.expect(randwick.exists).ok()
})
