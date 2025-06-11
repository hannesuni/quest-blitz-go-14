
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

const LocationBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const locationId = searchParams.get('id');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample locations data (in real app this would come from API/database)
  const sampleLocations: Location[] = [
    {
      id: '1',
      name: 'Escape Universe',
      type: 'Escape Room',
      address: 'Hauptstraße 123, München',
      price: 29,
      rating: 4.8,
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
      image: '🍺',
      description: 'Gemütliche Craft Beer Bar mit über 50 verschiedenen Bieren. Live-Musik am Wochenende.',
      amenities: ['50+ Biere', 'Live-Musik', 'Snacks', 'Terrasse']
    }
  ];

  const location = sampleLocations.find(loc => loc.id === locationId);

  if (!location) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-questGreen-50 via-white to-questTurquoise-50 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Location nicht gefunden</h2>
          <Button onClick={() => navigate('/?page=locations')}>
            Zurück zu Locations
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = location.price * groupSize;

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !customerName || !customerEmail) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store booking data in localStorage (in real app this would be sent to backend)
      const bookingData = {
        id: Math.random().toString(36).substr(2, 9),
        location: location,
        date: selectedDate,
        time: selectedTime,
        groupSize: groupSize,
        totalPrice: totalPrice,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        },
        paymentMethod: paymentMethod,
        bookingTime: new Date().toISOString(),
        status: 'confirmed'
      };

      localStorage.setItem('latestBooking', JSON.stringify(bookingData));
      
      toast({
        title: "Buchung erfolgreich!",
        description: "Du wirst zur Bestätigungsseite weitergeleitet.",
      });

      setTimeout(() => {
        navigate(`/booking-confirmation?bookingId=${bookingData.id}`);
      }, 1000);

    } catch (error) {
      toast({
        title: "Buchung fehlgeschlagen",
        description: "Es gab ein Problem bei der Zahlung. Bitte versuche es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-questGreen-50 via-white to-questTurquoise-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/?page=locations')}
          className="mb-6"
        >
          ← Zurück zu Locations
        </Button>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Location Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{location.image}</div>
                <div>
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                  <Badge variant="outline">{location.type}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-yellow-600">
                  <span>⭐</span>
                  <span>{location.rating}</span>
                </div>
                <div className="text-2xl font-bold text-questGreen-600">
                  {location.price}€ pro Person
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{location.description}</p>
              
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <span>📍</span>
                <span>{location.address}</span>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Ausstattung:</h4>
                <div className="flex flex-wrap gap-1">
                  {location.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Buchung</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Datum</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Uhrzeit</label>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gruppengröße</label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={groupSize}
                  onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Kontaktdaten</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Vollständiger Name*"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="E-Mail-Adresse*"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                  <Input
                    type="tel"
                    placeholder="Telefonnummer"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Zahlungsmethode</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💳 Kreditkarte</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💙 PayPal</span>
                  </label>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Gesamtpreis:</span>
                  <span className="text-2xl font-bold text-questGreen-600">
                    {totalPrice}€
                  </span>
                </div>
                
                <Button
                  className="w-full bg-quest-gradient hover:bg-quest-gradient-hover"
                  onClick={handleBooking}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Verarbeitung...
                    </span>
                  ) : (
                    `Jetzt buchen (${totalPrice}€)`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LocationBooking;
