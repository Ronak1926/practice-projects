import axios from "axios";

import { create } from "zustand";
import toast from "react-hot-toast";

// Ensure cookies (JWT) are sent with requests to the backend
axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,

    signup:async(credentials)=>{
        set({isSigningUp:true});
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup",credentials)

            set({user:response.data.user, isSigningUp:false})
        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup Failed") // comes from backend check
            set({isSigningUp:false,user:null})
        }
    },
    login: async (credentials) => {
        set({isLoggingIn:true})
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login",credentials)
            set({user:response.data.user,isLoggingIn:false})
            toast.success("Logged in successfully")
        } catch (error) {
            set({isLoggingIn:false, user:null})
            toast.error(error?.response?.data?.message || "Login Failed")
        }
    }, logout: async () => {
        set({isLoggingOut:true})
        try {
            await axios.post("http://localhost:5000/api/auth/logout")
            set({user:null, isLoggingOut:false})
            toast.success("Logged out successfully")
        } catch (error) {
            set({isLoggingOut:false})
            toast.error(error?.response?.data?.message || "Logout Failed")
        }
    },authCheck: async () => {
        set({isCheckingAuth: true})
        try {
            const response= await axios.get("http://localhost:5000/api/auth/authCheck")
            set({user:response.data.user, isCheckingAuth:false})
        } catch (error) {
            set({isCheckingAuth:false, user:null})
        }
    },
}))