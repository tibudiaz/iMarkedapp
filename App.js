
import {  View } from 'react-native';
import { TopBar } from './components/TopBar';
import { CatalogoList } from './components/catalogoList';
import { SafeAreaView, ScrollView } from 'react-native';



export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>   
          <View style={{ flex: 1 }}>
          <TopBar />
          <CatalogoList />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}