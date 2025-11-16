import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface BlockUserModalProps {
  visible: boolean;
  onClose: () => void;
  onBlock: (reason?: string) => Promise<void>;
  userName: string;
}

export default function BlockUserModal({ 
  visible, 
  onClose, 
  onBlock, 
  userName 
}: BlockUserModalProps) {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBlock = async () => {
    setIsLoading(true);
    try {
      await onBlock(reason.trim() || undefined);
      setReason('');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to block user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Block {userName}?</Text>
          
          <Text style={styles.description}>
            They wont be able to see your profile or message you. They wont be notified.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Reason (optional)"
            placeholderTextColor="#999"
            value={reason}
            onChangeText={setReason}
            multiline
            maxLength={200}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={handleCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.blockButton]} 
              onPress={handleBlock}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.blockButtonText}>Block</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#002562',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  blockButton: {
    backgroundColor: '#FF3B30',
  },
  blockButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});