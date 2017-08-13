import { h, Component } from 'preact';
import style from './style';

export default class SigninWidget extends Component {
  render() {
    return (
      <div class={style.signinWidget}>
        <h3>{this.props.title}</h3>
        <a class={style.basebtn + ' ' + style.google}>
          Continue using Google
        </a>
        <a class={`${style.basebtn} ${style.facebook}`}>
          Continue using Facebook
        </a>
        <hr />
        <input type="text" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <div class={style.wrapper}>
          <a
            class={style.basebtn + ' ' + style.default}
            onClick={this.props.handleAuth}
            style={{backgroundColor: this.props.btnAccentColor}}
            >
            { this.props.btnText }
          </a>
          <a class={style.formFooter}>Forgot your password</a>
          <a class={style.formFooter}>{`I don't have an account`}</a>
        </div>
      </div>
    );
  }
}
