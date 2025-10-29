import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {fetchMovieDetail} from '../api/tmdb';
// import type {NativeStackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigator';

// type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({route}: any) {
  const {id} = route.params;
  const [movie, setMovie] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    fetchMovieDetail(id)
      .then(m => mounted && setMovie(m))
      .catch(e => console.warn(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!movie) return null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {poster && <Image source={{uri: poster}} style={styles.poster} />}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.meta}>
        ⭐ {movie.vote_average} • {movie.release_date}
      </Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16},
  poster: {width: '100%', height: 420, borderRadius: 8},
  title: {fontSize: 22, fontWeight: '700', marginTop: 12},
  meta: {color: '#666', marginTop: 6, marginBottom: 12},
  overview: {fontSize: 16, lineHeight: 22},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
