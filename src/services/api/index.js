import { loginUser } from "./api-autenticacao"
/**
 * Exportação centralizada de todas as requisições de cada uma das APIs que o app se comunica
 */
export const api = {
  autenticacao: {
    loginUser
  }
}