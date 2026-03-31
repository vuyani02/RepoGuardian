import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 24px 28px;
    margin-top: 24px;

    @media (max-width: 768px) {
      padding: 20px;
    }
  `,
  title: css`
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 20px !important;
  `,
  bars: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  row: css`
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: center;
    gap: 16px;

    @media (max-width: 480px) {
      grid-template-columns: 100px 1fr;
      gap: 10px;
    }
  `,
  label: css`
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #374151 !important;
    white-space: nowrap;
  `,
  scoreLabel: css`
    font-size: 12px;
    font-weight: 700;
    min-width: 28px;
    display: inline-block;
    text-align: right;
  `,
  skeletonWrap: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  skeleton: css`
    width: 100% !important;
    height: 20px !important;
    border-radius: 6px !important;
  `,
  empty: css`
    font-size: 14px !important;
    color: #9ca3af !important;
  `,
}))
