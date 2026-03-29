'use client'

import { Button, Space } from "antd";
import { createStyles } from "antd-style";
import Link from "next/link";

const useStyles = createStyles(({ css }) => ({
  navbar: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #f0f0f0;
    padding: 0 48px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  `,
  logo: css`
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  logoText: css`
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1;

    .repo {
      color: #4f46e5;
    }

    .guardian {
      color: #111827;
    }
  `,
}));

const ShieldIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Shield body */}
      <path
        d="M16 3L5 7.5V15c0 6.075 4.667 11.742 11 13 6.333-1.258 11-6.925 11-13V7.5L16 3Z"
        fill="url(#shieldGrad)"
      />
      {/* Checkmark */}
      <path
        d="M11 16l3.5 3.5L21 12"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LandingNavbar = () => {
  const { styles } = useStyles();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <ShieldIcon />
        <span className={styles.logoText}>
          <span className="repo">Repo</span>
          <span className="guardian">Guardian</span>
        </span>
      </Link>
      <Space size="middle">
        <Link href="/login">
          <Button type="text" size="large">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button
            type="primary"
            size="large"
            style={{ background: "#4f46e5", borderColor: "#4f46e5" }}
          >
            Get Started Free
          </Button>
        </Link>
      </Space>
    </nav>
  );
}

export default LandingNavbar
