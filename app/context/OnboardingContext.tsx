// src/context/OnboardingContext.tsx
import React, { createContext, useState, useContext } from 'react';

type OnboardingData = {
  firstName: string;
  email: string;
  photos: (string | null)[];
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
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
};

const defaultData: OnboardingData = {
  firstName: '', email: '', photos: [null, null, null, null, null, null],
  gender: null, pronouns: '', age: '', attractedTo: [], year: [],
  relationship: [], lifestyle: [], loveLanguages: [], primarySocial: null,
  username: '', major: '', club: '', cvilleSpot: ''
};

const OnboardingContext = createContext<OnboardingContextType>({
  data: defaultData,
  updateData: () => {},
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const updateData = (newData: Partial<OnboardingData>) => setData(prev => ({ ...prev, ...newData }));
  return (
    <OnboardingContext.Provider value={{ data, updateData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);