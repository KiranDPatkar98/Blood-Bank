import { useCallback } from "react"
import axios from 'axios'

const useAPIClient=()=>{

const makeRequest=useCallback(async(endpoint:string,options?: { method: string; body?: any; },overrideBaseUrl?: any)=>{
    const baseURL=`http://localhost:8000${endpoint}`
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
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

throw new Error(JSON.stringify({error}));

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