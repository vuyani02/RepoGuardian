import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  teamNameCard: css`
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  `,
  teamNameRow: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,
  teamAvatar: css`
    background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
    font-size: 28px !important;
    font-weight: 700 !important;
    flex-shrink: 0;
  `,
  teamNameText: css`
    font-size: 22px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin: 0 !important;
  `,
  membersCard: css`
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  `,
  tableWrap: css`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  `,
  sectionTitle: css`
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #374151 !important;
    margin-bottom: 16px !important;
  `,
  avatarCell: css`
    background: #eef2ff !important;
    color: #4f46e5 !important;
    font-weight: 600 !important;
  `,
}))
