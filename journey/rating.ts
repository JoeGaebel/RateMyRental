import { fixture, Selector } from 'testcafe'

fixture`RateMyRental`.page('http://localhost:3000')

test('Rendering results', async t => {
  await t.expect(Selector('title').withText('Rate My Rental').exists).ok()

  await t.typeText('[aria-label="property search"]', 'Unit 2 20 Rae Street')
  await t.click(Selector('button').withText('Search'))

  const randwick = Selector('[aria-label="property listing"]').withText('Unit 2 20 Rae Street')
  await t.expect(randwick.exists).ok()
})
