
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FriendsList from '@/components/FriendsList';
import GroupEvents from '@/components/GroupEvents';

const Social = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-quest-gradient bg-clip-text text-transparent">
          Social Hub
        </h1>
        <p className="text-xl text-gray-600">
          Verbinde dich mit anderen Questern und plane gemeinsame Abenteuer!
        </p>
      </div>

      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="friends">👥 Freunde</TabsTrigger>
          <TabsTrigger value="events">🎯 Gruppen-Events</TabsTrigger>
        </TabsList>

        <TabsContent value="friends">
          <FriendsList />
        </TabsContent>

        <TabsContent value="events">
          <GroupEvents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Social;
