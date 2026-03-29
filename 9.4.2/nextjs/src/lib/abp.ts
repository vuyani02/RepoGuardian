import axios from 'axios'

const DEFAULT_TENANT_ID = 1

export const abpApi = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Abp.TenantId': String(DEFAULT_TENANT_ID),
  },
})

export const abpApiWithToken = (token: string) =>
  axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Abp.TenantId': String(DEFAULT_TENANT_ID),
      Authorization: `Bearer ${token}`,
    },
  })
