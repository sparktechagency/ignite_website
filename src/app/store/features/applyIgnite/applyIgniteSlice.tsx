import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChildInfo {
    ChildsSport: string | null
    ChildsFirstName: string | null
    ChildsLastName: string | null
    ChildsDateOfBirth: string | null
    ChildsGender: string | null
}

export interface ParentDetails {
    ParentFirstName: string | null
    ParentLastName: string | null
    ParentEmail: string | null
    ParentPhone: string | null
    ParentStreetAddress: string | null
    ParentCity: string | null
    ParentState: string | null
    ParentZipCode: string | null
    AnnualHouseholdIncome: number | string | null
}

export interface AboutChild {
    WhyShouldWeIGNITEYourChild: string | null
    VideosOrSocialMediaShowcase: string | null
    isShowCase: boolean
}

export interface ApplyIgniteState {
    step: number
    childInfo: ChildInfo
    parentDetails: ParentDetails
    aboutChild: AboutChild
}

const initialState: ApplyIgniteState = {
    step: 0,
    childInfo: {
        ChildsSport: null,
        ChildsFirstName: null,
        ChildsLastName: null,
        ChildsDateOfBirth: null,
        ChildsGender: null,
    },
    parentDetails: {
        ParentFirstName: null,
        ParentLastName: null,
        ParentEmail: null,
        ParentPhone: null,
        ParentStreetAddress: null,
        ParentCity: null,
        ParentState: null,
        ParentZipCode: null,
        AnnualHouseholdIncome: null,
    },
    aboutChild: {
        WhyShouldWeIGNITEYourChild: null,
        VideosOrSocialMediaShowcase: null,
        isShowCase: false,
    },
}

const applyIgniteSlice = createSlice({
    name: 'applyIgnite',
    initialState,
    reducers: {
        setChildInfo(state, action: PayloadAction<Partial<ChildInfo>>) {
            state.childInfo = { ...state.childInfo, ...action.payload }
        },
        setParentDetails(state, action: PayloadAction<Partial<ParentDetails>>) {
            state.parentDetails = { ...state.parentDetails, ...action.payload }
        },
        setAboutChild(state, action: PayloadAction<Partial<AboutChild>>) {
            console.log(state)
            state.aboutChild = { ...state.aboutChild, ...action.payload }
        },
        setStep(state, action: PayloadAction<number>) {
            state.step = action.payload
        },
        nextStep(state) {
            state.step += 1
        },
        prevStep(state) {
            state.step = Math.max(0, state.step - 1)
        },
        reset(state) {
            state.step = 0
            state.childInfo = {
                ChildsSport: '',
                ChildsFirstName: '',
                ChildsLastName: '',
                ChildsDateOfBirth: null,
                ChildsGender: '',
            }
            state.parentDetails = {
                ParentFirstName: '',
                ParentLastName: '',
                ParentEmail: '',
                ParentPhone: '',
                ParentStreetAddress: '',
                ParentCity: '',
                ParentState: '',
                ParentZipCode: '',
                AnnualHouseholdIncome: '',
            }
            state.aboutChild = {
                WhyShouldWeIGNITEYourChild: '',
                VideosOrSocialMediaShowcase: '',
                isShowCase: false,
            }
        },
    },
})

export const {
    setChildInfo,
    setParentDetails,
    setAboutChild,
    setStep,
    nextStep,
    prevStep,
    reset,
} = applyIgniteSlice.actions

export default applyIgniteSlice.reducer