import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TutorialState {
    name: string
    description: string
    published?: boolean
    modules?: number
    initTutorial?: boolean
    writeModule?: boolean
    createModule?: boolean
    nameModule?: boolean
    designModule?: boolean
    chapterNames?: string[]

    moduleNames?: string[]
    moduleDescription?: string[]
}

const intialState: TutorialState = {
    name: '',
    description: '',
    published: false,
    modules: 0,

    initTutorial: true,
    createModule: false,
    nameModule: false,
    designModule: false,
    writeModule: false,
    moduleNames: [],
    chapterNames: [],
    moduleDescription: []
}

const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState: intialState,
    reducers: {
        initTutorial: (state, action: PayloadAction<TutorialState>) => {
            state.name = action.payload.name
            state.description = action.payload.description
            state.initTutorial = false
            state.createModule = true
        },
        createModulee: (state, action: PayloadAction<TutorialState>) => {
            state.name = action.payload.name
            state.description = action.payload.description
            state.modules = action.payload.modules
            // state.initTutorial = false
            state.createModule = false
            state.nameModule = true
        },
        nameModule: (state, action: PayloadAction<TutorialState>) => {
            state.name = action.payload.name
            state.description = action.payload.description
            state.modules = action.payload.modules
            state.initTutorial = false
            state.createModule = false
            state.nameModule = false
            state.designModule = true
            state.moduleNames = action.payload.moduleNames
            state.moduleDescription = action.payload.moduleDescription
        },
        nameChapter: (state, action: PayloadAction<TutorialState>) => {
            state.name = action.payload.name
            state.description = action.payload.description
            state.modules = action.payload.modules
            state.initTutorial = false
            state.createModule = false
            state.nameModule = false
            state.designModule = false
            state.writeModule = true
            state.moduleNames = action.payload.moduleNames
            state.chapterNames = action.payload.chapterNames
            state.moduleDescription = action.payload.moduleDescription
        }
        // other function 
    }
})
export const { initTutorial, createModulee,nameModule } = tutorialSlice.actions
export default tutorialSlice.reducer