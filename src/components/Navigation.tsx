
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'quest', label: 'Abenteuer', icon: '🎯' },
    { id: 'locations', label: 'Locations', icon: '📍' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'profile', label: 'Profil', icon: '👤' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 p-2 h-auto ${
              currentPage === item.id 
                ? 'text-questGreen-600 bg-questGreen-50' 
                : 'text-gray-600 hover:text-questGreen-600 hover:bg-questGreen-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
