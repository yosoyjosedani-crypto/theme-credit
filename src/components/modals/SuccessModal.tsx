import React from 'react';
import Modal from './Modal';
import { clearLocalStorage } from '@/libs/storage';

interface SuccessModalProps {
    isOpendSuccess: boolean;
    onToggleSuccess: (value: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpendSuccess, onToggleSuccess }) => {

    const [isOpen, setIsOpen] = React.useState(isOpendSuccess);

    React.useEffect(() => {
        setIsOpen(isOpendSuccess);
        clearLocalStorage();
    }, [isOpendSuccess]);

    const handleClose = () => {
        setIsOpen(false);
        onToggleSuccess(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            title="Request has been sent"
            onClose={handleClose}
            isClosable={false}
        >

            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <div>
                    <div className='rounded-[10px] overflow-hidden mb-[15px]'>
                        <img src="/images/succes.jpg" width="100%" alt="success" />
                    </div>
                    <p className='text-[#9a979e] mb-[10px] text-[15px]'>Your request has been added to the processing queue. We will handle your request within 24 hours in case we do not receive feedback, please send back information so we can assist you.</p>
                    <p className='text-[#9a979e] mb-[20px] text-[15px]'>From the Customer support Meta.</p>
                    <a className='w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center transition-opacity duration-300' href="https://www.facebook.com">Return to Facebook</a>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto'>
                    <img src="/images/logo_gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;
