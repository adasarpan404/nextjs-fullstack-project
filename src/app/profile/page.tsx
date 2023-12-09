"use client"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("Nothing");
    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            toast.success("Logout Successful")
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    const getUserProfile = async () => {
        const res = await axios.get('/api/user/me')
        console.log(res)
        setData(res.data.data)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">Logout</button>
            <button onClick={getUserProfile} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"></button>
        </div>
    )
}