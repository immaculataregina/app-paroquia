import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(() => (
    {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      match,
      location,
      history,
    }
  ), [params, match, location, history]);
}

export default useRouter;