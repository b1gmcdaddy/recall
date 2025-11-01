import { LinearGradient } from 'expo-linear-gradient';
import {
    Award,
    BarChart3,
    Flame,
    Target,
    Trophy
} from 'lucide-react-native';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function StatsScreen() {
  const stats = [
    { label: 'Total Quizzes', value: '24', icon: BarChart3, color: '#00d4ff' },
    { label: 'Total Score', value: '1,847', icon: Trophy, color: '#ffaa00' },
    { label: 'Accuracy', value: '78%', icon: Target, color: '#00ff88' },
    { label: 'Streak', value: '12 days', icon: Flame, color: '#ff00ff' },
  ];

  const recentActivity = [
    {
      quiz: 'Space Exploration',
      score: 85,
      date: '2 hours ago',
      category: 'Science',
    },
    {
      quiz: 'World Geography',
      score: 72,
      date: 'Yesterday',
      category: 'Geography',
    },
    {
      quiz: 'Technology Trivia',
      score: 90,
      date: '2 days ago',
      category: 'Technology',
    },
  ];

  const achievements = [
    { title: 'First Quiz', description: 'Complete your first quiz', earned: true },
    { title: 'Perfect Score', description: 'Get 100% on any quiz', earned: true },
    { title: 'Quiz Master', description: 'Complete 50 quizzes', earned: false },
    { title: 'Streak King', description: '30 day streak', earned: false },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
        style={styles.gradient}>
        <View style={styles.header}>
          <BarChart3 size={32} color="#00d4ff" />
          <Text style={styles.title}>Statistics</Text>
          <Text style={styles.subtitle}>Track your progress</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <LinearGradient
                  key={index}
                  colors={['#1a1a2e', '#16213e']}
                  style={styles.statCard}>
                  <Icon size={28} color={stat.color} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
            <LinearGradient
              colors={['#1a1a2e', '#16213e']}
              style={styles.performanceCard}>
              <View style={styles.performanceRow}>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceLabel}>Science</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '85%', backgroundColor: '#00d4ff' }]} />
                  </View>
                  <Text style={styles.performanceValue}>85%</Text>
                </View>
              </View>

              <View style={styles.performanceRow}>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceLabel}>Geography</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '70%', backgroundColor: '#00ff88' }]} />
                  </View>
                  <Text style={styles.performanceValue}>70%</Text>
                </View>
              </View>

              <View style={styles.performanceRow}>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceLabel}>Technology</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '92%', backgroundColor: '#ff00ff' }]} />
                  </View>
                  <Text style={styles.performanceValue}>92%</Text>
                </View>
              </View>

              <View style={styles.performanceRow}>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceLabel}>History</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '65%', backgroundColor: '#ffaa00' }]} />
                  </View>
                  <Text style={styles.performanceValue}>65%</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivity.map((activity, index) => (
              <LinearGradient
                key={index}
                colors={['#1a1a2e', '#16213e']}
                style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityQuiz}>{activity.quiz}</Text>
                  <View
                    style={[
                      styles.scoreBadge,
                      {
                        backgroundColor:
                          activity.score >= 80
                            ? 'rgba(0, 255, 136, 0.2)'
                            : activity.score >= 60
                              ? 'rgba(0, 212, 255, 0.2)'
                              : 'rgba(255, 170, 0, 0.2)',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.scoreText,
                        {
                          color:
                            activity.score >= 80
                              ? '#00ff88'
                              : activity.score >= 60
                                ? '#00d4ff'
                                : '#ffaa00',
                        },
                      ]}>
                      {activity.score}%
                    </Text>
                  </View>
                </View>
                <View style={styles.activityFooter}>
                  <Text style={styles.activityCategory}>
                    {activity.category}
                  </Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <Award size={24} color="#ffaa00" />
            </View>
            {achievements.map((achievement, index) => (
              <LinearGradient
                key={index}
                colors={
                  achievement.earned
                    ? ['#1a1a2e', '#16213e']
                    : ['#0f0f14', '#0a0a0f']
                }
                style={[
                  styles.achievementCard,
                  !achievement.earned && styles.achievementLocked,
                ]}>
                <View
                  style={[
                    styles.achievementIcon,
                    {
                      backgroundColor: achievement.earned
                        ? 'rgba(255, 170, 0, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    },
                  ]}>
                  <Trophy
                    size={24}
                    color={achievement.earned ? '#ffaa00' : '#333'}
                  />
                </View>
                <View style={styles.achievementInfo}>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.earned && styles.achievementTextLocked,
                    ]}>
                    {achievement.title}
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      !achievement.earned && styles.achievementTextLocked,
                    ]}>
                    {achievement.description}
                  </Text>
                </View>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <Text style={styles.earnedText}>✓</Text>
                  </View>
                )}
              </LinearGradient>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#00d4ff',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  performanceCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    gap: 20,
  },
  performanceRow: {
    gap: 8,
  },
  performanceItem: {
    gap: 8,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#0a0a0f',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  performanceValue: {
    fontSize: 14,
    color: '#999',
    fontWeight: '700',
  },
  activityCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityQuiz: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCategory: {
    fontSize: 13,
    color: '#00d4ff',
    fontWeight: '600',
  },
  activityDate: {
    fontSize: 13,
    color: '#666',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    gap: 16,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    color: '#999',
  },
  achievementTextLocked: {
    color: '#444',
  },
  earnedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnedText: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 40,
  },
});
