"use client"
import React, { useEffect } from 'react'
import { Form, Input, Select, Row, Col, DatePicker, Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setChildInfo, type ChildInfo } from '../../../store/features/applyIgnite/applyIgniteSlice'
import dayjs, { Dayjs } from 'dayjs'
import { useGetCategoryQuery } from '@/app/store/service/categoryApis'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export type ChildInformationHandle = { validate: () => Promise<any> }

export interface SportType {
  _id: string
  name: string
}

const gender: { value: 'Male' | 'Female', label: string }[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]

const ChildInformation = React.forwardRef<ChildInformationHandle, {}>(function ChildInformation(_, ref) {
  const dispatch = useAppDispatch()
  const childInfo = useAppSelector(s => s.applyIgnite.childInfo)
  const [form] = Form.useForm<any>()
  const { data: categoryData } = useGetCategoryQuery({ limit: 999, sort: 'name' })

  useEffect(() => {
    const mapped = {
      ...childInfo,
      ChildsDateOfBirth: childInfo?.ChildsDateOfBirth ? dayjs(childInfo.ChildsDateOfBirth) : null,
    }
    form.setFieldsValue(mapped)
  }, [childInfo, form])

  React.useImperativeHandle(ref, () => ({
    validate: () => form.validateFields(),
  }), [form])

  return (
    <>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Child’s Information</h1>
        <p className='text-gray-500'>Provide essential details about your child so we can understand their needs and connect them with the right opportunities.</p>
      </div>
      <Divider />
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={{
          ...childInfo,
          ChildsDateOfBirth: childInfo?.ChildsDateOfBirth ? dayjs(childInfo.ChildsDateOfBirth) : null,
        }}
        onValuesChange={(_, allValues) => {
          const dob: Dayjs | null | undefined = allValues?.ChildsDateOfBirth
          const next: Partial<ChildInfo> = {
            ...allValues,
            ChildsDateOfBirth: dob ? dob.format('YYYY-MM-DD') : null,
          }
          dispatch(setChildInfo(next as any))
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="ChildsSport" label="Child's Sport" rules={[{ required: true }]}>
              <Select
                suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6' />}
                placeholder='Select Child’s Sport'
                allowClear
                size='large'
                options={categoryData?.data?.result?.length ? categoryData?.data?.result?.map((item: SportType) => ({
                  value: item._id,
                  label: item.name,
                })) : []}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="ChildsGender" label="Child's Gender" rules={[{ required: true }]}>
              <Select
                suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6' />}
                placeholder='Select Gender'
                allowClear
                size='large'
                options={gender}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="ChildsFirstName" label="Child's First Name" rules={[{ required: true }]}>
              <Input placeholder='Enter first name' size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="ChildsLastName" label="Child's Last Name" rules={[{ required: true }]}>
              <Input placeholder='Enter last name' size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={24}>
            <Form.Item style={{ width: '100%' }} name="ChildsDateOfBirth" label="Date of Birth (YYYY-MM-DD)" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
})

export default ChildInformation