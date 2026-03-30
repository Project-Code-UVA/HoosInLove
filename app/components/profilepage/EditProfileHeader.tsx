import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Logo from '../headercomponents/logo';

type Props = {
  onSave?: () => void;
  onExit?: () => void;
};

const PAGE_BG = '#EAF1F8';
const NAVY = '#002562';
const TAN = '#F2C078';

export default function EditProfileHeader({ onSave, onExit }: Props) {
  return (
    <View style={styles.headerContainer}>
      {/* LEFT: LOGO */}
      <View style={styles.logoWrapper}>
        <Logo scale={0.75} />
      </View>

      {/* RIGHT: BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={onSave}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={onExit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 110,
    backgroundColor: PAGE_BG,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3DBE6',

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  logoWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  button: {
    backgroundColor: TAN,
    borderRadius: 10,        // slightly smaller
    paddingHorizontal: 20,   // reduced from 26
    paddingVertical: 8,      // reduced from 10
    marginLeft: 12,          // slightly tighter spacing
    minWidth: 80,            // reduced from 100
    alignItems: 'center',
  },

  buttonText: {
    color: NAVY,
    fontSize: 16,            // reduced from 18
    fontWeight: '800',
  },
});