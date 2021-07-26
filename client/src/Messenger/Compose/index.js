import React from 'react';
import './Compose.css';
import { Form, Input } from 'reactstrap'

export default function Compose(props) {
    return (
      <div className="compose">
        <Form class="compose-form" onSubmit={props.sendMessage}>
          <Input
            type="text"
            className="compose-input"
            placeholder="Type a message"
            value={props.message}
            onChange={e => props.handleMessage(e)}
          />
        </Form>
        {
          props.rightItems
        }

      </div>
    );
}