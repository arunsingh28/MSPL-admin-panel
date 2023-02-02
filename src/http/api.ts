import axios from 'axios'


let token = localStorage.getItem('token')

const publicApi = axios.create({
    baseURL: 'http://localhost:4000/v1/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: true
})

const privateApi = axios.create({
    baseURL: 'http://localhost:4000/v2/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    timeout: 10000,
    withCredentials: true
})


export interface Ischool {
    schoolName: string
    contestPerson:{
        contactName: string
        contactPhone: string
        contactEmail: string
    }
    schoolAddress:{
        schoolArea: string
        schoolCity: string
        pinCode: string
    }
    sports:{
        isCricket: boolean
        isFootball: boolean
        isBasketball: boolean
        isBadminton: boolean
        isTennis: boolean
        other: string
    }
    _id: string
}

// login api
export const login = async (data: any) => await publicApi.post('/login', JSON.stringify(data))
// to create a new school
export const schoolCreate = async (data: any) => await privateApi.post('/create-school', JSON.stringify(data))
// to get all schools
export const schoolGetAll = async () => await privateApi.get('/get-all-school')
// get school count
export const schoolCount = async() => await privateApi.get('/school-count')
// delete a school
export const schoolDelete = async (id: string) => await privateApi.delete(`/delete-school/${id}`)
// get school by id
export const schoolGetById = async (id: string) => await privateApi.get(`/get-school/${id}`)
// search school by name and city
export const schoolSearch = async (data: any) => await privateApi.post('/search-school', JSON.stringify(data))