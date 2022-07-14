import { fixture, Selector } from 'testcafe'

fixture`RateMyRental`.page('localhost:3000')

test('rendering the page', async t => {
  await t.expect(Selector('title').withText('Rate My Rental').exists).ok()
})
