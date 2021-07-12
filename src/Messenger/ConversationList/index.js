import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import {baseUrl} from '../../shared/basUrl'
import MyDropdown from './Dropdown'

export default function ConversationList(props) {

  const [conversations, setConversations] = useState([]);
  const history = useHistory();
  useEffect(() => {
      getConversations();
      return history.listen((location)=>{
        getConversations();
      })
  },[history]);


 const getConversations = () => {
    const myHeader = new Headers();
    myHeader.append('Accept', 'application/json');
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', 'bearer '+ localStorage.getItem("token"));
    
    fetch(baseUrl+'groups', {
      method: 'GET',
      headers: myHeader
    })
    .then(response => response.json())
    .then(response => {
        let newConversations = response.filter(resp=>{
          if(resp.length!==5) return false;
          return true;
        }).map(result => {
          return {
            name: `${result}`,
            text: "Click on room to connect"
          };
        });
        setConversations([...conversations, ...newConversations])
    });
  }
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <MyDropdown/>
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
     </div>
    );
}