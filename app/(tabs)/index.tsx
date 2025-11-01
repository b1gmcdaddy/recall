import { sampleQuizzes } from '@/constants/quizData';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Clock, Search, TrendingUp, Zap } from 'lucide-react-native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuizzes = sampleQuizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string): readonly [string, string] => {
    const colors: { [key: string]: readonly [string, string] } = {
      Science: ['#00d4ff', '#0099cc'] as const,
      Geography: ['#00ff88', '#00cc66'] as const,
      Technology: ['#ff00ff', '#cc00cc'] as const,
      History: ['#ffaa00', '#ff8800'] as const,
    };
    return colors[category] || (['#00d4ff', '#0099cc'] as const);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
        style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.title}>Recall</Text>
          <Text style={styles.subtitle}>Challenge Your Memory</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search quizzes..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Zap size={24} color="#00d4ff" />
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#00ff88" />
              <Text style={styles.statValue}>78%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={24} color="#ff00ff" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Available Quizzes</Text>

          {filteredQuizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              onPress={() =>
                router.push(`/quiz/${quiz.id}` as any)
              }>
              <LinearGradient
                colors={['#1a1a2e', '#16213e']}
                style={styles.quizCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={styles.quizHeader}>
                  <LinearGradient
                    colors={getCategoryColor(quiz.category)}
                    style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{quiz.category}</Text>
                  </LinearGradient>
                </View>

                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.quizDescription}>
                  {quiz.description}
                </Text>

                <View style={styles.quizFooter}>
                  <View style={styles.quizStat}>
                    <Text style={styles.quizStatValue}>
                      {quiz.questions.length}
                    </Text>
                    <Text style={styles.quizStatLabel}>Questions</Text>
                  </View>
                  <View style={styles.quizStat}>
                    <Text style={styles.quizStatValue}>
                      {quiz.timesPlayed}
                    </Text>
                    <Text style={styles.quizStatLabel}>Plays</Text>
                  </View>
                  <View style={styles.quizStat}>
                    <Text style={styles.quizStatValue}>
                      {quiz.averageScore}%
                    </Text>
                    <Text style={styles.quizStatLabel}>Avg Score</Text>
                  </View>
                </View>

                <LinearGradient
                  colors={['#00d4ff', '#0099cc']}
                  style={styles.playButton}>
                  <Text style={styles.playButtonText}>Start Quiz</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#00d4ff',
    marginTop: 4,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  quizCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
    lineHeight: 20,
  },
  quizFooter: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  quizStat: {
    flex: 1,
  },
  quizStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00d4ff',
  },
  quizStatLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },
  playButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
