import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/BackgroundImage';

const {width, height} = Dimensions.get('window');

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({onLoadingComplete}) => {
  const walrusRef = useRef<Animatable.View>(null);

  useEffect(() => {
    // Анимация загрузки
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
   
      {/* Текст загрузки */}
      <Animatable.Text
        style={styles.loadingText}
        animation="fadeIn"
        delay={1000}
        duration={1000}>
        Thairo Lotus Flow
      </Animatable.Text>
      
      <Animatable.Text
        style={styles.subtitle}
        animation="fadeIn"
        delay={1500}
        duration={1000}>
        Discovering Thai Culture in the UK
      </Animatable.Text>

      {/* Индикатор загрузки */}
      <View style={styles.loadingContainer}>
        <Animatable.View
          style={styles.loadingBar}
          animation="slideInLeft"
          delay={2000}
          duration={1000}
        />
      </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  walrusContainer: {
    marginBottom: 40,
  },
  walrus: {
    width: 120,
    height: 80,
    position: 'relative',
  },
  walrusBody: {
    width: 100,
    height: 60,
    backgroundColor: '#D2B48C',
    borderRadius: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  walrusHead: {
    width: 50,
    height: 40,
    backgroundColor: '#D2B48C',
    borderRadius: 25,
    position: 'absolute',
    top: 0,
    left: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  walrusEye: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  tusk: {
    width: 3,
    height: 15,
    backgroundColor: '#F5F5DC',
    position: 'absolute',
    top: 15,
    borderRadius: 2,
  },
  flipper: {
    width: 20,
    height: 15,
    backgroundColor: '#D2B48C',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  loadingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  loadingContainer: {
    width: width * 0.6,
    height: 4,
    backgroundColor: 'rgba(245, 245, 220, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F5F5DC',
    borderRadius: 2,
  },
});

export default LoadingScreen;
