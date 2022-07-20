import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {logout} from '../actions/loginActions';
import {AppState} from '../types/states';

const Navbar:React.FC<{}> = (props) => {
	
	const stateFunc = (state:AppState) => state

	const state = useSelector(stateFunc);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	let navStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:120
	}
	let header = <h2>Shopping App</h2>
	if(state.login.loading) {
		header = <h2>Loading ...</h2>
	}
	if(state.shopping.error) {
		header = <h2>{state.shopping.error}</h2>
	}
	if(state.login.error) {
		header = <h2>{state.login.error}</h2>
	}
	if(state.login.isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/">Shopping List</Link></li>
					<li><Link to="/form">Add new item</Link></li>
					<li><Link to="/" onClick={
						() => {dispatch(logout(state.login.token))}
					}>Logout</Link></li>
				</ul>
			</div>

		)
	} else {
		return(
			<div style={navStyle}>
				{header}
			</div>
		)
	}
}

export default Navbar;