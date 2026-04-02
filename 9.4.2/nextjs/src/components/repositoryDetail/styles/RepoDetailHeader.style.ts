import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
    }
  `,
  left: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  nameRow: css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  `,
  name: css`
    font-size: 24px !important;
    font-weight: 800 !important;
    color: #111827 !important;
    margin-bottom: 0 !important;
  `,
  scoreBadge: css`
    font-size: 13px;
    font-weight: 700;
    padding: 3px 12px;
    border-radius: 99px;
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
  owner: css`
    font-size: 14px !important;
    color: #6b7280 !important;
    margin: 0 !important;
  `,
  link: css`
    font-size: 13px !important;
    color: #4f46e5 !important;
  `,
  right: css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  scanBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 10px !important;
    font-weight: 600 !important;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  skeletonName: css`
    width: 220px !important;
    height: 28px !important;
    margin-bottom: 8px !important;
    display: block !important;
  `,
  skeletonOwner: css`
    width: 140px !important;
    height: 18px !important;
  `,
  defaultBranchBadge: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 99px;
    padding: 1px 8px;
  `,
}))
