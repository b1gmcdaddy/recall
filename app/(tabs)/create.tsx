import { Question } from '@/types/quiz';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Save, Sparkles, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreateScreen() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const categories = ['Science', 'Geography', 'Technology', 'History', 'Art'];

  const addQuestion = () => {
    if (
      !currentQuestion.trim() ||
      currentOptions.some((opt) => !opt.trim())
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      options: [...currentOptions],
      correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentOptions(['', '', '', '']);
    setCorrectAnswer(0);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const saveQuiz = () => {
    if (!quizTitle.trim() || !category || questions.length === 0) {
      Alert.alert(
        'Error',
        'Please add a title, category, and at least one question'
      );
      return;
    }
    Alert.alert('Success', 'Quiz saved successfully!');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1a2e', '#0a0a0f']}
        style={styles.gradient}>
        <View style={styles.header}>
          <Sparkles size={32} color="#00d4ff" />
          <Text style={styles.title}>Create Quiz</Text>
          <Text style={styles.subtitle}>Design your custom quiz</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.label}>Quiz Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quiz title..."
              placeholderTextColor="#666"
              value={quizTitle}
              onChangeText={setQuizTitle}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What is this quiz about?"
              placeholderTextColor="#666"
              value={quizDescription}
              onChangeText={setQuizDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}>
                  <LinearGradient
                    colors={
                      category === cat
                        ? ['#00d4ff', '#0099cc']
                        : ['#1a1a2e', '#16213e']
                    }
                    style={styles.categoryChip}>
                    <Text
                      style={[
                        styles.categoryChipText,
                        category === cat && styles.categoryChipTextActive,
                      ]}>
                      {cat}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {questions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>
                Questions Added ({questions.length})
              </Text>
              {questions.map((q, index) => (
                <LinearGradient
                  key={q.id}
                  colors={['#1a1a2e', '#16213e']}
                  style={styles.savedQuestion}>
                  <View style={styles.savedQuestionHeader}>
                    <Text style={styles.savedQuestionNumber}>
                      Q{index + 1}
                    </Text>
                    <TouchableOpacity onPress={() => removeQuestion(q.id)}>
                      <Trash2 size={20} color="#ff4444" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.savedQuestionText}>{q.question}</Text>
                  <Text style={styles.savedQuestionCorrect}>
                    ✓ {q.options[q.correctAnswer]}
                  </Text>
                </LinearGradient>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.label}>Add New Question</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your question..."
              placeholderTextColor="#666"
              value={currentQuestion}
              onChangeText={setCurrentQuestion}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Answer Options</Text>
            {currentOptions.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    correctAnswer === index && styles.radioButtonActive,
                  ]}
                  onPress={() => setCorrectAnswer(index)}>
                  {correctAnswer === index && (
                    <View style={styles.radioButtonInner} />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={styles.optionInput}
                  placeholder={`Option ${index + 1}`}
                  placeholderTextColor="#666"
                  value={option}
                  onChangeText={(text) => {
                    const newOptions = [...currentOptions];
                    newOptions[index] = text;
                    setCurrentOptions(newOptions);
                  }}
                />
              </View>
            ))}
            <Text style={styles.hint}>Tap the circle to mark correct answer</Text>
          </View>

          <TouchableOpacity onPress={addQuestion}>
            <LinearGradient
              colors={['#00ff88', '#00cc66']}
              style={styles.addButton}>
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Question</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveQuiz} style={styles.saveContainer}>
            <LinearGradient
              colors={['#00d4ff', '#0099cc']}
              style={styles.saveButton}>
              <Save size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Save Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>

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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  categoryChipText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  savedQuestion: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  savedQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  savedQuestionNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00d4ff',
  },
  savedQuestionText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '600',
  },
  savedQuestionCorrect: {
    fontSize: 13,
    color: '#00ff88',
    fontWeight: '600',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#00ff88',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff88',
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  saveContainer: {
    marginTop: 24,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 40,
  },
});
