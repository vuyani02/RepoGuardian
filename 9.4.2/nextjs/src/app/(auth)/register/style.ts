import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  page: css`
    min-height: 100vh;
    display: flex;
    background: #ffffff;
  `,
  leftPanel: css`
    flex: 0 0 40%;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 56px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -120px;
      right: -120px;
      width: 420px;
      height: 420px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 50%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -80px;
      left: -80px;
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 50%;
    }

    @media (max-width: 768px) {
      display: none;
    }
  `,
  logoWrap: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 56px;
    text-decoration: none;
  `,
  logoText: css`
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
  `,
  leftHeading: css`
    font-size: 34px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    letter-spacing: -1px;
    margin-bottom: 14px;
  `,
  leftSub: css`
    font-size: 15px;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.7;
    margin-bottom: 48px;
  `,
  badges: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  badge: css`
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 14px 16px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
  `,
  badgeIcon: css`
    font-size: 20px;
    flex-shrink: 0;
  `,
  rightPanel: css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;

    @media (max-width: 768px) {
      padding: 40px 20px;
    }
  `,
  formWrap: css`
    width: 100%;
    max-width: 480px;
  `,
  backLink: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #9ca3af;
    font-size: 13px;
    text-decoration: none;
    margin-bottom: 40px;
    transition: color 0.15s;

    &:hover {
      color: #4f46e5;
    }
  `,
  heading: css`
    font-size: 28px !important;
    font-weight: 800 !important;
    color: #111827 !important;
    letter-spacing: -0.5px !important;
    margin-bottom: 4px !important;
  `,
  subheading: css`
    font-size: 15px !important;
    color: #6b7280 !important;
    margin-bottom: 32px !important;
  `,
  label: css`
    font-weight: 500;
    color: #374151;
  `,
  submitBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    height: 48px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    border-radius: 10px !important;

    &:hover {
      background: #4338ca !important;
      border-color: #4338ca !important;
    }
  `,
  footer: css`
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #9ca3af;

    a {
      color: #4f46e5;
      font-weight: 600;
      text-decoration: none;
    }
  `,
  alert: css`
    margin-bottom: 20px;
    border-radius: 10px;
  `,
  radioGroup: css`
    width: 100%;
    display: flex;

    .ant-radio-button-wrapper {
      flex: 1;
      text-align: center;
      height: 42px !important;
      line-height: 40px !important;
      font-weight: 500;
    }

    .ant-radio-button-wrapper:first-child {
      border-radius: 10px 0 0 10px !important;
    }

    .ant-radio-button-wrapper:last-child {
      border-radius: 0 10px 10px 0 !important;
    }
  `,
  submitItem: css`
    margin-bottom: 0;
  `,
}))
