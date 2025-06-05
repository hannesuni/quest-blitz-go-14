
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'voucher' | 'discount' | 'freebie';
  value: string;
  code?: string;
  xpRequired: number;
  questsRequired: number;
  icon: string;
  partnerLogo?: string;
  claimed: boolean;
  available: boolean;
}

interface RewardSystemProps {
  userXP: number;
  completedQuests: number;
}

const RewardSystem = ({ userXP, completedQuests }: RewardSystemProps) => {
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  const rewards: Reward[] = [
    {
      id: 'welcome',
      title: '10% Rabatt bei CafeZentral',
      description: 'Willkommensbonus für neue Quester',
      type: 'discount',
      value: '10%',
      code: 'QUEST10',
      xpRequired: 100,
      questsRequired: 1,
      icon: '☕',
      claimed: false,
      available: userXP >= 100 && completedQuests >= 1
    },
    {
      id: 'explorer',
      title: 'Freigetränk im BarHopping',
      description: 'Für echte Stadtentdecker',
      type: 'freebie',
      value: '1 Getränk gratis',
      code: 'EXPLORER2024',
      xpRequired: 500,
      questsRequired: 5,
      icon: '🍻',
      claimed: false,
      available: userXP >= 500 && completedQuests >= 5
    },
    {
      id: 'social',
      title: '25€ Gutschein für EscapeRooms',
      description: 'Perfekt für Gruppen-Abenteuer',
      type: 'voucher',
      value: '25€',
      code: 'TEAM25',
      xpRequired: 1000,
      questsRequired: 10,
      icon: '🗝️',
      claimed: false,
      available: userXP >= 1000 && completedQuests >= 10
    },
    {
      id: 'master',
      title: '50% Rabatt auf Premium Events',
      description: 'Exklusiv für Quest-Master',
      type: 'discount',
      value: '50%',
      code: 'MASTER50',
      xpRequired: 2000,
      questsRequired: 20,
      icon: '👑',
      claimed: false,
      available: userXP >= 2000 && completedQuests >= 20
    },
    {
      id: 'legend',
      title: 'Gratis VIP-Event Teilnahme',
      description: 'Legendärer Status erreicht!',
      type: 'freebie',
      value: 'VIP Event',
      code: 'LEGEND2024',
      xpRequired: 5000,
      questsRequired: 50,
      icon: '⭐',
      claimed: false,
      available: userXP >= 5000 && completedQuests >= 50
    }
  ];

  const claimReward = (rewardId: string) => {
    setClaimedRewards(prev => [...prev, rewardId]);
  };

  const getNextReward = () => {
    return rewards.find(reward => !reward.available && !claimedRewards.includes(reward.id));
  };

  const nextReward = getNextReward();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🎁 Belohnungen</h2>
        <p className="text-gray-600">Sammle XP und erhalte exklusive Gutscheine!</p>
      </div>

      {/* Next Reward Progress */}
      {nextReward && (
        <Card className="border-questGreen-200 bg-questGreen-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>{nextReward.icon}</span>
              Nächste Belohnung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm font-medium">{nextReward.title}</div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>XP: {userXP} / {nextReward.xpRequired}</span>
                <span>Quests: {completedQuests} / {nextReward.questsRequired}</span>
              </div>
              
              <div className="space-y-1">
                <Progress 
                  value={(userXP / nextReward.xpRequired) * 100} 
                  className="h-2 bg-gray-200"
                />
                <Progress 
                  value={(completedQuests / nextReward.questsRequired) * 100} 
                  className="h-2 bg-gray-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Rewards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Verfügbare Belohnungen</h3>
        {rewards.filter(reward => reward.available && !claimedRewards.includes(reward.id)).map((reward) => (
          <Card key={reward.id} className="border-questGreen-300 bg-gradient-to-r from-questGreen-50 to-questTurquoise-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{reward.icon}</div>
                  <div>
                    <div className="font-semibold">{reward.title}</div>
                    <div className="text-sm text-gray-600">{reward.description}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-questGreen-500 text-white text-xs">
                        {reward.value}
                      </Badge>
                      {reward.code && (
                        <Badge variant="outline" className="text-xs">
                          Code: {reward.code}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => claimReward(reward.id)}
                  className="bg-questGreen-500 hover:bg-questGreen-600 text-white"
                >
                  Einlösen
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Claimed Rewards */}
      {claimedRewards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Eingelöste Belohnungen</h3>
          {rewards.filter(reward => claimedRewards.includes(reward.id)).map((reward) => (
            <Card key={reward.id} className="bg-gray-100 border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 opacity-75">
                  <div className="text-2xl">{reward.icon}</div>
                  <div>
                    <div className="font-semibold">{reward.title}</div>
                    <div className="text-sm text-gray-600">Eingelöst am {new Date().toLocaleDateString()}</div>
                    {reward.code && (
                      <Badge variant="outline" className="text-xs mt-1">
                        Code verwendet: {reward.code}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Locked Rewards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-500">Kommende Belohnungen</h3>
        {rewards.filter(reward => !reward.available && !claimedRewards.includes(reward.id)).map((reward) => (
          <Card key={reward.id} className="bg-gray-50 border-gray-200 opacity-60">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl grayscale">{reward.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-700">{reward.title}</div>
                    <div className="text-sm text-gray-500">{reward.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Benötigt: {reward.xpRequired} XP • {reward.questsRequired} Quests
                    </div>
                  </div>
                </div>
                <div className="text-2xl">🔒</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardSystem;
