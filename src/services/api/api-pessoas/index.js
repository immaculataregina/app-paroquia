import { API_PESSOAS_CONFIG } from "../../config";
import { request } from "../clientHTTP";

export const verifyCpf = async (cpf) => {
  const url = `${API_PESSOAS_CONFIG.BASE_URL}/pessoas/verifica-cpf`;

  const body = {
    cpf: cpf.replace(/[.-]/g, '')
  }

  try {
    const response = await request('post', url, body);
    return response;
  } catch (error) {
    return error;
  }
}

export const signUpUser = async (body) => {
  const url = `${API_PESSOAS_CONFIG.BASE_URL}/pessoas`;

  try {
    const response = await request('post', url, body);
    return response;
  } catch (error) {
    return error;
  }
} 