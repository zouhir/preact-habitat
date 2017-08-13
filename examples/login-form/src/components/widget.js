// theirs
import { h, Component } from 'preact';

// ours
import SigninWidget from './signin';

export default class Widget extends Component {
  state = {
    isAauthenticated: false
  };
  static defaultProps = {
    title: 'no-title!',
    message: 'default prop'
  };
  handleAuth = () => {
    this.setState({ isAauthenticated: true });
  };
  render() {
    let { isAauthenticated } = this.state;
    return (
      <div id="signin-widget">
        {!isAauthenticated
          ? <SigninWidget
              title={this.props.title} // from DOM
              btnAccentColor={this.props.btnAccentColor} // from DOM
              btnText={this.props.btnText}
              mesage={this.props.message}
              handleAuth={this.handleAuth}
            />
          : <Welcome />}
      </div>
    );
  }
}
