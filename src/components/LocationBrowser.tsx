
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  price: number;
  rating: number;
  available: boolean;
  image: string;
  description: string;
  amenities: string[];
}

const LocationBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Alle');

  const sampleLocations: Location[] = [
    {
      id: '1',
      name: 'Escape Universe',
      type: 'Escape Room',
      address: 'Hauptstraße 123, München',
      price: 29,
      rating: 4.8,
      available: true,
      image: '🗝️',
      description: 'Spannende Escape Rooms mit verschiedenen Themen. Perfekt für Gruppen von 2-6 Personen.',
      amenities: ['Parkplätze', 'Getränke', 'Fotoshooting']
    },
    {
      id: '2',
      name: 'Party Basement',
      type: 'Partykeller',
      address: 'Kellerstraße 45, München',
      price: 150,
      rating: 4.6,
      available: true,
      image: '🎉',
      description: 'Privater Partykeller mit Sound-System, Karaoke und Bar. Bis zu 20 Personen.',
      amenities: ['Sound-System', 'Karaoke', 'Bar', 'Lichtshow']
    },
    {
      id: '3',
      name: 'Craft Beer Garden',
      type: 'Bar',
      address: 'Bierstraße 78, München',
      price: 45,
      rating: 4.7,
      available: false,
      image: '🍺',
      description: 'Gemütliche Craft Beer Bar mit über 50 verschiedenen Bieren. Live-Musik am Wochenende.',
      amenities: ['50+ Biere', 'Live-Musik', 'Snacks', 'Terrasse']
    }
  ];

  const filters = ['Alle', 'Escape Room', 'Partykeller', 'Bar', 'Club'];

  const filteredLocations = sampleLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'Alle' || location.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Location Browser</h2>
        <p className="text-muted-foreground">
          Finde und buche die perfekte Location für dein Abenteuer!
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Nach Locations suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-xl border-questGreen-200 focus:border-questGreen-500"
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full whitespace-nowrap ${
                selectedFilter === filter 
                  ? 'bg-quest-gradient text-white' 
                  : 'border-questGreen-300 text-questGreen-700 hover:bg-questGreen-50'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Location Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.map((location) => (
          <Card key={location.id} className={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            !location.available ? 'opacity-60' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{location.image}</div>
                  <div>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {location.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-yellow-600">
                    <span>⭐</span>
                    <span>{location.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-questGreen-600">
                    {location.price}€
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{location.description}</p>
              
              <div className="text-xs text-gray-600 flex items-center gap-1">
                <span>📍</span>
                <span>{location.address}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {location.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {location.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{location.amenities.length - 3} mehr
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  className={`flex-1 ${
                    location.available 
                      ? 'bg-quest-gradient hover:bg-quest-gradient-hover text-white' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!location.available}
                >
                  {location.available ? 'Buchen 🎯' : 'Ausgebucht'}
                </Button>
                <Button variant="outline" size="sm" className="border-questGreen-300">
                  ℹ️
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Keine Locations gefunden</h3>
          <p className="text-muted-foreground">
            Versuche es mit anderen Suchbegriffen oder Filtern.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationBrowser;
