import { createContext, ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div id="login page" className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
            <head>
                <title>KeyThicc</title>
                <link rel="icon" href="/favicon.ico" />
            </head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-100% max-w-8xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            <img src="/images/logoblck.svg" className="mx-4"/>                        
                        </div>
                        <div className="my-44">
                            <h2 className="text-3xl font-bold text-black-500 mb-24">
                                Sign in to Account
                             </h2>
                             <p className="font-semibold text-gray-400 text-lg mb-3">Already registered?</p>
                            <div className="flex flex-col items-center mt-8"> 
                                <div className="bg-gray-100 w-64 p-2 flex items-center m-2">
                                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-xl"/> 
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center m-2">
                                    <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-xl"/> 
                                </div>
                                <div className="flex justify-between w-100 mb-5">
                                    <label className="flex items-center text-xl mx-auto my-8"><input type="checkbox" name="remember" className="mx-4"/>Remember me</label>
                                </div>
                                    <a href="#" className="border-2 border-black-500 text-black-500 text-xl rounded-full px-12 py-2 mt-8 inline-block font-semibold hover:bg-green-500">Sign In</a>
                            </div>
                        </div>
                        
                    </div>               
                    <div className="w-2/5 bg-black text-white rounded-tr-2xl rounded-br-2xl px-12">
                        <div className="col-span-5 col-start-4 my-12 ml-24 items-center"> 
                            <img src="/images/bgatas.png" className="mx-2 pb-8"/>
                        </div>
                        <h2 className="text-3xl font-bold mb-16">Hi Fellas!</h2>
                        <div className="w-100 inline-block mb-2">
                            <p className="mb-6 text-lg">Doesn't have any account yet? Well let's create one then</p> 
                            <a href="#" className="border-2 border-black-500 text-black-500 text-xl rounded-full px-12 py-2 mt-8 inline-block font-semibold hover:bg-green-500">Sign Up</a>
                        </div>
                            <img src="/images/bgbawah.png" className="mx-2 "/>
                    </div>
                </div>
            </main>
        </div>
    )
}