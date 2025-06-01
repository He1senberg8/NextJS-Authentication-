"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';

export default function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try{
            const response = await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error) {
            console.error("Logout failed:", error);

        }
    }
    const [data, setData] = useState("");
    const [p,setP]= useState(false);
    const handleClick = async () => {
        try{
            const response = await axios.get('/api/users/me');
            if(response.data && response.data.userData) {
                console.log(response);
                setData(response.data.userData._id);
                setP(true);
                console.log("User ID:", response.data.userData._id);
            }
            else {
                console.log("No user data found");
            }
        } catch (error:any) {
            console.error("Error fetching user ID:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <p>This is the profile page. You can add your profile details here.</p>
            <p className='bg-white text-teal-800'>{!p ?"Use this space to display user information, settings, or any other relevant data." : `${data}`}</p>
            <hr />
            <button onClick={handleClick} className='p-2 bg-purple-700 rounded-2xl hover:bg-pink-300'>ID</button>
            <button onClick={logout} className="p-2 bg-orange-700 rounded-2xl hover:bg-amber-600">Logout</button>
        </div>
    );
}