import React from 'react';
import './Compose.css';
export default function Compose(props) {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
        />
        <span class="iconify" data-icon="mdi-send" data-inline="false"></span>
      </div>
    );
}