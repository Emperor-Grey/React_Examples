import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
