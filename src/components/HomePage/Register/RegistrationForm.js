import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../../../actions/Users';
import Input from '../../ReusableComponents/Input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../../Validators';
import { authError, login } from '../../../actions/Auth';
const passwordLength = length({min: 10, max: 72});
const uuidv4 = require('uuid/v4');

export class RegistrationForm extends React.Component {

  constructor(props){
    super(props);
    this.randomId=uuidv4();
    this.usernameId=uuidv4();
    this.passwordId=uuidv4();
    this.emailAddressId=uuidv4();
    this.matchesPassword = matches(this.passwordId);
  }

  demoLogin = () => {
    document.getElementById(this.usernameId).value = 'demouser';
    document.getElementById(this.passwordId).value = 'password12';
    document.getElementById('passwordConfirm').value = 'password12';
    document.getElementById(this.emailAddressId).value = 'demouser@foobar.com';
    this.props.dispatch(login('demouser', 'password12'));
  }


  onSubmit(values) {
    const username = values[this.usernameId];
    const password = values[this.passwordId];
    const email = values[this.emailAddressId];

    if (!username) {
      return this.props.dispatch(authError('Username is required.'));
    } else if (!password) {
      return this.props.dispatch(authError('Password is required.'));
    } else if (!email) {
      return this.props.dispatch(authError('Email is required.'));
    }

    const user = {username, password, email};
    this.props.dispatch(authError(null));
    return this.props.dispatch(registerUser(user))
  }

  componentWillUnmount(){
    this.props.dispatch(authError(null));
  }


  render() {

    return (
      <form
        id={this.randomId}
        className="registration-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>

        <p className='form-error'>{this.props.errorMessage}</p>

        <label htmlFor={this.usernameId}>Email</label>
        <Field
          id={this.emailAddressId}
          component={Input}
          autofocus
          type="email"
          name={this.emailAddressId}
          validate={[required, nonEmpty, isTrimmed]}
        />

        <label htmlFor={this.usernameId}>Username</label>
        <Field
          id={this.usernameId}
          component={Input}
          autofocus
          type="text"
          name={this.usernameId}
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor={this.passwordId}>Password</label>
        <Field
          id={this.passwordId}
          component={Input}
          type="password"
          name={this.passwordId}
          validate={[required, passwordLength, isTrimmed]}
        />

        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          id='passwordConfirm'
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, this.matchesPassword]}
        />

        <div className='align-right'>
          <a className='demo-login-link-register' onClick={() => this.demoLogin()}>Use Demo Account</a>
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}>
              Register
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration'
})(RegistrationForm);