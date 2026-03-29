'use client'

import { Form, Input, Modal } from 'antd'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AddRepositoryModal({ open, onClose }: Props) {
  const [form] = Form.useForm()
  const { addRepository } = useRepositoryActions()
  const { isAddPending } = useRepositoryState()

  const handleSubmit = async (values: { githubUrl: string }) => {
    await addRepository(values.githubUrl)
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Add Repository"
      okButtonProps={{
        loading: isAddPending,
        style: { background: '#4f46e5', borderColor: '#4f46e5' },
      }}
      title={<span style={{ fontWeight: 700 }}>Add Repository</span>}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
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
            style={{ borderRadius: 10 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
