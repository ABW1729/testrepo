import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'


export async function POST(req:Request) {
  try {
    const { firstName, lastName, number, email, address, state, yearOfStudy}= await req.json();
    // const newData = new Events(req.json());
   const client=new MongoClient(process.env.MONGODB_URI ?? '');
   await client.connect();
   const db=client.db("users");
   const userIds=[];
   const filter = { email };
   console.log(email);
   const updateDoc = {
    $set: {
      firstName: firstName,
      lastName: lastName,
      phone: number,
      address: address,
      state:state,
      yearOfStudy: yearOfStudy
    }
  };
  await db.collection("users").findOneAndUpdate(filter, updateDoc);

    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "" },
      { status: 500 }
    );
  }
}