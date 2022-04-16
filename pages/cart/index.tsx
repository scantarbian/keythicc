import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';

// components
import { HeaderWithMenu } from "components/Header";
import ALTimage from "public/images/ALTimage.png";
import minus from "public/images/-.svg";
import plus from "public/images/+.svg";
import ketik65 from "public/images/ketik65.png";
import Arrow from "public/images/Arrow.png";



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

        <div className="flex">
            <div id="MyCart" className="max-w-screen-2xl mx-11 px-10 grid grid-cols-12 gap-4 mt-10 items-center">
                    <div className="col-start-1 col-span-6">
                    <h1 className="text-2xl font-semibold text-gray-50">My Cart</h1>
                    </div>
                    
                    <div id="Per-item" className="col-start-1 w-full h-full col-span-7 bg-shark-500 items-center">
                        <div className="form-check">
                        <input className="form-check-input ml-8 m-5 h-7 w-7 border-2 border-yellow-500 bg-shark-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                        <label className="form-check-label inline-block font-semibold text-gray-50">
                            Select All
                        </label>
                        </div>
                        <hr className="w-full bg-manatee-500"></hr>
                        
                        <div className="col-start-1 w-full col-span-6 bg-shark-500">
                            <div className="flex items-start justify-start justify-self-start">
                                <div id="product-checkbox" className="m-4">
                                    <input className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-yellow-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                                    <label className="form-check-label inline-block font-semibold text-gray-50"></label>
                                </div> 
                                <div id="product-image" className="ml-2 my-3 mx-6">
                                    <Image className="rounded-lg" src={ALTimage}/> 
                                </div>
                                <div id="product-details" className="ml-2 my-3 mx-6">
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
                                <div id="product-removenprice" className="ml-96 my-3 mx-6">
                                    <a href="#" className="underline font-semibold text-yellow-500">Remove</a>
                                    <p  className="mt-5 text-lg font-basic text-gray-50">$140</p>
                                </div>
                            </div>
                            <hr className="w-full bg-manatee-500"></hr>
                        </div>  
                        <div className="col-start-1 w-full col-span-6 bg-shark-500">
                            <div className="flex items-start justify-start justify-self-start">
                                <div id="product-checkbox" className="m-4">
                                    <input className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-yellow-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                                    <label className="form-check-label inline-block font-semibold text-gray-50"></label>
                                </div> 
                                <div id="product-image" className="ml-2 my-3 mx-6">
                                    <Image className="rounded-lg" src={ALTimage}/> 
                                </div>
                                <div id="product-details" className="ml-2 my-3 mx-6">
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
                                <div id="product-removenprice" className="ml-96 my-3 mx-6">
                                    <a href="#" className="underline font-semibold text-yellow-500">Remove</a>
                                    <p  className="mt-5 text-lg font-basic text-gray-50">$140</p>
                                </div>
                            </div>
                            <hr className="w-full bg-manatee-500"></hr>
                        </div>
                        <div className="col-start-1 w-full col-span-6 bg-shark-500">
                            <div className="flex items-start justify-start justify-self-start">
                                <div id="product-checkbox" className="m-4">
                                    <input className="form-check-input ml-3 m-4 h-7 w-7 border-2 border-stormdust-500 bg-shark-500 checked:border-yellow-500 checked:text-yellow-500 rounded-sm" type="checkbox" value=""/>
                                    <label className="form-check-label inline-block font-semibold text-gray-50"></label>
                                </div> 
                                <div id="product-image" className="ml-2 my-3 mx-6">
                                    <Image className="rounded-lg" src={ALTimage}/> 
                                </div>
                                <div id="product-details" className="ml-2 my-3 mx-6">
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
                                <div id="product-removenprice" className="ml-96 my-3 mx-6">
                                    <a href="#" className="underline font-semibold text-yellow-500">Remove</a>
                                    <p  className="mt-5 text-lg font-basic text-gray-50">$140</p>
                                </div>
                            </div>
                            <hr className="w-full bg-manatee-500"></hr>
                        </div>
                    </div>    
                    <div id="Summary" className="ml-12 col-start-8 w-full h-full col-span-3 bg-shark-500 items-center">
                        <div id="Coupon" className="mt-10 m-5 flex bg-tuatara-500 rounded border-2 border-colonialwhite-500">
                            <h2 className="p-2 text-sm font-basic text-colonialwhite-500">Use Coupon Code or KeyThicc Points</h2>
                            <Image className="m-10" src={Arrow}/> 
                        </div>
                        <h2 className="m-5 mt-10 text-2xl font-semibold text-gray-50">Summary</h2>
                        <div id="item-price" className="flex justify-between">
                            <p className="m-5 mt-1 text-lg font-light text-gray-50">item price (3 items)</p>
                            <p className="m-5 mt-1 text-lg font-light text-gray-50">$290.00</p>
                        </div>
                        <div id="discount" className="flex justify-between">
                            <p className="m-5 mt-1 text-lg font-light text-manatee-500">Total item discount</p>
                            <p className="m-5 mt-1 text-lg font-light text-manatee-500">-$22.50</p>
                        </div> 
                        <div className="p-4">
                            <hr className="w-full bg-manatee-500"></hr>
                        </div>
                        <div className="flex justify-between">
                            <p className="m-5 mt-1 text-lg font-light text-gray-50">Total Price</p>
                            <p className="m-5 mt-1 text-lg font-light text-gray-50">$267.50</p>
                        </div> 
                        <div id="checkout" className="m-4 p-4 bg-yellow-500 items-center">
                            <h1 className="text-center text-lg font-semibold text-black">CHECKOUT</h1>
                        </div>
                    </div>  
                </div>
              
            
        </div>

        <div id="Recommendation" className="max-w-screen-2xl mx-11 px-10 grid grid-cols-12 gap-4 mt-10 items-center">
                    <div className="col-start-1 col-span-7 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-50">Recommendation</h1>
                        <a href="#" className="underline text-xl font-basic text-yellow-500">See All</a>
                    </div>

                    <div id="item" className="col-start-1 w-full h-full col-span-7 flex items-center space-evenly">
                        <div id="per" className="w-full h-full m-2 p-4 pb-2 pt-16 ml-0 col-span-1 bg-shark-500">
                            <div className="justify-items-center">
                                <Image className="rounded-lg" src={ketik65}/> 
                            </div>
                            <h2 id="name" className="mt-14 font-semibold text-gray-50">Keythicc Ketik65</h2>
                            <h1 id="price" className="mt-8 font-light text-gray-50">Rp990000</h1>
                            <div id="rating" className="flex items-center mb-3">
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p className="ml-2 text-xs font-light text-gray-50">(1.3k)</p>
                            </div>
                            <p className="text-xs font-light text-gray-50">Customizable</p>
                        </div>
                    
                        <div id="per" className="w-full h-full m-2 p-4 pb-2 pt-16 ml-0 col-span-1 bg-shark-500">
                            <div className="justify-items-center">
                                <Image className="rounded-lg" src={ketik65}/> 
                            </div>
                            <h2 id="name" className="mt-14 font-semibold text-gray-50">Keythicc Ketik65</h2>
                            <h1 id="price" className="mt-8 font-light text-gray-50">Rp990000</h1>
                            <div id="rating" className="flex items-center mb-3">
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p className="ml-2 text-xs font-light text-gray-50">(1.3k)</p>
                            </div>
                            <p className="text-xs font-light text-gray-50">Customizable</p>
                        </div>
                        
                        <div id="per" className="w-full h-full m-2 p-4 pb-2 pt-16 ml-0 col-span-1 bg-shark-500">
                            <div className="justify-items-center">
                                <Image className="rounded-lg" src={ketik65}/> 
                            </div>
                            <h2 id="name" className="mt-14 font-semibold text-gray-50">Keythicc Ketik65</h2>
                            <h1 id="price" className="mt-8 font-light text-gray-50">Rp990000</h1>
                            <div id="rating" className="flex items-center mb-3">
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p className="ml-2 text-xs font-light text-gray-50">(1.3k)</p>
                            </div>
                            <p className="text-xs font-light text-gray-50">Customizable</p>
                        </div>
                    
                    <div id="per" className="w-full h-full m-2 p-4 pb-2 pt-16 ml-0 col-span-1 bg-shark-500">
                            <div className="justify-items-center">
                                <Image className="rounded-lg" src={ketik65}/> 
                            </div>
                            <h2 id="name" className="mt-14 font-semibold text-gray-50">Keythicc Ketik65</h2>
                            <h1 id="price" className="mt-8 font-light text-gray-50">Rp990000</h1>
                            <div id="rating" className="flex items-center mb-3">
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-3 h-3 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p className="ml-2 text-xs font-light text-gray-50">(1.3k)</p>
                            </div>
                            <p className="text-xs font-light text-gray-50">Customizable</p>
                        </div>
                    </div>
                </div>
    </>
  );
};

export default cart;