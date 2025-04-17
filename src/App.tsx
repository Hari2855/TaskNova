import React from 'react';
import AppNavigation from './navigation/appNavigation';
import {AuthProvider} from './context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
