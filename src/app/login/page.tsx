"use client";
import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import toast,{Toaster} from 'react-hot-toast';
import { LoaderComponent } from '@/components/loader';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
    if(user.email && user.password.length >= 6) {
        setButtonEnabled(true);
    }
    else {
        setButtonEnabled(false);
    }
    }, [user]);
    
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login Success", response.data);
            toast.success("Login successful");
            router.push('/profile');
            
        } catch (error: any) {
            console.error("Login Failed", error.message);
            toast.error("An error occurred during login");
            
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input 
                className='border-2 border-gray-300 rounded-md p-2 mb-4'
                autoFocus
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser ((user) => ({ ...user, email: e.target.value }))}
                placeholder='Enter your email'
             />
            <label htmlFor="password">Password</label>
            <input 
                className='border-2 border-gray-300 rounded-md p-2 mb-4'
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser((user) => ({ ...user, password: e.target.value }))}
                placeholder='Enter your password'
            />  
            <button 
                onClick={onLogin}
                className='bg bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-950'>
                   {buttonEnabled ? (
                    loading ? <LoaderComponent /> : "Login"
                   ) : "Fill all fields to enable login"}
            </button> 
            <Link href="/signup" className='text-blue-500 mt-4'>
                Don't have an account? Signup here
            </Link>
            <Toaster position='top-center' reverseOrder={false} />
        </div>
    )
}

export default LoginPage;