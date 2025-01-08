import { WayForPayRequest } from '@/types/wayforpay';
import axios from '@/lib/axios';

export const createPayment = async (
  paymentData: WayForPayRequest
): Promise<string> => {
  try {
    const response = await axios.post('/v1/purchase/create', paymentData);
    console.log('Payment created:', response.data);

    return response.data.redirectUrl;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
