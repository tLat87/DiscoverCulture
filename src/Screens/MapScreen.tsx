import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/BackgroundImage';
import {sampleLocations, categories} from '../Data/locations';

const {width, height} = Dimensions.get('window');

interface MapScreenProps {
  onBack: () => void;
  onLocationPress: (location: any) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({onBack, onLocationPress}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);
  const mapRef = useRef<MapView>(null);

  const filteredLocations = selectedCategory
    ? sampleLocations.filter(location => location.category === selectedCategory)
    : sampleLocations;

  const handleMarkerPress = (location: any) => {
    onLocationPress(location);
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
          
          <Text style={styles.title}>Thai Locations Map</Text>
          
          <View style={styles.placeholder} />
        </View>

        {/* Карта */}
        <View style={styles.mapContainer}>
          {!mapError ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: 51.5074,
                longitude: -0.1278,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              onError={() => setMapError(true)}>
              
              {/* Маркеры локаций */}
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  coordinate={{
                    latitude: location.coordinates.latitude,
                    longitude: location.coordinates.longitude,
                  }}
                  title={location.name}
                  description={location.description}
                  onPress={() => handleMarkerPress(location)}>
                  <View style={[styles.customMarker, {backgroundColor: '#FF6B6B'}]}>
                    <Text style={styles.markerText}>📍</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) : (
            <View style={styles.mapFallback}>
              <Text style={styles.fallbackTitle}>🗺️ Map Loading...</Text>
              <Text style={styles.fallbackText}>
                {filteredLocations.length} locations found
              </Text>
              <Text style={styles.fallbackSubtext}>
                Tap locations below to view details
              </Text>
              
              {/* Список локаций как заглушка */}
              <ScrollView style={styles.fallbackList}>
                {filteredLocations.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={styles.fallbackItem}
                    onPress={() => handleMarkerPress(location)}>
                    <Text style={styles.fallbackItemIcon}>📍</Text>
                    <View style={styles.fallbackItemContent}>
                      <Text style={styles.fallbackItemName}>{location.name}</Text>
                      <Text style={styles.fallbackItemDescription}>
                        {location.coordinates.latitude}, {location.coordinates.longitude}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

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
            Tap markers to view details
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
  mapContainer: {
    flex: 1,
    margin: 20,
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
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerText: {
    fontSize: 20,
  },
  mapFallback: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  fallbackText: {
    fontSize: 18,
    color: '#2E8B57',
    marginBottom: 5,
  },
  fallbackSubtext: {
    fontSize: 14,
    color: '#2E8B57',
    opacity: 0.7,
    marginBottom: 20,
    textAlign: 'center',
  },
  fallbackList: {
    flex: 1,
    width: '100%',
  },
  fallbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fallbackItemIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  fallbackItemContent: {
    flex: 1,
  },
  fallbackItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 5,
  },
  fallbackItemDescription: {
    fontSize: 12,
    color: '#666',
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