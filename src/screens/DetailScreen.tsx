import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import useMovie from '../hooks/useMovie';
import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../redux/actions/favorite';
import Clipboard from '@react-native-clipboard/clipboard';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { id } = route.params;
  const { movieDetail: movie, handleFetchMovieDetail, loading } = useMovie();

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorite.favorites);

  const isFavorite = favorites.some(m => m.id === movie?.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: REMOVE_FAVORITE, payload: movie?.id });
    } else {
      dispatch({ type: ADD_FAVORITE, payload: movie });
    }
  };

  const handleCopyLink = () => {
    const url = `https://tmdbmovie-tau.vercel.app/movie/${id}`;
    Clipboard.setString(url);
    Alert.alert('Link Copied!', 'Movie link has been copied to clipboard.');
  };

  useEffect(() => {
    handleFetchMovieDetail(id);
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
      {poster && <Image source={{ uri: poster }} style={styles.poster} />}

      <Text style={styles.title}>{movie.title}</Text>

      <TouchableOpacity onPress={toggleFavorite}>
        {isFavorite ? <Text>Love active</Text> : <Text>Love inactive</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCopyLink}>
        <Text>Share</Text>
      </TouchableOpacity>

      <Text style={styles.meta}>
        ⭐ {movie.vote_average} • {movie.release_date}
      </Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  poster: { width: '100%', height: 420, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  meta: { color: '#666', marginTop: 6, marginBottom: 12 },
  overview: { fontSize: 16, lineHeight: 22 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
