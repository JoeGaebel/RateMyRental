import { beforeEach, describe, expect, it } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import App from './App.vue'
import { routes } from '@/router'
import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'
import { rest } from 'msw'
import type { SetupServerApi } from 'msw/node'
import { setupServer } from 'msw/node'

describe('App', () => {
  let router: Router
  let server: SetupServerApi

  beforeAll(() => {
    server = setupServer()
    server.listen()
  })

  beforeEach(async () => {
    server.resetHandlers()

    router = createRouter({
      history: createMemoryHistory(),
      routes: routes,
    })

    await router.push('/')
  })

  afterAll(() => server.close())

  it('searches for properties', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } })
    server.use(
      rest.get('*/api/address', (req, res, context) => res(
          context.status(200),
          context.json({
            addresses: [{
              id: 10,
              address: 'Unit 2, 20 Rae Street'
            }]
          })
        )
      ))

    const searchInput = wrapper.get('[aria-label="address search"]')
    await searchInput.setValue('20 Rae Street')
    await wrapper.find('button').trigger('click')

    await flushPromises()

    const addresses = wrapper.findAll('[aria-label="address results"] a')
    const raeStreet = addresses.find(a => a.text() === 'Unit 2, 20 Rae Street')!
    expect(raeStreet.exists()).toEqual(true)

    await raeStreet.trigger('click')
    await flushPromises()

    const title = wrapper.get('[aria-label="address title"]')
    expect(title.text()).toEqual('10')
  })
})
