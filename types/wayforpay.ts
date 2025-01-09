export interface WayForPayFormData {
  merchantAccount: string;
  merchantAuthType: string;
  merchantDomainName: string;
  merchantSignature: string;
  orderReference: string;
  orderDate: string;
  amount: number;
  currency: string;
  orderTimeout: string;
  productName: string[];
  productPrice: number[];
  productCount: number[];
  clientEmail: string;
  planType: string;
  serviceUrl: string;
}
