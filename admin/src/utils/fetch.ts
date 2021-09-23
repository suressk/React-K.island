import fetch from 'isomorphic-fetch'
import qs from 'querystring'
import config from '@common/config'

const isServer = typeof window === 'undefined'
const isDev = process.env.NODE_ENV !== 'production'

const METHODS = ['GET', 'HEAD', 'OPTIONS', 'DELETE']

type ThenArg<T> = T extends Promise<infer U> ? U : T extends (...args: any[]) => Promise<infer S> ? S : T

type Response = ThenArg<typeof fetch>

interface UrlParams {
  url: string;
  body?: any;
  method: string;
}

/**
 * @description 检查请求方法
 * @author Saul
 * @date 23/09/2021
 * @param {string} method
 * @return {*} boolean
 */
const checkMethod = (method: string): boolean => {
  return METHODS.includes(method.toUpperCase())
}

const getUrl = ({ url, body, method = 'POST' }: UrlParams) => {
  const { api } = config
  let API_URL = url

  if (checkMethod(method) && body) {
    if (/\?$/.test(url)) {
      API_URL = `${url}${qs.stringify(body)}`
    } else if (/\?/.test(url)) {
      API_URL = `${url}&${qs.stringify(body)}`
    } else {
      API_URL = `${url}?${qs.stringify(body)}`
    }
  }
  return `${api}${API_URL}`
}