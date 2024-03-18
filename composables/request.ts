import type { UseFetchOptions } from "#app"

export type SupportedHttpMethod = UseFetchOptions<unknown>['method']

export interface HttpRequestOptions<P = unknown, T = unknown> {
  params?: P
  method?: SupportedHttpMethod
  data?: T
}

export interface ResultWrapper<T = unknown> {
  data?: T
  code: number
  msg: string
  traceId?: string
}

type RequestFilterFn = (request: any, options: any, response: any, resolve: (data: any) => void, reject: (data?: any) => void) => void | Promise<void>

export async function useRequest<
  ResultType = unknown,
  ResultWrapperType = ResultWrapper<ResultType>
>(
  url: string,
  options?: HttpRequestOptions,
  requestFilterFn?: RequestFilterFn,
  responseFilterFn?: RequestFilterFn,
  errorHandleFn?: (error: any) => void
): Promise<ResultWrapperType> {
  const runtimeConfig = useRuntimeConfig()
  const requestFilter = requestFilterFn || runtimeConfig.public.requestFilter as RequestFilterFn | undefined
  const responseFilter = responseFilterFn || runtimeConfig.public.responseFilter as RequestFilterFn | undefined
  const errorHandle = errorHandleFn || runtimeConfig.public.errorHandle as (error: any) => void | undefined

  const response = new Promise<ResultWrapperType>((resolve, reject) => {
    useFetch(url, {
      method: options?.method ?? 'GET',
      query: options?.params ?? undefined,
      body: JSON.stringify(options?.data) ?? undefined,
      baseURL: runtimeConfig.public.baseURL as string,
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },

      onRequest({ request, options }) {
        if (requestFilter) {
          requestFilter(request, options, undefined, resolve, reject)
        }
        if (globalThis.localStorage && globalThis.localStorage.getItem('token')) {
          options.headers = {
            ...options.headers,
            Authorization: globalThis.localStorage.getItem('token') ?? '',
          }
        }
      },

      onResponse({ request, response, options }) {
        if (responseFilter) {
          responseFilter(request, options, response, resolve, reject)
        }
        resolve(response.json())
      },

      onRequestError({ error }) {
        console.error('Nuxt request error:', error)
        if (errorHandle) {
          errorHandle(error)
        }
        reject(error)
      },

      onResponseError({ error }) {
        console.error('Nuxt response error:', error)
        if (errorHandle) {
          errorHandle(error)
        }
        reject(error)
      }
    })
  })

  return response
}

export async function useRequestGet<
  ResultType = unknown,
  ResultWrapperType = ResultWrapper<ResultType>
>(
  url: string,
  options?: HttpRequestOptions,
  requestFilterFn?: RequestFilterFn,
  responseFilterFn?: RequestFilterFn,
  errorHandleFn?: (error: any) => void
): Promise<ResultWrapperType> {
  return useRequest<ResultType, ResultWrapperType>(url, options, requestFilterFn, responseFilterFn, errorHandleFn)
}

export async function useRequestPost<
  ResultType = unknown,
  ResultWrapperType = ResultWrapper<ResultType>
>(
  url: string,
  options?: HttpRequestOptions,
  requestFilterFn?: RequestFilterFn,
  responseFilterFn?: RequestFilterFn,
  errorHandleFn?: (error: any) => void
): Promise<ResultWrapperType> {
  return useRequest<ResultType, ResultWrapperType>(url, { ...options, method: 'POST' }, requestFilterFn, responseFilterFn, errorHandleFn)
}
