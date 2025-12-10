'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import ChildInformation, { ChildInformationHandle } from './ChildInformation';
import ParentDetails, { ParentDetailsHandle } from './ParentDetails';
import AboutYourChild, { AboutYourChildHandle } from './AboutYourChild';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { nextStep, prevStep, reset } from '../../../store/features/applyIgnite/applyIgniteSlice';
import toast from 'react-hot-toast';
import { useCreateNominationMutation } from '@/app/store/service/nominationApis';
import { motion } from 'framer-motion';
const stepsMeta = [
    { title: 'First' },
    { title: 'Second' },
    { title: 'Last' },
];

const IgniteApply: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useAppSelector(s => s.applyIgnite.step);
    const applyIgnite = useAppSelector(s => s.applyIgnite);
    const childRef = useRef<ChildInformationHandle>(null)
    const parentRef = useRef<ParentDetailsHandle>(null)
    const aboutRef = useRef<AboutYourChildHandle>(null)
    const [createNomination, { isLoading }] = useCreateNominationMutation()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const renderStep = () => {
        switch (current) {
            case 0:
                return <ChildInformation ref={childRef} />
            case 1:
                return <ParentDetails ref={parentRef} />
            case 2:
                return <AboutYourChild ref={aboutRef} />
            default:
                return null
        }
    }

    const handleNext = async () => {
        try {
            if (current === 0) await childRef.current?.validate()
            if (current === 1) await parentRef.current?.validate()
            if (current === 2) await aboutRef.current?.validate()
            dispatch(nextStep())
        } catch {
        }
    }

    const handleSubmit = async () => {
        if (current === 0) await childRef.current?.validate()
        if (current === 1) await parentRef.current?.validate()
        if (current === 2) await aboutRef.current?.validate()
        try {

            const incomeRaw = applyIgnite?.parentDetails?.AnnualHouseholdIncome;
            const incomeParsed = typeof incomeRaw === 'string'
                ? parseInt(incomeRaw.replace(/[^0-9]/g, ''), 10)
                : incomeRaw as number | null;

            if (incomeParsed === null || Number.isNaN(incomeParsed)) {
                toast.error('Please fill in the annualHouseHoldIncome');
                return;
            }

            const genderValue = applyIgnite?.childInfo?.ChildsGender
                ? applyIgnite.childInfo.ChildsGender.charAt(0).toUpperCase() + applyIgnite.childInfo.ChildsGender.slice(1)
                : null;

            const payload = {
                childFirstName: applyIgnite?.childInfo?.ChildsFirstName,
                childLastName: applyIgnite?.childInfo?.ChildsLastName,
                childSport: applyIgnite?.childInfo?.ChildsSport,
                dateOfBirth: applyIgnite?.childInfo?.ChildsDateOfBirth,
                gender: genderValue,
                guardianFirstName: applyIgnite?.parentDetails?.ParentFirstName,
                guardianLastName: applyIgnite?.parentDetails?.ParentLastName,
                guardianEmail: applyIgnite?.parentDetails?.ParentEmail,
                annualHouseHoldIncome: incomeParsed,
                location: applyIgnite?.parentDetails?.location,
                guardianAddress: applyIgnite?.parentDetails?.guardianAddress,
                showcaseVideoLink: applyIgnite?.aboutChild?.VideosOrSocialMediaShowcase,
                childStory: applyIgnite?.aboutChild?.WhyShouldWeIGNITEYourChild,
                isShowCase: applyIgnite?.aboutChild?.isShowCase,
            };

            const data = Object.keys(payload).reduce((acc, key) => {
                const value = (payload as any)[key];
                if (value !== undefined && value !== null && value !== '') {
                    (acc as any)[key] = value;
                }
                return acc;
            }, {} as Record<string, any>);

            const res = await createNomination(data).unwrap()
            if (!res?.success) throw new Error(res?.message)
            toast.success(res?.data?.message || res?.message || 'Nomination created successfully')
            if (res?.success) {
                setIsSubmitted(true)
            }

        } catch (error: any) {
            toast.error(error?.error?.message || error?.data?.message || error?.message || 'Something went wrong while applying for IGNITE My Child')
        }
    }
    useEffect(() => {
        dispatch(reset())
    }, [])
    return (
        <div className='container mx-auto pb-16'>
            <div
            >{renderStep()}</div>
            {isSubmitted &&
                <div className="fixed flex items-center flex-col gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 bg-white z-999 p-4 shadow rounded">
                    <h1 className="text-green-500 text-2xl font-bold text-center mb-4">Success!</h1>
                    <p className="text-center text-gray-500">Your application has been successfully submitted.</p>
                    <Button onClick={() => {
                        setIsSubmitted(false)
                        dispatch(reset())
                        if (window !== undefined) {
                            window.location.reload()
                        }
                    }}>Ok</Button>
                </div>
            }
            {
                isSubmitted &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        setIsSubmitted(false)
                        dispatch(reset())
                        if (window !== undefined) {
                            window.location.reload()
                        }
                    }}
                    className="fixed inset-0 bg-black/50 z-777"
                />
            }
            <div style={{ marginTop: 24 }}>
                {current > 0 && (
                    <Button
                        style={{
                            backgroundImage: 'linear-gradient(to right, #BF0A30, #003F91)',
                            color: '#fff',
                            border: 'none',
                            padding: '20px 30px',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => dispatch(prevStep())}>
                        Previous
                    </Button>
                )}
                {current < stepsMeta.length - 1 && (
                    <Button
                        style={{
                            backgroundImage: 'linear-gradient(to right, #BF0A30, #003F91)',
                            color: '#fff',
                            border: 'none',
                            padding: '20px 30px',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            marginLeft: '10px',
                        }}
                        onClick={handleNext}>
                        Next
                    </Button>
                )}
                {current === stepsMeta.length - 1 && (
                    <Button
                        style={{
                            backgroundImage: 'linear-gradient(to right, #BF0A30, #003F91)',
                            color: '#fff',
                            border: 'none',
                            padding: '20px 30px',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            transition: 'all 0.3s ease',
                        }}
                        loading={isLoading}
                        onClick={() => handleSubmit()}>
                        IGNITE My Child
                    </Button>
                )}

            </div>
        </div >
    );
};

export default IgniteApply;