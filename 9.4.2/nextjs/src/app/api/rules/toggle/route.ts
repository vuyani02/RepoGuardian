import { NextRequest, NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export const POST = async (req: NextRequest) => {
  const { accessToken } = await verifySession()
  const body = await req.json()
  try {
    await abpApiWithToken(accessToken).post(
      '/api/services/app/RepoGuardian/ToggleRule',
      { ruleId: body.ruleId, activate: body.activate }
    )
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const axiosErr = err as { response?: { status?: number; data?: unknown } }
    const status = axiosErr.response?.status ?? 500
    return NextResponse.json(axiosErr.response?.data ?? {}, { status })
  }
}
