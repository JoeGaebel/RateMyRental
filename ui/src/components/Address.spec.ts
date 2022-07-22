import { shallowMount } from '@vue/test-utils'
import Address from './Address.vue'

describe('Address', () => {
  it('renders the id', async () => {
    const wrapper = shallowMount(Address, {global: {
        mocks: {
          $route: {
            params: { addressId: 5 }
          }
        }
    }})

    const id = wrapper.get('[aria-label="address title"]')
    expect(id.text()).toEqual('5')
  })
})
