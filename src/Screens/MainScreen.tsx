import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/BackgroundImage';

const {width, height} = Dimensions.get('window');

interface MainScreenProps {
  onPetalPress: (category: string) => void;
  onMapPress: () => void;
  onListPress: () => void;
  onFavoritesPress: () => void;
  onTop5Press: () => void;
}

interface PetalData {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  angle: number;
}

const MainScreen: React.FC<MainScreenProps> = ({
  onPetalPress,
  onMapPress,
  onListPress,
  onFavoritesPress,
  onTop5Press,
}) => {
  const lotusRef = useRef<Animatable.View>(null);
  const [showAdvice, setShowAdvice] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const dailyAdvices = [
    "🌸 Today, embrace the beauty of Thai culture by trying a new dish you've never tasted before.",
    "🍜 Discover the art of Thai cooking - each ingredient tells a story of tradition and flavor.",
    "🏛️ Visit a local temple to find inner peace and connect with Thailand's spiritual heritage.",
    "☕ Start your day with Thai coffee culture - it's more than just a drink, it's a ritual.",
    "🎭 Explore Thai arts and crafts to understand the creativity flowing through this culture.",
    "🛍️ Visit a traditional market to experience the vibrant colors and aromas of Thai life.",
    "🌺 Practice mindfulness like the Thai people - find beauty in simple moments.",
    "🍃 Learn about Thai herbs and spices - they hold ancient wisdom for health and wellness.",
    "🎵 Listen to traditional Thai music to feel the rhythm of this beautiful culture.",
    "🌅 Wake up early to experience the peaceful morning rituals of Thai daily life.",
  ];

  const showDailyAdvice = () => {
    if (isAnimating) {
      return; // Предотвращаем множественные нажатия
    }
    
    setIsAnimating(true);
    const randomAdvice = dailyAdvices[Math.floor(Math.random() * dailyAdvices.length)];
    setCurrentAdvice(randomAdvice);
    
    // Останавливаем постоянную анимацию и делаем bounceIn
    if (lotusRef.current) {
      (lotusRef.current as any).stopAnimation();
      (lotusRef.current as any).bounceIn(300);
    }
    
    // Показываем модальное окно сразу
    setTimeout(() => {
      setShowAdvice(true);
      setIsAnimating(false);
    }, 200);
  };

  const closeAdvice = () => {
    setShowAdvice(false);
    
    // Возобновляем постоянную анимацию после закрытия модального окна
    setTimeout(() => {
      if (lotusRef.current) {
        (lotusRef.current as any).pulse(3000);
      }
    }, 300);
  };

  const petals: PetalData[] = [
    {
      id: 'restaurants',
      name: 'Restaurants',
      description: 'Authentic Thai dining',
      color: '#FF6B6B',
      icon: '🍜',
      angle: 0,
    },
    {
      id: 'cafes',
      name: 'Cafes',
      description: 'Cozy street cafés',
      color: '#4ECDC4',
      icon: '☕',
      angle: 72,
    },
    {
      id: 'temples',
      name: 'Temples',
      description: 'Serene spiritual places',
      color: '#45B7D1',
      icon: '🏛️',
      angle: 144,
    },
    {
      id: 'cultural',
      name: 'Cultural Hubs',
      description: 'Art & culture centers',
      color: '#96CEB4',
      icon: '🎭',
      angle: 216,
    },
    {
      id: 'markets',
      name: 'Markets',
      description: 'Traditional markets',
      color: '#FFEAA7',
      icon: '🛍️',
      angle: 288,
    },
  ];

  const renderPetal = (petal: PetalData, index: number) => {
    const centerX = width / 2;
    const centerY = height / 2 - 50;
    const radius = 120;
    
    const x = centerX + radius * Math.cos((petal.angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((petal.angle * Math.PI) / 180);

    return (
      <Animatable.View
        key={petal.id}
        style={[
          styles.petalContainer,
          {
            left: x - 40,
            top: y - 40,
          },
        ]}
        animation="zoomIn"
        delay={index * 200}
        duration={800}>
        <TouchableOpacity
          style={[styles.petal, {backgroundColor: petal.color}]}
          onPress={() => onPetalPress(petal.id)}
          activeOpacity={0.8}>
          <Text style={styles.petalIcon}>{petal.icon}</Text>
          <Text style={styles.petalName}>{petal.name}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        {/* Заголовок и описание */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover Thai Culture</Text>
          <Text style={styles.subtitle}>Tap the lotus to receive daily wisdom</Text>
        </View>

        {/* Интерактивный лотос */}
        <View style={styles.lotusContainer}>
          <TouchableOpacity
            onPress={showDailyAdvice}
            activeOpacity={0.8}
            style={styles.lotusButton}>
            <Animatable.View
              ref={lotusRef}
              animation="pulse"
              iterationCount="infinite"
              duration={3000}
              style={styles.lotusWrapper}>
              <Image source={require('../Assets/img/fl.png')} style={styles.lotusImage} />
            </Animatable.View>
          </TouchableOpacity>
        </View>

        {/* Инструкция */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            🌸 Tap the lotus flower to discover daily wisdom about Thai culture
          </Text>
        </View>
   
      </View>

      {/* Модальное окно с советом дня */}
      <Modal
        visible={showAdvice}
        transparent={true}
        animationType="fade"
        onRequestClose={closeAdvice}>
        <View style={styles.modalOverlay}>
          <Animatable.View
            style={styles.modalContainer}
            animation="zoomIn"
            duration={600}>
            
            {/* Заголовок */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🌸 Daily Wisdom</Text>
              <TouchableOpacity
                onPress={closeAdvice}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Совет */}
            <View style={styles.adviceContainer}>
              <Animatable.Text
                style={styles.adviceText}
                animation="fadeInUp"
                delay={300}
                duration={800}>
                {currentAdvice}
              </Animatable.Text>
            </View>

            {/* Декоративные элементы */}
            <View style={styles.decorativeElements}>
              <Animatable.Text
                style={styles.decorativeIcon}
                animation="rotate"
                iterationCount="infinite"
                duration={3000}>
                🌸
              </Animatable.Text>
              <Animatable.Text
                style={styles.decorativeIcon}
                animation="rotate"
                iterationCount="infinite"
                duration={4000}
                direction="reverse">
                🌺
              </Animatable.Text>
            </View>

            {/* Кнопка закрытия */}
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={closeAdvice}
              activeOpacity={0.8}>
              <Text style={styles.dismissButtonText}>Continue Journey</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    opacity: 0.8,
  },
  lotusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lotusButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lotusWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lotusCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lotusIcon: {
    fontSize: 40,
  },
  petalContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  petal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  petalIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  petalName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  instructionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#F5F5DC',
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 20,
  },
  lotusImage: {
    width: width * 0.7,
    height: height * 0.35,
    // borderRadius: 90,
    resizeMode: 'contain',
  },
  // Стили для модального окна
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#F5F5DC',
    borderRadius: 25,
    padding: 25,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  adviceContainer: {
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  adviceText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#2E8B57',
    textAlign: 'center',
    fontWeight: '500',
  },
  decorativeElements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  decorativeIcon: {
    fontSize: 30,
  },
  dismissButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dismissButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
});

export default MainScreen;
