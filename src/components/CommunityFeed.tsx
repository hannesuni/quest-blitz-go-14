
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeedPost {
  id: string;
  user: string;
  avatar: string;
  questName: string;
  image: string;
  description: string;
  likes: number;
  comments: number;
  timeAgo: string;
  location: string;
}

interface TopQuest {
  id: string;
  name: string;
  completions: number;
  avgRating: number;
  difficulty: string;
  xp: number;
}

const CommunityFeed = () => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const feedPosts: FeedPost[] = [
    {
      id: '1',
      user: 'Anna_M',
      avatar: '👩‍🦰',
      questName: 'Münchner Geheimtipps',
      image: '🏛️',
      description: 'Unglaublich, was für versteckte Schätze München hat! Haben einen 200 Jahre alten Laden entdeckt 🤩',
      likes: 23,
      comments: 7,
      timeAgo: '2h',
      location: 'München Altstadt'
    },
    {
      id: '2',
      user: 'Max_Quest',
      avatar: '👨‍💼',
      questName: 'Social Butterfly',
      image: '☕',
      description: 'Bestes Gespräch ever mit einem Straßenmusiker! Hat mir seine ganze Lebensgeschichte erzählt 🎸',
      likes: 34,
      comments: 12,
      timeAgo: '4h',
      location: 'Marienplatz'
    },
    {
      id: '3',
      user: 'Lisa_Adventure',
      avatar: '👩‍🎓',
      questName: 'Nachtfalter',
      image: '🍸',
      description: 'Was für eine Nacht! 3 Bars, 2 neue Cocktails und so viele coole Leute kennengelernt! 🌃',
      likes: 45,
      comments: 18,
      timeAgo: '6h',
      location: 'Glockenbachviertel'
    }
  ];

  const topQuests: TopQuest[] = [
    {
      id: '1',
      name: 'Stadtentdecker',
      completions: 342,
      avgRating: 4.8,
      difficulty: 'Einfach',
      xp: 150
    },
    {
      id: '2',
      name: 'Social Butterfly',
      completions: 289,
      avgRating: 4.6,
      difficulty: 'Mittel',
      xp: 250
    },
    {
      id: '3',
      name: 'Nachtfalter',
      completions: 156,
      avgRating: 4.9,
      difficulty: 'Schwer',
      xp: 400
    }
  ];

  const handleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Community</h2>
        <p className="text-muted-foreground">
          Entdecke, was andere Abenteurer erleben!
        </p>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="feed" className="data-[state=active]:bg-quest-gradient data-[state=active]:text-white">
            📸 Feed
          </TabsTrigger>
          <TabsTrigger value="top-quests" className="data-[state=active]:bg-quest-gradient data-[state=active]:text-white">
            🏆 Top Quests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {feedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{post.avatar}</div>
                    <div>
                      <div className="font-semibold">{post.user}</div>
                      <div className="text-sm text-muted-foreground">
                        Quest: {post.questName}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{post.timeAgo}</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-4xl text-center py-8 bg-gradient-to-br from-questGreen-50 to-questTurquoise-50 rounded-lg">
                  {post.image}
                </div>
                
                <p className="text-gray-700">{post.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{post.location}</span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`gap-2 ${
                        likedPosts.includes(post.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <span>{likedPosts.includes(post.id) ? '❤️' : '🤍'}</span>
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-questGreen-600">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-questTurquoise-600">
                    📤 Teilen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="top-quests" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">🔥 Diese Woche angesagt</h3>
            <p className="text-sm text-muted-foreground">Die beliebtesten Quests der Community</p>
          </div>
          
          {topQuests.map((quest, index) => (
            <Card key={quest.id} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-quest-gradient rounded-full text-white font-bold text-lg">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{quest.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>⭐ {quest.avgRating}</span>
                        <span>👥 {quest.completions} mal gespielt</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={`${getDifficultyColor(quest.difficulty)} text-white mb-2`}>
                      {quest.difficulty}
                    </Badge>
                    <div className="text-lg font-bold text-questGreen-600">
                      +{quest.xp} XP
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-quest-gradient hover:bg-quest-gradient-hover text-white">
                  Quest spielen 🎮
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityFeed;
