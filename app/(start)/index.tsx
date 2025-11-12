import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const hubs = [
    {
      id: 'administrative',
      title: 'Administrative Hub',
      description: 'Forms, appointments, and paperwork assistance',
      icon: '📋',
      color: '#3B82F6',
    },
    {
      id: 'transportation',
      title: 'Transportation Hub',
      description: 'Rides and travel assistance',
      icon: '🚗',
      color: '#10B981',
    },
    {
      id: 'language',
      title: 'Language Hub',
      description: 'Translation and communication help',
      icon: '🌐',
      color: '#8B5CF6',
    },
    {
      id: 'medical',
      title: 'Medical Hub',
      description: 'Healthcare support and guidance',
      icon: '❤️',
      color: '#EF4444',
    },
    {
      id: 'social',
      title: 'Social Hub',
      description: 'Companionship and social activities',
      icon: '👥',
      color: '#F59E0B',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Medical appointment scheduled',
      volunteer: 'Sarah Johnson',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Insurance form completed',
      volunteer: 'Michael Chen',
      time: '1 day ago',
    },
    {
      id: 3,
      title: 'Grocery shopping trip',
      volunteer: 'Emma Wilson',
      time: '2 days ago',
    },
  ];

  const handleNavigateToHub = (hubId: string) => {
    if (hubId === 'administrative') {
      router.push('/volunteers');
    }
  };

  const handleVoiceAgent = () => {
    router.push('/assistant');
  };

  return (
    <LinearGradient
      colors={['#EFF6FF', '#E0E7FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>M</Text>
            </View>
          </View>
          <Text style={[styles.welcomeText, { color: colors.foreground }]}>
            Welcome back, Margaret!
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Connect with caring volunteers ready to help you with daily tasks, appointments, and more.
          </Text>
          <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.badgeText, { color: colors.secondaryForeground }]}>
              ⏰ 3 active volunteers nearby
            </Text>
          </View>
        </View>

        {/* Voice Agent Button */}
        <TouchableOpacity
          style={[styles.voiceAgentButton, { backgroundColor: '#002CF2' }]}
          onPress={handleVoiceAgent}
          activeOpacity={0.8}
        >
          <Text style={styles.voiceAgentIcon}>🎤</Text>
          <View style={styles.voiceAgentTextContainer}>
            <Text style={styles.voiceAgentTitle}>Voice Assistant</Text>
            <Text style={styles.voiceAgentSubtitle}>Chat live with your AI agent</Text>
          </View>
        </TouchableOpacity>

        {/* Recent Activities */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.cardForeground }]}>
              ✅ Recent Activities
            </Text>
          </View>
          <View style={styles.cardContent}>
            {recentActivities.map((activity) => (
              <View
                key={activity.id}
                style={[styles.activityItem, { backgroundColor: colors.muted }]}
              >
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: colors.foreground }]}>
                    {activity.title}
                  </Text>
                  <Text style={[styles.activitySubtitle, { color: colors.mutedForeground }]}>
                    Helped by {activity.volunteer} • {activity.time}
                  </Text>
                </View>
                <View style={[styles.activityBadge, { borderColor: '#10B981' }]}>
                  <Text style={[styles.activityBadgeText, { color: '#10B981' }]}>completed</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Service Hubs */}
        <View style={styles.hubsSection}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Choose a Service Hub
          </Text>
          <View style={styles.hubsGrid}>
            {hubs.map((hub) => (
              <TouchableOpacity
                key={hub.id}
                style={[styles.hubCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleNavigateToHub(hub.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.hubIcon, { backgroundColor: hub.color + '20' }]}>
                  <Text style={styles.hubIconText}>{hub.icon}</Text>
                </View>
                <Text style={[styles.hubTitle, { color: colors.cardForeground }]}>
                  {hub.title}
                </Text>
                <Text style={[styles.hubDescription, { color: colors.mutedForeground }]}>
                  {hub.description}
                </Text>
                <TouchableOpacity
                  style={[styles.hubButton, { backgroundColor: colors.primary }]}
                  onPress={() => handleNavigateToHub(hub.id)}
                >
                  <Text style={[styles.hubButtonText, { color: colors.primaryForeground }]}>
                    Get Help
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={[styles.emergencyCard, { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }]}>
          <Text style={[styles.emergencyTitle, { color: '#991B1B' }]}>Emergency Support</Text>
          <Text style={[styles.emergencyText, { color: '#B91C1C' }]}>
            Need immediate assistance? Our emergency volunteers are available 24/7
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Contact Emergency Support</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
  },
  welcomeText: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  badgeText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  voiceAgentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  voiceAgentIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  voiceAgentTextContainer: {
    flex: 1,
  },
  voiceAgentTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#ffffff',
    marginBottom: 4,
  },
  voiceAgentSubtitle: {
    fontSize: FontSizes.sm,
    color: '#ffffff',
    opacity: 0.9,
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  cardContent: {
    padding: Spacing.lg,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: FontSizes.sm,
  },
  activityBadge: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  activityBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
  },
  hubsSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  hubsGrid: {
    gap: Spacing.md,
  },
  hubCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: Spacing.md,
  },
  hubIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  hubIconText: {
    fontSize: 32,
  },
  hubTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  hubDescription: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  hubButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  hubButtonText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
  },
  emergencyCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  emergencyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  emergencyText: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
  },
});
