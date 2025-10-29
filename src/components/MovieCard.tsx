import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../types';

type Props = {
  movie: Movie;
  onPress?: () => void;
};

export default function MovieCard({movie, onPress}: Props) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : undefined;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress} activeOpacity={0.8}>
      {poster ? (
        <Image
          source={{uri: poster}}
          style={styles.poster}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.poster, styles.noPoster]} />
      )}
      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '48%',
    marginBottom: 12,
  },
  poster: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  noPoster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});
