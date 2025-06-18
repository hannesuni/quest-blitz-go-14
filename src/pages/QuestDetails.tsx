
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, MapPin, Clock, Users } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  xp: number;
  tasks: string[];
  location: string;
  estimatedTime: string;
  participants?: string[];
}

interface QuestDetailsProps {
  quest: Quest;
  onComplete: (xpGained: number) => void;
  onBack: () => void;
}

const QuestDetails = ({ quest, onComplete, onBack }: QuestDetailsProps) => {
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    new Array(quest.tasks.length).fill(false)
  );
  const [questCompleted, setQuestCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const toggleTask = (index: number) => {
    if (questCompleted) return;
    
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const progress = (completedTasks.filter(Boolean).length / quest.tasks.length) * 100;

  const completeQuest = () => {
    setQuestCompleted(true);
    onComplete(quest.xp);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'bg-questGreen-500';
      case 'Mittel': return 'bg-yellow-500';
      case 'Schwer': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const allTasksCompleted = completedTasks.every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-questGreen-50 via-white to-questTurquoise-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="px-4">
            ← Zurück
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-questGreen-800">{quest.title}</h1>
            <p className="text-gray-600">{quest.description}</p>
          </div>
        </div>

        {/* Quest Info */}
        <Card className="border-questGreen-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Abenteuer Details</CardTitle>
              <div className="flex gap-2">
                <Badge className={`${getDifficultyColor(quest.difficulty)} text-white`}>
                  {quest.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-questTurquoise-100 text-questTurquoise-800">
                  +{quest.xp} XP
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-questGreen-600" />
                <span className="text-sm">{quest.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-questTurquoise-600" />
                <span className="text-sm">{quest.estimatedTime}</span>
              </div>
              {quest.participants && quest.participants.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{quest.participants.length} Teilnehmer</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="border-questTurquoise-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Fortschritt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{completedTasks.filter(Boolean).length} von {quest.tasks.length} Aufgaben</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card className="border-questGreen-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Aufgaben</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quest.tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    completedTasks[index]
                      ? 'bg-questGreen-50 border-questGreen-300'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleTask(index)}
                >
                  {completedTasks[index] ? (
                    <CheckCircle className="h-6 w-6 text-questGreen-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <span className={`${completedTasks[index] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {task}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Complete Quest Button */}
        {allTasksCompleted && !questCompleted && (
          <Card className="border-questGreen-300 bg-gradient-to-r from-questGreen-50 to-questTurquoise-50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="text-4xl">🎉</div>
                <h3 className="text-xl font-bold text-questGreen-800">
                  Alle Aufgaben erledigt!
                </h3>
                <p className="text-gray-600">
                  Du hast alle Aufgaben dieses Abenteuers abgeschlossen. Klicke auf "Abenteuer abschließen" um deine XP zu erhalten!
                </p>
                <Button
                  onClick={completeQuest}
                  className="bg-quest-gradient text-white px-8 py-3 text-lg font-semibold"
                >
                  Abenteuer abschließen (+{quest.xp} XP)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quest Completed */}
        {questCompleted && (
          <Card className="border-questGreen-300 bg-gradient-to-r from-questGreen-100 to-questTurquoise-100">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="text-6xl animate-bounce">🏆</div>
                <h3 className="text-2xl font-bold text-questGreen-800">
                  Abenteuer abgeschlossen!
                </h3>
                <p className="text-lg text-questGreen-700">
                  +{quest.xp} XP erhalten!
                </p>
                <Button
                  onClick={onBack}
                  className="bg-questTurquoise-500 text-white px-8 py-3"
                >
                  Zurück zur Übersicht
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestDetails;
