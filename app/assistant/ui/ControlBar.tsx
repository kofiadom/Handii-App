import { TrackReference, useLocalParticipant } from '@livekit/components-react';
import { BarVisualizer } from '@livekit/react-native';
import { useEffect, useState } from 'react';
import {
  ViewStyle,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import { BorderRadius, Spacing } from '@/constants/Theme';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';

type ControlBarProps = {
  style?: StyleProp<ViewStyle>;
  options: ControlBarOptions;
};

type ControlBarOptions = {
  isMicEnabled: boolean;
  onMicClick: () => void;
  isCameraEnabled: boolean;
  onCameraClick: () => void;
  isScreenShareEnabled: boolean;
  onScreenShareClick: () => void;
  isChatEnabled: boolean;
  onChatClick: () => void;
  onExitClick: () => void;
};

export default function ControlBar({ style = {}, options }: ControlBarProps) {
  const { microphoneTrack, localParticipant } = useLocalParticipant();
  const [trackRef, setTrackRef] = useState<TrackReference | undefined>(
    undefined
  );

  useEffect(() => {
    if (microphoneTrack) {
      setTrackRef({
        participant: localParticipant,
        publication: microphoneTrack,
        source: microphoneTrack.source,
      });
    } else {
      setTrackRef(undefined);
    }
  }, [microphoneTrack, localParticipant]);

  const micScale = useSharedValue(1);
  const cameraScale = useSharedValue(1);
  const screenShareScale = useSharedValue(1);
  const chatScale = useSharedValue(1);
  const exitScale = useSharedValue(1);

  const createAnimatedStyle = (scale: Animated.Shared<number>) => {
    return useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });
  };

  const micAnimatedStyle = createAnimatedStyle(micScale);
  const cameraAnimatedStyle = createAnimatedStyle(cameraScale);
  const screenShareAnimatedStyle = createAnimatedStyle(screenShareScale);
  const chatAnimatedStyle = createAnimatedStyle(chatScale);
  const exitAnimatedStyle = createAnimatedStyle(exitScale);

  const animateButton = async (scale: Animated.Shared<number>, callback: () => void) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.95, {
      damping: 10,
      mass: 1,
      overshootClamping: false,
      restSpeedThreshold: 2,
      restDisplacementThreshold: 2,
    });
    setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 10,
        mass: 1,
        overshootClamping: false,
        restSpeedThreshold: 2,
        restDisplacementThreshold: 2,
      });
    }, 50);
    callback();
  };

  // Images
  let micImage = options.isMicEnabled
    ? require('@/assets/images/mic_24dp.png')
    : require('@/assets/images/mic_off_24dp.png');
  let cameraImage = options.isCameraEnabled
    ? require('@/assets/images/videocam_24dp.png')
    : require('@/assets/images/videocam_off_24dp.png');
  let screenShareImage = options.isScreenShareEnabled
    ? require('@/assets/images/present_to_all_24dp.png')
    : require('@/assets/images/present_to_all_off_24dp.png');
  let chatImage = options.isChatEnabled
    ? require('@/assets/images/chat_24dp.png')
    : require('@/assets/images/chat_off_24dp.png');
  let exitImage = require('@/assets/images/call_end_24dp.png');

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={[style, styles.container]}>
      <AnimatedTouchable
        style={[
          styles.button,
          options.isMicEnabled ? styles.enabledButton : undefined,
          micAnimatedStyle,
        ]}
        activeOpacity={0.7}
        onPress={() => animateButton(micScale, options.onMicClick)}
      >
        <Image style={styles.icon} source={micImage} />
        <BarVisualizer
          barCount={3}
          trackRef={trackRef}
          style={styles.micVisualizer}
          options={{
            minHeight: 0.1,
            barColor: '#CCCCCC',
            barWidth: 2,
          }}
        />
      </AnimatedTouchable>

      <AnimatedTouchable
        style={[
          styles.button,
          options.isCameraEnabled ? styles.enabledButton : undefined,
          cameraAnimatedStyle,
        ]}
        activeOpacity={0.7}
        onPress={() => animateButton(cameraScale, options.onCameraClick)}
      >
        <Image style={styles.icon} source={cameraImage} />
      </AnimatedTouchable>
      <AnimatedTouchable
        style={[
          styles.button,
          options.isScreenShareEnabled ? styles.enabledButton : undefined,
          screenShareAnimatedStyle,
        ]}
        activeOpacity={0.7}
        onPress={() => animateButton(screenShareScale, options.onScreenShareClick)}
      >
        <Image style={styles.icon} source={screenShareImage} />
      </AnimatedTouchable>
      <AnimatedTouchable
        style={[
          styles.button,
          options.isChatEnabled ? styles.enabledButton : undefined,
          chatAnimatedStyle,
        ]}
        activeOpacity={0.7}
        onPress={() => animateButton(chatScale, options.onChatClick)}
      >
        <Image style={styles.icon} source={chatImage} />
      </AnimatedTouchable>
      <AnimatedTouchable
        style={[styles.button, exitAnimatedStyle]}
        activeOpacity={0.7}
        onPress={() => animateButton(exitScale, options.onExitClick)}
      >
        <Image style={styles.icon} source={exitImage} />
      </AnimatedTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    opacity: 0.7,
  },
  enabledButton: {
    backgroundColor: '#2563EB',
    opacity: 1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  micVisualizer: {
    width: 24,
    height: 24,
    marginLeft: Spacing.xs,
  },
});
