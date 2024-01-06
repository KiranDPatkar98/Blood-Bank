import { useCallback } from "react"
import axios, { AxiosError } from 'axios'

const useAPIClient=()=>{

const makeRequest=useCallback(async(endpoint:string,options?: { method: string; body?: any; },overrideBaseUrl?: any)=>{
    const token=localStorage.getItem('access_token')
    const baseURL=`http://localhost:8000${endpoint}`
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
        const response = await axios({
            url: baseURL,
            method: options?.method,
            headers,
            data: options?.body
        });
        return response.data
    }
    catch(error){
        if (error instanceof AxiosError) {    
            throw new Error(JSON.stringify({ ...error?.response?.data, status: error?.response?.status }));
        }

    }
},[]);

const post = async (endpoint: string, payload: any) =>
makeRequest(endpoint, { method: 'POST', body: payload });

const put = async (endpoint: string, payload: any) =>
makeRequest(endpoint, { method: 'PUT', body: payload });

const remove = async (endpoint: string) =>
makeRequest(endpoint, { method: 'DELETE' });

return { makeRequest, post, put, remove };

}
export {useAPIClient}