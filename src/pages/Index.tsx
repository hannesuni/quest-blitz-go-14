
import React, { useState } from 'react';
import QuestCard from '@/components/QuestCard';
import QuestGenerator from '@/components/QuestGenerator';
import LocationBrowser from '@/components/LocationBrowser';
import UserProfile from '@/components/UserProfile';
import CommunityFeed from '@/components/CommunityFeed';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'quest':
        return <QuestGenerator />;
      case 'locations':
        return <LocationBrowser />;
      case 'community':
        return <CommunityFeed />;
      case 'profile':
        return <UserProfile />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-questGreen-50 via-white to-questTurquoise-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {renderCurrentPage()}
      </div>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
};

const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="text-6xl animate-bounce-gentle">🎯</div>
        <h1 className="text-4xl font-bold bg-quest-gradient bg-clip-text text-transparent">
          QuestDealer
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
          Dein Abend. Dein Abenteuer.
        </p>
        <div className="w-20 h-1 bg-quest-gradient mx-auto rounded-full"></div>
      </div>

      {/* Welcome Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Bereit für dein nächstes Abenteuer?
          </h2>
          <p className="text-gray-600">
            Entdecke spontane Quests, finde coole Locations oder tauche in die Community ein!
          </p>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <QuestCard
          title="Spontane Quest"
          description="Lass dir ein zufälliges Abenteuer in deiner Nähe generieren und sammle XP!"
          icon="🎲"
          gradient="bg-gradient-to-br from-questGreen-400 to-questGreen-600"
          onClick={() => onNavigate('quest')}
        />
        
        <QuestCard
          title="Location finden"
          description="Entdecke und buche coole Locations wie Escape Rooms, Bars und Partykeller!"
          icon="📍"
          gradient="bg-gradient-to-br from-questTurquoise-400 to-questTurquoise-600"
          onClick={() => onNavigate('locations')}
        />
        
        <QuestCard
          title="Community"
          description="Schau dir an, was andere erleben und teile deine eigenen Abenteuer!"
          icon="👥"
          gradient="bg-gradient-to-br from-purple-400 to-purple-600"
          onClick={() => onNavigate('community')}
        />
      </div>

      {/* Stats Overview */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
          QuestDealer Community
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-questGreen-600">1,234</div>
            <div className="text-sm text-gray-600">Aktive Quester</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-questTurquoise-600">567</div>
            <div className="text-sm text-gray-600">Quests heute</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">Partner Locations</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Quick Start</h3>
        <div className="flex gap-3 justify-center flex-wrap">
          <button 
            onClick={() => onNavigate('quest')}
            className="px-6 py-3 bg-quest-gradient text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🎯 Quest starten
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="px-6 py-3 bg-white text-questGreen-600 border-2 border-questGreen-300 rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            👤 Mein Profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
