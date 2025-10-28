import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/BackgroundImage';
import Share from 'react-native-share';
import {LocationData} from '../Types';

const {width, height} = Dimensions.get('window');

interface SearchResultsScreenProps {
  onBack: () => void;
  onSearchOther: () => void;
  onClose: () => void;
  location?: LocationData;
}

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  onBack,
  onSearchOther,
  onClose,
  location,
}) => {
  // Используем переданные данные или дефолтные значения
  const locationData = location 
  const handleExplore = () => {
    console.log('Explore pressed');
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: locationData.name,
        message: `Check out this amazing place: ${locationData.name}\n\n${locationData.description}\n\nCoordinates: ${locationData.coordinates.latitude}, ${locationData.coordinates.longitude}`,
        url: `https://maps.google.com/?q=${locationData.coordinates.latitude},${locationData.coordinates.longitude}`,
      };
      
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleHeart = () => {
    console.log('Heart pressed');
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animatable.View
            style={styles.header}
            animation="fadeInDown"
            duration={800}>
            <View style={styles.resultsBanner}>
              <Text style={styles.resultsText}>Results:</Text>
            </View>
          </Animatable.View>

          {/* Main Card */}
          <Animatable.View
            style={styles.mainCard}
            animation="fadeInUp"
            delay={200}
            duration={800}>
            
            {/* Restaurant Image */}
            <View style={styles.imageContainer}>
              <Image
                source={locationData.img || require('../Assets/img/1.png')}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
            </View>

            {/* Information Card */}
            <View style={styles.infoCard}>
              {/* Title */}
              <Text style={styles.title}>{locationData.name}</Text>
              
              {/* Description */}
              <Text style={styles.description}>
                {locationData.description}
              </Text>
              
              {/* Coordinates */}
              <View style={styles.coordinatesContainer}>
                <Text style={styles.pinIcon}>📍</Text>
                <Text style={styles.coordinates}>{locationData.coordinates.latitude}, {locationData.coordinates.longitude}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonsContainer}>
                {/* Explore Button */}
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={handleExplore}
                  activeOpacity={0.8}>
                  <Text style={styles.exploreButtonText}>Explore</Text>
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShare}
                  activeOpacity={0.8}>
                  <Text style={styles.shareIcon}>↗</Text>
                </TouchableOpacity>

                {/* Heart Button */}
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={handleHeart}
                  activeOpacity={0.8}>
                  <Text style={styles.heartIcon}>❤️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>

          {/* Search Other Button */}
          <Animatable.View
            style={styles.searchOtherContainer}
            animation="fadeInUp"
            delay={400}
            duration={800}>
            <TouchableOpacity
              style={styles.searchOtherButton}
              onPress={onSearchOther}
              activeOpacity={0.8}>
              <Text style={styles.searchOtherText}>Search other</Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>

        {/* Close Button */}
        <Animatable.View
          style={styles.closeButtonContainer}
          animation="fadeIn"
          delay={600}
          duration={800}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  resultsBanner: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  mainCard: {
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  imageContainer: {
    height: height * 0.3,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: -20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: '#F5F5DC',
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginBottom: 12,
    lineHeight: 22,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pinIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  coordinates: {
    fontSize: 14,
    color: '#A0522D',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreButton: {
    flex: 1,
    marginRight: 12,
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  shareButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shareIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  heartButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  heartIcon: {
    fontSize: 20,
  },
  searchOtherContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  searchOtherButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchOtherText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  closeButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SearchResultsScreen;
