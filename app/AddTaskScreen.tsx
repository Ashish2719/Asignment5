/*
 * Course: MAD201-01
 * Assignment: 5
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: A form screen allowing users to input a title and description to create a new task in the global state.
 */


import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useTasks } from './context/TaskContext';

const AddTaskScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Task title cannot be empty.');
      return;
    }
    addTask(title.trim(), description.trim());
    router.back(); 
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Finish Assignment 5"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Task Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.descInput]}
          placeholder="Details..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Button title="Save Task" onPress={handleSave} color="#3498db" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f8f8f8' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5, marginTop: 15 },
  input: {
    borderWidth: 1, borderColor: '#bdc3c7', padding: 12, fontSize: 16,
    borderRadius: 8, backgroundColor: '#fff', marginBottom: 20,
  },
  descInput: { minHeight: 100, textAlignVertical: 'top' },
});

export default AddTaskScreen;
