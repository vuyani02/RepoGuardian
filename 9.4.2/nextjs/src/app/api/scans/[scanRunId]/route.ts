import { NextRequest, NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ scanRunId: string }> }
) {
  const { accessToken } = await verifySession()
  const { scanRunId } = await params
  const { data } = await abpApiWithToken(accessToken).get(
    `/api/services/app/RepoGuardian/GetScanResult?scanRunId=${scanRunId}`
  )
  return NextResponse.json(data.result)
}
