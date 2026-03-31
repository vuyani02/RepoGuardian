import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 20px 28px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 16px 20px;
    }
  `,
  left: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  heading: css`
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #6b7280 !important;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0 !important;
  `,
  ruleName: css`
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 0 !important;
  `,
  ruleId: css`
    font-size: 12px !important;
    color: #9ca3af !important;
    font-family: monospace;
  `,
  badge: css`
    background: #fee2e2;
    color: #991b1b;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 99px;
    white-space: nowrap;
  `,
  skeleton: css`
    width: 280px !important;
    height: 40px !important;
    border-radius: 8px !important;

    @media (max-width: 768px) {
      width: 100% !important;
    }
  `,
  empty: css`
    font-size: 13px !important;
    color: #9ca3af !important;
  `,
}))
