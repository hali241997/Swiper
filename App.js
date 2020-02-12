import React, { Component } from 'react';
import Swiper from './Swiper';
import { View, Image } from 'react-native';

class App extends Component {
  render() {
    return (
      <Swiper
        dotColor='gold'
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./image1.jpg')}
            style={{ width: 200, height: 200 }}
          />
        </View>
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./image2.jpg')}
            style={{ width: 200, height: 200 }}
          />
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('./image2.jpg')}
            style={{ width: 200, height: 200 }}
          />
        </View>

      </Swiper>
    );
  }
}

export default App;