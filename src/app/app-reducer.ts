import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false
}

// thunks for toolkit
export const initializeAppTC = createAsyncThunk ('app/initializeApp', async (param,thunkAPI)=> {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({value: true}));
    }
    // return можно не писать
    return
})

// create slice for toolkit
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        // state - черновик state
        setAppErrorAC (state, action: PayloadAction<{error: ErrorType}>) {
            state.error = action.payload.error
        },
        setAppStatusAC (state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        /*setAppInitializedAC (state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }*/
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        });
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions;

/*export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
        dispatch(setAppInitializedAC({isInitialized: true}));
    })
}*/

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>