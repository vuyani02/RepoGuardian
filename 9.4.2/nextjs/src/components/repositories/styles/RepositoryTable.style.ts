import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  repoName: css`
    font-weight: 600;
    font-size: 14px;
    color: #111827;
  `,
  owner: css`
    font-size: 12px;
    color: #9ca3af;
    margin-top: 2px;
  `,
  url: css`
    font-size: 13px;
    color: #6b7280;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  `,
  scanBtn: css`
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 8px !important;
  `,
  toolbar: css`
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    padding: 16px 16px 0 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      margin-right: 0;
    }
  `,
  searchInput: css`
    width: 50%;
    min-width: 200px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  repoLink: css`
    font-weight: 600;
    font-size: 14px;
    color: #111827 !important;
  `,
  clickableRow: css`
    cursor: pointer;

    &:hover td {
      background: #f9fafb !important;
    }
  `,
}))
