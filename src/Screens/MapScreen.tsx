import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import BackgroundImage from '../Components/BackgroundImage';
import {sampleLocations, categories} from '../Data/locations';
import LocationCard from '../Components/LocationCard';

const {width, height} = Dimensions.get('window');

interface MapScreenProps {
  onBack: () => void;
  onLocationPress: (location: any) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({onBack, onLocationPress}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredLocations = selectedCategory
    ? sampleLocations.filter(location => location.category === selectedCategory)
    : sampleLocations;

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
          
          <Text style={styles.title}>Thai Locations</Text>
          
          <View style={styles.placeholder} />
        </View>

        {/* Список локаций */}
        <ScrollView 
          style={styles.locationsList}
          contentContainerStyle={styles.locationsListContent}
          showsVerticalScrollIndicator={false}>
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onExplore={() => onLocationPress(location)}
              onShare={() => {}}
              onHeart={() => {}}
              isFavorite={false}
            />
          ))}
          {filteredLocations.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No locations found</Text>
            </View>
          )}
        </ScrollView>

        {/* Фильтры категорий */}
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: selectedCategory === category.id
                      ? category.color
                      : 'rgba(245, 245, 220, 0.2)',
                  },
                ]}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                activeOpacity={0.7}>
                <Text style={styles.filterIcon}>{category.icon}</Text>
                <Text style={styles.filterButtonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
            {selectedCategory && (
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={() => setSelectedCategory(null)}
                activeOpacity={0.7}>
                <Text style={styles.clearFiltersText}>Clear filters</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Информация */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            {filteredLocations.length} locations found
          </Text>
          <Text style={styles.infoSubtitle}>
            Tap locations to view details
          </Text>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  placeholder: {
    width: 60,
  },
  locationsList: {
    flex: 1,
  },
  locationsListContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#F5F5DC',
    opacity: 0.7,
  },
  filtersContainer: {
    paddingBottom: 20,
  },
  filtersScroll: {
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 220, 0.3)',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F5F5DC',
  },
  clearFiltersButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 220, 0.3)',
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 5,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#F5F5DC',
    opacity: 0.8,
  },
});

export default MapScreen;