import { loginUser, getData } from "./api-autenticacao"
import { searchAddressByCep } from "./endpoint-endereco"
import { verifyCpf, signUpUser } from "./api-pessoas"
/**
 * Exportação centralizada de todas as requisições de cada uma das APIs que o app se comunica
 */
export const api = {
  autenticacao: {
    loginUser,
    getData
  },
  endereco: {
    searchAddressByCep
  },
  pessoas: {
    verifyCpf,
    signUpUser
  }
}