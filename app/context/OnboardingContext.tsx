import React, { createContext, useContext, useState } from 'react';

export interface OnboardingData {
  firstName: string;
  email: string;
  gender: string | null;
  pronouns: string;
  age: string;
  attractedTo: string[];
  year: string[];
  relationship: string[];
  lifestyle: string[];
  loveLanguages: string[];
  primarySocial: string | null;
  username: string;
  major: string;
  club: string;
  cvilleSpot: string;
  photos: (string | null)[];
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
}

const initialData: OnboardingData = {
  firstName: '', email: '', gender: null, pronouns: '', age: '',
  attractedTo: [], year: [], relationship: [], lifestyle: [],
  loveLanguages: [], primarySocial: null, username: '', major: '',
  club: '', cvilleSpot: '', photos: [null, null, null, null, null, null]
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(initialData);
  const updateData = (newData: Partial<OnboardingData>) => setData(prev => ({ ...prev, ...newData }));

  const value = { data, updateData };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within an OnboardingProvider');
  return context;
};