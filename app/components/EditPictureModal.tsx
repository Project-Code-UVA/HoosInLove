import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface EditPictureModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function EditPictureModal({ visible, onClose }: EditPictureModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Title */}
          <Text style={styles.title}>Edit Your Profile Picture</Text>

          {/* Circular image container */}
          <View style={styles.imageWrapper}>
            <Image
              //source={require('../assets/images/profile-placeholder.png')}
              style={styles.imageIcon}
            />
          </View>

          {/* Save changes */}
          <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Nevermind</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },

  imageWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#F7F7F7',
  },

  imageIcon: {
    width: 55,
    height: 55,
    tintColor: '#777',
  },

  saveBtn: {
    width: '100%',
    backgroundColor: '#C2E3FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  saveText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#003366',
  },

  cancelBtn: {
    width: '100%',
    backgroundColor: '#F9C27A',
    paddingVertical: 12,
    borderRadius: 8,
  },

  cancelText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000000',
  },

});
