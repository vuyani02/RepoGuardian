import { NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export async function GET() {
  const { accessToken } = await verifySession()
  const { data } = await abpApiWithToken(accessToken).get('/api/services/app/Profile/GetProfile')
  return NextResponse.json(data.result)
}
