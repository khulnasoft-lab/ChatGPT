import { ofetch } from 'ofetch'

export async function decodePoeFormkey(html: string): Promise<string> {
  const resp = await ofetch('https://chatgpt.gg/api/poe/decode-formkey', {
    method: 'POST',
    body: { html },
  })
  return resp.formkey
}

type ActivateResponse =
  | {
      activated: true
      instance: { id: string }
      meta: { product_id: number }
    }
  | { activated: false; error: string }

export async function activateLicense(key: string, instanceName: string) {
  return ofetch<ActivateResponse>('https://chatgpt.gg/api/premium/activate', {
    method: 'POST',
    body: {
      license_key: key,
      instance_name: instanceName,
    },
  })
}

interface Product {
  price: number
}

export async function fetchPremiumProduct() {
  return ofetch<Product>('https://chatgpt.gg/api/premium/product')
}

export async function createDiscount() {
  return ofetch<{ code: string; startTime: number }>('https://chatgpt.gg/api/premium/discount/create', {
    method: 'POST',
  })
}

export interface Discount {
  code: string
  startTime: number
  price: number
  percent: number
}

export interface Campaign {
  description: string
  code: string
  price: number
}

interface PurchaseInfo {
  price: number
  discount?: Discount
  campaign?: Campaign
}

export async function fetchPurchaseInfo() {
  return ofetch<PurchaseInfo>('https://chatgpt.gg/api/premium/info')
}

export async function checkDiscount(params: { appOpenTimes: number; premiumModalOpenTimes: number }) {
  return ofetch<{ show: boolean; campaign?: Campaign }>('https://chatgpt.gg/api/premium/discount/check', { params })
}
