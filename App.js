import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { TopBar } from './components/TopBar';
import { CatalogoList } from './components/catalogoList';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1 }}>
          <TopBar />
          <CatalogoList />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
