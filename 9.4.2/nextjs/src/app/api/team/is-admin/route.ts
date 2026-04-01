import { NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export const GET = async () => {
  const { accessToken } = await verifySession()
  const { data } = await abpApiWithToken(accessToken).get(
    '/api/services/app/Team/IsAdmin'
  )
  return NextResponse.json(data.result)
}
