'use client'
import { useCreateDonationMutation } from '@/app/store/service/donationApis'
import { Button, Checkbox, Divider, Form, Input, Select } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { BsExclamationOctagon } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

type FundOption = 'IGNITE_FUND' | 'IGNITE_A_CHILD'
type AmountTier = 'Spark' | 'Flame' | 'Blaze' | 'Inferno' | 'Custom'
type Frequency = 'One-time' | 'Weekly' | 'Monthly' | 'Yearly'
const AMOUNT_MAP: Record<Exclude<AmountTier, 'Custom'>, number> = {
    Spark: 10,
    Flame: 25,
    Blaze: 50,
    Inferno: 100,
}

function formatCurrency(n: number) {
    return `$ ${n.toFixed(2)}`
}

function SupportAthletForm() {
    const [form] = Form.useForm()

    const fund = Form.useWatch<FundOption>('fund', form)
    const tier = Form.useWatch<AmountTier>('amountTier', form)
    const customAmount = Form.useWatch<number>('customAmount', form)
    const coverFee = Form.useWatch<boolean>('coverFee', form)
    const frequency = Form.useWatch<Frequency>('frequency', form)
    const [createDonation, { isLoading }] = useCreateDonationMutation()
    const router = useRouter()

    const baseAmount = (() => {
        if (fund === 'IGNITE_A_CHILD') return 1000
        if (tier === 'Custom') return Number(customAmount) || 0
        if (!tier) return 0
        return AMOUNT_MAP[tier]
    })()

    const fee = coverFee ? +(baseAmount * 0.03).toFixed(2) : 0
    const total = +(baseAmount + fee).toFixed(2)
    const total_for_backend = baseAmount

    const showFrequency = fund === 'IGNITE_FUND'
    const showCustom = tier === 'Custom' && fund === 'IGNITE_FUND'

    const amountOptions = fund === 'IGNITE_A_CHILD'
        ? [{ value: 'Custom', label: '$1000' }]
        : [
            { value: 'Spark', label: 'Spark ($10)' },
            { value: 'Flame', label: 'Flame ($25)' },
            { value: 'Blaze', label: 'Blaze ($50)' },
            { value: 'Inferno', label: 'Inferno ($100)' },
            { value: 'Custom', label: 'Custom amount' },
        ]

    const summaryTitle = (() => {
        if (fund === 'IGNITE_A_CHILD') return 'IGNITE a Child Donation'
        if (!tier) return 'Donation Summary'
        const freqLabel = showFrequency && frequency ? ` ${frequency}` : ''
        const tierLabel = tier === 'Custom' ? 'Custom' : tier
        return `${tierLabel}${freqLabel} Donation`
    })()

    const onValuesChange = (changed: any) => {
        if (changed.fund === 'IGNITE_A_CHILD') {
            form.setFieldsValue({ frequency: undefined, amountTier: 'Custom', customAmount: 1000 })
        }

        if (changed.amountTier && changed.amountTier !== 'Custom') {
            form.setFieldsValue({ customAmount: undefined })
        }
    }

    const onFinish = async (values: any) => {
        try {
            const payload = {
                fund: values.fund as FundOption,
                amountTier: values.amountTier as AmountTier,
                customAmount: values.customAmount ? Number(values.customAmount) : undefined,
                frequency: showFrequency ? (values.frequency as Frequency) : undefined,
                coverFee: !!values.coverFee,
                total_for_backend,
            }
            const finalPayload = {
                amount: payload.total_for_backend,
                fundType: payload.fund,
                ...payload.frequency !== undefined && { frequency: payload.frequency },
                freeCovered: payload.coverFee
            }
            const response = await createDonation(finalPayload).unwrap()
            if (!response?.success) throw new Error(response?.message)
            if (response?.success) {
                toast.success(response?.message)
                form.resetFields()
                if (window !== undefined) {
                    window.open(response?.data?.paymentUrl, '_blank')
                } else {
                    router.push(response?.data?.paymentUrl)
                }
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Something went wrong')
        }
    }

    return (
        <div>
            {fund === 'IGNITE_A_CHILD' && <div className="p-4 bg-[#4176FC0D] border border-[#4176FC]/50 mb-12 text-[#2863FA] mt-4 rounded-xl flex gap-2 justify-start items-start">
                <BsExclamationOctagon className="leading-none m-0 p-0" size={20} />
                <h1 className="flex gap-2">$1000 downpayment – full costs will range from $1500 to $8000+</h1>
            </div>}
            <Form
                form={form}
                requiredMark={false}
                layout='vertical'
                initialValues={{ coverFee: true, fund: 'IGNITE_FUND', frequency: undefined }}
                onValuesChange={onValuesChange}
                onFinish={onFinish}
            >
                <Form.Item
                    name="fund"
                    label="Select a Fund to Support"
                    rules={[{ required: true, message: 'Please select a fund to support' }]}
                >
                    <Select
                        suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6' />}
                        size='large'
                        placeholder="Select a Fund to Support"
                        options={[
                            { value: 'IGNITE_FUND', label: 'IGNITE Fund - Donate to our general fund that is dispersed to many athletes.' },
                            { value: 'IGNITE_A_CHILD', label: 'IGNITE a Child - Champion Donor - Support a Child directly, and commit to covering their full costs.' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="amountTier"
                    label="Donation Amount"
                    rules={[{ required: true, message: 'Please select a donation amount' }]}
                >
                    <Select
                        suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6' />}
                        size='large'
                        placeholder="Donation Amount"
                        options={amountOptions}
                        disabled={fund === 'IGNITE_A_CHILD'}
                    />
                </Form.Item>

                {showCustom && (
                    <Form.Item
                        name="customAmount"
                        label="Enter Custom Amount"
                        rules={[
                            { required: true, message: 'Please enter an amount' },
                            {
                                validator: (_, value) => {
                                    const n = Number(value)
                                    if (!value || isNaN(n) || n <= 0) return Promise.reject('Enter a valid positive amount')
                                    return Promise.resolve()
                                }
                            }
                        ]}
                    >
                        <Input size='large' placeholder='e.g., 250' inputMode='numeric' />
                    </Form.Item>
                )}

                {showFrequency && (
                    <Form.Item
                        name="frequency"
                        label="Donation Frequency"
                        rules={[{ required: true, message: 'Please select a donation frequency' }]}
                    >
                        <Select
                            size='large'
                            suffixIcon={<MdOutlineKeyboardArrowDown className='w-6 h-6'/>}
                            placeholder="Donation Frequency"
                            options={[
                                { value: 'One-time', label: 'One-time' },
                                { value: 'Weekly', label: 'Weekly' },
                                { value: 'Monthly', label: 'Monthly' },
                                { value: 'Yearly', label: 'Yearly' },
                            ]}
                        />
                    </Form.Item>
                )}

                <Form.Item name="coverFee" valuePropName='checked'>
                    <Checkbox defaultChecked>
                        Help us cover processing fees so 100% of your donation reaches the athletes (adds 3%)
                    </Checkbox>
                </Form.Item>

                <div className="flex items-center mb-12 flex-col justify-between">
                    <div className='flex w-full justify-between'>
                        <h1>{summaryTitle}</h1>
                        <p>{formatCurrency(baseAmount)}</p>
                    </div>
                    {coverFee && <div className='flex w-full justify-between'>
                        <p>3% Cover the Fee</p>
                        <p>{formatCurrency(fee)}</p>
                    </div>}
                    <Divider />
                    <div className='flex w-full justify-between'>
                        <h1>Total</h1>
                        <p>{formatCurrency(total)}</p>
                    </div>
                </div>

                <Form.Item shouldUpdate>
                    <Button
                        loading={isLoading}
                        style={{
                            background: baseAmount <= 0 ? '#ccc' : 'linear-gradient(180deg, #BF0A30 0%, #003F91 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            cursor: baseAmount <= 0 ? 'not-allowed' : 'pointer',
                        }}
                        size="large"
                        htmlType="submit"
                        disabled={baseAmount <= 0}
                    >
                        Donate Now
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default SupportAthletForm