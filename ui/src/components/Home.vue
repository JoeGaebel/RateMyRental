<template>
  <input type="text" v-model="searchQuery" aria-label="property search"/>
  <button @click="getProperties()">Search</button>
  <div aria-label="property results">
    <ul>
      <li v-for="property in properties" :key="property.address" aria-label="property listing">
        {{ property.address }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export interface Property {
  address: string
  comment: string
}

export interface PropertyResponse {
  properties: Property[]
}

export default {
  data: () => {
    return {
      searchQuery: '',
      properties: []
    }
  },
  methods: {
    async getProperties() {
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/properties`,
            { params: { q: this.searchQuery } }
        )
        this.properties = (response.data as PropertyResponse).properties
      } catch (e) {
        console.log('error!', e)
      }
    }
  }
}
</script>
