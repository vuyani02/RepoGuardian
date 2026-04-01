import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/session'
import { abpApi, abpApiForTenant } from '@/lib/abp'

export async function POST(req: NextRequest) {
  try {
    const { username, password, teamName } = await req.json()

    // Resolve tenant from team name so the JWT is scoped correctly.
    const tenantRes = await abpApi.post('/api/services/app/Account/IsTenantAvailable', {
      tenancyName: teamName.trim().toLowerCase().replaceAll(' ', '-'),
    })
    const { state, tenantId } = tenantRes.data.result

    if (state !== 1) {
      const message = state === 2 ? 'That team is inactive.' : 'No team with that name was found.'
      return NextResponse.json({ message }, { status: 400 })
    }

    const { data } = await abpApiForTenant(tenantId).post('/api/TokenAuth/Authenticate', {
      userNameOrEmailAddress: username,
      password,
      rememberClient: false,
    })

    await createSession(data.result.userId, data.result.accessToken)

    return NextResponse.json({ success: true })
  } catch (err) {
    const error = err as { response?: { data?: { error?: { message?: string } }; status?: number } }
    const message = error?.response?.data?.error?.message || 'Invalid username or password.'
    const status = error?.response?.status === 401 ? 401 : 400
    return NextResponse.json({ message }, { status })
  }
}
