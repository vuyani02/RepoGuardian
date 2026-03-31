import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      padding: 20px;
    }
  `,
  label: css`
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #6b7280 !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,
  value: css`
    font-size: 36px !important;
    font-weight: 800 !important;
    margin: 0 !important;
    line-height: 1.1 !important;

    @media (max-width: 768px) {
      font-size: 28px !important;
    }
  `,
  valueDefault: css`color: #111827 !important;`,
  valueGreen:   css`color: #10b981 !important;`,
  valueAmber:   css`color: #f59e0b !important;`,
  valueRed:     css`color: #ef4444 !important;`,
  skeleton: css`
    width: 100px !important;
    height: 44px !important;
    border-radius: 8px !important;
  `,
}))
