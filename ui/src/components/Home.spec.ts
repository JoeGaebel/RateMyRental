import type { SpyInstance } from 'vitest'

import { flushPromises, shallowMount } from '@vue/test-utils'
import Home from './Home.vue'
import axios from 'axios'
import type { Property } from '@/components/Home.vue'

describe('HelloWorld', () => {
  let getSpy: SpyInstance
  let propertiesMock: Property[]

  beforeEach(() => {
    // @ts-ignore
    import.meta.env.VITE_API_URL = 'http://localhost'

    propertiesMock = [
      {address: '123 Clam St', comment: 'Great place!'},
      {address: '20 Rae Street', comment: 'Ok place!'}
    ]

    getSpy = vi.spyOn(axios, 'get').mockResolvedValue({ data: {properties: propertiesMock }})
  })

  it('searches for properties and renders the results', async () => {
    const wrapper = shallowMount(Home)

    const searchInput = wrapper.get('[aria-label="property search"]')
    await searchInput.setValue('20 Rae Street')
    await wrapper.find('button').trigger('click')

    expect(getSpy).toHaveBeenCalledWith('http://localhost/api/properties', {params: {q: '20 Rae Street'}})

    await flushPromises()

    const properties = wrapper.findAll('[aria-label="property listing"]')
    expect(properties[0].text()).toEqual('123 Clam St')
    expect(properties[1].text()).toEqual('20 Rae Street')
  })
})
