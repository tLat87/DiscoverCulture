import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');

interface LocationData {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  features: string[];
  openingHours: string;
}

interface LocationScreenProps {
  location: LocationData;
  onBack: () => void;
  onAddToFavorites: (locationId: string) => void;
  isFavorite: boolean;
}

const LocationScreen: React.FC<LocationScreenProps> = ({
  location,
  onBack,
  onAddToFavorites,
  isFavorite,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const contentRef = useRef<Animatable.View>(null);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '⭐' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E8B57" />
      
      {/* Заголовок с кнопкой назад */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onAddToFavorites(location.id)}
          activeOpacity={0.7}>
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Изображение */}
        <Animatable.View
          ref={contentRef}
          style={styles.imageContainer}
          animation="fadeIn"
          duration={1000}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🏛️</Text>
          </View>
        </Animatable.View>

        {/* Основная информация */}
        <Animatable.View
          style={styles.contentContainer}
          animation="fadeInUp"
          delay={300}
          duration={1000}>
          <Text style={styles.locationName}>{location.name}</Text>
          
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{location.category}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(location.rating)}
            </View>
            <Text style={styles.ratingText}>{location.rating}/5</Text>
          </View>

          {/* Описание */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About</Text>
            <Text style={styles.descriptionText}>
              {showFullDescription
                ? location.description
                : location.description.substring(0, 150) + '...'}
            </Text>
            {location.description.length > 150 && (
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}
                style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Адрес */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>📍 Address</Text>
            <Text style={styles.infoText}>{location.address}</Text>
          </View>

          {/* Телефон */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>📞 Phone</Text>
            <Text style={styles.infoText}>{location.phone}</Text>
          </View>

          {/* Часы работы */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>🕒 Opening Hours</Text>
            <Text style={styles.infoText}>{location.openingHours}</Text>
          </View>

          {/* Особенности */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>✨ Features</Text>
            <View style={styles.featuresList}>
              {location.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureText}>• {feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animatable.View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#2E8B57',
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
  favoriteButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  favoriteButtonText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 50,
  },
  contentContainer: {
    padding: 20,
  },
  locationName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#2E8B57',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  categoryText: {
    color: '#F5F5DC',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  star: {
    fontSize: 20,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  readMoreButton: {
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 16,
    color: '#2E8B57',
    fontWeight: '500',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '50%',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LocationScreen;
