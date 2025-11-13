"use client"
import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Divider, Button, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setLocationAndPrograms, type LocationAndPrograms, type ClubAddress } from '../../../store/features/applyClubSlice'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

export type LocationProgramsHandle = { validate: () => Promise<any> }

const competitionLevels: { value: string; label: string }[] = [
    { value: 'Local (city) Recreational', label: 'Local (city) Recreational' },
    { value: 'Local (city) Competitive', label: 'Local (city) Competitive' },
    { value: 'Regional (in-State) Competitive', label: 'Regional (in-State) Competitive' },
    { value: 'Regional (out-of-State) Competitive', label: 'Regional (out-of-State) Competitive' },
    { value: 'National Competitive', label: 'National Competitive' },
]

const LocationPrograms = React.forwardRef<LocationProgramsHandle, {}>(function LocationPrograms(_, ref) {
    const dispatch = useAppDispatch()
    const locationAndPrograms = useAppSelector(s => s.applyClub.locationAndPrograms)
    const [form] = Form.useForm<LocationAndPrograms>()

    useEffect(() => {
        form.setFieldsValue(locationAndPrograms as any)
    }, [locationAndPrograms, form])

    React.useImperativeHandle(ref, () => ({
        validate: () => form.validateFields(),
    }), [form])

    return (
        <>
            <div className='mb-4'>
                <h1 className='text-2xl font-bold'>Location & Programs</h1>
                <p className='text-gray-500'>Add one or more addresses for your club locations.</p>
            </div>
            <Divider />
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                initialValues={locationAndPrograms as any}
                onValuesChange={(_, allValues) => dispatch(setLocationAndPrograms(allValues))}
            >
                <Form.List name="clubAddress">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Row gutter={24} key={field.key} align="bottom">
                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'streetAddress']}
                                            fieldKey={[field.fieldKey!, 'streetAddress']}
                                            label={`Street Address ${String(index + 1).padStart(2, '0')}`}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder='Enter street address' size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'city']}
                                            fieldKey={[field.fieldKey!, 'city']}
                                            label={`City ${String(index + 1).padStart(2, '0')}`}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder='Enter city' size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'zipCode']}
                                            fieldKey={[field.fieldKey!, 'zipCode']}
                                            label={`Zip/Postal Code ${String(index + 1).padStart(2, '0')}`}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder='Enter zip/postal code' size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col className='mb-6' md={2}>
                                        {index === fields.length - 1 ? (
                                            <Button
                                                icon={<LocationIcon />}
                                                size='large'
                                                onClick={() => add({ streetAddress: null, city: null, state: null, zipCode: null } as ClubAddress)} />
                                        ) : (
                                            <Button danger size='large' onClick={() => remove(field.name)}>Remove</Button>
                                        )}
                                    </Col>
                                </Row>
                            ))}
                            {fields.length === 0 && (
                                <Row>
                                    <Col>
                                        <Button icon={<LocationIcon />} size='large' onClick={() => add({ streetAddress: null, city: null, state: null, zipCode: null } as ClubAddress)}>
                                            Add Address
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </>
                    )}
                </Form.List>
                <Row gutter={24}>
                    <Col xs={24} md={24}>
                        <Form.Item name="levelsOfCompetition" label="Levels of Competition (check all that apply)" rules={[{ required: true }]}>
                            <Select
                                suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6' />}
                                mode="multiple"
                                placeholder='Select Levels of Competition'
                                allowClear
                                size='large'
                                options={competitionLevels}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </>
    )
})

export default LocationPrograms

const LocationIcon = () => {
    return (
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0267 2.37653C13.0708 2.28844 13.0972 2.19252 13.1042 2.09425C13.1112 1.99598 13.0988 1.8973 13.0676 1.80383C13.0365 1.71036 12.9873 1.62395 12.9227 1.54951C12.8582 1.47508 12.7796 1.41409 12.6915 1.37003C11.5463 0.794398 10.2817 0.496363 9 0.500033C4.45125 0.500033 0.75 4.20128 0.75 8.75003C0.75 14.2708 8.18175 21.023 8.49825 21.3073C8.64075 21.4363 8.82075 21.5 9 21.5C9.17925 21.5 9.35925 21.4363 9.50175 21.3073C9.81825 21.023 17.25 14.2708 17.25 8.75003C17.25 8.55112 17.171 8.36036 17.0303 8.2197C16.8897 8.07905 16.6989 8.00003 16.5 8.00003C16.3011 8.00003 16.1103 8.07905 15.9697 8.2197C15.829 8.36036 15.75 8.55112 15.75 8.75003C15.75 12.8435 10.6425 18.1258 9 19.7188C7.3575 18.1258 2.25 12.8435 2.25 8.75003C2.25 5.02853 5.2785 2.00003 9 2.00003C10.0612 2.00003 11.0782 2.23928 12.0203 2.71103C12.1082 2.75546 12.2042 2.78205 12.3025 2.78927C12.4008 2.79649 12.4995 2.7842 12.5931 2.75312C12.6866 2.72203 12.7731 2.67275 12.8475 2.60813C12.9219 2.5435 12.9829 2.46479 13.0267 2.37653Z" fill="url(#paint0_linear_13213_4516)" />
            <path d="M4.5 8.75C4.5 11.2318 6.51825 13.25 9 13.25C11.4818 13.25 13.5 11.2318 13.5 8.75C13.5 6.26825 11.4818 4.25 9 4.25C6.51825 4.25 4.5 6.26825 4.5 8.75ZM12 8.75C12 10.4045 10.6545 11.75 9 11.75C7.3455 11.75 6 10.4045 6 8.75C6 7.0955 7.3455 5.75 9 5.75C10.6545 5.75 12 7.0955 12 8.75ZM18.75 3.125H16.875V1.25C16.875 1.05109 16.796 0.860322 16.6553 0.71967C16.5147 0.579018 16.3239 0.5 16.125 0.5C15.9261 0.5 15.7353 0.579018 15.5947 0.71967C15.454 0.860322 15.375 1.05109 15.375 1.25V3.125H13.5C13.3011 3.125 13.1103 3.20402 12.9697 3.34467C12.829 3.48532 12.75 3.67609 12.75 3.875C12.75 4.07391 12.829 4.26468 12.9697 4.40533C13.1103 4.54598 13.3011 4.625 13.5 4.625H15.375V6.5C15.375 6.69891 15.454 6.88968 15.5947 7.03033C15.7353 7.17098 15.9261 7.25 16.125 7.25C16.3239 7.25 16.5147 7.17098 16.6553 7.03033C16.796 6.88968 16.875 6.69891 16.875 6.5V4.625H18.75C18.9489 4.625 19.1397 4.54598 19.2803 4.40533C19.421 4.26468 19.5 4.07391 19.5 3.875C19.5 3.67609 19.421 3.48532 19.2803 3.34467C19.1397 3.20402 18.9489 3.125 18.75 3.125Z" fill="url(#paint1_linear_13213_4516)" />
            <defs>
                <linearGradient id="paint0_linear_13213_4516" x1="0.75" y1="11" x2="17.25" y2="11" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D62828" />
                    <stop offset="1" stop-color="#003F91" />
                </linearGradient>
                <linearGradient id="paint1_linear_13213_4516" x1="4.5" y1="6.875" x2="19.5" y2="6.875" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D62828" />
                    <stop offset="1" stop-color="#003F91" />
                </linearGradient>
            </defs>
        </svg>

    )
}