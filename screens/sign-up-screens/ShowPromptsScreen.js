import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomModal, ModalContent, ModalTitle, SlideAnimation } from 'react-native-modals';
import Colors from '../../Colors';
import { useNavigation } from '@react-navigation/native';
import { promptsList } from '../../assets/data/prompts';

const ShowPromptsScreen = () => {
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);
  const [option, setOption] = useState('About Me');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (item) => {
    setIsModalVisible(true);
    setQuestion(item?.question);
  };

  const addPrompt = () => {
    const newPrompt = { question, answer };
    setPrompts([...prompts, newPrompt]);

    setQuestion('');
    setAnswer('');
    setIsModalVisible(false);

    if (prompts.length === 3) {
      navigation.navigate('Prompts', {
        prompts: prompts,
      });
    }
  };

  useEffect(() => {
    if (prompts.length === 3) {
      navigation.navigate('Prompts', {
        prompts: prompts,
      });
    }
  }, [prompts]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.viewAllText}>View all</Text>
                <Text style={styles.promptsText}>Prompts</Text>
              </View>

              {/* Prompts Categories */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
              >
                {promptsList.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setOption(item.name)}
                    style={[
                      styles.categoryButton,
                      {
                        backgroundColor:
                          option === item?.name ? Colors.pink : Colors.white,
                      },
                    ]}
                  >
                    <Text style={styles.categoryText}>{item?.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Prompts List */}
              <View style={styles.promptsContainer}>
                {promptsList.map((item, index) => (
                  <View key={index}>
                    {option === item?.name && item?.questions?.length > 0 && (
                      <View style={styles.promptsList}>
                        {item?.questions?.map((ques, quesIndex) => (
                          <Pressable
                            onPress={() => openModal(ques)}
                            style={styles.promptCard}
                            key={quesIndex}
                          >
                            <Text style={styles.promptText}>{ques?.question}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </SafeAreaView>

          {/* Modal */}
          <BottomModal
            onBackdropPress={() => setIsModalVisible(false)}
            swipeDirection={['up', 'down']}
            swipeThreshold={200}
            modalTitle={<ModalTitle title="Provide your response" />}
            modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
            visible={isModalVisible}
            onTouchOutside={() => setIsModalVisible(false)}
          >
            <ModalContent style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalQuestion}>{question}</Text>
              </View>

              <View style={styles.modalInputContainer}>
                <TextInput
                  autoFocus
                  value={answer}
                  onChangeText={(text) => setAnswer(text)}
                  style={styles.modalInput}
                  placeholder="Write here..."
                />
              </View>

              <Pressable onPress={addPrompt} style={styles.addPromptButton}>
                <Text style={styles.addPromptButtonText}>Add Prompt</Text>
              </Pressable>
            </ModalContent>
          </BottomModal>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ShowPromptsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    marginTop: 30,
    padding: 20,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllText: {
    fontSize: 15,
    fontFamily: 'font-reg',
    color: Colors.text,
  },
  promptsText: {
    fontSize: 15,
    fontFamily: 'font-med',
    color: Colors.primary,
  },
  categoriesContainer: {
    marginTop: 20,
    gap: 10,
    height: 40,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.highlight,
  },
  categoryText: {
    fontFamily: 'font-med',
    color: Colors.text,
  },
  promptsContainer: {
    marginTop: 20,
    marginHorizontal: 12,
  },
  promptsList: {
    gap: 10,
  },
  promptCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  promptText: {
    fontSize: 15,
    fontFamily: 'font-reg',
    color: Colors.text,
  },
  modalContent: {
    width: '100%',
    height: 250,
  },
  modalHeader: {
    marginVertical: 10,
  },
  modalQuestion: {
    textAlign: 'center',
    fontFamily: 'font-med',
    fontSize: 18,
  },
  modalInputContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 100,
    fontSize: 12,
    borderWidth: 1,
    fontFamily: 'font-reg',
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  modalInput: {
    color: Colors.text,
    width: '100%',
  },
  addPromptButton: {
    width: '30%',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: Colors.pink,
    alignSelf: 'center',
  },
  addPromptButtonText: {
    textAlign: 'center',
    fontFamily: 'font-med',
    fontSize: 13,
  },
});
