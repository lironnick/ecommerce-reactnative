import { ActivityIndicator } from 'react-native';

export function Loading() {
  return (
    <ActivityIndicator
      size={60}
      className="flex-1 bg-white items-center justify-center  text-red-500"
    />
  );
}
