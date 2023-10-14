import  { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const navigate = useNavigate()
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return navigate("/");
  } 
    return children
}

export default PrivateRoute;
