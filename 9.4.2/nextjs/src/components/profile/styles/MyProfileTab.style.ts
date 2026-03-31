import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    max-width: 600px;
  `,
  avatarRow: css`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f3f4f6;
  `,
  avatar: css`
    background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
    font-size: 32px !important;
    font-weight: 700 !important;
    flex-shrink: 0;
  `,
  fullName: css`
    font-size: 20px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin: 0 !important;
  `,
  username: css`
    font-size: 14px !important;
    color: #6b7280 !important;
    margin: 0 !important;
  `,
  fieldList: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  fieldRow: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  fieldLabel: css`
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #9ca3af !important;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 !important;
  `,
  fieldValue: css`
    font-size: 15px !important;
    color: #111827 !important;
    margin: 0 !important;
  `,
}))
