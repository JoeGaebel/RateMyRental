import type { SpyInstance } from 'vitest'

import { flushPromises, shallowMount } from '@vue/test-utils'
import Home from './Home.vue'
import axios from 'axios'
import type { Address } from '@/components/Home.vue'
import { RouterLink } from 'vue-router'

describe('Home', () => {
    let getSpy: SpyInstance
    let addressesMock: Address[]
    let routerMock: {push: SpyInstance}
    beforeEach(() => {
        // @ts-ignore
        import.meta.env.VITE_API_URL = 'http://localhost'

        addressesMock = [
            {id: 1, address: '123 Clam St'},
            {id: 2, address: '20 Rae Street'}
        ]

        getSpy = vi.spyOn(axios, 'get').mockResolvedValue({ data: {addresses: addressesMock }})
        routerMock = {push: vi.fn()}
    })

    it('searches for properties and renders the results', async () => {
        const wrapper = shallowMount(Home, {global: {mocks: {$router: routerMock}}})

        const searchInput = wrapper.get('[aria-label="address search"]')
        await searchInput.setValue('20 Rae Street')
        await wrapper.find('button').trigger('click')

        expect(getSpy).toHaveBeenCalledWith('http://localhost/api/address', {params: {q: '20 Rae Street'}})

        await flushPromises()

        const addresses = wrapper
          .findAll('[aria-label="address listing"]')
          .map(a => a.findComponent(RouterLink))

        expect(addresses).toHaveLength(2)
    })
})
