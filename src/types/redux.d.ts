type NullableObject<T> = {
  [K in keyof T]: T[K] | null;
};
