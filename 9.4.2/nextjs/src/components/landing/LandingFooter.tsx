'use client'

import { Typography } from "antd";
import { createStyles } from "antd-style";
import Link from "next/link";

const { Text } = Typography;

const useStyles = createStyles(({ css }) => ({
  footer: css`
    background: #111827;
    padding: 56px 48px 32px;

    @media (max-width: 768px) {
      padding: 40px 20px 24px;
    }
  `,
  inner: css`
    max-width: 1100px;
    margin: 0 auto;
  `,
  top: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
    gap: 32px;

    @media (max-width: 768px) {
      flex-direction: column;
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
    color: #ffffff;
  `,
  tagline: css`
    color: rgba(255, 255, 255, 0.45) !important;
    font-size: 14px !important;
    margin-top: 8px !important;
    display: block;
  `,
  linksGroup: css`
    display: flex;
    gap: 64px;
    flex-wrap: wrap;
  `,
  linkCol: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  colLabel: css`
    color: rgba(255, 255, 255, 0.3) !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 4px !important;
  `,
  footerLink: css`
    color: rgba(255, 255, 255, 0.65);
    font-size: 14px;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: #ffffff;
    }
  `,
  bottom: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 28px;
    flex-wrap: wrap;
    gap: 12px;
  `,
  copyright: css`
    color: rgba(255, 255, 255, 0.3) !important;
    font-size: 13px !important;
  `,
  builtWith: css`
    color: rgba(255, 255, 255, 0.3) !important;
    font-size: 13px !important;
  `,
}));

const FooterShieldIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="footerShieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M16 3L5 7.5V15c0 6.075 4.667 11.742 11 13 6.333-1.258 11-6.925 11-13V7.5L16 3Z"
        fill="url(#footerShieldGrad)"
      />
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

const LandingFooter = () => {
  const { styles } = useStyles();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <Link href="/" className={styles.logo}>
              <FooterShieldIcon />
              <span className={styles.logoText}>RepoGuardian</span>
            </Link>
            <Text className={styles.tagline}>AI-powered repository compliance</Text>
          </div>

          <div className={styles.linksGroup}>
            <div className={styles.linkCol}>
              <Text className={styles.colLabel}>Product</Text>
              <Link href="/register" className={styles.footerLink}>Get Started</Link>
              <Link href="/login" className={styles.footerLink}>Log In</Link>
            </div>
            <div className={styles.linkCol}>
              <Text className={styles.colLabel}>Compliance</Text>
              <span className={styles.footerLink}>Documentation Rules</span>
              <span className={styles.footerLink}>Security Rules</span>
              <span className={styles.footerLink}>CI/CD Rules</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <Text className={styles.copyright}>
            © {new Date().getFullYear()} RepoGuardian. All rights reserved.
          </Text>
          <Text className={styles.builtWith}>
            Built with Next.js · Powered by Gemini AI
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter
