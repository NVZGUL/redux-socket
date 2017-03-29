import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as socketExampleActions from 'redux/modules/socketexamplemodule';

@connect(
  state => ({
    loaded: state.socketexample.loaded,
    message: state.socketexample.message,
    connected: state.socketexample.connected,
    message_history: state.socketexample.message_history
  }),
  socketExampleActions)

export default class SocketMessageLog extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    message: PropTypes.string,
    connected: PropTypes.bool,
    message_history: PropTypes.array,
    socketsMessageSend: PropTypes.func,
  }

  handleSendButton = (event) => {
    event.preventDefault();
    this.props.socketsMessageSend(this.refs.message_text.value);
    this.refs.message_text.value = '';
  }

  render() {
    const {loaded, connected, message_history} = this.props;
    return (
      <div className="row">
        <h3>Message log</h3>
        <ul>
          {
            message_history.map((el, index) =>
            <li key={index} className={'unstyled'}>
              <span className={(el.direction === '->') ? 'glyphicon glyphicon-arrow-right' : 'glyphicon glyphicon-arrow-left'}></span>
              {el.message}
            </li>
            )}
        </ul>
        <form className="form-inline" onSubmit={this.handleSendButton}>
          <p></p>
          <div className="form-group">
            <input
              className="form-control input-sm"
              type="text"
              ref="message_text"
              readOnly={(loaded === true) ? false : true}/>
          </div>
          <button className="btn btn-primary btn-sm"
                  disabled={(connected === true) ? false : true}
                  onClick={this.handleSendButton}>
            <i className="fa fa-sign-in"/> Send
          </button>
        </form>
      </div>
    );
  }
}
