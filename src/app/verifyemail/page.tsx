"use client";
import React,{useState , useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';


export default function VerifyEmail() {
    const [token , setToken] = useState("");
    const [verified , setVerified] = useState(false);
    const [error , setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail',{token});
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.error("Error verifying email:", error.message || error);
        }
    }

        useEffect(() => {
            const urlToken = window.location.search.split('=')[1];
            setToken(urlToken || "" );
        },[])
        useEffect(() => {
            if( token && token.length > 0) {
                verifyUserEmail();
            }
        },[token])

        return (
            <div className='flex flex-col items-center justify-center min-h-screen p-2'>
                <h1 className="text-4xl">Verify Email</h1>
                <h2 className='p-2 bg-pink-700 text-black'>{token ? `${token}` : "No Token "}</h2>
                {verified && (
                    <div>
                        <h2 className='text-2xl text-green-500'>Email Verified Successfully!</h2>
                        <Link href="/login" className='text-blue-500 underline'>Go to Login</Link>
                    </div>
                )}

                {error && (
                    <div>
                        <h2 className='text-2xl text-red-500'>Error verifying email. Please try again.</h2>
                        
                    </div>
                )}

            </div>
        )
    
}
