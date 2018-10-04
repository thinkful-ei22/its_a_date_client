import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../../actions/Users';
import {login} from '../../../actions/Auth';
import Input from '../../ReusableComponents/Input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../../Validators';
const passwordLength = length({min: 10, max: 72});
// const matchesPassword = matches('password');
const uuidv4 = require('uuid/v4');

export class RegistrationForm extends React.Component {

  constructor(props){
    super(props);
    this.randomId=uuidv4();
    this.usernameId=uuidv4();
    this.firstnameId=uuidv4();
    this.lastnameId=uuidv4();
    this.passwordId=uuidv4();
    this.emailAddressId=uuidv4();
    this.matchesPassword = matches(this.passwordId);
  }
  onSubmit(values) {
    const username = values[this.usernameId];
    const password = values[this.passwordId];
    const lastName = values[this.lastnameId];
    const firstName = values[this.firstnameId];
    const email = values[this.emailAddressId];

    const user = {username, password, firstName, lastName, email};
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {

      
            
    return (
      <form
        id={this.randomId}
        className="registration-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <label htmlFor={this.firstnameId}>First name</label>
        <Field component={Input} type="text" name={this.firstnameId} />
        <label htmlFor={this.lastnameId}>Last name</label>
        <Field component={Input} type="text" name={this.lastnameId} />
        <label htmlFor={this.usernameId}>Email</label>
        <Field
          component={Input}
          autofocus
          type="text"
          name={this.emailAddressId}
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor={this.usernameId}>Username</label>
        <Field
          component={Input}
          autofocus
          type="text"
          name={this.usernameId}
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor={this.passwordId}>Password</label>
        <Field
          component={Input}
          type="password"
          name={this.passwordId}
          validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, this.matchesPassword]}
        />
        <div className='align-right'>
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
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);