import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

// components
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import SeePass from "public/images/SeePass.svg";
import Assemble from "public/images/assembleimg.svg";
import sidekeyboard from "public/images/sidekeyboard.svg";


export default function Home() {
  return (
    <>
      <Head>
        <title>Authentication | KeyThicc</title>
        <meta name="description" content="KeyThicc Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full bg-white text-center h-screen rounded">
        <div className="bg-white shadow-2xl flex">
          <div className="w-1/2 m-5 p-10 mx-10 flex flex-col">
            <Link href="/">
              <h1 className="text-3xl font-bold text-black-500 text-left mb-24">KeyThicc</h1>
            </Link>
            <form
              className="grid grid-col items-center mt-12 gap-0 h-full"
            >
              <h2 className="text-3xl font-bold text-black-500 text-left mb-12 pr-20">
                Keep your head in the <br></br> clouds and your hands <br></br> on the keyboard
              </h2>

              <p className="text-sm font-bold text-black-500 text-left mb-2">Full Name</p>
              <input
                type="Name"
                placeholder=""
                className="bg-white border-2 border-gray-300 rounded text-xl p-2 w-full"
              />

              <p className="text-sm font-bold text-black-500 text-left mb-2 mt-6">E-mail Address</p>
              <input
                type="email"
                placeholder=""
                className="bg-white border-2 border-gray-300 rounded text-xl p-2 w-full"
              />
              <p className="text-sm font-bold text-black-500 text-left mb-2 mt-6">Password</p>
              <input
                type="password"
                placeholder=""
                className="bg-white border-2 border-gray-300 rounded text-xl p-2 w-full"
              />

              <p className="text-sm font-bold text-black-500 text-left mb-2 mt-6">Confirm Password</p>
              <input
                type="password"
                placeholder=""
                className="bg-white border-2 border-gray-300 rounded text-xl p-2 w-full"
              />
              
              

              <label className="flex items-center text-sm my-8 text-gray-500"><input type="checkbox" name="Remember" className="border-2 rounded border-gray-300 mr-2">
              </input>I agree to all the <Link href="/"><p className="text-sm font-normal text-blue-500 cursor:pointer mx-1">Terms of conditions</p></Link> &amp; <Link href="/"><p className="text-sm font-normal text-blue-500 cursor:pointer mx-1">Privacy Policy</p></Link></label>     
              
              <div className="flex mt-4">
                <button
                  type="submit"
                  className="border-2 border-black-500 rounded text-white bg-black text-xl px-12 py-2 font-normal hover:bg-green-500"
                > Create Account
                </button>
              </div>
              
              <div className="flex justify-left gap-2 mt-12">           
                <span className="text-sm font-normal text-black-500 text-left mb-2">Already have an account?</span>
                <Link href="/"><p className="text-sm font-normal text-blue-500 cursor:pointer">Log In</p></Link>
              </div>          
            </form>
            
          </div>
          <div className="w-1/2 bg-black text-white p-32">
            <div className="grid grid-col place-content-center w-full items-center gap-8 mt-32">
              <h2 className="text-4xl font-bold">KeyThicc</h2>
              <p className=" text-sm">
                The best place to get/sell your favorite keythicc machine
              </p>
            </div>
            <div className="flex w-full mt-24 mx-auto">
              <Image src={sidekeyboard}/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}