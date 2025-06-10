
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface GroupEvent {
  id: string;
  title: string;
  type: 'quest' | 'location';
  date: string;
  time: string;
  organizer: string;
  participants: string[];
  maxParticipants: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  description: string;
}

interface Invitation {
  id: string;
  eventId: string;
  eventTitle: string;
  organizer: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
}

const GroupEvents = () => {
  const [groupEvents, setGroupEvents] = useState<GroupEvent[]>([
    {
      id: '1',
      title: 'Escape Room Challenge',
      type: 'location',
      date: '2024-06-15',
      time: '19:00',
      organizer: 'MaxAdventurer',
      participants: ['QuestMaster99', 'SocialButterfly'],
      maxParticipants: 6,
      status: 'confirmed',
      description: 'Gruppen-Escape Room im Escape Universe'
    },
    {
      id: '2',
      title: 'Nachtfalter Quest',
      type: 'quest',
      date: '2024-06-12',
      time: '21:00',
      organizer: 'Du',
      participants: ['MaxAdventurer'],
      maxParticipants: 4,
      status: 'pending',
      description: 'Gemeinsame Entdeckung des Nachtlebens'
    }
  ]);

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      eventId: '3',
      eventTitle: 'Biergarten Tour',
      organizer: 'QuestMaster99',
      date: '2024-06-13',
      time: '18:00',
      status: 'pending'
    }
  ]);

  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  const handleInvitationResponse = (invitationId: string, response: 'accepted' | 'declined') => {
    setInvitations(prev => 
      prev.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: response }
          : inv
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gruppen-Events</h2>
        <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <DialogTrigger asChild>
            <Button className="bg-quest-gradient text-white">
              ➕ Event erstellen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Neues Gruppen-Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Event-Titel..." />
              <Input placeholder="Datum (TT.MM.JJJJ)" />
              <Input placeholder="Uhrzeit" />
              <Input placeholder="Max. Teilnehmer" type="number" />
              <Button className="w-full bg-questGreen-500 text-white">
                🎯 Event erstellen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Einladungen */}
      {invitations.filter(inv => inv.status === 'pending').length > 0 && (
        <Card className="border-questTurquoise-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📬</span>
              Einladungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {invitations
              .filter(inv => inv.status === 'pending')
              .map((invitation) => (
                <div key={invitation.id} className="bg-questTurquoise-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{invitation.eventTitle}</div>
                      <div className="text-sm text-gray-600">
                        von {invitation.organizer} • {invitation.date} um {invitation.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-500 text-white"
                        onClick={() => handleInvitationResponse(invitation.id, 'accepted')}
                      >
                        ✓
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-300 text-red-600"
                        onClick={() => handleInvitationResponse(invitation.id, 'declined')}
                      >
                        ✗
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Gruppen-Events */}
      <div className="space-y-4">
        {groupEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={`${getStatusColor(event.status)} text-white`}>
                    {event.status === 'confirmed' ? 'Bestätigt' : 
                     event.status === 'pending' ? 'Ausstehend' : 'Abgesagt'}
                  </Badge>
                  <Badge variant="outline">
                    {event.type === 'quest' ? '🎯 Quest' : '📍 Location'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{event.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  📅 {event.date}
                </span>
                <span className="flex items-center gap-1">
                  🕐 {event.time}
                </span>
                <span className="flex items-center gap-1">
                  👥 {event.participants.length + 1}/{event.maxParticipants}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold">Teilnehmer:</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">
                    {event.organizer} (Organisator)
                  </Badge>
                  {event.participants.map((participant, index) => (
                    <Badge key={index} variant="outline">
                      {participant}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                {event.organizer === 'Du' ? (
                  <>
                    <Button size="sm" variant="outline" className="border-questGreen-300">
                      ✏️ Bearbeiten
                    </Button>
                    <Button size="sm" className="bg-questTurquoise-500 text-white">
                      👥 Freunde einladen
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="bg-questGreen-500 text-white">
                    📱 Details anzeigen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {groupEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">Keine Events geplant</h3>
          <p className="text-gray-600 mb-4">
            Erstelle dein erstes Gruppen-Event!
          </p>
          <Button 
            onClick={() => setIsCreateEventOpen(true)}
            className="bg-quest-gradient text-white"
          >
            ➕ Event erstellen
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupEvents;
