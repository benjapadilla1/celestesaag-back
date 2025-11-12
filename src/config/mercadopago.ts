import { MercadoPagoConfig } from 'mercadopago';

export const MPClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

