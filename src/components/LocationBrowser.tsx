import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      name: 'Mystery Mansion',
      type: 'Escape Room',
      address: 'Rätselgasse 89, München',
      price: 35,
      rating: 4.9,
      available: true,
      image: '🏚️',
      description: 'Gruselige Horror-Escape Rooms für Adrenalinjunkies. Nur für starke Nerven!',
      amenities: ['Profi-Schauspieler', 'Spezialeffekte', 'Getränke']
    },
    {
      id: '3',
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
      id: '4',
      name: 'VIP Lounge 360',
      type: 'Partykeller',
      address: 'Luxusstraße 12, München',
      price: 250,
      rating: 4.7,
      available: false,
      image: '🥂',
      description: 'Exklusive VIP-Lounge mit Champagner-Service und persönlichem Butler.',
      amenities: ['Butler-Service', 'Premium-Bar', 'Tanzfläche', 'Fotograf']
    },
    {
      id: '5',
      name: 'Craft Beer Garden',
      type: 'Bar',
      address: 'Bierstraße 78, München',
      price: 45,
      rating: 4.7,
      available: true,
      image: '🍺',
      description: 'Gemütliche Craft Beer Bar mit über 50 verschiedenen Bieren. Live-Musik am Wochenende.',
      amenities: ['50+ Biere', 'Live-Musik', 'Snacks', 'Terrasse']
    },
    {
      id: '6',
      name: 'Rooftop Sky Bar',
      type: 'Bar',
      address: 'Hochhausweg 22, München',
      price: 65,
      rating: 4.8,
      available: true,
      image: '🌃',
      description: 'Stylische Rooftop-Bar mit Panoramablick über München. Cocktails vom Profi.',
      amenities: ['Panoramablick', 'Cocktail-Bar', 'Heizstrahler', 'DJ']
    },
    {
      id: '7',
      name: 'Pulse Nightclub',
      type: 'Club',
      address: 'Tanzstraße 15, München',
      price: 25,
      rating: 4.5,
      available: true,
      image: '🕺',
      description: 'Angesagte Disco mit drei Floors und verschiedenen Musikrichtungen.',
      amenities: ['3 Dancefloors', 'Top-DJs', 'VIP-Bereich', 'Garderobe']
    },
    {
      id: '8',
      name: 'Underground Club',
      type: 'Club',
      address: 'Kellerclub 8, München',
      price: 30,
      rating: 4.6,
      available: true,
      image: '🎵',
      description: 'Techno-Club mit industriellem Ambiente und erstklassiger Soundanlage.',
      amenities: ['Techno-Sound', 'Nebelmaschine', 'Chill-Out-Area', 'Late-Night']
    },
    {
      id: '9',
      name: 'Bowling Arena',
      type: 'Sport',
      address: 'Sportplatz 33, München',
      price: 20,
      rating: 4.4,
      available: true,
      image: '🎳',
      description: 'Moderne Bowling-Bahn mit Neon-Licht und Cocktail-Service.',
      amenities: ['8 Bahnen', 'Neon-Bowling', 'Snacks', 'Billard']
    },
    {
      id: '10',
      name: 'Lasertag Arena',
      type: 'Sport',
      address: 'Actionstraße 99, München',
      price: 18,
      rating: 4.7,
      available: true,
      image: '🔫',
      description: 'Futuristische Lasertag-Arena mit mehreren Leveln und Hindernissen.',
      amenities: ['Multi-Level', 'Spezialeffekte', 'Team-Modi', 'Umkleiden']
    },
    {
      id: '11',
      name: 'La Bella Vista',
      type: 'Restaurant',
      address: 'Genussmeile 7, München',
      price: 85,
      rating: 4.8,
      available: true,
      image: '🍝',
      description: 'Authentisches italienisches Restaurant mit romantischer Atmosphäre.',
      amenities: ['Candlelight', 'Live-Piano', 'Weinverkostung', 'Terrasse']
    },
    {
      id: '12',
      name: 'Sakura Sushi',
      type: 'Restaurant',
      address: 'Asienplatz 14, München',
      price: 70,
      rating: 4.6,
      available: false,
      image: '🍣',
      description: 'Hochwertiges Sushi-Restaurant mit Teppanyaki-Show und frischestem Fisch.',
      amenities: ['Teppanyaki-Show', 'Frischer Fisch', 'Sake-Bar', 'Tatami-Räume']
    }
  ];

  const filters = ['Alle', 'Escape Room', 'Partykeller', 'Bar', 'Club', 'Sport', 'Restaurant'];

  const filteredLocations = sampleLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'Alle' || location.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleBookLocation = (locationId: string) => {
    navigate(`/location-booking?id=${locationId}`);
  };

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
                  onClick={() => location.available && handleBookLocation(location.id)}
                >
                  {location.available ? 'Buchen 🎯' : 'Ausgebucht'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-questGreen-300"
                  onClick={() => handleBookLocation(location.id)}
                  disabled={!location.available}
                >
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
