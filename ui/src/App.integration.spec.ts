import { beforeEach, describe, expect, it } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import App from './App.vue'
import { routes } from '@/router'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
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
      history: createWebHistory(),
      routes: routes,
    })

    await router.push('/')
  })

  afterAll(() => server.close())

  it('searches for properties', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } })
    server.use(
      rest.get('*/api/properties', (req, res, context) => res(
          context.status(200),
          context.json({
            properties: [{
              address: 'Unit 2, 20 Rae Street',
              comment: 'Strata would not investigate gas leak'
            }]
          })
        )
      ))

    const searchInput = wrapper.get('[aria-label="property search"]')
    await searchInput.setValue('20 Rae Street')
    await wrapper.find('button').trigger('click')

    await flushPromises()

    const properties = await wrapper.find('[aria-label="property results"]')
    expect(properties.text()).toContain('Unit 2, 20 Rae Street')
  })
})
