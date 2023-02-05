import { loginUser } from "./api-autenticacao"
import { searchAddressByCep } from "./endpoint-endereco"
/**
 * Exportação centralizada de todas as requisições de cada uma das APIs que o app se comunica
 */
export const api = {
  autenticacao: {
    loginUser
  },
  endereco: {
    searchAddressByCep
  }
}