import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {

  const [ favorites, setFavorites ] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('favorites').then(response => {
        if (response) {
          setFavorites(JSON.parse(response));
        }
      });
    }, [ favorites ])
  );

  return (
    <View style={ styles.container }>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={ styles.teacherList }
        contentContainerStyle={ {
          paddingHorizontal: 16,
          paddingBottom: 16
        } }
      >
        { favorites.map((favorite: Teacher) => {
          return (
            <TeacherItem
              key={ favorite.id }
              teacher={ favorite }
              favorited
            />
          );
        }) }
      </ScrollView>
    </View>
  );
}

export default Favorites;