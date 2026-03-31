import { NextRequest, NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { accessToken } = await verifySession()
  const { data } = await abpApiWithToken(accessToken).get(
    '/api/services/app/RepoGuardian/GetRepositoryDetail',
    { params: { id } }
  )
  return NextResponse.json(data.result)
}
