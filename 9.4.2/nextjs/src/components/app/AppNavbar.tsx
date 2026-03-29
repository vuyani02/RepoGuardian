'use client'

import { Button } from 'antd'
import { createStyles } from 'antd-style'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'

const useStyles = createStyles(({ css }) => ({
  navbar: css`
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #f3f4f6;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;

    @media (max-width: 768px) {
      padding: 0 16px;
    }
  `,
  logo: css`
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  `,
  logoText: css`
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.5px;

    .repo { color: #4f46e5; }
    .guardian { color: #111827; }
  `,
  nav: css`
    display: flex;
    align-items: center;
    gap: 4px;

    @media (max-width: 768px) {
      display: none;
    }
  `,
  navLink: css`
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #f9fafb;
      color: #111827;
    }

    &.active {
      background: #eef2ff;
      color: #4f46e5;
    }
  `,
  right: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
}))

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="appNavShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path d="M16 3L5 7.5V15c0 6.075 4.667 11.742 11 13 6.333-1.258 11-6.925 11-13V7.5L16 3Z" fill="url(#appNavShield)" />
      <path d="M11 16l3.5 3.5L21 12" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/repositories', label: 'Repositories' },
  { href: '/scans', label: 'Scans' },
]

export default function AppNavbar() {
  const { styles } = useStyles()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await axios.post('/api/auth/logout')
    router.push('/login')
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/dashboard" className={styles.logo}>
        <ShieldIcon />
        <span className={styles.logoText}>
          <span className="repo">Repo</span>
          <span className="guardian">Guardian</span>
        </span>
      </Link>

      <div className={styles.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className={styles.right}>
        <Button
          type="text"
          size="small"
          onClick={handleLogout}
          style={{ color: '#9ca3af', fontSize: 14 }}
        >
          Log out
        </Button>
      </div>
    </nav>
  )
}
