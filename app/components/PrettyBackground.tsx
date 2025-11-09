// newcomps/PrettyBackground.tsx
import React, { ReactNode } from 'react';
import { ImageBackground, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';

interface PrettyBackgroundProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  imageStyle?: ImageStyle;
}

const PrettyBackground: React.FC<PrettyBackgroundProps> = ({ children, style, imageStyle }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/loginBackground.png')}
      style={[styles.background, style]}
      imageStyle={imageStyle}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrettyBackground;
