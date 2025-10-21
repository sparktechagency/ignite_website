'use client'
import React, { useRef } from 'react';
import { Button, message } from 'antd';
import ChildInformation, { ChildInformationHandle } from './ChildInformation';
import ParentDetails, { ParentDetailsHandle } from './ParentDetails';
import AboutYourChild, { AboutYourChildHandle } from './AboutYourChild';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { nextStep, prevStep, reset } from '../../../store/features/applyIgnite/applyIgniteSlice';
import toast from 'react-hot-toast';
import { useCreateNominationMutation } from '@/app/store/service/nominationApis';

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
    const [createNomination] = useCreateNominationMutation()

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
        try {
            if (current === 0) await childRef.current?.validate()
            if (current === 1) await parentRef.current?.validate()
            if (current === 2) await aboutRef.current?.validate()

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
                guardianStreetAddress: applyIgnite?.parentDetails?.ParentStreetAddress,
                guardianCityS: applyIgnite?.parentDetails?.ParentCity,
                guardianZipCode: applyIgnite?.parentDetails?.ParentZipCode,
                guardianState: applyIgnite?.parentDetails?.ParentCity,
                annualHouseHoldIncome: incomeParsed,
                showcaseVideoLink: applyIgnite?.aboutChild?.VideosOrSocialMediaShowcase,
                childStory: applyIgnite?.aboutChild?.WhyShouldWeIGNITEYourChild,
            };
            const res = await createNomination(payload).unwrap()
            if (!res?.success) throw new Error(res?.message)
            toast.success(res?.data?.message || res?.message || 'Nomination created successfully')
            dispatch(reset())
        } catch (error: any) {
            toast.error(error?.error?.message || error?.data?.message || error?.message || 'Something went wrong while applying for IGNITE My Child')
        }
    }

    return (
        <div className='container mx-auto pb-16'>
            <div

            >{renderStep()}</div>

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
                        onClick={() => handleSubmit()}>
                        IGNITE My Child
                    </Button>
                )}

            </div>
        </div>
    );
};

export default IgniteApply;