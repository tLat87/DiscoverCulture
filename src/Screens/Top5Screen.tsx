import React, {useRef} from 'react';
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

const {width, height} = Dimensions.get('window');

interface Top5Location {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: string;
  color: string;
  icon: string;
  badge: string;
  badgeColor: string;
  specialFeature: string;
}

interface Top5ScreenProps {
  onBack: () => void;
  onLocationPress: (location: Top5Location) => void;
}

const Top5Screen: React.FC<Top5ScreenProps> = ({onBack, onLocationPress}) => {
  const listRef = useRef<Animatable.View>(null);

  const top5Locations: Top5Location[] = [
    {
      id: '1',
      name: 'Royal Thai Restaurant',
      category: 'restaurants',
      description: 'Fine dining Thai restaurant with royal recipes and elegant atmosphere',
      rating: 4.9,
      distance: '1.5 km',
      color: '#FF6B6B',
      icon: '🍜',
      badge: 'Best Overall',
      badgeColor: '#FFD700',
      specialFeature: 'Royal Thai Cuisine',
    },
    {
      id: '2',
      name: 'Buddhist Temple London',
      category: 'temples',
      description: 'Most peaceful temple for meditation and spiritual reflection',
      rating: 4.9,
      distance: '1.2 km',
      color: '#45B7D1',
      icon: '🏛️',
      badge: 'Most Peaceful',
      badgeColor: '#87CEEB',
      specialFeature: 'Meditation Classes',
    },
    {
      id: '3',
      name: 'Thai Market Camden',
      category: 'markets',
      description: 'Largest selection of authentic Thai ingredients and products',
      rating: 4.8,
      distance: '2.1 km',
      color: '#FFEAA7',
      icon: '🛍️',
      badge: 'Best Market',
      badgeColor: '#FFA500',
      specialFeature: 'Fresh Ingredients',
    },
    {
      id: '4',
      name: 'Thai Cultural Center',
      category: 'cultural',
      description: 'Premier destination for Thai arts, culture, and community events',
      rating: 4.8,
      distance: '1.8 km',
      color: '#96CEB4',
      icon: '🎭',
      badge: 'Cultural Hub',
      badgeColor: '#98FB98',
      specialFeature: 'Cultural Events',
    },
    {
      id: '5',
      name: 'Street Thai Cafe',
      category: 'cafes',
      description: 'Most authentic street food experience with traditional recipes',
      rating: 4.7,
      distance: '0.8 km',
      color: '#4ECDC4',
      icon: '☕',
      badge: 'Best Street Food',
      badgeColor: '#20B2AA',
      specialFeature: 'Street Food Experience',
    },
  ];

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

  const renderTop5Item = (location: Top5Location, index: number) => (
    <Animatable.View
      key={location.id}
      animation="fadeInUp"
      delay={index * 200}
      duration={800}>
      <TouchableOpacity
        style={styles.top5Item}
        onPress={() => onLocationPress(location)}
        activeOpacity={0.7}>
        
        {/* Позиция в топе */}
        <View style={styles.rankContainer}>
          <View style={[styles.rankBadge, {backgroundColor: location.badgeColor}]}>
            <Text style={styles.rankNumber}>#{index + 1}</Text>
          </View>
        </View>

        {/* Основная информация */}
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <View style={styles.iconContainer}>
              <Text style={styles.itemIcon}>{location.icon}</Text>
            </View>
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{location.name}</Text>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {location.description}
              </Text>
            </View>
          </View>

          {/* Бейдж особенности */}
          <View style={styles.badgeContainer}>
            <View style={[styles.specialBadge, {backgroundColor: location.badgeColor}]}>
              <Text style={styles.specialBadgeText}>{location.badge}</Text>
            </View>
          </View>

          {/* Рейтинг и расстояние */}
          <View style={styles.itemFooter}>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(location.rating)}
              </View>
              <Text style={styles.ratingText}>{location.rating}</Text>
            </View>
            
            <Text style={styles.distanceText}>{location.distance}</Text>
            
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{location.category}</Text>
            </View>
          </View>

          {/* Особенность */}
          <View style={styles.featureContainer}>
            <Text style={styles.featureLabel}>✨ Special:</Text>
            <Text style={styles.featureText}>{location.specialFeature}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E8B57" />
      
      {/* Заголовок */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Top 5 in London</Text>
        
        <View style={styles.placeholder} />
      </View>

      {/* Описание */}
      <View style={styles.descriptionContainer}>
        <Animatable.Text
          style={styles.descriptionText}
          animation="fadeIn"
          delay={300}
          duration={1000}>
          Curated recommendations for the best Thai spots in the capital
        </Animatable.Text>
      </View>

      {/* Список Top 5 */}
      <ScrollView
        ref={listRef}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}>
        {top5Locations.map((location, index) =>
          renderTop5Item(location, index)
        )}
      </ScrollView>

      {/* Нижняя информация */}
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomInfoText}>
          🌟 These locations are hand-picked based on ratings, reviews, and authentic Thai experience
        </Text>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  placeholder: {
    width: 60,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    opacity: 0.9,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  top5Item: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  rankContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  itemContent: {
    padding: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemIcon: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  badgeContainer: {
    marginBottom: 15,
  },
  specialBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  specialBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 14,
    color: '#999',
  },
  categoryContainer: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  featureContainer: {
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  bottomInfo: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
  },
  bottomInfoText: {
    fontSize: 14,
    color: '#F5F5DC',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
  },
});

export default Top5Screen;
