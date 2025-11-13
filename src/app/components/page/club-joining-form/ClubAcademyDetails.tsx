"use client"
import React, { useEffect } from 'react'
import { Form, Input, Select, Row, Col, Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setClubInfo, type ClubInfo } from '../../../store/features/applyClubSlice'
import { SportType } from '../IGNITE-Component/ChildInformation'
import { useGetCategoryQuery } from '@/app/store/service/categoryApis'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export type ClubAcademyDetailsHandle = { validate: () => Promise<any> }

const ClubAcademyDetails = React.forwardRef<ClubAcademyDetailsHandle, {}>(function ClubAcademyDetails(_, ref) {
    const dispatch = useAppDispatch()
    const clubInfo = useAppSelector(s => s.applyClub.clubInfo)
    const [form] = Form.useForm<ClubInfo>()
    const { data: categoryData, isLoading } = useGetCategoryQuery(undefined)

    useEffect(() => {
        form.setFieldsValue(clubInfo as any)
    }, [clubInfo, form])

    React.useImperativeHandle(ref, () => ({
        validate: () => form.validateFields(),
    }), [form])

    return (
        <>
            <div className='mb-4'>
                <h1 className='text-2xl font-bold'>Club / Academy Details</h1>
                <p className='text-gray-500'>Share your basic organization and contact information so families can reach you.</p>
            </div>
            <Divider />
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                initialValues={clubInfo as any}
                onValuesChange={(_, allValues) => {
                    const next: Partial<ClubInfo> = {
                        ...allValues,
                    }
                    dispatch(setClubInfo(next))
                }}
            >
                <Row gutter={16}>
                    <Col xs={24} md={24}>
                        <Form.Item style={{ fontFamily: "../../../../../public/assets/fonts/Syne-Bold.ttf" }} name="clubName" label="Academy or Club Name" rules={[{ required: true }]}>
                            <Input placeholder='Enter your academy or club name' size="large" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={24} >
                        <Form.Item name="sportOffered" label="Sport Offered ( Multiple Choses )" rules={[{ required: true }]}>
                            <Select
                                suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6'/>}
                                loading={isLoading}
                                mode="multiple"
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
                </Row>
                <Row gutter={16}>
                    <Col xs={24} md={24}>
                        <Form.Item name="websiteURL" label="Website URL" rules={[{ required: true }]}>
                            <Input placeholder='Enter website url' size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="primaryContactName" label="Primary Contact Name" rules={[{ required: true }]}>
                            <Input placeholder='Enter primary contact name' size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="primaryContactEmail" label="Primary Contact Email" rules={[{ required: true }]}>
                            <Input placeholder='Enter primary contact email' size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="primaryContactPhone" label="Primary Contact Phone" rules={[{ required: true }]}>
                            <Input placeholder='Enter primary contact phone' size="large" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
})

export default ClubAcademyDetails