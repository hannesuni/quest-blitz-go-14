
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  completedQuests: number;
  totalLocationsVisited: number;
  achievements: string[];
  rank: string;
}

interface UserContextType {
  userStats: UserStats;
  addXP: (amount: number) => void;
  completeQuest: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 7,
    xp: 2450,
    xpToNext: 550,
    completedQuests: 23,
    totalLocationsVisited: 15,
    achievements: ['Stadtentdecker', 'Social Butterfly', 'Nachtfalter', 'First Quest'],
    rank: 'Abenteurer'
  });

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  const calculateXPToNext = (xp: number, level: number) => {
    const nextLevelXP = level * 1000;
    return nextLevelXP - xp;
  };

  const addXP = (amount: number) => {
    setUserStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > prev.level;
      
      const newStats = {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: calculateXPToNext(newXP, newLevel)
      };

      if (leveledUp) {
        console.log(`Level Up! Neues Level: ${newLevel}`);
      }

      return newStats;
    });
  };

  const completeQuest = () => {
    setUserStats(prev => ({
      ...prev,
      completedQuests: prev.completedQuests + 1
    }));
  };

  return (
    <UserContext.Provider value={{ userStats, addXP, completeQuest }}>
      {children}
    </UserContext.Provider>
  );
};
