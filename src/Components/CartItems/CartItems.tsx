import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

function CartItems(props: any) {
  const {item, getDBData} = props;

  const deleteItemById = async () => {
    await firestore()
      .collection('cartItems')
      .doc(item?.item?.id)
      .delete()
      .then(() => {
        alert('item deleted successfully');
        getDBData();
      });
  };

  const navigation = useNavigation();

  return (
    <View style={styles.product}>
      <Image
        style={styles.image}
        source={{uri: `data:image/png;base64,${item.item?.Image}`}}
      />
      <Text style={styles.text}>{item?.item?.Name}</Text>

      <Text style={styles.tag}>
        Price :<Text style={styles.tag2}>Rs {item?.item?.Price}</Text>
      </Text>
      <Text style={styles.title}>Offer Price: Rs {item?.item?.OfferPrice}</Text>

      <View
        style={{
          alignItems: 'flex-end',
          marginBottom: 30,
          marginHorizontal: 30,
          flexDirection: 'row-reverse',
        }}>
        <TouchableOpacity onPress={deleteItemById}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://toppng.com/uploads/preview/edit-delete-icon-delete-icon-11553444925vxge0bju5o.png',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Form', {item: item})}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://www.seekpng.com/png/detail/202-2022672_edit-comments-edit-icon-png-circle.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  message: {
    marginTop: 10,
    color: 'grey',
    paddingHorizontal: 10,
  },
  tag: {
    color: 'grey',
    alignSelf: 'center',
  },
  tag2: {
    color: 'grey',
    alignSelf: 'center',
    textDecorationLine: 'line-through',
  },
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    // height: 400,
    margin: 10,
    flexShrink: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 17,
    marginTop: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  dots: {
    position: 'absolute',
    right: 0,
    margin: 20,
  },
  image: {
    width: '90%',
    height: 200,
    margin: 10,
    opacity: 0.8,
  },
  text: {
    fontWeight: 'bold',
    // position: 'absolute',
    marginHorizontal: 20,
    textAlign: 'left',
    fontSize: 20,
  },
  icon: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
});

export default CartItems;
