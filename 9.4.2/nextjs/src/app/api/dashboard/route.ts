import { NextRequest, NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export async function GET(req: NextRequest) {
  const { accessToken } = await verifySession()
  const { searchParams } = req.nextUrl

  const params: Record<string, string> = {}
  if (searchParams.has('daysBack')) params['daysBack'] = searchParams.get('daysBack')!
  if (searchParams.has('latestPerRepo')) params['latestPerRepo'] = searchParams.get('latestPerRepo')!
  if (searchParams.has('defaultBranchOnly')) params['defaultBranchOnly'] = searchParams.get('defaultBranchOnly')!

  const { data } = await abpApiWithToken(accessToken).get(
    '/api/services/app/RepoGuardian/GetDashboardStats',
    { params }
  )
  return NextResponse.json(data.result)
}
