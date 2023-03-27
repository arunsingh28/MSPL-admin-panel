import axios from 'axios'

// const productionLink = 'https://itchy-deer-boot.cyclic.app' http://localhost:4000 

const developmentLink = "http://localhost:4000/"


let token = localStorage.getItem('token')

const publicApi = axios.create({
    baseURL: developmentLink + 'v1/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: true
})

const privateApi = axios.create({
    baseURL: developmentLink + 'v2/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    timeout: 10000,
    withCredentials: true
})

const tutorialApi = axios.create({
    baseURL: developmentLink + 'v2/tutorial',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    timeout: 10000,
    withCredentials: true
})

const lmsApi = axios.create({
    baseURL: 'http://localhost:8000/v2/api/LMS',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true
})

const filePrivateApi = axios.create({
    baseURL: developmentLink + 'v2/api',
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    },
    timeout: 10000,
    withCredentials: true
})



// interface for school
export interface Ischool {
    schoolName: string
    contestPerson: {
        contactName: string
        contactPhone: string
        contactEmail: string
    }
    schoolAddress: {
        schoolArea: string
        schoolCity: string
        pinCode: string
    }
    sports: {
        isCricket: boolean
        isFootball: boolean
        isBasketball: boolean
        isBadminton: boolean
        isTennis: boolean
        other: string
    }
    _id: string
}



// refresh tokne publicApi.get('/refresh-token')
export const refreshToken = async () => await axios.get(developmentLink + 'v1/api/refresh-token', { withCredentials: true })

// login api
export const login = async (data: any) => await publicApi.post('/login', JSON.stringify(data), { withCredentials: true })

// verify token
export const verifyToken = async (token: string) => await privateApi.get(`/verify-token/${token}`)
// create a new user
export const empCreate = async (data: any) => await privateApi.post('/register', JSON.stringify(data))
// to create a new school
export const schoolCreate = async (data: any) => await privateApi.post('/create-school', JSON.stringify(data))
// to get all schools
export const schoolGetAll = async () => await privateApi.get('/get-all-school')
// get school count
export const schoolCount = async () => await privateApi.get('/school-count')
// delete a school
export const schoolDelete = async (id: string) => await privateApi.delete(`/delete-school/${id}`)
// get school by id
export const schoolGetById = async (id: string) => await privateApi.get(`/get-school/${id}`)
// search school by name and city
export const schoolSearch = async (data: any) => await privateApi.post('/search-school', JSON.stringify(data))


// create emp wiht file
export const empWithFile = async (data: any) => await filePrivateApi.post('/create-emp-from-file', data)
// create school with file
export const schoolWithFile = async (data: any) => await filePrivateApi.post('/create-school-from-file', data)
// create ingridient with file
export const ingridientWithFile = async (data: any) => await filePrivateApi.post('/create-ingridient-from-file', data)


// setting > sound
export const sound = async (data: any, _id: string) => await privateApi.post(`/sound-change/${_id}`, JSON.stringify(data))
export const getSoundInfo = async (_id: string) => await privateApi.get(`/sound-change/grab/${_id}`)

// setting > change password
export const changePassword = async (data: any, _id: string) => await privateApi.post(`/change-password/${_id}`, JSON.stringify(data))


// LMS
export const initLMS = async (data: any) => await lmsApi.post('/init-lms', JSON.stringify(data))

// logout
export const logoutApi = async () => await publicApi.get('/logout')

// academy register api
export const academyCreate = async (data: any) => await privateApi.post('/create-academy', JSON.stringify(data))

// Tutorial --------
// init tutorial    
export const getTut = async () => await tutorialApi.get('/get-info')
export const initTut = async (data: any) => await tutorialApi.post('/init', JSON.stringify(data))
export const initModule = async (data: any) => await tutorialApi.post('/init-module', JSON.stringify(data))
export const initModuleName = async (data: any) => await tutorialApi.post('/init-module-name', JSON.stringify(data))


// users
export const getAllUsers = async () => await privateApi.get('/get-all-user')
// get emp
export const getEmp = async (data: any) => await privateApi.post('/fetch-emp', JSON.stringify(data))
// get user by id
export const getUserById = async (id: string) => await privateApi.get(`/get-user-info/${id}`)


// nutrition
export const createIngridient = async (data: any) => await privateApi.post('/create-ingridient', JSON.stringify(data))
// fetch all    ingridient
export const getAllIngridient = async () => await privateApi.get('/fetch-ingridient')
// create recipe category
export const createRecipiCategory = async (data: any) => await privateApi.post('/create-recipe-category', JSON.stringify(data))
// fetch all recipe category
export const getAllRecipeCategory = async () => await privateApi.get('/fetch-recipie-category')
// delete recipe category
export const deleteRecipeCategory = async (id: string) => await privateApi.delete(`/delete-recipe-category/${id}`)
// update recipe category
export const updateRecipeCategory = async (data: any, id: string) => await privateApi.put(`/update-recipe-category/${id}`, JSON.stringify(data))

// create diet ferquency
export const createDietFrequency = async (data: any) => await privateApi.post('/create-diet-frequency', JSON.stringify(data))
// fetch all diet frequency
export const getAllDietFrequency = async () => await privateApi.get('/fetch-diet-frequency')
// delete diet frequency
export const deleteDietFrequency = async (id: string) => await privateApi.delete(`/delete-diet-frequency/${id}`)
// update diet frequency
export const updateDietFrequency = async (data: any, id: string) => await privateApi.put(`/update-diet-frequency/${id}`, JSON.stringify(data))

// save new recipe
export const saveRecipie = async (data: any) => await filePrivateApi.post('/save-recipe', data)
// fetch all recipe
export const getAllRecipe = async () => await privateApi.get('/get-recipe')
