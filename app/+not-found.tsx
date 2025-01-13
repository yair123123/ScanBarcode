import {Stack,Link} from 'expo-router';
import {View,StyleSheet} from 'react-native';
import React from 'react';
export  const NotFoundScreen = () =>(

  <>
  <Stack.Screen options={{title:'Not Found'}} />
  <View style={styles.container}>
    <Link style= {styles.button} href={'/'}>
      Go back to home
    </Link>

  </View>
  </>
)

const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor:'#25292e',
      justifyContent:'center',
      alignItems:'center',
    },
    button:{
      fontSize:20,
      textDecorationLine:'underline',
      color:'#fff',
    }
  }
)