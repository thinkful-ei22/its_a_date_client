
import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './Input';
import Button from './Button';
import {login} from '../actions/Auth';
import {required, nonEmpty} from '../Validators';
const uuidv4 = require('uuid/v4');

export class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.randomId=uuidv4();
        this.usernameId=uuidv4();
        this.passwordId=uuidv4();
    }

    
    onSubmit(values) {
        return this.props.dispatch(login(values[this.usernameId], values[this.passwordId]));
    }


    componentWillUnMount(){
        console.log('unmounting');
       
    }

    componentWillMount(){
      console.log("mounting login form");

    }



    render() {
   
      
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
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
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);

//  export default withRouter (reduxForm({