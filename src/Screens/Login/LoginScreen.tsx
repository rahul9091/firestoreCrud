import React, {useState} from 'react';
import {Alert, Button, Text, TextInput, ToastAndroid, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {isLoggedIn} from '../../redux/action/CartItemsAction';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();

  const checkValidationAndSubmit = () => {
    if (!email) {
      setErr('Email required *');
      setValid(false);
      return;
    } else if (!pass && pass.trim() && pass.length > 8) {
      setErr('Weak password, minimum 8 chars');
      setValid(false);
      return;
    } else if (!_isValidEmail(email)) {
      setErr('Invalid Email');
      setValid(false);
      return;
    }
    loginWithEmailAndPassword(email, pass);
  };

  const _isValidEmail = (input: string) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      setErr('');
    }
    return true;
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        ToastAndroid.show('Login Successfull', 1000);
        dispatch(isLoggedIn(response?.user));
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 20}}>
        Login
      </Text>

      <View style={{margin: 10, justifyContent: 'center'}}>
        <TextInput
          value={email}
          onChangeText={e => setEmail(e)}
          style={{borderColor: 'grey', borderWidth: 1}}
          placeholder="Enter Email"
        />
        <Text>{err}</Text>
        <View style={{height: 10}} />
        <TextInput
          value={pass}
          onChangeText={p => setPass(p)}
          style={{borderColor: 'grey', borderWidth: 1}}
          placeholder="Enter Password"
        />
        <View style={{height: 10}} />
        <Button
          onPress={checkValidationAndSubmit}
          title="Submit"
          color="#841584"
        />
      </View>
    </View>
  );
}

export default LoginScreen;
