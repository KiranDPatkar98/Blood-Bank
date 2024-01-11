import { useCallback } from "react"
import axios, { AxiosError } from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { LoginStates } from "../types/LoginState";
import { updatedSessionExpired } from "../redux/slices/authSlice";

const useAPIClient=()=>{
    const { loginState } = useSelector((s: any) => s.app);
    const dispatch=useDispatch()

const makeRequest=useCallback(async(endpoint:string,options?: { method: string; body?: any; },overrideBaseUrl?: any)=>{
    const token=localStorage.getItem('access_token')
    const baseURL=`http://localhost:8000${endpoint}`
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token&&endpoint!=='/login/' ? { Authorization: `Bearer ${token}` } : {})
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
            if(error?.response?.status ===401 && loginState===LoginStates.LOGGED_IN){
              dispatch(updatedSessionExpired(true))
            }  
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