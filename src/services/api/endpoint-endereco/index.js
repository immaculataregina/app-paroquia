import axios from 'axios';

export const searchAddressByCep = async (cep) => {
  const urlAutenticacao = `https://viacep.com.br/ws/${cep}/json/`

  try {
    const response = await axios.get(urlAutenticacao);

    return response;
  } catch (error) {
    return error;
  }
}