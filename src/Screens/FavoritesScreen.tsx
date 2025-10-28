import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/BackgroundImage';
import LocationCard from '../Components/LocationCard';
import {sampleLocations} from '../Data/locations';

const {width, height} = Dimensions.get('window');

interface FavoritesScreenProps {
  onBack: () => void;
  onLocationPress: (location: any) => void;
  onRemoveFavorite: (locationId: string) => void;
  favorites?: string[];
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  onBack,
  onLocationPress,
  onRemoveFavorite,
  favorites = [],
}) => {
  const [favoriteLocations, setFavoriteLocations] = useState(
    sampleLocations.filter(location => favorites.includes(location.id))
  );

  const handleExplore = (location: any) => {
    onLocationPress(location);
  };


  const handleHeart = (location: any) => {
    onRemoveFavorite(location.id);
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        {/* Заголовок */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>Favorite Places</Text>
          
          <View style={styles.placeholder} />
        </View>

        {/* Список избранного */}
        <ScrollView
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}>
          {favoriteLocations.length > 0 ? (
            favoriteLocations.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                onExplore={() => handleExplore(location)}
                onShare={() => {}}
                onHeart={() => handleHeart(location)}
                isFavorite={true}
              />
            ))
          ) : (
            <Animatable.View
              style={styles.emptyContainer}
              animation="fadeIn"
              duration={1000}>
              <Text style={styles.emptyIcon}>💔</Text>
              <Text style={styles.emptyText}>No favorites yet</Text>
              <Text style={styles.emptySubtext}>
                Start exploring and add places to your favorites
              </Text>
            </Animatable.View>
          )}
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#F5F5DC',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
  },
  placeholder: {
    width: 60,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 40,
  },
});

export default FavoritesScreen;