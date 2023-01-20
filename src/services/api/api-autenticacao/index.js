import { API_AUTENTICACAO_CONFIG } from "../../config";
import { request } from "../clientHTTP";

export const loginUser = async (email, password) => {
  const urlAutenticacao = `${API_AUTENTICACAO_CONFIG.BASE_URL}/usuario/autenticar`

  const body = {
    email,
    senha: password
  }

  try {
    const response = await request('post', urlAutenticacao, body);
    return response;
  } catch (error) {
    return error;
  }
}