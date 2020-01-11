import { useState } from 'react'
import { Alert, Form, Input, Checkbox, Button, Divider  } from 'antd'

import RenderInput from './RenderFields'

function PendaftaranForm({ form, inputs, links, submitText, onSubmit }) {

  const [loading, setLoading] = useState(false)
  const [message, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const { getFieldDecorator, validateFields } = form


  async function _handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await validateFields(async (err, values) => {
      if (!err) {
        if (onSubmit) {
          const result = await onSubmit(values)
        }
      }

      setLoading(false)
    })
  }

  return (
    <Form action="#" onSubmit={_handleSubmit}>
      <Alert
        message={message}
        className={`mb-2 ${!message ? 'd-none' : ''}`}
        type={alertType}
        closable
        showIcon
      />

      {
        inputs && inputs.map((input, index) => <RenderInput key={index.toString()} input={input} index={index} form={form} />)
      }


      <div>
        <Button htmlType="submit" loading={loading} block={true} className="btn-gold p-2 mb-3" onClick={_handleSubmit}>
          <span className="text-bold">{submitText ? submitText : 'Submit'}</span>
        </Button>
      </div>
    </Form>
  )
}

export default Form.create({ name: 'PendaftaraForm' })(PendaftaranForm)
