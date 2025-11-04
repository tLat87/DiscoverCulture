import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Share from 'react-native-share';

const {width, height} = Dimensions.get('window');

interface LocationCardProps {
  location: {
    id: string;
    name: string;
    description: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    image?: string;
    img?: any;
  };
  onExplore: () => void;
  onShare: () => void;
  onHeart: () => void;
  isFavorite?: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onExplore,
  onShare,
  onHeart,
  isFavorite = false,
}) => {
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: location.name,
        message: `Check out this amazing place: ${location.name}\n\n${location.description}\n\nCoordinates: ${location.coordinates.latitude}, ${location.coordinates.longitude}`,
      };
      
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <Animatable.View
      style={styles.container}
      animation="fadeInUp"
      duration={800}>
      
      <View style={styles.imageContainer}>
        <Image
          source={location.img || require('../Assets/img/1.png')}
          style={styles.locationImage}
          resizeMode="cover"
        />
      </View>

      {/* Информационная карточка */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          
          {/* Название */}
          <Text style={styles.title}>{location.name}</Text>
          
          {/* Описание */}
          <Text style={styles.description}>{location.description}</Text>
          
          {/* Координаты */}
          <View style={styles.coordinatesContainer}>
            <Text style={styles.pinIcon}>📍</Text>
            <Text style={styles.coordinates}>
              {location.coordinates.latitude}, {location.coordinates.longitude}
            </Text>
          </View>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>
            {/* Explore Button */}
           

            {/* Share Button */}
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.8}>
              <View style={styles.shareButtonContainer}>
                <Text style={styles.shareIcon}>↗</Text>
              </View>
            </TouchableOpacity>

            {/* Heart Button */}
            <TouchableOpacity
              style={styles.heartButton}
              onPress={onHeart}
              activeOpacity={0.8}>
              <View style={styles.heartButtonGradient}>
                <Text style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    height: height * 0.4,
    width: '100%',
  },
  locationImage: {
    width: '100%',
    height: 300,
  },
  cardContainer: {
    // paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -90,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#F5F5DC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  exploreButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  shareButton: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shareButtonContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  heartButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  heartButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  heartIcon: {
    fontSize: 20,
  },
});

export default LocationCard;
