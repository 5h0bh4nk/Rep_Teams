import React from 'react';
import './Compose.css';

export default function Compose(props) {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={props.message}
          onChange={e => props.handleMessage(e)}
        />
        {
          props.rightItems
        }
      </div>
    );
}