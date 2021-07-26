import React from 'react';
import Messenger from '../Messenger/Messenger';
import Header from '../../Components/Header/Header'

export default function App(props) {
    return (
      <div className="App">
        <Header logoutUser={props.logoutUser} />
        <Messenger logoutUser={props.logoutUser}/>
      </div>
    );
}