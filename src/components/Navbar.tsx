"use client";
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from './ui/button';
import {Button } from './ui/button';
import { UserButton, auth,SignOutButton,SignedIn,SignedOut } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import { getAuth, clerkClient, currentUser} from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { redirect, useRouter } from 'next/navigation'

export default  function  Navbar () {
  const user=useUser();
  const { signOut } = useClerk();
  const router = useRouter()
  const { isLoaded, userId, sessionId, getToken } = useAuth();
// console.log(user);
return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='container flex items-center justify-between'>

    <Link className= { buttonVariants()} href='/'>
Home
       
</Link>

     
             <button onClick={() => signOut(() => redirect("/"))}>
             Sign out
           </button>
     
        

        </div>
    </div>
    );


};
  
