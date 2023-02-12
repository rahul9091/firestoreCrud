import React, {useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

function FormScreen(props: any) {
  const {item} = props.route.params;
  const [price, setPrice] = useState(item?.item?.Price ?? '');
  const [name, setName] = useState(item?.item?.Name ?? '');
  const [offPrice, setOffPrice] = useState(item?.item?.OfferPrice ?? '');
  const [base64, setBase64] = useState(item?.item?.Image ?? '');
  const [imgSrc, setImgSrc] = useState('');

  const navigation = useNavigation();

  const updateById = async () => {
    await firestore()
      .collection('cartItems')
      .doc(item?.item?.id)
      .set({
        Name: name,
        Image: base64,
        OfferPrice: offPrice,
        Price: price,
      })
      .then(() => {
        alert('item updated successfully');
        navigation.goBack();
      });
  };

  const addToDB = async () => {
    if (!price || !offPrice || !name || !imgSrc) {
      alert('Please Fill the required fields');
      return;
    }
    const usersCollection = await firestore()
      .collection('cartItems')
      .add({
        Name: name,
        Image: base64,
        OfferPrice: offPrice,
        Price: price,
      })
      .then(() => {
        alert('added Successfullly');
        navigation.goBack();
      });
  };

  const selectImage = () => {
    // const { foto, photoFlag } = this.state
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, res => {
      console.log('Response', res);
      //   const foto = {assets}
      //   const fotoassets = res.assets
      //   console.log(,'fotoin the state')
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res.assets[0].uri;
        setImgSrc(source);
        toBase64(source);
        console.log(source, 'source');
      }
    });
  };

  const toBase64 = img => {
    ImgToBase64.getBase64String(img)
      .then(base64String => setBase64(base64String))
      .catch(err => console.log(err));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 30, alignSelf: 'center'}}>
          Add Items
        </Text>
        <View style={styles.mainView}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={inpt => setName(inpt)}
          />

          {imgSrc ? (
            <Text style={{width: 170}} numberOfLines={2}>
              {imgSrc}
            </Text>
          ) : (
            <Button onPress={selectImage} title=" upload image" />
          )}
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            keyboardType="number-pad"
            onChangeText={inpt => setPrice(inpt)}
          />
          <TextInput
            style={styles.input}
            placeholder="Offer Price"
            value={offPrice}
            keyboardType="number-pad"
            onChangeText={inpt => setOffPrice(inpt)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {!item ? (
            <TouchableOpacity
              onPress={addToDB}
              style={{
                alignItems: 'center',
                borderRadius: 20,
                marginRight: 30,
                height: 40,
                backgroundColor: 'skyblue',
                paddingHorizontal: 20,
              }}>
              <Text style={styles.txt}>Add</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={updateById}
              style={{
                alignItems: 'center',
                borderRadius: 20,
                marginRight: 30,
                height: 40,
                backgroundColor: 'skyblue',
                paddingHorizontal: 20,
              }}>
              <Text style={styles.txt}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 20,
    width: 150,
    marginVertical: 10,
  },
  touchable: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 2,
    left: 2,
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 999,
  },
  mainView: {
    padding: 10,
    marginVertical: 10,
  },
});

export default FormScreen;
