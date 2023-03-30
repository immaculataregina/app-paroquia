import { API_DIZIMO_CONFIG } from "../../config";
import { request } from "../clientHTTP";

export const newContributor = async (idPessoa) => {
  const url = `${API_DIZIMO_CONFIG.BASE_URL}/dizimo/nova-contribuicao/${idPessoa}`;

  const body = {
    idPessoa: idPessoa,
    idTipoContribuicao: 1, // 1 é espotânea e 2 é recorrente 
    idFormaPagamento: 1, //1 é cartão de crédito 2 é boleto e 3 é pix
    valor: 22.75,
    // diaVencimento: 5, //Enviar somente se for recorrente
    // dtInicio: '2023-03-05', //Enviar somente se for recorrente
  }

  try {
    const response = await request('post', url, body);
    return response;
  } catch (error) {
    return error;
  }
}
