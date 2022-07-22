import type { SpyInstance } from 'vitest'

import { flushPromises, shallowMount } from '@vue/test-utils'
import Home from './Home.vue'
import axios from 'axios'
import type { Address } from '@/components/Home.vue'

describe('Home', () => {
    let getSpy: SpyInstance
    let addressesMock: Address[]

    beforeEach(() => {
        // @ts-ignore
        import.meta.env.VITE_API_URL = 'http://localhost'

        addressesMock = [
            {id: 1, address: '123 Clam St'},
            {id: 2, address: '20 Rae Street'}
        ]

        getSpy = vi.spyOn(axios, 'get').mockResolvedValue({ data: {addresses: addressesMock }})
    })

    it('searches for properties and renders the results', async () => {
        const wrapper = shallowMount(Home)

        const searchInput = wrapper.get('[aria-label="property search"]')
        await searchInput.setValue('20 Rae Street')
        await wrapper.find('button').trigger('click')

        expect(getSpy).toHaveBeenCalledWith('http://localhost/api/address', {params: {q: '20 Rae Street'}})

        await flushPromises()

        const properties = wrapper.findAll('[aria-label="property listing"]')
        expect(properties[0].text()).toEqual('123 Clam St')
        expect(properties[1].text()).toEqual('20 Rae Street')
    })
})
