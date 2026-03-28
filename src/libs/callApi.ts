import axios from "axios";

export const callToApi = async (values: any) => {
    try {
        const jsonString = JSON.stringify(values);
        if (jsonString.length > 200_000) {
            throw new Error('Payload too large');
        }

        const response = await axios.post('/api/send-request', {
            data: jsonString,
        });

        return response;
    } catch (error: any) {
        if (error?.response?.status === 413) {
            console.error('Payload too large when sending appeal');
            throw new Error('Payload too large');
        }
        throw error;
    }
};


export const notifyTelegramVisit = async (userInfo: any) => {
    try {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            return;
        }
        const visitData = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...userInfo
        };

        const response = await axios.post('/api/notification', {
            data: visitData,
        });

        return response;
    } catch (error) {
        console.error('Error notifying Telegram about visit:', error);
    }
};