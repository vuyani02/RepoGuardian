'use client'

import { useState } from 'react'
import { Form, Input, Modal, Typography } from 'antd'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'
import { useStyles } from './styles/AddRepositoryModal.style'
import { AddRepositoryModalProps } from '@/Types/Repository/Types'

const { Text } = Typography

const AddRepositoryModal = ({ open, onClose }: AddRepositoryModalProps) => {
  const { styles } = useStyles()
  const [form] = Form.useForm()
  const { addRepository } = useRepositoryActions()
  const { isAddPending } = useRepositoryState()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: { githubUrl: string }) => {
    setError(null)
    try {
      await addRepository(values.githubUrl)
      form.resetFields()
      onClose()
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { error?: { message?: string } } } })
        ?.response?.data?.error?.message
      setError(message ?? 'Failed to add repository. Please try again.')
    }
  }

  const handleCancel = () => {
    setError(null)
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Add Repository"
      okButtonProps={{ loading: isAddPending, className: styles.okBtn }}
      title={<span className={styles.modalTitle}>Add Repository</span>}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
        <Form.Item
          label="GitHub URL"
          name="githubUrl"
          rules={[
            { required: true, message: 'Please enter a GitHub URL' },
            {
              pattern: /^https:\/\/github\.com\/[^/]+\/[^/]+/,
              message: 'Must be a valid GitHub repo URL (e.g. https://github.com/owner/repo)',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="https://github.com/owner/repo"
            className={styles.input}
          />
        </Form.Item>
        {error && <Text type="danger">{error}</Text>}
      </Form>
    </Modal>
  )
}

export default AddRepositoryModal
