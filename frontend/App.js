import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function QuizScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    { question: "Wann ist dein Geburtstag?", options: ["01.01.2000", "Nicht der 01.01.2000"] },
    { question: "Wie fühlst du dich?", options: ["Männlich", "Weiblich", "Verwirrt"] },
    { question: "Wie groß bist du?", options: ["Zwerg", "Mittelgroß", "Riese"] },
    { question: "Wie viel wiegst du?", options: ["Fliegengewicht", "Stattlich", "Schwergewicht"] },
    { question: "Bist du sportlich aktiv?", options: ["Ja", "Nein", "Ist mir peinlich"] },
    { question: "Was ist dein Ziel?", options: ["Abnehmen", "Gewicht halten", "Muskeln aufbauen"] },

    // Weitere Fragen...
  ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };
  const goToNextQuestion = () => {
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, answer: selectedAnswer }]);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Summary', { answers });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedAnswer === option && styles.optionButtonSelected]}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedAnswer && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={goToNextQuestion}
        >
          <Text style={styles.continueButtonText}>Weiter →</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function SummaryScreen({ route, navigation }) {
  const { answers } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz-Übersicht</Text>
      {answers.map((entry, index) => (
        <View key={index} style={styles.answerContainer}>
          <Text style={styles.question}>{entry.question}</Text>
          <Text style={styles.answer}>{entry.answer}</Text>
        </View>
      ))}
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // ... bestehende Styles
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionButtonSelected: {
    backgroundColor: '#c0c0c0', // Dunklere Hintergrundfarbe für ausgewählte Optionen
  },
  answerContainer: {
    marginVertical: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: 'blue',
  },  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // Für Abstand zwischen den Fragen und dem Weiter-Button
    padding: 20, // Einen internen Abstand hinzufügen
  },
  questionContainer: {
    // Ggf. zusätzliche Styling-Optionen hinzufügen
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // Für Abstand über und unter der Frage
  },
  optionsContainer: {
    width: '100%',
    // Ggf. zusätzliche Styling-Optionen hinzufügen
  },
  optionButton: {
    backgroundColor: '#f0f0f0', // Eine helle Hintergrundfarbe für die Buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#d0d0d0', // Eine dezente Border-Farbe
    borderRadius: 25, // Für abgerundete Ecken
    marginBottom: 10, // Für Abstand zwischen den Buttons
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    elevation: 3, // Nur für Android-Schatteneffekt
  },
  optionText: {
    color: '#000', // Für dunkle Schrift
    fontSize: 18,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#4CAF50', // Ein sattes Grün für den Weiter-Button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Wieder abgerundete Ecken
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff', // Weiße Schrift auf dem Weiter-Button
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Füge hier weitere Styles hinzu
});
