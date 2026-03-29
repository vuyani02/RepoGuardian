import axios, { AxiosInstance } from 'axios'

const DEFAULT_TENANT_ID = 1

// Some reverse proxies (e.g. Render) strip HTTP headers whose names contain dots,
// so `Abp.TenantId` header may never reach the backend. Adding it as a query
// parameter is a safe fallback — query strings are never stripped by proxies.
// The backend middleware copies it back into the request headers before ABP's
// tenant resolver runs.
const withTenantParam = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use((config) => {
    config.params = { ...config.params, 'Abp.TenantId': DEFAULT_TENANT_ID }
    return config
  })
  return instance
}

export const abpApi = withTenantParam(
  axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Abp.TenantId': String(DEFAULT_TENANT_ID),
    },
  })
)

export const abpApiWithToken = (token: string) =>
  withTenantParam(
    axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Abp.TenantId': String(DEFAULT_TENANT_ID),
        Authorization: `Bearer ${token}`,
      },
    })
  )
