"use client";
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from './ui/button';
import {Button } from './ui/button';
import { UserButton, auth } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import { getAuth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";


export default  function  Navbar () {
  const user=useUser();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
// console.log(user);
return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='container flex items-center justify-between'>

    <Link className= { buttonVariants()} href='/'>
Home
       
</Link>
           {!userId && (
          <>
            <Link
              href='sign-in'
              className='text-black mr-4'
            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className='text-black mr-4'
            >
              Sign Up
            </Link>
          </>
        )}
        {userId && (
          <Link href='profile' className='text-black mr-4'>
           
           My Profile
            <UserButton afterSignOutUrl='/' />
          </Link>
        )}
        

        </div>
    </div>
    );


};
  