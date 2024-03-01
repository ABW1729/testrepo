"use client"
import React from 'react';

import Image from 'next/image';
import { useUser } from "@clerk/nextjs";
import redirect from "next/navigation";
import styles from './profilepage.module.css';
import Navbar from "../../components/Navbar"
import Editpbut from "../../components/Editpbut"
import { getCookie  } from 'cookies-next'
import { boolean } from 'zod';
import './global.css'
import { NextApiRequest } from 'next';
import { auth, clerkClient } from "@clerk/nextjs/server";
// import React, { useState, useEffect } from 'react';
  const Header = () => (
    <div>
      {/*<!-- Header -->*/}
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        {/*<!-- Mask -->*/}
        <span className="mask bg-gradient-default opacity-8"></span>
        {/*<!-- Header container -->*/}
        <div className="container-fluid d-flex align-items-center">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-2 text-white">Hello Jesse</h1>
              <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
              <a href="#!" className="btn btn-info">Edit profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
  const PageContent = (props:any) => {
    const  {user}=props;
    
    return (<div>
      <div className="container-fluid mt--7">
      <div className="row">
        <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div className="card card-profile shadow">
            <div className="row justify-content-center">
              <div className="col-lg-3 order-lg-2">
                <div className="card-profile-image">
                  <a href="#">
                  <Image alt="." src={'/images/def.jpg'} className="rounded-circle" width={150} height={150}/>
                  </a>
                </div>
              </div>
            </div>
            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                
              </div>
            </div>
            <div className="card-body pt-0 pt-md-4">
              <div className="row">
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3>
                 {user && user.fullName}<span className="font-weight-light">, 27</span>
                </h3>
                {/* <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2"></i>
                </div> */}
                {/* <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div> */}
                <div>
                  <i className="ni education_hat mr-2"></i>
                </div>
                <hr className="my-4"/>
                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
               
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 order-xl-1">
          <div className="card bg-secondary shadow">
            <div className="card-header bg-white border-0">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">My account</h3>
                </div>
                <div className="col-4 text-right">
                  {/* <a href="#!" className="btn btn-sm btn-primary">Settings</a> */}
                  {/* <Editpbut/> */}
                </div>
              </div>
            </div>
            <div className="card-body">
              <form>
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      {/* <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-username">Username</label>
                        <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" value="lucky.jesse"/>
                      </div> */}
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                        <input type="email" id="input-email" className="form-control form-control-alternative" value={user && user.emailAddresses}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                        <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value={user && user.firstName}/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                        <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value={user && user.lastName}/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4"/>
                {/*<!-- Address -->*/}
                <h6 className="heading-small text-muted mb-4">Contact information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-address">Address</label>
                        <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text"/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-city">City</label>
                        <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" value="New York"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-country">Country</label>
                        <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" value="United States"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-country">Postal code</label>
                        <input type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code"/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4"/>
               
                <h6 className="heading-small text-muted mb-4">About me</h6>
                <div className="pl-lg-4">
                  <div className="form-group focused">
                    <label>About Me</label>
                    <textarea rows={4} className="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
    </div>
    </div>
    </div>
    </div>

  );
    }

    // function getuser(){
    //   return user;
    // }


 export default function Profilepage(){
      // const [data, setData] = useState({});
      const sessionId = getCookie("__session");
 
      const user=useUser().user;
      // console.log(user);
  
   
        // const data = () => {
        //   fetch('http://localhost:3000/api/getProfile', {
        //     method: 'GET',
        //     // headers: {
        //     //   'Authorization': `Bearer ${token}`,
        //     //   'Content-Type': 'application/json',
        //     // },
        //   })
        //     .then((response) => {
        //       if (!response.ok) {
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //       }
        //       return response.json();
        //     })
        //     .catch((error) => {
        //       console.error('Error fetching data:', error);
        //     });
        // };
    
      
  
  
   return ( 
   <>
      <div>
        <div className="main-content">
          <Navbar />
  
          <Header />
  
          <PageContent  user={user}/>
        </div>
      </div>
    </>)
  }
