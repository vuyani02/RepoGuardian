'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Alert, Button, Col, Form, Input, Radio, Row, Typography } from 'antd'
import { useStyles } from './style'

type RegisterValues = {
  name: string
  surname: string
  userName: string
  emailAddress: string
  password: string
  teamAction: 'create' | 'join'
  teamName: string
}

const ShieldIcon = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="registerShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
        </linearGradient>
      </defs>
      <path d="M16 3L5 7.5V15c0 6.075 4.667 11.742 11 13 6.333-1.258 11-6.925 11-13V7.5L16 3Z" fill="url(#registerShield)" />
      <path d="M11 16l3.5 3.5L21 12" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [teamAction, setTeamAction] = useState<'create' | 'join'>('create')
  const router = useRouter()
  const { styles } = useStyles()

  const onFinish = async (values: RegisterValues) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.message)
        return
      }
      router.push('/login?registered=true')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Left branding panel */}
      <div className={styles.leftPanel}>
        <Link href="/" className={styles.logoWrap}>
          <ShieldIcon />
          <span className={styles.logoText}>RepoGuardian</span>
        </Link>

        <div className={styles.leftHeading}>Start protecting your repos today.</div>
        <div className={styles.leftSub}>
          Create your free account and get your first compliance report in under a minute.
        </div>

        <div className={styles.badges}>
          {[
            { icon: '🔍', text: 'Scan any public GitHub repo instantly' },
            { icon: '✨', text: 'AI fix recommendations for every failure' },
            { icon: '📊', text: 'Scores across 5 compliance categories' },
            { icon: '🔒', text: 'Free to use — no credit card required' },
          ].map((b) => (
            <div key={b.text} className={styles.badge}>
              <span className={styles.badgeIcon}>{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <Link href="/" className={styles.backLink}>
            ← Back to home
          </Link>

          <Typography.Title level={2} className={styles.heading}>
            Create your account
          </Typography.Title>
          <Typography.Paragraph className={styles.subheading}>
            Join RepoGuardian and keep your repos compliant.
          </Typography.Paragraph>

          {error && (
            <Alert type="error" message={error} showIcon className={styles.alert} />
          )}

          <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span className={styles.label}>First Name</span>}
                  name="name"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input size="large" placeholder="John" style={{ borderRadius: 10 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span className={styles.label}>Last Name</span>}
                  name="surname"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input size="large" placeholder="Doe" style={{ borderRadius: 10 }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={<span className={styles.label}>Username</span>}
              name="userName"
              rules={[
                { required: true, message: 'Username is required' },
                { min: 2, message: 'Must be at least 2 characters' },
                {
                  validator: (_, value) =>
                    value?.includes('@')
                      ? Promise.reject(new Error('Username cannot be an email address'))
                      : Promise.resolve(),
                },
              ]}
            >
              <Input size="large" placeholder="johndoe" style={{ borderRadius: 10 }} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Email</span>}
              name="emailAddress"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email address' },
              ]}
            >
              <Input size="large" placeholder="john@example.com" style={{ borderRadius: 10 }} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Password</span>}
              name="password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Must be at least 8 characters' },
                { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter' },
                { pattern: /\d/, message: 'Must contain at least one number' },
              ]}
            >
              <Input.Password size="large" placeholder="Min 8 chars, uppercase, number" style={{ borderRadius: 10 }} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Team</span>}
              name="teamAction"
              initialValue="create"
            >
              <Radio.Group
                onChange={(e) => setTeamAction(e.target.value)}
                className={styles.radioGroup}
              >
                <Radio.Button value="create">Create a team</Radio.Button>
                <Radio.Button value="join">Join a team</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>{teamAction === 'create' ? 'Team name' : "Enter your team's name"}</span>}
              name="teamName"
              rules={[{ required: true, message: 'Team name is required' }]}
            >
              <Input
                size="large"
                placeholder={teamAction === 'create' ? 'e.g. Acme Corp' : 'Enter the exact team name'}
                style={{ borderRadius: 10 }}
              />
            </Form.Item>

            <Form.Item className={styles.submitItem}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                className={styles.submitBtn}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.footer}>
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
