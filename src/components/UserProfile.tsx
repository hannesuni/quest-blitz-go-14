import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RewardSystem from './RewardSystem';

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  completedQuests: number;
  totalLocationsVisited: number;
  achievements: string[];
  rank: string;
}

const UserProfile = () => {
  const userStats: UserStats = {
    level: 7,
    xp: 2450,
    xpToNext: 550,
    completedQuests: 23,
    totalLocationsVisited: 15,
    achievements: ['Stadtentdecker', 'Social Butterfly', 'Nachtfalter', 'First Quest'],
    rank: 'Abenteurer'
  };

  const xpProgress = (userStats.xp / (userStats.xp + userStats.xpToNext)) * 100;

  const recentQuests = [
    { name: 'Münchner Geheimtipps', xp: 200, date: '2 Tage' },
    { name: 'Biergarten Tour', xp: 150, date: '5 Tage' },
    { name: 'Street Art Hunt', xp: 180, date: '1 Woche' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Dein Profil</h2>
      </div>

      {/* Level & XP Card */}
      <Card className="bg-gradient-to-br from-questGreen-50 to-questTurquoise-50 border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 bg-quest-gradient rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 glow-quest">
            {userStats.level}
          </div>
          <CardTitle className="text-2xl text-questGreen-800">Level {userStats.level}</CardTitle>
          <Badge className="bg-questTurquoise-500 text-white">
            {userStats.rank}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{userStats.xp} XP</span>
              <span>{userStats.xpToNext} XP bis Level {userStats.level + 1}</span>
            </div>
            <Progress value={xpProgress} className="h-3 bg-gray-200" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-questGreen-600">{userStats.completedQuests}</div>
              <div className="text-sm text-gray-600">Quests abgeschlossen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-questTurquoise-600">{userStats.totalLocationsVisited}</div>
              <div className="text-sm text-gray-600">Locations besucht</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Profile Sections */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="rewards">Belohnungen</TabsTrigger>
          <TabsTrigger value="achievements">Erfolge</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Quests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📋</span>
                Letzte Quests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentQuests.map((quest, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{quest.name}</div>
                      <div className="text-sm text-gray-600">vor {quest.date}</div>
                    </div>
                    <Badge className="bg-questGreen-500 text-white">
                      +{quest.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => window.location.href = '/?page=social'}
            >
              Freunde finden 👥
            </Button>
            <Button variant="outline" className="border-questTurquoise-300 text-questTurquoise-700 hover:bg-questTurquoise-50">
              Einstellungen ⚙️
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <RewardSystem userXP={userStats.xp} completedQuests={userStats.completedQuests} />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏆</span>
                Errungenschaften
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {userStats.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-questGreen-50 rounded-lg border border-questGreen-200">
                    <div className="text-2xl">🎖️</div>
                    <div>
                      <div className="font-semibold text-sm text-questGreen-800">{achievement}</div>
                      <div className="text-xs text-questGreen-600">Erhalten</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
