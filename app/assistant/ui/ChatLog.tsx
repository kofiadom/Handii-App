import { Transcription } from '@/hooks/useDataStreamTranscriptions';
import { useLocalParticipant } from '@livekit/components-react';
import { useCallback } from 'react';
import {
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { FontSizes, FontWeights } from '@/constants/Theme';

export type ChatLogProps = {
  style: StyleProp<ViewStyle>;
  transcriptions: Transcription[];
};
export default function ChatLog({ style, transcriptions }: ChatLogProps) {
  const { localParticipant } = useLocalParticipant();
  const localParticipantIdentity = localParticipant.identity;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Transcription>) => {
      const isLocalUser = item.identity === localParticipantIdentity;
      if (isLocalUser) {
        return (
          <UserTranscriptionText
            text={item.segment.text}
            timestamp={item.segment.firstReceivedTime}
          />
        );
      } else {
        return (
          <AgentTranscriptionText
            text={item.segment.text}
            timestamp={item.segment.firstReceivedTime}
          />
        );
      }
    },
    [localParticipantIdentity]
  );

  return (
    <Animated.FlatList
      renderItem={renderItem}
      data={transcriptions}
      style={style}
      inverted={true}
      itemLayoutAnimation={LinearTransition}
    />
  );
}

const UserTranscriptionText = (props: { text: string; timestamp?: number }) => {
  let { text, timestamp } = props;
  const colorScheme = useColorScheme();

  const formatTime = (ms: number) => {
    const date = new Date(ms);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    text && (
      <View style={styles.userTranscriptionContainer}>
        <View style={styles.userMessageBubble}>
          <Text style={styles.userMessageText}>{text}</Text>
          {timestamp && (
            <Text style={styles.userMessageTimestamp}>
              {formatTime(timestamp)}
            </Text>
          )}
        </View>
      </View>
    )
  );
};

const AgentTranscriptionText = (props: { text: string; timestamp?: number }) => {
  let { text, timestamp } = props;
  const colorScheme = useColorScheme();

  const formatTime = (ms: number) => {
    const date = new Date(ms);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    text && (
      <View style={styles.agentTranscriptionContainer}>
        <View style={styles.agentMessageBubble}>
          <Text style={styles.agentMessageText}>{text}</Text>
          {timestamp && (
            <Text style={styles.agentMessageTimestamp}>
              {formatTime(timestamp)}
            </Text>
          )}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  userTranscriptionContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userMessageBubble: {
    maxWidth: '80%',
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessageText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.normal,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  userMessageTimestamp: {
    fontSize: FontSizes.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    fontWeight: FontWeights.normal,
  },

  agentTranscriptionContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  agentMessageBubble: {
    maxWidth: '80%',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  agentMessageText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.normal,
    color: '#1F2937',
    lineHeight: 22,
  },
  agentMessageTimestamp: {
    fontSize: FontSizes.xs,
    color: 'rgba(31, 41, 55, 0.6)',
    marginTop: 4,
    fontWeight: FontWeights.normal,
  },
});
