
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingData {
  id: string;
  location: {
    name: string;
    type: string;
    address: string;
    image: string;
  };
  date: string;
  time: string;
  groupSize: number;
  totalPrice: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
  bookingTime: string;
  status: string;
}

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    const bookingId = searchParams.get('bookingId');
    const storedBooking = localStorage.getItem('latestBooking');
    
    if (storedBooking) {
      const bookingData = JSON.parse(storedBooking);
      if (bookingData.id === bookingId) {
        setBooking(bookingData);
      }
    }
  }, [searchParams]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-questGreen-50 via-white to-questTurquoise-50 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Buchung nicht gefunden</h2>
          <Button onClick={() => navigate('/')}>
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-questGreen-50 via-white to-questTurquoise-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-questGreen-600 mb-2">
            Buchung erfolgreich!
          </h1>
          <p className="text-lg text-gray-600">
            Deine Buchung wurde bestätigt. Wir freuen uns auf deinen Besuch!
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="text-3xl">{booking.location.image}</div>
              <div>
                <CardTitle className="text-xl">{booking.location.name}</CardTitle>
                <Badge variant="outline">{booking.location.type}</Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-600">DATUM</h4>
                <p className="font-medium">{formatDate(booking.date)}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-600">UHRZEIT</h4>
                <p className="font-medium">{formatTime(booking.time)} Uhr</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-600">GRUPPENGRÖSSE</h4>
                <p className="font-medium">{booking.groupSize} Personen</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-600">GESAMTPREIS</h4>
                <p className="font-medium text-questGreen-600">{booking.totalPrice}€</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-600">ADRESSE</h4>
              <p className="font-medium">{booking.location.address}</p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Buchungsdetails</h4>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p><strong>Buchungs-ID:</strong> {booking.id}</p>
                <p><strong>Gebucht am:</strong> {new Date(booking.bookingTime).toLocaleString('de-DE')}</p>
                <p><strong>Status:</strong> <Badge className="bg-green-500">Bestätigt</Badge></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span>
              Wichtige Hinweise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span>🕐</span>
                <p>Bitte sei <strong>15 Minuten vor der gebuchten Zeit</strong> am Veranstaltungsort.</p>
              </div>
              <div className="flex items-start gap-2">
                <span>📱</span>
                <p>Bring dein Smartphone mit - du könntest es für das Erlebnis benötigen.</p>
              </div>
              <div className="flex items-start gap-2">
                <span>🎫</span>
                <p>Zeige diese Bestätigung oder deine Buchungs-ID vor Ort vor.</p>
              </div>
              <div className="flex items-start gap-2">
                <span>📞</span>
                <p>Bei Fragen oder Änderungen kontaktiere uns unter: <strong>info@questdealer.de</strong></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/?page=locations')}
            className="border-questGreen-300 text-questGreen-700"
          >
            Weitere Locations
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="bg-quest-gradient hover:bg-quest-gradient-hover"
          >
            Zur Startseite
          </Button>
        </div>

        {/* Add to Calendar Suggestion */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            📅 Vergiss nicht, den Termin in deinen Kalender einzutragen!
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(booking.date)} um {formatTime(booking.time)} Uhr - {booking.location.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
