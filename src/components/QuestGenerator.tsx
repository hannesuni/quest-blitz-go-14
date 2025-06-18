
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuestDetails from '@/pages/QuestDetails';
import { useUser } from '@/contexts/UserContext';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  xp: number;
  tasks: string[];
  location: string;
  estimatedTime: string;
}

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'in-quest';
}

const QuestGenerator = () => {
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInviteFriendsOpen, setIsInviteFriendsOpen] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  
  const { addXP, completeQuest } = useUser();

  const friends: Friend[] = [
    { id: '1', username: 'MaxAdventurer', avatar: '🦄', status: 'online' },
    { id: '2', username: 'QuestMaster99', avatar: '🚀', status: 'online' },
    { id: '3', username: 'SocialButterfly', avatar: '🦋', status: 'offline' }
  ];

  const sampleQuests: Quest[] = [
    {
      id: '1',
      title: 'Stadtentdecker',
      description: 'Erkunde versteckte Ecken deiner Stadt und sammle Hinweise!',
      difficulty: 'Einfach',
      xp: 150,
      tasks: [
        'Finde ein Straßengraffiti mit einem Tier',
        'Sprich mit einem Straßenmusiker',
        'Mache ein Foto vor einem historischen Gebäude',
        'Finde einen Laden, der seit über 50 Jahren existiert'
      ],
      location: 'Innenstadt',
      estimatedTime: '2-3 Stunden'
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Triff neue Leute und sammle interessante Geschichten!',
      difficulty: 'Mittel',
      xp: 250,
      tasks: [
        'Führe ein 5-minütiges Gespräch mit einem Fremden',
        'Finde jemanden, der das gleiche Hobby hat wie du',
        'Lass dir von einer Person eine lokale Empfehlung geben',
        'Tausche Kontaktdaten mit einer neuen Bekanntschaft'
      ],
      location: 'Café oder Park',
      estimatedTime: '3-4 Stunden'
    },
    {
      id: '3',
      title: 'Nachtfalter',
      description: 'Entdecke das Nachtleben und sammle unvergessliche Momente!',
      difficulty: 'Schwer',
      xp: 400,
      tasks: [
        'Besuche 3 verschiedene Bars in einer Nacht',
        'Lerne einen neuen Cocktail kennen',
        'Finde eine Live-Musik-Location',
        'Sammle Visitenkarten von 2 interessanten Orten'
      ],
      location: 'Ausgehviertel',
      estimatedTime: '4-6 Stunden'
    }
  ];

  const generateQuest = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const randomQuest = sampleQuests[Math.floor(Math.random() * sampleQuests.length)];
      setCurrentQuest(randomQuest);
      setIsGenerating(false);
    }, 2000);
  };

  const startQuest = () => {
    if (currentQuest) {
      setActiveQuest(currentQuest);
    }
  };

  const handleQuestComplete = (xpGained: number) => {
    addXP(xpGained);
    completeQuest();
    console.log(`Abenteuer abgeschlossen! +${xpGained} XP erhalten.`);
  };

  const handleBackToGenerator = () => {
    setActiveQuest(null);
    setCurrentQuest(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'bg-questGreen-500';
      case 'Mittel': return 'bg-yellow-500';
      case 'Schwer': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const sendInvitations = () => {
    console.log('Einladungen gesendet an:', selectedFriends);
    setIsInviteFriendsOpen(false);
    setSelectedFriends([]);
  };

  // If there's an active quest, show the quest details page
  if (activeQuest) {
    return (
      <QuestDetails
        quest={activeQuest}
        onComplete={handleQuestComplete}
        onBack={handleBackToGenerator}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Abenteuer Generator</h2>
        <p className="text-muted-foreground mb-6">
          Lass dir ein spontanes Abenteuer in deiner Nähe generieren!
        </p>
        
        <Button 
          onClick={generateQuest}
          disabled={isGenerating}
          className="bg-quest-gradient hover:bg-quest-gradient-hover text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generiere Abenteuer...
            </>
          ) : (
            '🎲 Neues Abenteuer generieren'
          )}
        </Button>
      </div>

      {currentQuest && (
        <Card className="animate-fade-in-up border-0 shadow-xl bg-gradient-to-br from-white to-questGreen-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-questGreen-800">{currentQuest.title}</CardTitle>
              <div className="flex gap-2">
                <Badge className={`${getDifficultyColor(currentQuest.difficulty)} text-white`}>
                  {currentQuest.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-questTurquoise-100 text-questTurquoise-800 border-questTurquoise-300">
                  +{currentQuest.xp} XP
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground">{currentQuest.description}</p>
            <div className="flex items-center gap-4 text-sm text-questGreen-700">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{currentQuest.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{currentQuest.estimatedTime}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <h4 className="font-semibold mb-3 text-questGreen-800">Aufgaben:</h4>
            <ul className="space-y-2 mb-6">
              {currentQuest.tasks.map((task, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-questGreen-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{task}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-3">
              <Button 
                onClick={startQuest}
                className="flex-1 bg-quest-gradient hover:bg-quest-gradient-hover text-white"
              >
                Abenteuer starten 🚀
              </Button>
              <Dialog open={isInviteFriendsOpen} onOpenChange={setIsInviteFriendsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-questTurquoise-300 text-questTurquoise-700 hover:bg-questTurquoise-50">
                    👥 Freunde einladen
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Freunde zum Abenteuer einladen</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Wähle Freunde aus, die du zu "{currentQuest.title}" einladen möchtest:
                    </p>
                    <div className="space-y-2">
                      {friends.map((friend) => (
                        <div 
                          key={friend.id} 
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedFriends.includes(friend.id) 
                              ? 'bg-questGreen-50 border-questGreen-300' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          } ${friend.status === 'offline' ? 'opacity-60' : ''}`}
                          onClick={() => friend.status !== 'offline' && toggleFriendSelection(friend.id)}
                        >
                          <div className="text-xl">{friend.avatar}</div>
                          <div className="flex-1">
                            <div className="font-semibold">{friend.username}</div>
                            <div className="text-sm text-gray-600">
                              {friend.status === 'online' ? '🟢 Online' : 
                               friend.status === 'in-quest' ? '🟡 Im Abenteuer' : '⚫ Offline'}
                            </div>
                          </div>
                          {selectedFriends.includes(friend.id) && (
                            <div className="text-questGreen-500">✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-questTurquoise-500 text-white"
                      onClick={sendInvitations}
                      disabled={selectedFriends.length === 0}
                    >
                      📤 Einladungen senden ({selectedFriends.length})
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="border-questGreen-300 text-questGreen-700 hover:bg-questGreen-50">
                📤 Teilen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestGenerator;
