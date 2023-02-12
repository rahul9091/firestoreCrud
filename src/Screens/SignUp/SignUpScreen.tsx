import React, {useState} from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {isLoggedIn} from '../../redux/action/CartItemsAction';
import {useDispatch} from 'react-redux';

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [valid, setValid] = useState(false);
  const [err, setErr] = useState('');

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const _isValidEmail = (input: string) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      setErr('');
    }
    return true;
  };

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
    createUserWithEmailAndPassword(email, pass);
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        console.log('isSuccessullSignup', response?.user);
        ToastAndroid.show('SignUp Successfull', 1000);

        dispatch(isLoggedIn(response?.user?.uid));

        // navigation.navigate('Login');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 20}}>
        {' '}
        Signup Screen
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
      </View>
      <View style={{height: 100}} />
      <Button
        onPress={checkValidationAndSubmit}
        title="Submit"
        color="#841584"
      />
      <View style={{justifyContent: 'flex-end', marginVertical: 50}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{textAlign: 'center'}}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;
