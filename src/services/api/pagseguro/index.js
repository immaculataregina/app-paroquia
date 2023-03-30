import { request } from "../clientHTTP";

const BASE_URL = 'https://ws.sandbox.pagseguro.uol.com.br/v2';
const email = "thiago.lsanches2@gmail.com";
const token = "33F818AF8B11411D8759DD04BBC76DD4";

export const getCode = async (cpf) => {
  const url = `${BASE_URL}/checkout/email=${email}&token=${token}`;
  
  const body = {
      currency: 'BRL',
      'item: id': '1',
      'item: description': 'Espontaneo',
      'item: amount': '22.75',
      'item: quantity': '1',
      'item: weight': '0',
      'shipping: addressRequired': 'false'
  }

  try {
    const response = await request('post', url, body);
    return response;
  } catch (error) {
    return error;
  }
}