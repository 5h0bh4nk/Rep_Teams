import React, {useEffect} from 'react';
import shave from 'shave';
import {Link} from 'react-router-dom'

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 30);
  })

    const { name, text } = props.data;
    const url = "/conversations/"+name;
    return (
      <div className="conversation-list-item">
        {/* <img className="conversation-photo" src={photo} alt="conversation" /> */}
        <div className="conversation-info">
          <Link to={url} className="conversation-title">{ name }</Link>
          <p className="conversation-snippet">{ text }</p>
        </div>
      </div>
    );
}