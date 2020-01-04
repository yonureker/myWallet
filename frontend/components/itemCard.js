import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ItemCard = props => {

  const {id, title, amount, description} = props

  return(
  <View style={styles.container}>
    <View style={styles.cardLeft}>
     <Text style={{fontSize: 15}}>{title}</Text> 
    </View>
    <View style={styles.cardRight}>
      <Text style={{fontSize: 20, alignSelf:'flex-end'}}>${amount}</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#b8bcc2',
    height: 50,
    marginTop: 10,
    maxWidth: 350,
    backgroundColor: '#d3dade',
  },
  cardLeft: {
    width: '70%',
    padding: 10
  },
  cardRight: {
    width: '30%',
    padding: 10,
  }
})

export default ItemCard;