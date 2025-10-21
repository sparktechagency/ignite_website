'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import ClubAcademyDetails, { ClubAcademyDetailsHandle } from './ClubAcademyDetails';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { nextStep, prevStep, reset } from '../../../store/features/applyClubSlice';
import LocationPrograms, { LocationProgramsHandle } from './LocationPrograms';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useClubCreateMutation } from '@/app/store/service/clubApis';
import { useRouter } from 'next/navigation';
import { FaInfoCircle } from 'react-icons/fa';
const stepsMeta = [
    { title: 'First' },
    { title: 'Second' },
];

const ClubJoiningApply: React.FC = () => {
    const dispatch = useAppDispatch();
    const [disabled, setDisabled] = useState(false)
    const current = useAppSelector(state => state.applyClub.step);
    const [isClubInfoHave, setIsClubInfoHave] = useState(false)
    const clubJoining = useAppSelector(state => state.applyClub);
    const childRef = useRef<ClubAcademyDetailsHandle>(null)
    const parentRef = useRef<LocationProgramsHandle>(null)
    const [clubCreate, { isLoading }] = useClubCreateMutation()
    const router = useRouter()
    useEffect(() => {
        const isClubInfoHave = Cookies.get('clubInfo')
        const { quantity } = JSON.parse(isClubInfoHave || '{}')
        if (!quantity) {
            setIsClubInfoHave(true)
            setDisabled(true)
        }
    }, [])
    const renderStep = () => {
        switch (current) {
            case 0:
                return <ClubAcademyDetails ref={childRef} />
            case 1:
                return <LocationPrograms ref={parentRef} />
            default:
                return null
        }
    }

    const handleNext = async () => {
        try {
            if (current === 0) await childRef.current?.validate()
            if (current === 1) await parentRef.current?.validate()
            dispatch(nextStep())
        } catch {
        }
    }

    const handleSubmit = async () => {
        try {
            if (current === 0) await childRef.current?.validate()
            if (current === 1) await parentRef.current?.validate()

            const clubInformationFormCookie = Cookies.get('clubInfo')
            const { quantity } = JSON.parse(clubInformationFormCookie || '{}')

            if (!quantity) {
                return toast.error('Quantity is required')
            }

            const payload = {
                name: clubJoining?.clubInfo?.clubName,
                sportsOffered: clubJoining?.clubInfo?.sportOffered || [],
                websiteLink: clubJoining?.clubInfo?.websiteURL,
                quantity,
                primaryContactName: clubJoining?.clubInfo?.primaryContactName,
                primaryContactEmail: clubJoining?.clubInfo?.primaryContactEmail,
                primaryContactPhone: clubJoining?.clubInfo?.primaryContactPhone,
                locations: clubJoining?.locationAndPrograms?.clubAddress || [],
                competitionLevel: clubJoining?.locationAndPrograms?.levelsOfCompetition,
            }

            for (const [key, value] of Object.entries(payload)) {
                if (!value) return toast.error(`${key} is required`)
            }
            const res = await clubCreate(payload).unwrap()
            if ('success' in res && res.success === false) {
                const message =
                    (res as { message?: string }).message || 'Failed to create club'
                throw new Error(message)
            }

            if ('success' in res && res.success) {
                toast.success('Club created successfully')
                Cookies.remove('clubInfo')
                dispatch(reset())

                const paymentUrl = (res as any)?.data?.paymentUrl
                if (typeof window !== 'undefined') {
                    window.open(paymentUrl, '_blank')
                } else {
                    router.push(paymentUrl)
                }
            }
        } catch (error: any) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
    }


    return (
        <div className='container mx-auto pb-16'>
            {
                isClubInfoHave && (
                    <div className='flex items-center justify-center flex-col gap-4 fixed top-1/2 left-1/2 transform p-12 -translate-x-1/2 -translate-y-1/2 border border-gray-200 rounded z-[999] backdrop-blur-2xl'>
                        <div>
                            <h1 className='text-2xl font-bold flex items-center justify-center gap-2 text-center'><FaInfoCircle /> Be The Spark Club</h1>
                            <p className='text-center'>Please select quantity before proceed to the club joining form</p>
                        </div>
                        <Button
                            style={{
                                backgroundImage: 'linear-gradient(to right, #BF0A30, #003F91)',
                                color: '#fff',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '5px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => router.push('/join-our-club')}>
                            Go to select quantity
                        </Button>
                    </div>
                )
            }
            <div

            >{renderStep()}</div>

            <div style={{ marginTop: 24 }}>

                <div className='flex gap-5 md:flex-row flex-col md:gap-10'>
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
                            disabled={disabled}
                            style={{
                                backgroundImage: disabled ? 'opacity(0.1)' : 'linear-gradient(to right, #BF0A30, #003F91)',
                                color: '#fff',
                                border: 'none',
                                padding: '20px 30px',
                                borderRadius: '5px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                marginLeft: '10px',
                            }}
                            className={disabled ? '!opacity-50' : ''}
                            onClick={handleNext}>
                            Next
                        </Button>
                    )}
                    {current === stepsMeta.length - 1 && (
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            style={{
                                backgroundImage: isLoading ? 'opacity(0.5)' : 'linear-gradient(to right, #BF0A30, #003F91)',
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
                            Join Be The Spark Club
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ClubJoiningApply;