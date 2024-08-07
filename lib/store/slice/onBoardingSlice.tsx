import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "./userSlice";
interface OnBoarding {
    stageOne: boolean,
    stageTwo: boolean,
    stageThree: boolean,
    chosenRole: UserRole,
    first_name: string,
    last_name: string,
    phone_number: string,
    license_number: string,
    onboard: boolean,
    loading: boolean
}

interface OnboardingStages {
    stageOne: boolean,
    stageTwo: boolean,
    stageThree: boolean,
}

const initialState:OnBoarding = {
    stageOne: true,
    stageTwo: false,
    stageThree: false,
    chosenRole: 'Customer',
    first_name: '',
    last_name: '',
    phone_number: '',
    license_number: '',
    onboard: false,
    loading: false
}

export interface CustomerDetails {
    first_name: string,
    last_name: string,
    phone_number: string,
}

export interface DispatcherDetails {
    first_name: string,
    last_name: string,
    email?: string,
    phone_number: string,
    license_number: string,
}

export const onBoardingSlice = createSlice({
    name: "onBoarding state",
    initialState,
    reducers: {
        setOnboardingStages (state, action:PayloadAction<OnboardingStages>) {
            state.stageOne = action.payload.stageOne
            state.stageTwo = action.payload.stageTwo
            state.stageThree = action.payload.stageThree
        },
        
        setChosenRole(state, action:PayloadAction<UserRole>) {
            state.chosenRole = action.payload
        },
        
        setBoardingCompletion(state, action:PayloadAction<boolean>) {
            state.onboard = action.payload
            
        },
        setLoading(state, action:PayloadAction<boolean>) {
            state.loading = action.payload
        }

        
    }

})

export const {setOnboardingStages, setChosenRole, setBoardingCompletion, setLoading} = onBoardingSlice.actions;
