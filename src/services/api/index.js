import { loginUser, getData } from "./api-autenticacao"
import { searchAddressByCep } from "./endpoint-endereco"
import { verifyCpf, signUpUser } from "./api-pessoas"
import { getCode } from "./pagseguro"
import { newContributor } from "./api-dizimo"
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
  },
  dizimo: {
    newContributor
  },
  pagseguro: {
    getCode
  }
}