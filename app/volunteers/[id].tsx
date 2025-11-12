import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { volunteerApi, Volunteer } from '@/services/volunteerApi';

export default function VolunteerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVolunteer();
  }, [id]);

  const loadVolunteer = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await volunteerApi.getVolunteer(Number(id));
      setVolunteer(data);
    } catch (err) {
      setError('Failed to load volunteer details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <LinearGradient colors={['#EFF6FF', '#E0E7FF']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading volunteer details...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error || !volunteer) {
    return (
      <LinearGradient colors={['#EFF6FF', '#E0E7FF']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error || 'Volunteer not found'}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleBack}>
              <Text style={styles.retryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#EFF6FF', '#E0E7FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Volunteer Profile</Text>
            <Text style={styles.subtitle}>Complete profile and contact information</Text>
          </View>

          {/* Main Profile Card */}
          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {volunteer.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                {volunteer.available && <View style={styles.onlineDot} />}
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{volunteer.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.ratingText}>4.9</Text>
                    <Text style={styles.reviewCount}>({volunteer.years_experience * 50} reviews)</Text>
                  </View>
                </View>
                <View style={styles.locationRow}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.locationText}>{volunteer.location}</Text>
                  <Text style={styles.timeIcon}>⏰</Text>
                  <Text style={styles.timeText}>5 minutes away</Text>
                  <View style={styles.availableBadge}>
                    <Text style={styles.availableBadgeText}>
                      {volunteer.available ? 'Available now' : 'Busy'}
                    </Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.callButton}>
                    <Text style={styles.callButtonText}>📞 Call Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageButtonText}>💬 Send Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.requestButton}>
                    <Text style={styles.requestButtonText}>Request Help</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>👤 About {volunteer.name.split(' ')[0]}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.bioText}>
                {volunteer.notes || `Experienced volunteer with ${volunteer.years_experience} years of experience helping seniors with ${volunteer.skills}. Passionate about making a difference in the community.`}
              </Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>❤️</Text>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Hobbies & Interests</Text>
                    <Text style={styles.detailValue}>Reading, Gardening, Volunteering</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🎓</Text>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Education</Text>
                    <Text style={styles.detailValue}>Bachelor's Degree</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🏠</Text>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Hometown</Text>
                    <Text style={styles.detailValue}>{volunteer.location}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>💼</Text>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Work Experience</Text>
                    <Text style={styles.detailValue}>{volunteer.years_experience} years in community service</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>📞 Contact Information</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.contactGrid}>
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Primary Contact</Text>
                  <Text style={styles.contactValue}>Phone: {volunteer.phone || '(555) 123-4567'}</Text>
                  <Text style={styles.contactValue}>Response time: Usually within 15 minutes</Text>
                </View>
                {volunteer.emergency_contact && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Emergency Contact</Text>
                    <Text style={styles.contactValue}>{volunteer.emergency_contact}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Specialties */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>What {volunteer.name.split(' ')[0]} Can Help With</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.specialtiesList}>
                {volunteer.skills.split(',').map((skill, index) => (
                  <View key={index} style={styles.specialtyItem}>
                    <Text style={styles.checkIcon}>✅</Text>
                    <Text style={styles.specialtyText}>{skill.trim()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Verifications */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>🛡️ Verifications</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.verificationsList}>
                <View style={styles.verificationItem}>
                  <Text style={styles.verificationIcon}>🏆</Text>
                  <Text style={styles.verificationText}>Background Check Verified</Text>
                </View>
                {volunteer.background_check && (
                  <View style={styles.verificationItem}>
                    <Text style={styles.verificationIcon}>🏆</Text>
                    <Text style={styles.verificationText}>References Verified</Text>
                  </View>
                )}
                <View style={styles.verificationItem}>
                  <Text style={styles.verificationIcon}>🏆</Text>
                  <Text style={styles.verificationText}>Identity Verified</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberText}>Member since: {volunteer.created_at ? new Date(volunteer.created_at).getFullYear() : '2023'}</Text>
                {volunteer.languages && (
                  <Text style={styles.memberText}>Languages: {volunteer.languages}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{volunteer.name.split(' ')[0]}'s Statistics</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.statsList}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Tasks Completed</Text>
                  <Text style={styles.statValue}>{volunteer.years_experience * 50}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Average Rating</Text>
                  <View style={styles.statRating}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.statValue}>4.9</Text>
                  </View>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Response Rate</Text>
                  <Text style={styles.statValue}>98%</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>On-time Rate</Text>
                  <Text style={styles.statValue}>99%</Text>
                </View>
              </View>
            </View>
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
  },
  cardContent: {
    padding: Spacing.lg,
  },
  profileHeader: {
    padding: Spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: FontWeights.bold,
    color: '#ffffff',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: '40%',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  profileInfo: {
    gap: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: FontWeights.bold,
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    fontSize: FontSizes.base,
  },
  ratingText: {
    fontSize: FontSizes.lg,
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  timeIcon: {
    fontSize: 14,
  },
  timeText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  availableBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  availableBadgeText: {
    fontSize: FontSizes.xs,
    color: '#065F46',
    fontWeight: FontWeights.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: FontSizes.sm,
    color: '#ffffff',
    fontWeight: FontWeights.semibold,
  },
  messageButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    fontWeight: FontWeights.semibold,
  },
  requestButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  requestButtonText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    fontWeight: FontWeights.semibold,
  },
  bioText: {
    fontSize: FontSizes.base,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  detailsGrid: {
    gap: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  detailIcon: {
    fontSize: 20,
  },
  detailInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: '#1F2937',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  contactGrid: {
    gap: Spacing.md,
  },
  contactItem: {
    backgroundColor: '#F9FAFB',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  contactLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: '#1F2937',
    marginBottom: Spacing.xs,
  },
  contactValue: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    marginBottom: 4,
  },
  specialtiesList: {
    gap: Spacing.sm,
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkIcon: {
    fontSize: 16,
  },
  specialtyText: {
    fontSize: FontSizes.base,
    color: '#4B5563',
  },
  verificationsList: {
    gap: Spacing.sm,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  verificationIcon: {
    fontSize: 16,
  },
  verificationText: {
    fontSize: FontSizes.base,
    color: '#4B5563',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: Spacing.md,
  },
  memberInfo: {
    gap: Spacing.xs,
  },
  memberText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
  },
  statsList: {
    gap: Spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FontSizes.base,
    color: '#6B7280',
  },
  statValue: {
    fontSize: FontSizes.base,
    color: '#1F2937',
    fontWeight: FontWeights.medium,
  },
  statRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});