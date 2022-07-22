<template>
  <input type="text" v-model="searchQuery" aria-label="property search"/>
  <button @click="getProperties()">Search</button>
  <div aria-label="property results">
    <ul>
      <li v-for="address in addresses" :key="address.id" aria-label="property listing">
        {{ address.address }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export interface Address {
  id: number
  address: string
}

export interface AddressResponse {
  addresses: Address[]
}

export default {
  data: () => {
    return {
      searchQuery: '',
      addresses: []
    }
  },
  methods: {
    async getProperties() {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/address`
        const response = await axios.get(
            url,
            { params: { q: this.searchQuery } }
        )
        this.addresses = (response.data as AddressResponse).addresses
      } catch (e) {
        console.log('error!', e)
      }
    }
  }
}
</script>
