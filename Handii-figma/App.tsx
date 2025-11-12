import { useState } from 'react';
import { Homepage } from './components/Homepage';
import { AdministrativeHub } from './components/AdministrativeHub';
import { VolunteerDetail } from './components/VolunteerDetail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'homepage' | 'hub' | 'volunteer'>('homepage');
  const [selectedHub, setSelectedHub] = useState<string>('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>('');

  const handleNavigateToHub = (hubId: string) => {
    setSelectedHub(hubId);
    setCurrentScreen('hub');
  };

  const handleSelectVolunteer = (volunteerId: string) => {
    setSelectedVolunteer(volunteerId);
    setCurrentScreen('volunteer');
  };

  const handleBack = () => {
    if (currentScreen === 'volunteer') {
      setCurrentScreen('hub');
    } else if (currentScreen === 'hub') {
      setCurrentScreen('homepage');
    }
  };

  if (currentScreen === 'volunteer') {
    return (
      <VolunteerDetail 
        volunteerId={selectedVolunteer}
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === 'hub' && selectedHub === 'administrative') {
    return (
      <AdministrativeHub 
        onBack={handleBack}
        onSelectVolunteer={handleSelectVolunteer}
      />
    );
  }

  return (
    <Homepage onNavigateToHub={handleNavigateToHub} />
  );
}