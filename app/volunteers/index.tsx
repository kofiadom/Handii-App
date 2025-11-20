import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { volunteerApi, Volunteer } from '@/services/volunteerApi';

export default function VolunteersScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await volunteerApi.getVolunteers({ limit: 50 });
      setVolunteers(data.volunteers);
    } catch (err) {
      setError('Failed to load volunteers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVolunteers();
    setRefreshing(false);
  };

  const handleVolunteerPress = (volunteerId: number) => {
    router.push(`/volunteers/${volunteerId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading && !refreshing) {
    return (
      <LinearGradient
        colors={['#EFF6FF', '#E0E7FF']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading volunteers...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#EFF6FF', '#E0E7FF']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadVolunteers}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#EFF6FF', '#E0E7FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Administrative Hub</Text>
            <Text style={styles.subtitle}>
              Get help with paperwork, appointments, and daily tasks
            </Text>
          </View>

          {/* Services Available */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Here's what a volunteer can help you do</Text>
            </View>
            <View style={styles.cardContent}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={styles.servicesGrid}
              >
                {[
                  { icon: '📅', title: 'Appointment Scheduler', count: 12 },
                  { icon: '⏰', title: 'Appointment Reminder', count: 8 },
                  { icon: '📋', title: 'Filling Forms', count: 15 },
                  { icon: '🚗', title: 'Request Ride', count: 22 },
                  { icon: '📆', title: 'Special Events', count: 6 },
                  { icon: '🏠', title: 'Home Organization', count: 9 },
                  { icon: '✂️', title: 'Gardening', count: 7 },
                  { icon: '🛒', title: 'Shopping', count: 18 },
                ].map((service, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <View style={styles.serviceHeader}>
                      <View style={styles.serviceIcon}>
                        <Text style={styles.serviceIconText}>{service.icon}</Text>
                      </View>
                      <View style={styles.serviceInfo}>
                        <Text style={styles.serviceTitle}>{service.title}</Text>
                        <View style={styles.serviceBadge}>
                          <Text style={styles.serviceBadgeText}>
                            {service.count} requests this month
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Available Volunteers */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Available Volunteers Near You</Text>
              <Text style={styles.cardSubtitle}>
                Choose a volunteer to help with your administrative needs
              </Text>
            </View>
            <View style={styles.cardContent}>
              {volunteers.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No volunteers found</Text>
                </View>
              ) : (
                volunteers.map((volunteer) => (
                  <TouchableOpacity
                    key={volunteer.id}
                    style={styles.volunteerCard}
                    onPress={() => handleVolunteerPress(volunteer.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.volunteerHeader}>
                      <View style={styles.volunteerAvatarContainer}>
                        <View style={styles.volunteerAvatar}>
                          <Text style={styles.volunteerAvatarText}>
                            {volunteer.name.split(' ').map(n => n[0]).join('')}
                          </Text>
                        </View>
                        {volunteer.available && (
                          <View style={styles.onlineDot} />
                        )}
                      </View>
                      <View style={styles.volunteerInfo}>
                        <View style={styles.volunteerTitleRow}>
                          <Text style={styles.volunteerName}>{volunteer.name}</Text>
                          <Text style={styles.availabilityBadge}>
                            {volunteer.available ? '✅ Available' : '⏰ Later'}
                          </Text>
                        </View>
                        <Text style={styles.volunteerBio} numberOfLines={2}>
                          {volunteer.notes || `Experienced volunteer specializing in ${volunteer.skills.split(',')[0]}`}
                        </Text>
                        <View style={styles.volunteerMeta}>
                          <Text style={styles.metaText}>📍 {volunteer.location}</Text>
                          <Text style={styles.metaText}>✅ {volunteer.years_experience * 50} tasks</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.primaryActionButton}
                      onPress={() => handleVolunteerPress(volunteer.id)}
                    >
                      <Text style={styles.primaryActionButtonText}>View Profile & Connect</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>

          {/* Request New Help */}
          <View style={styles.requestCard}>
            <Text style={styles.requestTitle}>Need Additional Help?</Text>
            <Text style={styles.requestText}>
              Request assistance with any administrative task
            </Text>
            <TouchableOpacity style={styles.requestButton}>
              <Text style={styles.requestButtonText}>Create New Request</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  backButton: {
    marginBottom: Spacing.sm,
  },
  backButtonText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    color: '#3B82F6',
  },
  title: {
    fontSize: 28,
    fontWeight: FontWeights.bold,
    color: '#1F2937',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: '#6B7280',
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: FontSizes.base,
    color: '#6B7280',
  },
  errorText: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    color: '#DC2626',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  retryButtonText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: '#1F2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  cardContent: {
    padding: Spacing.lg,
  },
  servicesGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  serviceItem: {
    width: 200,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexShrink: 0,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#DBEAFE',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIconText: {
    fontSize: 20,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  serviceBadgeText: {
    fontSize: 10,
    color: '#6B7280',
  },
  volunteerCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: '#ffffff',
  },
  volunteerHeader: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  volunteerAvatarContainer: {
    position: 'relative',
  },
  volunteerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerAvatarText: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#ffffff',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  volunteerInfo: {
    flex: 1,
  },
  volunteerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  volunteerName: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    fontSize: FontSizes.sm,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  volunteerBio: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    marginBottom: Spacing.sm,
  },
  volunteerStats: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: FontSizes.xs,
    color: '#6B7280',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  specialtyBadge: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  specialtyText: {
    fontSize: 11,
    color: '#6B7280',
  },
  volunteerFooter: {
    gap: Spacing.sm,
  },
  availabilityText: {
    fontSize: FontSizes.sm,
    color: '#10B981',
    fontWeight: FontWeights.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  messageButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    fontWeight: FontWeights.medium,
  },
  viewProfileButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  viewProfileButtonText: {
    fontSize: FontSizes.sm,
    color: '#ffffff',
    fontWeight: FontWeights.semibold,
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSizes.base,
    color: '#9CA3AF',
  },
  requestCard: {
    backgroundColor: '#DBEAFE',
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: '#93C5FD',
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  requestTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    color: '#1E40AF',
    marginBottom: Spacing.sm,
  },
  requestText: {
    fontSize: FontSizes.base,
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  requestButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  requestButtonText: {
    color: '#ffffff',
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
  },
  availabilityBadge: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: '#10B981',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.md,
  },
  volunteerMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  metaText: {
    fontSize: FontSizes.xs,
    color: '#6B7280',
  },
  primaryActionButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  primaryActionButtonText: {
    fontSize: FontSizes.sm,
    color: '#ffffff',
    fontWeight: FontWeights.semibold,
  },
});