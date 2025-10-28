import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/BackgroundImage';
import LocationCard from '../Components/LocationCard';
import {sampleLocations, categories} from '../Data/locations';

const {width, height} = Dimensions.get('window');

interface ListScreenProps {
  onBack: () => void;
  onLocationPress: (location: any) => void;
  onAddToFavorites?: (locationId: string) => void;
  onNavigateToSearchResults?: () => void;
}

const ListScreen: React.FC<ListScreenProps> = ({onBack, onLocationPress, onAddToFavorites, onNavigateToSearchResults}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'name'>('rating');

  const handleExplore = (location: any) => {
    if (onNavigateToSearchResults) {
      onNavigateToSearchResults();
    } else {
      onLocationPress(location);
    }
  };


  const handleHeart = (location: any) => {
    if (onAddToFavorites) {
      onAddToFavorites(location.id);
    }
    console.log('Add to favorites:', location.name);
  };

  const sortOptions = [
    {id: 'rating', name: 'Rating'},
    {id: 'distance', name: 'Distance'},
    {id: 'name', name: 'Name'},
  ];

  // Фильтрация и сортировка локаций
  const filteredAndSortedLocations = sampleLocations
    .filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           location.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || location.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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
          
          <Text style={styles.title}>UK filtered Thai places</Text>
          
          <View style={styles.placeholder} />
        </View>

        {/* Поиск */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations..."
            placeholderTextColor="#F5F5DC"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
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

        {/* Сортировка */}
        <View style={styles.sortContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortScroll}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortButton,
                  {
                    backgroundColor: sortBy === option.id
                      ? '#2E8B57'
                      : 'rgba(245, 245, 220, 0.2)',
                  },
                ]}
                onPress={() => setSortBy(option.id as any)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.sortButtonText,
                    {
                      color: sortBy === option.id ? '#F5F5DC' : '#F5F5DC',
                    },
                  ]}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Список локаций */}
        <ScrollView
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}>
          {filteredAndSortedLocations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              onExplore={() => handleExplore(location)}
              onShare={() => {}}
              onHeart={() => handleHeart(location)}
              isFavorite={false}
            />
          ))}
          
          {filteredAndSortedLocations.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No locations found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchInput: {
    backgroundColor: 'rgba(245, 245, 220, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#F5F5DC',
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 220, 0.3)',
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
  sortContainer: {
    paddingBottom: 20,
  },
  sortScroll: {
    paddingHorizontal: 20,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 220, 0.3)',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
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

export default ListScreen;