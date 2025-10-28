import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, View, Image} from 'react-native';

// Screens
import LoadingScreen from './Screens/LoadingScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import MainScreen from './Screens/MainScreen';
import LocationScreen from './Screens/LocationScreen';
import MapScreen from './Screens/MapScreen';
import ListScreen from './Screens/ListScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import Top5Screen from './Screens/Top5Screen';
import SearchResultsScreen from './Screens/SearchResultsScreen';

// Data
import {getRandomLocation, sampleLocations} from './Data/locations';
import {LocationData, MapLocation, ListLocation, FavoriteLocation, Top5Location} from './Types';

type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  Location: {location: LocationData};
  Map: undefined;
  List: undefined;
  Favorites: undefined;
  Top5: undefined;
  SearchResults: {location?: LocationData};
  MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Helper functions
const handleAddToFavorites = (locationId: string, setFavorites: React.Dispatch<React.SetStateAction<string[]>>) => {
  setFavorites(prev => 
    prev.includes(locationId) 
      ? prev.filter(id => id !== locationId)
      : [...prev, locationId]
  );
};

const handleRemoveFavorite = (locationId: string, setFavorites: React.Dispatch<React.SetStateAction<string[]>>) => {
  setFavorites(prev => prev.filter(id => id !== locationId));
};

// Tab Navigator Component
const TabNavigator: React.FC<{
  favorites: string[];
  onLocationPress: (location: any) => void;
  onAddToFavorites: (locationId: string) => void;
  onRemoveFavorite: (locationId: string) => void;
  onNavigateToSearchResults: () => void;
}> = ({favorites, onLocationPress, onAddToFavorites, onRemoveFavorite, onNavigateToSearchResults}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#D4AF37',
          // borderTopLeftRadius: 25,
          // borderTopRightRadius: 25,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: '#8B4513',
        tabBarLabelStyle: {
          display: 'none', // Скрываем лейблы, так как у нас есть иконки
        },
      }}>
      <Tab.Screen
        name="Map"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              backgroundColor: focused ? '#8B4513' : 'transparent',
              borderRadius: 12,
              padding: 8,
              transform: [{scale: focused ? 1.1 : 1}],
            }}>
              <Image
                source={require('./Assets/img/ico/1.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#D4AF37' : '#8B4513',
                }}
              />
            </View>
          ),
        }}>
        {({navigation}) => (
          <MapScreen
            onBack={() => navigation.goBack()}
            onLocationPress={onLocationPress}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="List"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              backgroundColor: focused ? '#8B4513' : 'transparent',
              borderRadius: 12,
              padding: 8,
              transform: [{scale: focused ? 1.1 : 1}],
            }}>
              <Image
                source={require('./Assets/img/ico/3.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#D4AF37' : '#8B4513',
                }}
              />
            </View>
          ),
        }}>
        {({navigation}) => (
          <ListScreen
            onBack={() => navigation.goBack()}
            onLocationPress={onLocationPress}
            onAddToFavorites={onAddToFavorites}
            onNavigateToSearchResults={onNavigateToSearchResults}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="Main"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              backgroundColor: focused ? '#8B4513' : 'transparent',
              borderRadius: 12,
              padding: 8,
              transform: [{scale: focused ? 1.1 : 1}],
            }}>
              <Image
                source={require('./Assets/img/ico/2.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#D4AF37' : '#8B4513',
                }}
              />
            </View>
          ),
        }}>
        {({navigation}) => (
          <MainScreen
            onPetalPress={(category) => console.log('Petal pressed:', category)}
            onMapPress={() => navigation.navigate('Map')}
            onListPress={() => navigation.navigate('List')}
            onFavoritesPress={() => navigation.navigate('Favorites')}
            onTop5Press={() => navigation.navigate('Top5')}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              backgroundColor: focused ? '#8B4513' : 'transparent',
              borderRadius: 12,
              padding: 8,
              transform: [{scale: focused ? 1.1 : 1}],
            }}>
              <Image
                source={require('./Assets/img/ico/4.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#D4AF37' : '#8B4513',
                }}
              />
            </View>
          ),
        }}>
        {({navigation}) => (
          <FavoritesScreen
            onBack={() => navigation.goBack()}
            onLocationPress={onLocationPress}
            onRemoveFavorite={onRemoveFavorite}
            favorites={favorites}
          />
        )}
      </Tab.Screen>
{/*       
      <Tab.Screen
        name="Top5"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              backgroundColor: focused ? '#8B4513' : 'transparent',
              borderRadius: 12,
              padding: 8,
              transform: [{scale: focused ? 1.1 : 1}],
            }}>
              <Image
                source={require('./Assets/img/ico/5.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#D4AF37' : '#8B4513',
                }}
              />
            </View>
          ),
        }}>
        {({navigation}) => (
          <Top5Screen
            onBack={() => navigation.goBack()}
            onLocationPress={onLocationPress}
          />
        )}
      </Tab.Screen> */}
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Симуляция загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handlePetalPress = (category: string) => {
    // В реальном приложении здесь будет навигация к экрану с деталями локации
    const randomLocation = getRandomLocation(category);
    console.log('Selected category:', category, 'Random location:', randomLocation);
  };

  const handleAddToFavoritesWrapper = (locationId: string) => {
    handleAddToFavorites(locationId, setFavorites);
  };

  const handleRemoveFavoriteWrapper = (locationId: string) => {
    handleRemoveFavorite(locationId, setFavorites);
  };

  const handleLocationPress = (location: LocationData | ListLocation | FavoriteLocation | Top5Location) => {
    // Преобразование в LocationData для экрана деталей
    const locationData: LocationData = {
      id: location.id,
      name: location.name,
      category: location.category,
      description: location.description,
      address: 'Sample Address, London',
      phone: '+44 20 1234 5678',
      rating: location.rating,
      image: 'sample.jpg',
      coordinates: {
        latitude: 51.5074,
        longitude: -0.1278,
      },
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      openingHours: 'Mon-Sun: 10:00-22:00',
    };
    
    console.log('Location pressed:', locationData);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}>
        <Stack.Screen name="MainTabs">
          {({navigation}) => (
            <TabNavigator
              favorites={favorites}
              onLocationPress={handleLocationPress}
              onAddToFavorites={handleAddToFavoritesWrapper}
              onRemoveFavorite={handleRemoveFavoriteWrapper}
              onNavigateToSearchResults={() => navigation.navigate('SearchResults', {location: getRandomLocation()})}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SearchResults">
          {({navigation, route}) => (
            <SearchResultsScreen
              onBack={() => navigation.goBack()}
              onSearchOther={() => navigation.goBack()}
              onClose={() => navigation.goBack()}
              location={route.params?.location}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
