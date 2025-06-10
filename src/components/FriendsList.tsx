
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Friend {
  id: string;
  username: string;
  level: number;
  avatar: string;
  status: 'online' | 'offline' | 'in-quest';
  lastSeen?: string;
}

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      username: 'MaxAdventurer',
      level: 12,
      avatar: '🦄',
      status: 'online'
    },
    {
      id: '2',
      username: 'QuestMaster99',
      level: 8,
      avatar: '🚀',
      status: 'in-quest'
    },
    {
      id: '3',
      username: 'SocialButterfly',
      level: 15,
      avatar: '🦋',
      status: 'offline',
      lastSeen: 'vor 2 Stunden'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'in-quest': return 'bg-questTurquoise-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'in-quest': return 'In Quest';
      case 'offline': return 'Offline';
      default: return 'Unbekannt';
    }
  };

  const generateQRCode = () => {
    // Simuliere QR-Code Generation
    return "QR-Code für: QuestDealer_User_123";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meine Freunde</h2>
        <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
          <DialogTrigger asChild>
            <Button className="bg-quest-gradient text-white">
              👥 Freund hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Freund hinzufügen</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="username" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="username">Username</TabsTrigger>
                <TabsTrigger value="qr">QR-Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="username" className="space-y-4">
                <Input
                  placeholder="Username eingeben..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="w-full bg-questGreen-500 text-white">
                  🔍 Suchen
                </Button>
              </TabsContent>
              
              <TabsContent value="qr" className="space-y-4 text-center">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-sm text-gray-600 mb-4">
                    {generateQRCode()}
                  </div>
                  <p className="text-xs text-gray-500">
                    Teile diesen QR-Code mit deinen Freunden
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  📷 QR-Code scannen
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {friends.map((friend) => (
          <Card key={friend.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="text-2xl">{friend.avatar}</div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}></div>
                  </div>
                  <div>
                    <div className="font-semibold">{friend.username}</div>
                    <div className="text-sm text-gray-600">Level {friend.level}</div>
                    <div className="text-xs text-gray-500">
                      {getStatusText(friend.status)}
                      {friend.lastSeen && ` • ${friend.lastSeen}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-questGreen-300">
                    💬
                  </Button>
                  <Button size="sm" className="bg-questTurquoise-500 text-white">
                    🎯 Einladen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {friends.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Noch keine Freunde</h3>
          <p className="text-gray-600 mb-4">
            Finde deine ersten Quest-Partner!
          </p>
          <Button 
            onClick={() => setIsAddFriendOpen(true)}
            className="bg-quest-gradient text-white"
          >
            👥 Freunde finden
          </Button>
        </div>
      )}
    </div>
  );
};

export default FriendsList;
