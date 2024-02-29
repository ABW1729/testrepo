"use client"
import React, { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import {useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation";
import { connectMongoDB } from "@/lib/mongodb";
import { Input } from '../ui/input';
import {Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
const FormSchema= z.object({
    // email: z.string(),
    key:z.string().min(1, { message: 'required' }),
    evename:z.string().min(1, { message: 'required' }),
    img1:z.string().min(1, { message: 'required' }),
    img2:z.string().min(1, { message: 'required' }),
    img3:z.string().min(1, { message: 'required' }),
    participantcount:z.string().min(1, { message: 'required' }),
    category:z.enum(["MA","IM","SE","CD","School","Gaming","AR"]),
    pdf:z.string().min(1, { message: 'required' }),
    desp:z.string().min(1, { message: 'required' }),
    date:z.string().min(1, { message: 'required' }),
    event_wor:z.enum(["1", "2"]),
    isteam:z.enum(["1", "2"]),
});
// const SignInForm = () => {
const Regform = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver (FormSchema),
    });


    const onSubmit = async () => {
      console.log(form.getValues());
      setLoading(true);
      const val = form.getValues(); // values object
      const key = val.key;
     const secret="1234"
      try {   
        if (key == secret) {
          const res = await fetch("/api/addevent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(val),
          });
    
          if (res.ok) {
            form.reset();
            toast.success('Event added successfully!');
          } else {
            toast.error('Event addition failed.');
          }
        } else {
          // Key is invalid, show an alert or handle accordingly
          alert("Invalid key. Please provide the correct key.");
        }
      } catch (error) {
        console.log("Error during registration: ", error);
      } finally {
        setLoading(false);
    }
    };


    return (

<>
      <ToastContainer />

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SECRET KEY!</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="evename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="img1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image1 url*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="img2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image2 url*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="img3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image3 url*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="participantcount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant Count</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="pdf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>pdf url*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Event or workshop</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MA" />
                    </FormControl>
                    <FormLabel className="font-normal">Management
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="SE" />
                    </FormControl>
                    <FormLabel className="font-normal">Software
                    </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="IM" />
                    </FormControl>
                    <FormLabel className="font-normal">Igniting Minds
                    </FormLabel>
                    </FormItem>
                  
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CD" />
                    </FormControl>
                    <FormLabel className="font-normal">Construction
                    </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="School" />
                    </FormControl>
                    <FormLabel className="font-normal">School
                    </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Gaming" />
                    </FormControl>
                    <FormLabel className="font-normal">Gaming
                    </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="AR" />
                    </FormControl>
                    <FormLabel className="font-normal">AR
                    </FormLabel>
                    </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="desp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Descprition*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <FormField
          control={form.control}
          name="event_wor"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Event or workshop</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">Event
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">Workshop
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <FormField
          control={form.control}
          name="isteam"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Event Type?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">single
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">team
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
            {loading ? (
                <div>Please Wait...</div>
            ) :( <Button type="submit" variant="outline">Submit</Button>)
}
   </div>
      </form>
      
    </Form>
    </>
    )
}

export default Regform