/**
 * Push para uma nova rota
 * @param history - Componente obtido pelo useHistory()
 * @param rota - Rota a ser navegada
 */
export default function useNewRoute(history, rota) {
  history.push(`/${rota}`);
}