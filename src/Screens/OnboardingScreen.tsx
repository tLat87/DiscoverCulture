import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import BackgroundImage from '../Components/BackgroundImage';

const {width, height} = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({onComplete}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isCompletingRef = useRef(false);

  const steps = [
    {
      title: 'Welcome to Thairo Lotus Flow',
      description: 'Discover authentic Thai experiences throughout Britain',
      bottomImg: require('../Assets/img/1.png'),
      mainImg: require('../Assets/img/who1.png'),
    },
    {
      title: 'Five Petals of Discovery',
      description: 'Each petal represents a unique category of Thai culture',
      bottomImg: require('../Assets/img/2.png'),
      mainImg: require('../Assets/img/who2.png'),
    },
    {
      title: 'Your Journey Begins',
      description: 'Let your journey flow naturally from one petal to the next',
      bottomImg: require('../Assets/img/3.png'),
      mainImg: require('../Assets/img/who3.png'),
    },
  ];

  const handleNext = () => {
    if (isCompletingRef.current) {
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (isCompletingRef.current) {
      return;
    }
    handleComplete();
  };

  const handleComplete = () => {
    if (isCompletingRef.current) {
      return;
    }
    
    isCompletingRef.current = true;
    // Просто вызываем колбэк - навигация будет обработана в App.tsx
    onComplete();
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Верхняя половина экрана - mainImg */}
      <View style={styles.topHalf}>
        <Image
          source={steps[currentStep].mainImg}
          style={styles.mainImage}
          resizeMode="contain"
        />
        <View style={styles.stepIndicators}>
            {steps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepIndicator,
                  index === currentStep && styles.activeStepIndicator,
                ]}
              />
            ))}
          </View>
      </View>

      <TouchableOpacity style={styles.bottomHalf} onPress={handleNext} activeOpacity={1}>
        <View style={styles.bottomImageContainer}>
          <Image
            source={steps[currentStep].bottomImg}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </View>

        {/* Контент */}
    

        {/* Кнопки */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.7}>
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  mainImage: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: -50,
  },
  bottomHalf: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  bottomImageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImage: {
    // width: width * 0.8,
    // height: height * 0.15,
    width: width,
    height: height,
    marginBottom: -250,
  },
  contentContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#F5F5DC',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  stepIndicators: {
    flexDirection: 'row',
    marginTop: 40,
  },
  stepIndicator: {
    width: 10,
    height: 10,
  zIndex: 1000,
    borderRadius: 5,
    backgroundColor: 'rgba(245, 245, 220, 0.3)',
    marginHorizontal: 5,
  },
  activeStepIndicator: {
    backgroundColor: '#F5F5DC',
  },
  buttonContainer: {
    zIndex: 1000,
    marginTop: -100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#F5F5DC',
    opacity: 0.7,
  },
  nextButton: {
    backgroundColor: '#F5F5DC',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
});

export default OnboardingScreen;
