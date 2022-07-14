import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import App from './App.vue'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'


describe('HelloWorld', () => {
    let router: Router

    beforeEach(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        })

        await router.push('/')
    })

    it('renders properly', async () => {
        const wrapper = mount(App, { global: { plugins: [router] } })
        expect(wrapper.html()).toContain('Hello Josef!')
    })
})
