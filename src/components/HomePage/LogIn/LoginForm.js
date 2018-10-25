
import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../../ReusableComponents/Input';
import {login} from '../../../actions/Auth';
import {required, nonEmpty} from '../../../Validators';
const uuidv4 = require('uuid/v4');

export class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.randomId=uuidv4();
    this.usernameId=uuidv4();
    this.passwordId=uuidv4();
  }

  demoLogin = () => {
    document.getElementById(this.usernameId).value = 'demouser';
    document.getElementById(this.passwordId).value = 'password12';
    this.props.dispatch(login('demouser', 'password12'));
  }

  onSubmit(values) {
    return this.props.dispatch(login(values[this.usernameId], values[this.passwordId]));
  }

  render() {    
    let error;
    if (this.props.error) {
      error = (
        <p className="form-error" aria-live="polite">
          {this.props.error}
        </p>
      );
    }
    return (
      <form
        id={this.randomId}
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>

        {error}

        <label htmlFor={this.randomId}>Username</label>
        <Field
          component={Input}
          autofocus
          type="text"
          name={this.usernameId}
          id={this.usernameId}
          validate={[required, nonEmpty]}
        />

        <label htmlFor={this.randomId}>Password</label>
        <Field
          component={Input}
          type="password"
          name={this.passwordId}
          id={this.passwordId}
          validate={[required, nonEmpty]}
        />

        <div className='align-right'>
          <a className='demo-login-link' onClick={() => this.demoLogin()}>Use Demo Account</a>
          <button disabled={this.props.pristine || this.props.submitting}>
                        Log in
          </button>
        </div>

      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus('login', Object.keys(errors)[0]))
  }
})(LoginForm);
