
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  xp: number;
  tasks: string[];
  location: string;
}

const QuestGenerator = () => {
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      location: 'Innenstadt'
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
      location: 'Café oder Park'
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
      location: 'Ausgehviertel'
    }
  ];

  const generateQuest = () => {
    setIsGenerating(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const randomQuest = sampleQuests[Math.floor(Math.random() * sampleQuests.length)];
      setCurrentQuest(randomQuest);
      setIsGenerating(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'bg-questGreen-500';
      case 'Mittel': return 'bg-yellow-500';
      case 'Schwer': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quest Generator</h2>
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
              Generiere Quest...
            </>
          ) : (
            '🎲 Neue Quest generieren'
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
            <div className="flex items-center gap-2 text-sm text-questGreen-700">
              <span>📍</span>
              <span>{currentQuest.location}</span>
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
              <Button className="flex-1 bg-quest-gradient hover:bg-quest-gradient-hover text-white">
                Quest starten 🚀
              </Button>
              <Button variant="outline" className="border-questGreen-300 text-questGreen-700 hover:bg-questGreen-50">
                Teilen 📤
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestGenerator;
