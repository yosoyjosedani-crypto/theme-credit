import axios from "axios";

export const getUserIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        throw error;
    }
};

export const getUserLocation = async () => {
    try {
        const ipClient = await getUserIp();
        const response = await axios.get(`/api/ip-location?ip=${ipClient}`, { timeout: 5000 });
        const ip = ipClient;
        const region = response.data?.regionName || '';
        const regionCode = response.data?.region || '';
        const country = response.data?.country || 'Unknown';
        const countryCode = response.data?.countryCode || 'US';
        return {
            location: `${ip} | ${region}(${regionCode}) | ${country}(${countryCode})`,
            country_code: countryCode,
            ip,
        }
    } catch (error:any) {
        console.error('getUserLocation error:', error?.message || error);
        return {
            location: '0.0.0.0 | Unknown | Unknown(US)',
            country_code: 'US',
            ip: '0.0.0.0',
        };
    }
};