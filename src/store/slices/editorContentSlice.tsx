import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EditorContentState {
    content: string
}

const initialState: EditorContentState = {
    content: ''
}

const EditorContentSlice = createSlice({
    name: 'EditorContent',
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<EditorContentState>) => {
            state.content = action.payload.content
        },
        resetContent: (state) => {
            state.content = ''
        }
    }
})

export const { setContent, resetContent } = EditorContentSlice.actions
export default EditorContentSlice.reducer