import axios from 'axios'

// const productionLink = 'https://itchy-deer-boot.cyclic.app' http://localhost:4000 

// const developmentLink = "http://143.110.186.93/"
const developmentLink = "http://localhost:4000/"



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
    timeout: 10000,
    withCredentials: true
})

const tutorialApi = axios.create({
    baseURL: developmentLink + 'v2/lms',
    timeout: 10000,
    withCredentials: true
})

const lmsApi = axios.create({
    baseURL: developmentLink + 'v2/lms',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true
})

const filePrivateApi = axios.create({
    baseURL: developmentLink + 'v2/api',
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
export const verifyToken = async (token: string) => await privateApi.get(`/verify-token/${token}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// create a new user
export const empCreate = async (data: any, token: string) => await privateApi.post('/register', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// to create a new school
export const schoolCreate = async (data: any, token: string) => await privateApi.post('/create-school', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// to get all schools
export const schoolGetAll = async (token: string) => await privateApi.get('/get-all-school', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// get school count
export const schoolCount = async (token: string) => await privateApi.get('/school-count', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// delete a school
export const schoolDelete = async (id: string, token: string) => await privateApi.delete(`/delete-school/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// get school by id
export const schoolGetById = async (id: string, token: string) => await privateApi.get(`/get-school/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// search school by name and city
export const schoolSearch = async (data: any, token: string) => await privateApi.post('/search-school', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


// create emp wiht file
export const empWithFile = async (data: any, token: string) => await filePrivateApi.post('/create-emp-from-file', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    }
})
// create school with file
export const schoolWithFile = async (data: any, token: string) => await filePrivateApi.post('/create-school-from-file', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    }
})
// create ingridient with file
export const ingridientWithFile = async (data: any, token: string) => await filePrivateApi.post('/create-ingridient-from-file', data,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }
)


// setting > sound
export const sound = async (data: any, _id: string, token: string) => await privateApi.post(`/sound-change/${_id}`, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
export const getSoundInfo = async (_id: string, token: string) => await privateApi.get(`/sound-change/grab/${_id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// setting > change password
export const changePassword = async (data: any, _id: string, token: string) => await privateApi.post(`/change-password/${_id}`, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


// logout
export const logoutApi = async () => await publicApi.get('/logout')

// academy register api
export const academyCreate = async (data: any, token: string) => await privateApi.post('/create-academy', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// Tutorial --------
// init tutorial    
export const getTut = async (token: string) => await tutorialApi.get('/get-info', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
export const initTut = async (data: any, token: string) => await tutorialApi.post('/init', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
export const initModule = async (data: any, token: string) => await tutorialApi.post('/init-module', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
export const initModuleName = async (data: any, token: string) => await tutorialApi.post('/init-module-name', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


// users
export const getAllUsers = async (token: string) => await privateApi.get('/get-all-user', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// get emp
export const getEmp = async (data: any, token: string) => await privateApi.post('/fetch-emp', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// get user by id
export const getUserById = async (id: string, token: string) => await privateApi.get(`/get-user-info/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


// nutrition
export const createIngridient = async (data: any, token: string) => await privateApi.post('/create-ingridient', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// fetch all    ingridient
export const getAllIngridient = async (page: number, limit: number, token: string) => await privateApi.get(`/fetch-ingridient?page=${page}&limit=${limit}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// delte ingridient
export const delteIngridient = async (id: string, token: string) => await privateApi.delete(`/delete-ingridient/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// create recipe category
export const createRecipiCategory = async (data: any, token: string) => await privateApi.post('/create-recipe-category', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// fetch all recipe category
export const getAllRecipeCategory = async (token: string) => await privateApi.get('/fetch-recipie-category', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// delete recipe category
export const deleteRecipeCategory = async (id: string, token: string) => await privateApi.delete(`/delete-recipe-category/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// update recipe category
export const updateRecipeCategory = async (data: any, id: string, token: string) => await privateApi.put(`/update-recipe-category/${id}`, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// create diet ferquency
export const createDietFrequency = async (data: any, token: string) => await privateApi.post('/create-diet-frequency', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// fetch all diet frequency
export const getAllDietFrequency = async (token: string) => await privateApi.get('/fetch-diet-frequency', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// delete diet frequency
export const deleteDietFrequency = async (id: string, token: string) => await privateApi.delete(`/delete-diet-frequency/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// update diet frequency
export const updateDietFrequency = async (data: any, id: string, token: string) => await privateApi.put(`/update-diet-frequency/${id}`, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// save new recipe
export const saveRecipie = async (data: any, token: string) => await filePrivateApi.post('/save-recipe', data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    },
})
// fetch all recipe
export const getAllRecipe = async (token: string) => await privateApi.get('/get-recipe', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// fetch recipe by id
export const getRecipeById = async (id: string, token: string) => await privateApi.get(`/get-recipe-by-id/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// delete recipe
export const deleteRecipe = async (id: string, token: string) => await privateApi.delete(`/delete-recipe/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// update recipe
export const updateRecipe = async (data: any, token: string) => await filePrivateApi.put(`/update-recipe`, data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    },
})

// create new package
export const createPackage = async (data: any, token: string) => await privateApi.post('/create-package', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// fetch all package
export const getAllPackage = async (token: string) => await privateApi.get('/get-all-package', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// filter user
export const filterUser = async (data: any, token: string) => await privateApi.post('/filter-user', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})



// update nutrition profile
export const updateNutritionProfile = async (data: any, id: string, token: string) => await filePrivateApi.put(`/update-nutritist-profile/${id}`, data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    },
})
// get nutrition profile
export const getNutritionProfile = async (id: string, token: string) => await privateApi.get(`/get-nutritist-profile/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// remove nutrition profile
export const removeNutritionProfile = async (key: string, id: string, token: string) => await privateApi.delete(`/remove-profile-image/${key}/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


// attach user to nutritionist
export const attachUserToNutritionist = async (id: string, nutriID: string, data: any, token: string) => await privateApi.post(`/attach-user-to-nutritionist/${id}/${nutriID}`, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// fetch all course
export const fetchAllCourse = async (token: string) => await lmsApi.get('/get-all-course', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})



export const updateModuleName = async (id: string, data: any, token: string) => await lmsApi.put(`/update-course/${id}`, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const fetchCourseById = async (id: string, token: string) => await lmsApi.get(`/fetch-course/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const fetchModules = async (id: string, token: string) => await lmsApi.get(`/fetch-modules/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// save banner
export const createMobileBanner = async (data: any, bannerkey: string, token: string) => await filePrivateApi.post(`/create-banner/?key=${bannerkey}`, data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    }
})

// fetch all banner
export const fetchAllBanner = async (token: string) => await privateApi.get('/get-all-banner', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// delte banner delete-banner/:id
export const deleteBanner = async (id: string, token: string) => await privateApi.delete(`/delete-banner/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// fetch all my client
export const fetchMyClient = async (id: string, token: string) => await privateApi.get(`/fetch-all-client/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// delete client
export const deleteClient = async (id: string, token: string) => await privateApi.delete(`/delete-client/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// delete course delete-course/:id
export const deleteCourse = async (id: string, token: string) => await lmsApi.delete(`/delete-course/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const uploadPDFCourse = async (data: any, id: string, token: string) => await lmsApi.post(`/upload-pdf-course/${id}`, data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    }
})
// inti course
export const initLMS = async (data: any, token: string) => await lmsApi.post('/init-course', data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    }
})


export const updateModuleContent = async (id: string, data: any, token: string) => await lmsApi.post(`/update-lesson/${id}`, data, {
    headers: {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
    }
})


export const createDietPlan = async (data: any, token: string) => await privateApi.post('/create-diet-plan', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// assessment form apis
export const saveIntroduction = async (data: any, token: string) => await privateApi.post('/save-introduction', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// save-measurement
export const saveMeasurement = async (data: any, token: string) => await privateApi.post('/save-measurement', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// get assessment form
export const getAssessmentForm = async (id: string, token: string) => await privateApi.get(`/get-assessment/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export const saveMedicalHistory = async (data: any, token: string) => await privateApi.post('/save-medical-history', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})


// update lifestyle
export const saveLifestyle = async (data: any, token: string) => await privateApi.post('/save-lifestyle-habits', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})
// save-food-recall
export const saveFoodRecall = async (data: any, token: string) => await privateApi.post('/save-food-recall', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

// save summary
export const saveSummary = async (data: any, token: string) => await privateApi.post('/save-summary', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})