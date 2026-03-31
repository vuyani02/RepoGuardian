import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  navbar: css`
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #f3f4f6;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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
  logoutBtn: css`
    color: #9ca3af !important;
    font-size: 14px !important;

    @media (max-width: 768px) {
      display: none;
    }
  `,
  hamburger: css`
    display: none !important;
    font-size: 18px;
    color: #374151;

    @media (max-width: 768px) {
      display: flex !important;
    }
  `,
  drawerNav: css`
    display: flex;
    flex-direction: column;
    padding: 0 12px;
  `,
  drawerLink: css`
    display: block;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 15px;
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
      font-weight: 600;
    }
  `,
  drawerDivider: css`
    height: 1px;
    background: #f3f4f6;
    margin: 12px 0;
  `,
  drawerLogout: css`
    padding: 12px 16px !important;
    height: auto !important;
    text-align: left !important;
    color: #9ca3af !important;
    font-size: 15px !important;
    border-radius: 10px !important;
    width: 100%;
    justify-content: flex-start;
  `,
}))
