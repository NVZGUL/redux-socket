import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as socketExampleActioms from 'redux/modules/socketexamplemodule';
import {SocketConnectionLog, SocketMessageLog} from 'components';

@connect(
  state => ({
    loaded: state.socketexample.loaded,
    message: state.socketexample.message,
    connected: state.socketexample.connected,
    history: state.socketexample.history
  }),
  socketExampleActioms)

export default class SocketExamplePage extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    message: PropTypes.string,
    connected: PropTypes.bool,
    history: PropTypes.array,
    socketsConnecting: PropTypes.func,
    socketsDisconnecting: PropTypes.func,
    socketsConnect: PropTypes.func,
    socketsDisconnect: PropTypes.func
  }
  render() {
    const {loaded, message, connected, socketsConnecting, socketsDisconnecting, history, socketsConnect, socketsDisconnect} = this.props;
    return (
      <div className="container">
        <h1>Socket Exapmle Page</h1>
        <Helmet title="Socket Exapmle Page"/>
        <p>Sockets not connected</p>
        <SocketConnectionLog
          loaded={loaded}
          message={message}
          connected={connected}
          connectAction={socketsConnecting}
          disconnectAction={socketsDisconnecting}
          history={history}
          connectAction={socketsConnect}
          disconnectAction={socketsDisconnect}
        />
        <SocketMessageLog />
      </div>
    );
  }
}
