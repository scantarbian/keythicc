import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';

// components
import { HeaderWithMenu } from "components/Header";
import Herotext from "public/images/aboutus/herotext.svg";
import Heroimg from "public/images/aboutus/heroimg.svg";
import Keystruct from "public/images/aboutus/keystruct.svg";
import Keyside from "public/images/aboutus/keyside.svg";
import Team from "public/images/team.svg";
import Logo from "public/images/KeyThicc.svg";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Auctions | KeyThicc</title>
        <meta name="description" content="Welcome to KeyThicc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithMenu current="/about" />
      </main>

      <div className="max-w-screen-2xl mx-auto px-10 grid grid-cols-12 gap-4 pt-60 items-center">
          <div className="col-start-5 col-span-4">
            <Image src={Herotext}/> 
          </div>
          <div className="col-span-5 col-start-4 mt-12 ml-24 items-center"> 
            <Image src={Heroimg}/>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-2 gap-4 my-20 items-center">
          <div className="flex flex-col text-justify mr-36">
           <h2 className="mb-4 text-3xl text-300 font-bold text-gray-50">Who</h2>
            <p className="mt-8 my-6 text-2xl text-300 font-light text-gray-50 leading-32"> <b>KeyThicc</b> is an in development E-Commerce centered around keyboards and its corresponding peripherals. We aim to be the number one go to market for not only keyboard enthusiasts, but all sorts of people who are interested and require our products whether it be for daily office use, or even professional gaming line of works, we have them all!</p>
          </div>
          <div className="flex justify-center p-24 my-12"> 
            <Image src={Keystruct}/>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-2 gap-4 my-20 items-center">
          <div className="flex justify-center p-12"> 
            <Image src={Keyside}/>    
          </div>
          <div className="flex flex-col text-justify ml-44">
            <h2 className="mb-4 text-3xl text-300 font-bold text-gray-50">Why</h2>
            <p className="mt-8 my-6 text-2xl text-300 font-light text-gray-50 leading-32"> Over the years we have been developing a wide variety of keyboards. With the professionalism and experience we have for the last 12 years, we guarantee that our products have a very high quality. Our products are made with sincerity and pure love. We understand keyboard is your hobby, thats why we offer our product, the product you have never seen before</p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-10 grid grid-cols-12 gap-4 pt-48 items-center">
          <div className="col-span-11 col-start-0 mt-12 ml-24 items-center">
            <h2 className="mb-48 text-5xl text-300 font-bold text-center text-gray-50">Meet the Team</h2> 
            <Image src={Team} className="mx-2"/>    
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 mt-60 mb-96 items-center">
          <div className="px-6 pt-6">
            <form action="">
              <div className="ml-24 grid grid-cols-3 gap-4 justify-center items-center">
                <div>
                  <p className="text-gray-50 text-ellipsis font-semibold text-2xl">
                    <strong> Sign up for our newsletter</strong>
                  </p>
                </div>
                <div className="my-6">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email address"/>
                </div>
                <div className="text-center my-6">
                  <button type="button" className="inline-block px-6 py-2.5 bg-orange-500 text-gray-50 font-bold text-l leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-screen-3xl gap-4 px-24">
          <div className="p-4 bg-black-500">
            <div className="flex justify-between">
                <div className="mb-6">
                    <a href="#" className="flex items-center">
                        <Image src={Logo}/> 
                    </a>
                </div>
                <div className="grid gap-20 grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-m font-semibold text-orange-400 uppercase">Products</h2>
                        <ul className="text-gray-50">
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Peripherals</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Keyboards</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Auctions</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-m font-semibold text-orange-400 uppercase">Documentation</h2>
                        <ul className="text-gray-50">
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Screenshots</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Review</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Videos</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-m font-semibold text-orange-400 uppercase">Legal</h2>
                        <ul className="text-gray-50">
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Warranty Service</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Terms of Service</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-m font-semibold text-orange-400 uppercase">Company</h2>
                        <ul className="text-gray-50">
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500 ">Contact Us</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">About Us</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">Support</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">News</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:text-orange-500">FAQ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="mt-20 mb-10 text-gray-50 mx-auto" />
            <div className="mb-6 flex items-center justify-between">
                <span className="text-sm text-gray-50 ">© 2022 <a href="#" className="hover:underline">Pancapro, Corp</a>. All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 justify-center">
                    <a href="#" className="text-gray-50 hover:text-orange-500">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                    </a>
                    <a href="#" className="text-gray-50 hover:text-orange-500">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                    </a>
                    <a href="#" className="text-gray-50 hover:text-orange-500">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    </a>
                </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default About;