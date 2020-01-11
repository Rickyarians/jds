import { Fragment, useState, useEffect } from 'react'
import {
  Input, Radio, Checkbox,
  Select, DatePicker, TimePicker,
  Upload, Icon, Button, Form, message
} from 'antd'
import moment from 'moment'
import _ from 'lodash'

import { uploadIcon } from '../../public/icons/profile'

const isRequired = (rules) => {
  if (rules) {
    const haveRequiredProperty = rules.map(i => i && i.required == true)
    const isFieldRequired = haveRequiredProperty.includes(true)

    if (isFieldRequired == true) {
      return (<span className="text-danger"> *</span>)
    }
  }

  return
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

let indexN = 0

const RenderInput = ({ formName, form, input, data, index }) => {
  const { getFieldDecorator, getFieldValue } = form
  const [filePreview, setFilePreview] = useState('')
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [initialValue, setInitalValue] = useState('')
  const [isOpenDialog, setOpenDialog] = useState(false)

  const { label, name, type, rules } = input
  let formInput = {}
  let config = { rules }
  let keys = []

  if (index == 0) {
    input.autoFocus = true
  }

  useEffect(() => {
    if (data) {
      if (type == 'date' || type == 'time' || type == 'datetime') {
        setInitalValue(moment(data[name]))
      } else if (type == 'file') {
        setFilePreview(data[name])
        setInitalValue(data[name])
        if (data[name] == null || data[name] == '' || data[name] == undefined) {
          setOpenDialog(true)
        } else {
          setOpenDialog(false)
        }
      } else if (type == 'select' && (input.mode == 'multiple' || input.mode == 'tags')) {
        setInitalValue(data[name].map(item => { return item.value }))
      } else {
        setInitalValue(data[name])
      }
    } else {
      setFilePreview('')
      setOpenDialog(true)
    }
  }, [data, input])

  useState(() => {
    if (filePreview == '' || !data[name]) {
      setOpenDialog(true)
    } else {
      setOpenDialog(false)
    }
  }, [filePreview])

  if (input.multiple && input.multiple == true) {
    getFieldDecorator('keys', { initialValue: [indexN] })
    keys = getFieldValue('keys');

    input.onPressEnter = e => {
      e.preventDefault()
      addField()
    }
  }

  const addField = () => {
    const nextKeys = keys.concat(++indexN)
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  const removeField = (index) => {
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== index),
    });
  }

  if (type == 'checkbox') {
    config = { ...config, valuePropName: 'checked' }
    if (initialValue == '') {
      config = { ...config, initialValue: false }
    }
    formInput = <Checkbox {...input}>{label}</Checkbox>
  } else if (type == 'radio') {
    formInput = (
      <Radio.Group>
        {input.options && input.options.map((option, itemIndex) => (
          <Radio key={itemIndex.toString()} value={option.value}>{option.label}</Radio>
        ))}
      </Radio.Group>
    )
  } else if (type == 'select') {
    if (initialValue == '' && input.mode == 'tags' || input.mode == 'multiple') {
      config = { ...config, initialValue: [] }
    }

    const deleteItem = (e, item) => {
      e.stopPropagation()
      input.onDeleteOption(item)
        .then(data => {
          if (data.status && data.message) {
            message[data.status](data.message)
          }
        })
    }

    formInput = (
      <Select
        {...input}
        optionLabelProp="label"
        menuItemSelectedIcon={<Icon type={input.menuItemSelectedIcon && input.menuItemSelectedIcon.type ? input.menuItemSelectedIcon.type : 'check'} />}
      >
        {input.options && input.options.map((option, itemIndex) => (
          <Select.Option key={itemIndex.toString()} value={option.value} label={option.label}>
            {
              input.onDeleteOption ? (
                <div>
                  {option.label}
                  <Icon type="delete" className="float-right text-danger" onClick={e => deleteItem(e, option)} />
                </div>
              ) : option.label
            }
          </Select.Option>
        ))}
      </Select>
    )
  } else if (type == 'date' || type == 'time' || type == 'datetime') {
    if (rules && rules.length > 0) {
      config = { rules: [...config.rules, { type: 'object' }] }
    }

    if (type == 'time') {
      if (initialValue == '') {
        config = { ...config, initialValue: moment().startOf('day') }
      }

      formInput = <TimePicker {...input} className="w-100" />
    } else {
      formInput = <DatePicker {...input} className="w-100" />
    }
  } else if (type == 'file') {
    const toggleOpenDialog = _ => {
      setOpenDialog(!isOpenDialog)
      const thisInput = document.getElementById(`${formName}_${name}`)
      thisInput.click()
      setTimeout(() => {
        setOpenDialog(false)
      }, 10)
    }

    const handleChange = info => {
      if (info.file.status === 'uploading') {
        setLoadingUpload(true)
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          setFilePreview(imageUrl)
          setLoadingUpload(false)
        })
      }
      setOpenDialog(false)
    }

    const beforeUpload = file => {
      let res = {}
      if (input.beforeUpload) {
        res = input.beforeUpload(file)
        if (res && res.status && res.status == 'error') {
          message[res.status](res.message)
          return false
        }
      }

      return true
    }

    const removeItem = e => {
      e.preventDefault()
      setOpenDialog(false)
      setFilePreview(null)

      form.setFieldsValue(name, null)
      form.setFieldsValue({ [name]: null })

      setTimeout(() => {
        setOpenDialog(true)
      }, 100)
    }

    formInput = (
      <Upload
        id={`upload-${name}`}
        {...input}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        openFileDialogOnClick={isOpenDialog}
      >
        {
          filePreview ? (
            <div className="position-relative edit-image m-n1">
              <div className="position-absolute w-100 h-100 edit-overlay">
                <div className="align-item-center d-flex h-100 justify-content overlay-edit">
                  <Icon component={uploadIcon} className="mr-1" onClick={toggleOpenDialog} />
                  <Icon type="delete" theme="filled" className="ml-1" onClick={removeItem} style={{ fontSize: 18, color: '#fff' }} />
                </div>
              </div>
              <img src={filePreview} alt="avatar" style={{ width: '100%' }} />
            </div>
          ) : (
              <div>
                <Icon type={loadingUpload ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
            )
        }
      </Upload>
    )
  } else if (type == 'password') {
    formInput = <Input.Password {...input} />
  } else if (type == 'textarea') {
    formInput = <Input.TextArea rows={5} {...input} />
  } else if (type !== 'text') {
    formInput = <Input type={type} {...input} />
  } else {
    formInput = <Input {...input} />
  }

  if (initialValue) {
    config = { ...config, initialValue }
  }

  const FieldsInput = (i) => (
    <div key={i.toString()} className="p-2 mb-4 position-relative" style={{ border: 'dashed 1px #aeaeae' }}>
      {
        keys.length > 1 ? <Button type="danger" shape="circle" size="small" icon="close" className="delete-input" onClick={() => removeField(i)} /> : ''
      }

      <Form.Item key={i.toString()} className={`${type == 'hidden' ? 'd-none' : ''} `}>
        {
          type !== 'checkbox'
            ? (
              <React.Fragment>
                <span className="label">{label}{isRequired(rules)}</span>
                {
                  getFieldDecorator(`fields[${i}].${name}`, config)(formInput)
                }
              </React.Fragment>
            ) : getFieldDecorator(name, config)(formInput)
        }
      </Form.Item>
    </div>
  )

  let fieldsInput = []
  if (input.multiple && input.multiple == true) {
    fieldsInput = keys.map(k => FieldsInput(k))
  }

  return (
    <Fragment>
      {
        !input.multiple ? (
          <Form.Item key={index.toString()} className={`${type == 'hidden' ? 'd-none' : ''} `}>
            {
              type !== 'checkbox'
                ? (
                  <React.Fragment>
                    <span className="label">{label}{isRequired(rules)}</span>
                    {
                      getFieldDecorator(name, config)(formInput)
                    }
                  </React.Fragment>
                ) : getFieldDecorator(name, config)(formInput)
            }
          </Form.Item>
        ) : input.multiple && input.multiple == true && type !== 'select' ?
            (
              <Fragment>
                {fieldsInput}
                <Form.Item>
                  <Button type="dashed" block={true} onClick={addField}>
                    <Icon type="plus" /> Add Field
                  </Button>
                </Form.Item>
              </Fragment>
            ) : ''
      }
    </Fragment>
  )
}

export default RenderInput
