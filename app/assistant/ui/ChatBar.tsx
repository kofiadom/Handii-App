import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '@/constants/Theme';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

type ChatBarProps = {
  style: StyleProp<ViewStyle>;
  value: string;
  onChangeText: (text: string) => void;
  onChatSend: (text: string) => void;
};

export default function ChatBar({
  style,
  value,
  onChangeText,
  onChatSend,
}: ChatBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isMessageEmpty = !value.trim();

  const handleSend = async () => {
    if (!isMessageEmpty && !isLoading) {
      try {
        setIsLoading(true);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onChatSend(value);
      } finally {
        setIsLoading(false);
      }
    } else if (isMessageEmpty) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[style]}
      keyboardVerticalOffset={24}
    >
      <View style={styles.container}>
        <TextInput
          style={[styles.input]}
          value={value}
          placeholder={'Type your message...'}
          placeholderTextColor={'#9CA3AF'}
          onChangeText={onChangeText}
          multiline={true}
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.button,
            isMessageEmpty || isLoading ? styles.buttonDisabled : styles.buttonActive,
          ]}
          activeOpacity={0.7}
          onPress={handleSend}
          disabled={isMessageEmpty || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size={20} />
          ) : (
            <Image
              source={require('@/assets/images/arrow_upward_24dp.png')}
              style={styles.buttonIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    outlineStyle: undefined,
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: '#FFFFFF',
    fontSize: FontSizes.base,
    fontWeight: FontWeights.normal,
    maxHeight: 100,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: Spacing.xs,
  },
  buttonDisabled: {
    backgroundColor: '#4B5563',
    opacity: 0.5,
  },
  buttonActive: {
    backgroundColor: '#2563EB',
    opacity: 1,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});
