import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';

// components
import { HeaderWithMenu } from "components/Header";
import ALTimage from "public/images/ALTimage.png";
import minus from "public/images/-.svg";
import plus from "public/images/+.svg";



const cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/cart" />
      </main>

      <div className="max-w-screen-2xl mx-12 px-10 flex grid grid-cols-12 gap-4 mt-24 items-center">
        <div className="col-start-1 col-span-6">
          <h1 className="text-2xl font-semibold text-gray-50">My Cart</h1>
        </div>
        
        <div id="Per-item" className="col-start-1 w-full h-full col-span-6 bg-shark-500 items-center">
            <div className="form-check">
            <input className="form-check-input ml-8 m-5 h-7 w-7 border-2 border-yellow-500 bg-shark-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
            <label className="form-check-label inline-block font-semibold text-gray-50">
                Select All
            </label>
            </div>
            <hr className="w-full bg-manatee-500"></hr>
            
            <div className="col-start-1 w-full col-span-6 bg-shark-500">
                <div className="flex items-start justify-start justify-self-start">
                    <div id="product-checkbox" className="m-6">
                        <input className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-yellow-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                        <label className="form-check-label inline-block font-semibold text-gray-50"></label>
                    </div> 
                    <div id="product-image" className="ml-2 m-6">
                        <Image className="rounded-lg" src={ALTimage}/> 
                    </div>
                    <div id="product-details" className="ml-2 m-6">
                        <div id="product-name">
                            <p className="font-semibold text-gray-50">ALT</p>
                        </div>
                        <div id="product-desc">
                            <p className="text-xs font-basic text-manatee-500">Space Gray / Barebone</p>
                        </div>
                        <div id="product-quantity" className="mt-2 border-2 w-3/5 flex border-gray-50 justify-around">
                            <Image className="rounded-lg" src={minus}/> 
                            <p className="text-sm font-semibold text-gray-50 text-center">1</p>
                            <Image className="rounded-lg" src={plus}/>
                        </div>
                    </div>
                    <div id="product-removenprice" className="ml-60 m-6">
                        <a href="#" className="underline font-semibold text-yellow-500">Remove</a>
                        <p  className="mt-5 text-lg font-basic text-gray-50">$140</p>
                    </div>
                </div>
                <hr className="w-full bg-manatee-500"></hr>
            </div>
            <div className="col-start-1 w-full col-span-6 bg-shark-500">
                <div className="flex items-start justify-start justify-self-start">
                    <div id="product-checkbox" className="m-6">
                        <input className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-yellow-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                        <label className="form-check-label inline-block font-semibold text-gray-50"></label>
                    </div> 
                    <div id="product-image" className="ml-2 m-6">
                        <Image className="rounded-lg" src={ALTimage}/> 
                    </div>
                    <div id="product-details" className="ml-2 m-6">
                        <div id="product-name">
                            <p className="font-semibold text-gray-50">ALT</p>
                        </div>
                        <div id="product-desc">
                            <p className="text-xs font-basic text-manatee-500">Space Gray / Barebone</p>
                        </div>
                        <div id="product-quantity" className="mt-2 border-2 w-3/5 flex border-gray-50 justify-around">
                            <Image className="rounded-lg" src={minus}/> 
                            <p className="text-sm font-semibold text-gray-50 text-center">1</p>
                            <Image className="rounded-lg" src={plus}/>
                        </div>
                    </div>
                    <div id="product-removenprice" className="ml-60 m-6">
                        <a href="#" className="underline font-semibold text-yellow-500">Remove</a>
                        <p  className="mt-5 text-lg font-basic text-gray-50">$140</p>
                    </div>
                </div>
                <hr className="w-full bg-manatee-500"></hr>
            </div>
            <div className="col-start-1 w-full col-span-6 bg-shark-500">
                <div className="flex items-start justify-start justify-self-start">
                    <div id="product-checkbox" className="m-6">
                        <input className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-yellow-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                        <label className="form-check-label inline-block font-semibold text-gray-50"></label>
                    </div> 
                    <div id="product-image" className="ml-2 m-6">
                        <Image className="rounded-lg" src={ALTimage}/> 
                    </div>
                    <div id="product-details" className="ml-2 m-6">
                        <div id="product-name">
                            <p className="font-semibold text-gray-50">ALT</p>
                        </div>
                        <div id="product-desc">
                            <p className="text-xs font-basic text-manatee-500">Space Gray / Barebone</p>
                        </div>
                        <div id="product-quantity" className="mt-2 border-2 w-3/5 flex border-gray-50 justify-around">
                            <Image className="rounded-lg" src={minus}/> 
                            <p className="text-sm font-semibold text-gray-50 text-center">1</p>
                            <Image className="rounded-lg" src={plus}/>
                        </div>
                    </div>
                    <div id="product-removenprice" className="ml-60 m-6">
                        <a href="#" className="underline font-semibold text-yellow-500">Remove</a>
                        <p  className="mt-5 text-lg font-basic text-gray-50">$140</p>
                    </div>
                </div>
                <hr className="w-full bg-manatee-500"></hr>
            </div>
        </div>
        
      </div>
    </>
  );
};

export default cart;