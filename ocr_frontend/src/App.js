import { BrowserRouter } from 'react-router-dom';
import { UserRoute } from './Routing/userRoute';

export const App=()=>{
  return(
    <BrowserRouter>
    
      <UserRoute/>   
    </BrowserRouter>
  )
}