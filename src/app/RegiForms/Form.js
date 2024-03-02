import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendMail } from "../../service/mailservice";


function Form({eventname,participantcount,category,id,user}) {
  const firstName = user && user.firstName ? user.firstName : "";
  const lastName = user && user.lastName ? user.lastName : "";
  const Name = firstName + " " + lastName;
  const [name, setName] = useState(Name);
  const [email, setEmail] = useState(user ? user.email : "");
  const [number, setNumber] = useState(user ? user.phone : "");
  const [teamName, setTeamName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [collegeName, setCollegeName] = useState('');
  const [state, setState] = useState(user ? user.state : "");
  const [city, setCity] = useState(user ? user.city : "");
  const [linkedIn, setLinkedIn] = useState('');
  const [address, setAddress] = useState(user ? user.address : "");
  const [yearOfStudying, setYearOfStudying] = useState(user ? user.yearOfStudy : "");
  const [loading, setLoading] = useState(false);



  const LoadingToast = ({ loading }) => {
    return (
        <div className={`loading-toast ${loading ? 'visible' : ''}`}>
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};





  const handleSubmit =async  (e) => {
    e.preventDefault();
    const val={ name, email,number, teamName, participants, collegeName, state, city, linkedIn, address, yearOfStudying,eventname };
    const subject="AXIS VNIT";
    const text="Congo Nigga"
    const maildata={subject,email,text};
    try {   
      setLoading(true);
          const res = await fetch("/api/event-register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "event-id":id,
            },
            body: JSON.stringify(val),
          });
    
          if (res.ok) {
            toast.success('Registered successfully!');
            await fetch("/api/mail-service", {
              method: "POST",
              body: JSON.stringify(maildata),
            });
          } else  if(res.status===400) {
             toast.error("User already Registered.");
          }
          else if(res.status===401){
            toast.error("Please sign-in first");
          }
         else {
              toast.error('Registration failed.');
            }
           
    } catch (error) {
          console.log("Error during registration: ", error);
          toast.error('Error during registration');
        }finally {
          setLoading(false); // Reset loading state
      }


  };

  const handleAddParticipant = () => {
    if (participants.length < participantcount) {
      setParticipants([...participants, '']);
    } else {
      alert(`You can add a maximum of ${participantCount} participants.`);

    }
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const handleParticipantChange = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value;
    setParticipants(updatedParticipants);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
    
      
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md border rounded-lg w-full mx-auto mt-8 p-6 bg-transparent shadow-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl mt-2 text-white mb-8 font-semibold text-center"
        >
          Registration Form
        </motion.h2>

        <ToastContainer />
        {participantcount!=0 ? (     <div className="mb-4">
          <label htmlFor="name" className="block text-white">Team Leader Name:</label>
          <input type="text" id="name" placeholder={Name} value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>):   (<div className="mb-4">
          <label htmlFor="name" className="block text-white"> Name:</label>
          <input type="text" id="name" placeholder={Name} value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>)}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">Email:</label>
          <input type="email" id="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-white">Phone Number:</label>
          <input type="number" id="number"  placeholder={number} value={number} onChange={(e) => setNumber(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
       {participantcount!=0 && (<div className="mb-4">
          <label htmlFor="teamName" className="block text-white">Team Name:</label>
          <input type="text" id="teamName"  value={teamName} onChange={(e) => setTeamName(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>) }
        <div className="mb-4">
          <label htmlFor="collegeName" className="block text-white">College Name:</label>
          <input type="text" id="collegeName" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-white">State:</label>
          <input type="text" id="state" placeholder={state} value={state} onChange={(e) => setState(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-white">City:</label>
          <input type="text" id="city" placeholder={city} value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="linkedIn" className="block text-white">LinkedIn (Optional):</label>
          <input type="text" id="linkedIn" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-white">Address:</label>
          <input type="text" id="address" placeholder={address} value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="yearOfStudying" className="block text-white">Year of Studying:</label>
          <input type="text" id="yearOfStudying"  placeholder={yearOfStudying} value={yearOfStudying} onChange={(e) => setYearOfStudying(e.target.value)} className="mt-1 px-2 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        {participantcount!=0 && (<>
          <div className="mb-4">
          <button type="button" onClick={handleAddParticipant} className="px-4 border-2 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full">Add Participant</button>
        </div>
        {participants.map((participant, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`participant-${index}`} className="block text-white">Participant {index + 1}:</label>
            <div className="flex items-center">
              <input
                type="text"
                id={`participant-${index}`}
                value={participant}
                onChange={(e) => handleParticipantChange(index, e.target.value)}
                className="mt-1 py-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => handleDeleteParticipant(index)}
                className="ml-2 border px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </motion.button>
            </div>
          </div>
        ))}
        </>)}
      
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="px-4 py-2 border-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full"
        >
           {loading ? 'Please Wait...' : 'Submit'}
        </motion.button>
        <LoadingToast loading={loading} />

      </motion.form>
    </div>
  );
}

export default  Form;