import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {cartItemsData, isLoggedIn} from '../../redux/action/CartItemsAction';
import firestore from '@react-native-firebase/firestore';
import CartItems from '../../Components/CartItems/CartItems';

function HomeScreen() {
  const dispatch = useDispatch();

  const signout = async () => {
    await firebase.auth().signOut();
    dispatch(isLoggedIn(''));
  };

  const cartArrayItems = useSelector(state => state.cartReducer.cartArray);
  const user = useSelector(state => state.cartReducer.uid);

  const getDBData = async () => {
    const list = [];
    const usersCollection = await firestore()
      .collection('cartItems')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {Name, Price, OfferPrice, Image} = doc.data();
          list.push({
            id: doc.id,
            Price: Price,
            Name: Name,
            OfferPrice: OfferPrice,
            Image: Image,
          });
        });
      });
    dispatch(cartItemsData(list));
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getDBData();
    });
  }, [navigation]);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <Text style={{fontSize: 16}}>Welcome {user?.email}</Text>
        <View style={{justifyContent: 'flex-start'}}>
          <Button title="Signout" onPress={signout} />
        </View>
      </View>
      <FlatList
        data={cartArrayItems}
        renderItem={item => <CartItems getDBData={getDBData} item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Form', {item: undefined})}>
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 20,
            backgroundColor: 'grey',
            borderRadius: 30,
          }}>
          <Image
            style={{height: 50, width: 50}}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
