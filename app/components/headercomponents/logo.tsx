import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Hoos In</Text>

      <View style={styles.bottomGroup}>
        <Svg width={63} height={49} viewBox="0 0 63 49" fill="none" style={styles.hearts}>
          {/* Black heart (far left) */}
          <Path
            d="M4.8529 20.1787C16.1957 36.5574 17.4805 37.3506 17.4805 37.3506C20.3162 39.3979 17.4805 39.3979 31.3194 21.2024C45.1584 3.00693 19.4966 -7.78479 19.0314 11.9894C13.36 -7.46029 -6.4899 3.80006 4.8529 20.1787Z"
            fill="black"
            stroke="black"
            strokeWidth={2.83333}
          />
          {/* Orange heart */}
          <Path
            d="M13.3529 23.0121C24.6957 39.3908 25.9805 40.1839 25.9805 40.1839C28.8162 42.2313 25.9805 42.2313 39.8194 24.0358C53.6584 5.84028 27.9966 -4.95145 27.5314 14.8227C21.86 -4.62695 2.0101 6.6334 13.3529 23.0121Z"
            fill="#F28D00"
            stroke="#F28D00"
            strokeWidth={2.83333}
          />
          {/* Light blue heart */}
          <Path
            d="M21.8529 25.8455C33.1957 42.2242 34.4805 43.0173 34.4805 43.0173C37.3162 45.0646 34.4805 45.0646 48.3194 26.8691C62.1584 8.67365 36.4966 -2.11808 36.0314 17.6561C30.36 -1.79357 10.5101 9.46678 21.8529 25.8455Z"
            fill="#75BFFF"
            stroke="#75BFFF"
            strokeWidth={2.83333}
          />
          {/* Navy heart */}
          <Path
            d="M30.3529 28.6788C41.6957 45.0575 42.9805 45.8506 42.9805 45.8506C45.8162 47.898 42.9805 47.898 56.8194 29.7025C70.6584 11.507 44.9966 0.715236 44.5314 20.4894C38.86 1.03974 19.0101 12.3001 30.3529 28.6788Z"
            fill="#002562"
            stroke="#002562"
            strokeWidth={2.83333}
          />
        </Svg>

        <Text style={styles.loveText}>love</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  topText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#002562',
    marginBottom: -2,
  },
  bottomGroup: {
    position: 'relative',
    width: 63,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hearts: {
    paddingTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loveText: {
    position: 'absolute',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textShadowColor: '#002562',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
    fontStyle: 'italic',
    top: 8,
  },
});
