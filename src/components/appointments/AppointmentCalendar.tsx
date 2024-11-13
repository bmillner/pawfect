import { useState } from 'react';
import { format, startOfWeek, addDays, startOfDay, addHours } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

export function AppointmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('week');

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      customerName: 'Alice Johnson',
      petName: 'Max',
      service: 'Full Grooming',
      start: addHours(startOfDay(currentDate), 10),
      duration: 2,
    },
    // Add more mock appointments as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentDate((date) => addDays(date, -7));
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentDate((date) => addDays(date, 7));
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'day' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
          >
            Day
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-8 border-b">
        <div className="border-r p-4"></div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className={cn(
              'p-4 text-center border-r',
              format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ? 'bg-blue-50'
                : ''
            )}
          >
            <p className="font-medium">{format(day, 'EEE')}</p>
            <p className="text-sm text-gray-500">{format(day, 'd')}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8 divide-x overflow-auto" style={{ height: '600px' }}>
        <div className="divide-y">
          {HOURS.map((hour) => (
            <div key={hour} className="p-2 text-sm text-gray-500 text-right h-20">
              {format(new Date().setHours(hour), 'ha')}
            </div>
          ))}
        </div>

        {days.map((day) => (
          <div key={day.toString()} className="divide-y">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className={cn(
                  'p-2 h-20 relative',
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'bg-blue-50'
                    : ''
                )}
              >
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="absolute left-0 right-0 mx-1 bg-blue-100 text-blue-700 rounded p-1 text-xs"
                    style={{
                      top: `${(apt.start.getHours() - 8) * 5}rem`,
                      height: `${apt.duration * 5}rem`,
                    }}
                  >
                    <p className="font-medium">{apt.customerName}</p>
                    <p>{apt.service}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}