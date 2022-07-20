import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import { Route, Routes, Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";




interface State {
  login: {
    isLogged:boolean
  }
}

function App() {

  const stateFunc = (state:State) => state;
  const state = useSelector(stateFunc);

  if(state.login.isLogged) {
    return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
					<Route path="/" element={<ShoppingList/>}/>
					<Route path="/form" element={<ShoppingForm/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
  } else {  
    return(
        <div className="App">
          <Navbar/>
        <hr/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
        </div>		
  
    );
  }
}

export default App;
