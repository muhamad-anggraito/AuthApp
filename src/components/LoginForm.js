import React, {Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Input from './Input';
import Spinner from './Spinner';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onLoginSucces() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }
  onButtonPress() {
    const {email, password} = this.state;
    console.log('Processing login');

    this.setState({error: '', loading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucces)
      .catch((error) => {
        console.log(error.message);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucces)
          .catch((error2) => {
            console.log(error2.message);
            this.setState({error: 'Authentication Failed', loading: false});
          });
      });
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <Button onPress={() => this.onButtonPress()}>Login</Button>;
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </CardSection>

        <Text style={{fontsize: 20, alignself: 'center', color: 'red'}}>
          {this.state.error}
        </Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

export default LoginForm;
