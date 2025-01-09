import { WayForPayFormData } from '@/types/wayforpay';

export const submitWayForPayForm = (formData: WayForPayFormData) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://secure.wayforpay.com/pay';
  form.acceptCharset = 'utf-8';

  const singleFields = {
    merchantAccount: formData.merchantAccount,
    merchantAuthType: formData.merchantAuthType,
    merchantDomainName: formData.merchantDomainName,
    merchantSignature: formData.merchantSignature,
    orderReference: formData.orderReference,
    orderDate: formData.orderDate,
    amount: formData.amount.toString(),
    currency: formData.currency,
    orderTimeout: formData.orderTimeout,
    clientEmail: formData.clientEmail,
    serviceUrl: formData.serviceUrl
  };

  Object.entries(singleFields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  formData.productName.forEach((value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'productName[]';
    input.value = value;
    form.appendChild(input);
  });

  formData.productPrice.forEach((value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'productPrice[]';
    input.value = value.toString();
    form.appendChild(input);
  });

  formData.productCount.forEach((value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'productCount[]';
    input.value = value.toString();
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
