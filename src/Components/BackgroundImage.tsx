import React from 'react';
import {ImageBackground, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

interface BackgroundImageProps {
  children: React.ReactNode;
  imagePath?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  imagePath,
}) => {
  return (
    <ImageBackground
      source={imagePath ? {uri: imagePath} : require('../Assets/img/BG.png')}
      style={styles.background}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default BackgroundImage;

