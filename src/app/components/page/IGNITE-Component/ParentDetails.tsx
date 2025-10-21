"use client"
import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setParentDetails, type ParentDetails as ParentDetailsType } from '../../../store/features/applyIgnite/applyIgniteSlice'
import { FaInfoCircle } from 'react-icons/fa'

export type ParentDetailsHandle = { validate: () => Promise<any> }

const ParentDetails = React.forwardRef<ParentDetailsHandle, {}>(function ParentDetails(_, ref) {
  const dispatch = useAppDispatch()
  const parentDetails = useAppSelector(s => s.applyIgnite.parentDetails)
  const [form] = Form.useForm<ParentDetailsType>()

  useEffect(() => {
    form.setFieldsValue(parentDetails)
  }, [parentDetails, form])

  React.useImperativeHandle(ref, () => ({
    validate: () => form.validateFields(),
  }), [form])

  return (
    <>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Parent/Guardian Details</h1>
        <p className='text-gray-500'>Help us get in touch with you. Accurate contact information ensures we can connect your child with local academies or clubs.</p>
      </div>
      <Divider />
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={parentDetails}
        onValuesChange={(_, allValues) => dispatch(setParentDetails(allValues))}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item name="ParentFirstName" label="Parent/Guardian First Name" rules={[{ required: true }]}>
              <Input placeholder='Enter Parent First Name' size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="ParentLastName" label="Parent/Guardian Last Name" rules={[{ required: true }]}>
              <Input placeholder='Enter Parent Last Name' size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item name="ParentEmail" label="Email" rules={[{ type: 'email', required: true }]}>
              <Input placeholder='Enter Email' size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="ParentPhone" label="Phone" rules={[{ required: true }]}>
              <Input placeholder='Enter Phone' size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Form.Item name="ParentStreetAddress" label="Street Address" rules={[{ required: true }]}>
              <Input placeholder='Enter your street address' size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="ParentCity" label="City / State" rules={[{ required: true }]}>
              <Input placeholder='Enter your City / State' size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="ParentZipCode" label="Zip/Postal Code" rules={[{ required: true }]}>
              <Input placeholder='Enter your Zip/Postal Code' size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={24}>
            <Form.Item name="AnnualHouseholdIncome" label="Annual Household Income (Gross amount, before taxes & deductions)" rules={[{ required: true }]}>
              <Input placeholder='Enter your Annual Household Income' size="large" />
            </Form.Item>
          </Col>
        </Row>
        <p className='flex items-center gap-2'><FaInfoCircle /> If a connection with an academy or club is established, documentation to substantiate your household income, such as tax returns, will be required.</p>
      </Form>

    </>
  )
})

export default ParentDetails