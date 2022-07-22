import { PropertyAttributes } from './app.controller'

export const BLUES_POINT = Object.freeze({
  address: 'U35 90 Blues Point Rd',
  comment: 'Beautiful views'
})

export const RAE_STREET = Object.freeze({
  address: 'Unit 2, 20 Rae Street',
  comment: 'Strata refused to fix a serious gas leak'
})

export const KERR_CLOSE = Object.freeze({
  address: '5 Kerr Close',
  comment: 'Geckos in the garage'
})

export const FIXTURE_PROPERTIES: PropertyAttributes[] = [
  BLUES_POINT, RAE_STREET, KERR_CLOSE
]
