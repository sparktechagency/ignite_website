"use client"
import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Switch, Radio, ConfigProvider } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setAboutChild, type AboutChild as AboutChildType } from '../../../store/features/applyIgnite/applyIgniteSlice'

export type AboutYourChildHandle = { validate: () => Promise<any> }

const AboutYourChild = React.forwardRef<AboutYourChildHandle, {}>(function AboutYourChild(_, ref) {
  const dispatch = useAppDispatch()
  const aboutChild = useAppSelector(s => s.applyIgnite.aboutChild)
  const [form] = Form.useForm<AboutChildType>()

  useEffect(() => {
    form.setFieldsValue(aboutChild)
  }, [aboutChild, form])

  React.useImperativeHandle(ref, () => ({
    validate: () => form.validateFields(),
  }), [form])

  return (
    <>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Tell Us More About Your Child</h1>
        <p className='text-gray-500'>Share your child’s story, achievements, and consent preferences so we can provide the best opportunities.</p>
      </div>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={aboutChild}
        onValuesChange={(_, allValues) => dispatch(setAboutChild(allValues))}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="WhyShouldWeIGNITEYourChild" label="Why should we IGNITE your child?" rules={[{ required: true }]}>
              <Input.TextArea
                maxLength={500}
                showCount
                rows={5} placeholder="Share your child’s story and why they should be IGNITED" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="VideosOrSocialMediaShowcase" label="Videos or Social Media Showcase (Optional)">
              <Input size="large" placeholder="Provide a link to highlight reels or publicly shared videos of your child" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="ShowcasingOptIn" label={
              <div className='flex flex-col gap-1'>
                <span>Showcasing Option</span>
                <small className='text-gray-500'>Allow IGNITE to share your child's highlight reels with prospective clubs & academies.</small>
              </div>
            } valuePropName="checked">
              <ConfigProvider theme={{
                components: {
                  Radio: {
                    buttonSolidCheckedBg: "rgb(136,148,166)",
                    buttonSolidCheckedHoverBg: "rgb(127,132,139)",
                    borderRadius: 1
                  }
                }
              }}><Radio.Group
                  size='large'
                  block
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  defaultValue={aboutChild.ShowcasingOptIn}
                  optionType="button"
                  buttonStyle="solid"
                />
              </ConfigProvider>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
})

export default AboutYourChild