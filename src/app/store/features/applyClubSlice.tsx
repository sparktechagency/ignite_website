import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ClubInfo {
    clubName: string | null
    sportOffered: string[] | null
    websiteURL: string | null
    primaryContactName: string | null
    primaryContactEmail: string | null
    primaryContactPhone: string | null
}

export interface ClubAddress {
    streetAddress: string | null
    city: string | null
    state: string | null
    zipCode: string | null
}

export interface LocationAndPrograms {
    clubAddress: ClubAddress[]
    levelsOfCompetition?: string[] | null
}

export interface ApplyClubState {
    step: number
    clubInfo: ClubInfo
    locationAndPrograms: LocationAndPrograms
}

const initialState: ApplyClubState = {
    step: 0,
    clubInfo: {
        clubName: null,
        sportOffered: null,
        websiteURL: null,
        primaryContactName: null,
        primaryContactEmail: null,
        primaryContactPhone: null,
    },
    locationAndPrograms: {
        clubAddress: [
            {
                streetAddress: null,
                city: null,
                state: null,
                zipCode: null,
            }
        ],
        levelsOfCompetition: null,
    },
}

const applyClubSlice = createSlice({
    name: 'applyClub',
    initialState,
    reducers: {
        setClubInfo(state, action: PayloadAction<Partial<ClubInfo>>) {
            state.clubInfo = { ...state.clubInfo, ...action.payload }
        },
        setLocationAndPrograms(state, action: PayloadAction<Partial<LocationAndPrograms>>) {
            state.locationAndPrograms = { ...state.locationAndPrograms, ...action.payload }
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
            state.clubInfo = {
                clubName: null,
                sportOffered: null,
                websiteURL: null,
                primaryContactName: null,
                primaryContactEmail: null,
                primaryContactPhone: null,
            }
            state.locationAndPrograms = {
                clubAddress: [
                    {
                        streetAddress: null,
                        city: null,
                        state: null,
                        zipCode: null,
                    }
                ],
                levelsOfCompetition: null,
            }
        },
    },
})

export const {
    setClubInfo,
    setLocationAndPrograms,
    setStep,
    nextStep,
    prevStep,
    reset,
} = applyClubSlice.actions

export default applyClubSlice.reducer