import { MercadoPagoConfig } from 'mercadopago';

if (!process.env.MP_ACCESS_TOKEN) {
  console.warn('⚠️ MERCADOPAGO access token (MP_ACCESS_TOKEN) is not set');
}

export const MPClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

