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
  roleAdmin: css`
    display: inline-block;
    padding: 2px 10px;
    border-radius: 9999px;
    background: #eef2ff;
    color: #4f46e5;
    font-size: 12px;
    font-weight: 600;
  `,
  roleMember: css`
    display: inline-block;
    padding: 2px 10px;
    border-radius: 9999px;
    background: #f3f4f6;
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
  `,
  actions: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  makeAdminBtn: css`
    color: #4f46e5 !important;
    border-color: #4f46e5 !important;
    &:hover {
      background: #eef2ff !important;
    }
  `,
}))
