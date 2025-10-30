import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator, {
  RootStackParamList,
} from './src/navigation/RootNavigator';
import { store, persistor } from './src/redux/stores';
import { Linking, Text } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

const linking = {
  prefixes: ['tmdbmovieapp://', 'https://tmdbmovie-tau.vercel.app'],
  config: {
    screens: {
      Home: '',
      Detail: 'movie/:id',
    },
  },
};

export default function App() {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      console.log('🔗 Deep link received:', url);

      const match = url.match(/\/movie\/(\d+)/);
      if (match && match[1]) {
        const movieId = match[1];
        console.log('➡ Navigating to movie ID:', movieId);
        navigationRef.current?.navigate('Detail', { id: Number(movieId) });
      }
    };

    // Handle saat app dibuka lewat link
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });

    // Handle saat app sudah terbuka
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          linking={linking}
          ref={navigationRef}
          fallback={<Text>Loading...</Text>}
        >
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
