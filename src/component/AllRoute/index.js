import { useRoutes } from 'react-router-dom';
import { routers } from '../../router';

function AllRoute(){
  const element = useRoutes(routers)
  return element;
}

export default AllRoute;