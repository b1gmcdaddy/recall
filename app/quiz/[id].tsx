import { sampleQuizzes } from '@/constants/quizData';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const quiz = sampleQuizzes.find((q) => q.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentQuestionIndex + 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Quiz not found</Text>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setAnswers([...answers, answerIndex]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      router.push({
        pathname: '/quiz/results' as any,
        params: {
          quizId: quiz.id,
          score: score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
          total: totalQuestions,
        },
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, totalQuestions],
    outputRange: ['0%', '100%'],
  });

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index
        ? styles.optionSelected
        : styles.option;
    }

    if (index === currentQuestion.correctAnswer) {
      return styles.optionCorrect;
    }

    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return styles.optionIncorrect;
    }

    return styles.option;
  };

  const getOptionIcon = (index: number) => {
    if (!isAnswered) return null;

    if (index === currentQuestion.correctAnswer) {
      return <CheckCircle2 size={24} color="#00ff88" />;
    }

    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return <XCircle size={24} color="#ff4444" />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
        style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
        </View>

        <View style={styles.content}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.questionCard}>
            <Text style={styles.question}>{currentQuestion.question}</Text>
          </LinearGradient>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswerSelect(index)}
                disabled={isAnswered}>
                <LinearGradient
                  colors={
                    !isAnswered && selectedAnswer === index
                      ? ['#00d4ff', '#0099cc']
                      : index === currentQuestion.correctAnswer && isAnswered
                        ? ['#00ff88', '#00cc66']
                        : index === selectedAnswer &&
                            index !== currentQuestion.correctAnswer &&
                            isAnswered
                          ? ['#ff4444', '#cc0000']
                          : ['#1a1a2e', '#16213e']
                  }
                  style={getOptionStyle(index)}>
                  <View style={styles.optionContent}>
                    <View style={styles.optionNumber}>
                      <Text style={styles.optionNumberText}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                    {getOptionIcon(index)}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {isAnswered && (
            <TouchableOpacity onPress={handleNext}>
              <LinearGradient
                colors={['#00d4ff', '#0099cc']}
                style={styles.nextButton}>
                <Text style={styles.nextButtonText}>
                  {isLastQuestion ? 'View Results' : 'Next Question'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
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
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  questionCounter: {
    fontSize: 14,
    color: '#00d4ff',
    marginTop: 4,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  questionCard: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  optionSelected: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  optionCorrect: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  optionIncorrect: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  nextButton: {
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
