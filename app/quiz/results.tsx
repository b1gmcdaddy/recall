import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Home, RotateCcw, Star, TrendingUp, Trophy } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ResultsScreen() {
  const { quizId, score, total } = useLocalSearchParams();
  const router = useRouter();

  const scoreNum = Number(score);
  const totalNum = Number(total);
  const percentage = Math.round((scoreNum / totalNum) * 100);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scoreAnim, {
        toValue: scoreNum,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'Outstanding!';
    if (percentage >= 70) return 'Great Job!';
    if (percentage >= 50) return 'Good Effort!';
    return 'Keep Practicing!';
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return (['#00ff88', '#00cc66'] as const);
    if (percentage >= 70) return (['#00d4ff', '#0099cc'] as const);
    if (percentage >= 50) return (['#ffaa00', '#ff8800'] as const);
    return (['#ff00ff', '#cc00cc'] as const);
  };

  const animatedScore = scoreAnim.interpolate({
    inputRange: [0, scoreNum],
    outputRange: [0, scoreNum],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
        style={styles.gradient}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <LinearGradient
            colors={getPerformanceColor()}
            style={styles.trophyCircle}>
            <Trophy size={64} color="#fff" />
          </LinearGradient>

          <Text style={styles.title}>{getPerformanceMessage()}</Text>
          <Text style={styles.subtitle}>Quiz Completed</Text>

          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.scoreCard}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{percentage}%</Text>
            </View>

            <View style={styles.scoreDetails}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Correct Answers</Text>
                <Text style={styles.scoreValue}>
                  {scoreNum}/{totalNum}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Total Questions</Text>
                <Text style={styles.scoreValue}>{totalNum}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.statsGrid}>
            <LinearGradient
              colors={['#1a1a2e', '#16213e']}
              style={styles.statBox}>
              <Star size={24} color="#ffaa00" />
              <Text style={styles.statValue}>
                {percentage >= 70 ? '+' : ''}
                {Math.floor(percentage / 10)}
              </Text>
              <Text style={styles.statLabel}>Points Earned</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#1a1a2e', '#16213e']}
              style={styles.statBox}>
              <TrendingUp size={24} color="#00d4ff" />
              <Text style={styles.statValue}>
                {percentage >= 50 ? '↑' : '↓'}
                {Math.abs(percentage - 65)}%
              </Text>
              <Text style={styles.statLabel}>vs Average</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              router.push(`/quiz/${quizId}` as any)
            }>
            <LinearGradient
              colors={['#1a1a2e', '#16213e']}
              style={styles.secondaryButton}>
              <RotateCcw size={20} color="#00d4ff" />
              <Text style={styles.secondaryButtonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/')}
            style={styles.primaryButtonContainer}>
            <LinearGradient
              colors={['#00d4ff', '#0099cc']}
              style={styles.primaryButton}>
              <Home size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  trophyCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#00d4ff',
    marginBottom: 32,
    fontWeight: '600',
  },
  scoreCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  scoreCircle: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderWidth: 4,
    borderColor: '#00d4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#00d4ff',
  },
  scoreDetails: {
    gap: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 15,
    color: '#999',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a3e',
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
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
    textAlign: 'center',
    fontWeight: '600',
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  secondaryButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonContainer: {
    width: '100%',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
