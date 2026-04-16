import { useMemo, useState } from 'react';

const rooms = ['Study Room A', 'Lab B', 'Projector Room'];
const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

function BookingPage() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [bookings, setBookings] = useState([]);

  const bookedSlots = useMemo(
    () => bookings.filter((item) => item.room === selectedRoom).map((item) => item.slot),
    [bookings, selectedRoom],
  );

  const handleBook = () => {
    if (bookedSlots.includes(selectedSlot)) return;
    setBookings((current) => [...current, { room: selectedRoom, slot: selectedSlot, createdAt: new Date() }]);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Resource Booking</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Reserve a room or equipment</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Choose a resource and time slot to book your campus facility.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Book a slot</h2>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Room or resource</span>
              <select
                value={selectedRoom}
                onChange={(event) => setSelectedRoom(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {rooms.map((room) => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Time slot</span>
              <select
                value={selectedSlot}
                onChange={(event) => setSelectedSlot(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={handleBook}
              disabled={bookedSlots.includes(selectedSlot)}
              className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-soft shadow-cyan-500/30 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {bookedSlots.includes(selectedSlot) ? 'Slot booked' : 'Reserve slot'}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-soft shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Your upcoming bookings</h2>
          <div className="mt-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No bookings yet. Reserve a slot to see it appear here.
              </div>
            ) : (
              bookings.map((booking, index) => (
                <div key={`${booking.room}-${booking.slot}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{booking.room}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{booking.slot}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">Confirmed</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Booked at {booking.createdAt.toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
