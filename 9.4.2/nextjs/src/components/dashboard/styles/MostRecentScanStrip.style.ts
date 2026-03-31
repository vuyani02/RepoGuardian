import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  strip: css`
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 12px;
    padding: 14px 20px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  `,
  label: css`
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #6b7280 !important;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    min-width: 130px;
  `,
  repoName: css`
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #111827 !important;
  `,
  dot: css`
    color: #d1d5db;
    font-size: 14px;

    @media (max-width: 768px) {
      display: none;
    }
  `,
  time: css`
    font-size: 13px !important;
    color: #6b7280 !important;
    white-space: nowrap;
  `,
  scoreBadge: css`
    font-size: 12px;
    font-weight: 700;
    padding: 2px 10px;
    border-radius: 99px;
    white-space: nowrap;
  `,
  scoreGreen: css`
    background: #d1fae5;
    color: #065f46;
  `,
  scoreAmber: css`
    background: #fef3c7;
    color: #92400e;
  `,
  scoreRed: css`
    background: #fee2e2;
    color: #991b1b;
  `,
  scoreDefault: css`
    background: #f3f4f6;
    color: #6b7280;
  `,
  skeleton: css`
    width: 300px !important;
    height: 20px !important;
    border-radius: 6px !important;

    @media (max-width: 768px) {
      width: 100% !important;
    }
  `,
  empty: css`
    font-size: 13px !important;
    color: #9ca3af !important;
  `,
}))
