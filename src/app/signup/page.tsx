"use client";//makes it a client component
import Link from 'next/link';
import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { LoaderComponent } from '@/components/loader';



export default function Signup() {
    const router = useRouter();
    
    const [user,setUser] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response= await axios.post('/api/users/signup',user);
            console.log("Singup Sucess",response.data); 
            router.push('/login');       
        } 
        catch (error : any) {
            console.error("Signup Failed",error.message);
            toast.error( "An error occurred during signup");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.userName && user.email.length >6 && user.password.length>=6){
            setButtonEnabled(true);
        }
        else{
            setButtonEnabled(false);
        }
    },[user])

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Sign Up</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className='border-2 border-gray-300 rounded-md p-2 mb-4'
                autoFocus
                type="text"
                id="username"
                value={user.userName}
                onChange={(e)=> setUser(user =>({...user,userName : e.target.value}))}
                placeholder='Enter your username'
            />
            <label htmlFor="password">Password</label>
            <input
                className='border-2 border-gray-300 rounded-md p-2 mb-4'
                autoFocus
                type="password"
                id="password"
                value={user.password}
                onChange={(e)=> setUser({...user,password : e.target.value})}
                placeholder='Enter your password'
            />
            <label htmlFor="email">Email</label>
            <input
                className='border-2 border-gray-300 rounded-md p-2 mb-4'
                autoFocus
                type="text"
                id="email"
                value={user.email}
                onChange={(e)=> setUser({...user,email : e.target.value})}
                placeholder='Enter your email'
            />
            <button 
                onClick={onSignup}
                className='bg bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-950'>
                    {buttonEnabled ? (
                        loading ? <LoaderComponent /> : "Sign Up"
                    ) : "Fill all fields to enable signup"}
            </button>
            <Link href="/login" className='text-blue-500 mt-4'>
                Already have an account? Login here
            </Link>
            <Toaster position='top-center' reverseOrder={false} />
        </div>
    )
}