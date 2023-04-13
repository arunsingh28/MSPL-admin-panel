import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ClientState {
    id: string
    delete: boolean
}

const initialState: ClientState = {
    id: '',
    delete: false,
}

// create slice
const deleteClientSliceState = createSlice({
    name: 'deleteClientState',
    initialState,
    reducers: {
        deleteClientState: (state, action: PayloadAction<ClientState>) => {
            state.id = action.payload.id
            state.delete = true
        }
    }
})

export const { deleteClientState } = deleteClientSliceState.actions
export default deleteClientSliceState.reducer