"use client";

import React, { useState } from "react";
import "./D.css";
import { useEffect} from 'react';

import Form from "../RegiForms/Form"

const CustomButton = ({ onClick, buttonText, form }) => (
  <button onClick={() => onClick(form)} className="button-wrapper">
    <div className="back">
      <div className="button_base b03_skewed_slide_in rounded-md">
        <div>{buttonText}</div>
        <div></div>
        <div>{buttonText}</div>
      </div>
    </div>
  </button>
);

const GoogleDocButton = ({ googleDocLink }) => (
  <a href={googleDocLink} target="_blank" rel="noopener noreferrer">
    <button className="button-wrapper pr-12">
      <div className="back">
        <div className="button_base b03_skewed_slide_in rounded-md">
          <div>Event Brochure</div>
          <div></div>
          <div>Event Brochure</div>
        </div>
      </div>
    </button>
  </a>
);

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const openForm = (form) => {
    setSelectedForm(form);
    setShowForm(true);
    document.body.style.overflow = "hidden"; 
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedForm(null);
    document.body.style.overflow = "auto"; 
  };

  const renderForm = () => {
   return  selectedForm;
};


  const [events, setEvents] = useState({});

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/getEvents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'event-type':1
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []);
console.log(events.events);
  const Events= events && events.events;
  console.log(Events);



  const [selectedHeading, setSelectedHeading] = useState('MA');
  const headings = ['MA','IM','SE','CD','School','Gaming','AR'];

  const Management=Events?.filter(event=>
    {
      const category=event.category==='MA';
      return category;
    });


 const IM=Events && Events.filter(event=>
      {
        const category=event.category==='IM';
        return category;
      });

const SE=Events && Events.filter(event=>
        {
          const category=event.category==='SE';
          return category;
        });

const CD=Events && Events.filter(event=>
          {
            const category=event.category==='CD';
            return category;
          });
          
const School=Events && Events.filter(event=>
            {
              const category=event.category==='School';
              return category;
            });
            
const Gaming=Events && Events.filter(event=>
              {
                const category=event.category==='Gaming';
                return category;
              });

const AR=Events && Events.filter(event=>
                {
                  const category=event.category==='AR';
                  return category;
                });
    

                const eventsByHeadings = {
                  'MA':Management,
                 'IM':IM,
                 'SE':SE,
                 'CD':CD,
                 'School':School,
                 'Gaming':Gaming,
                 'AR':AR,
              };
          
    const handleHeadingClick = (heading) => {
      setSelectedHeading(heading);
  };


  return (
    <>
      <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-lg relative">
        {showForm && (
          <div className="fixed top-0 left-0 pt-20 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-95 z-50 overflow-y-auto">
            <div className="max-w-md w-full bg-transparent p-8 rounded-md shadow-lg">
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-white hover:text-gray-800"
              >
                <svg
                  className="w-8 h-8 mr-6 mt-8 backdrop:blur-md"
                  fill="black"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              console.log(selectedForm);
              {renderForm()}
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-black text-5xl font-medium pt-5 pb-3">
        <h1>Events</h1>
        <div style={{ display: 'flex',marginBottom: '10px' , justifyContent: 'space-between'}}>
                {headings.map((heading, index) => (
                    <button  key={index} onClick={() => handleHeadingClick(heading)}>{heading}</button>
                ))}
            </div>
           
            <h2 style={{ marginTop: '10px' }}>{selectedHeading}</h2>
        <div className="grid mt-14 mb-10 p-4 ml-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {eventsByHeadings[selectedHeading] && eventsByHeadings[selectedHeading].map((card, index) => (
            <div key={index} className="">
              <div className="yoda">
                {/* <img className="logo" src={card.img1} alt="" /> */}
                <img
                  className="front-image"
                  src={card.img2}
                  alt="Front Image"
                />
                <img
                  className="bg-image"
                  src={card.img3}
                  alt="Background Image"
                />
              </div>
              <p className="text-black text-center font-semibold text-3xl mt-5 mb-2">
                {card.evename}
              </p>
              <p className="text-black text-center text-sm mt-5 mb-4">
                {card.desp}
              </p>
              <div className="flex flex-row justify-between">

                <CustomButton onClick={openForm} buttonText="Register" form={<Form eventname={card.evename} participantcount={card.participantcount} category={card.category} id={card._id}/>} />
                <GoogleDocButton googleDocLink={card.pdf} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
