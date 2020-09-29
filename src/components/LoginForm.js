import React, {Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Input from './Input';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };
  onButtonPress() {
    const {email, password} = this.state;
    console.log('Processing login');

    this.setState({error: ''});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.message);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error2) => {
            console.log(error2.message);
            this.setState({error: 'Authentication Failed'});
          });
      });
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

        <CardSection>
          <Button onPress={() => this.onButtonPress()}>Login</Button>
        </CardSection>
      </Card>
    );
  }
}

export default LoginForm;
