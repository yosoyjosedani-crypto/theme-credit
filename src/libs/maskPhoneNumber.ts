
export const maskPhoneNumber = (phone: string) => {
    if (phone) {
        if (phone.length < 5) return phone;
        const start = phone.slice(0, 2);
        const end = phone.slice(-2);
        const masked = '*'.repeat(phone.length - 4);
        return `+${start} ${masked} ${end}`;
    }
    return '';
};