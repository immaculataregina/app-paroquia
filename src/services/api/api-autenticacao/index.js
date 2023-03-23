import { API_AUTENTICACAO_CONFIG } from "../../config";
import { request } from "../clientHTTP";

export const loginUser = async (email, password) => {
  const urlAutenticacao = `${API_AUTENTICACAO_CONFIG.BASE_URL}/usuario/autenticar`;

  const body = {
    email,
    senha: password
  }

  try {
    return await request('post', urlAutenticacao, body);
  } catch (error) {
    return error;
  }
}

export const getData = async () => {
  const urlGetData = `${API_AUTENTICACAO_CONFIG.BASE_URL}/paroquia/dados-paroquia`;

  try {
    return await request('get', urlGetData);
  } catch (error) {
    return error;
  }
}