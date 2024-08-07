import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderDetails {
    trip_id: string,
    scheduled?: boolean,
    order_submitted?: boolean,
    order_success?: boolean,
    order_failed?: boolean
}

const initialState: OrderDetails = {
    trip_id: '',
    scheduled: false,
    order_submitted: false,
    order_success: false,
    order_failed: false,
}
export const newOrderSlice = createSlice({
    name: 'trackOrder',
    initialState,
    reducers: {
        setNewOrder (state, action:PayloadAction<OrderDetails>) {
            state.trip_id = action.payload.trip_id
            state.scheduled = action.payload.scheduled
            state.order_success = action.payload.order_success
            state.order_submitted = action.payload.order_submitted           
            state.order_failed = action.payload.order_failed
        },
           
    }
})

export const { setNewOrder } = newOrderSlice.actions