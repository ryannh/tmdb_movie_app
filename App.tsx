import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import { store, persistor } from './src/redux/stores';
import { Linking, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const linking = {
  prefixes: ['tmdbmovieapp://', 'https://tmdbmovie-tau.vertex.app'],
  config: {
    screens: {
      Home: '',
      MovieDetails: 'movie/:id',
    },
  },
};

export default function App() {
  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        // maybe navigate manually if needed
      }
    };
    getUrlAsync();

    const subscriber = Linking.addEventListener('url', ({ url }) => {
      // handle url when app is already open
    });

    return () => subscriber.remove();
  }, []);

  useEffect(() => {
    const handleDeepLink = (event: any) => {
      console.log('Incoming link:', event.url);
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) console.log('Initial URL:', url);
    });

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}
        >
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
