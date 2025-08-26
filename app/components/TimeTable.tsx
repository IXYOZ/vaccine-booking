"use client";

import { useState, useEffect, useMemo } from "react";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { th, tr } from "date-fns/locale";
import { log } from "console";
import { setSeconds, setMilliseconds } from "date-fns";

const hours = Array.from({ length: 32 }, (_, i) => {
  const start = 9 * 60; // 9 am - 17 pm = 540 mins
  const totalMins = start + i * 15;
  const hour = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  return `${hour.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
});

export default function TimeTable({
  onSelect,
}: {
  onSelect: (datetime: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);


  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
    []
  );

  useEffect(() => {
    async function fetchBookedSlots() {
      if (days.length === 0) return;
      const start = days[0].toISOString();
      const end = days[days.length - 1].toISOString();

      const res = await fetch(`/api/mock-slots?start=${start}&end=${end}`);
      const data = await res.json();
      if (Array.isArray(data.slots)) {
        const cleaned = data.slots.map(
          (s: string) => new Date(s).toISOString().split(".")[0] + "Z"
        );
        setBookedSlots(cleaned)
      } else {
        console.warn("Invalid slots data", data.slots);
        setBookedSlots([]);
      }
    }
    fetchBookedSlots();
  }, [days]);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {days.map((d, i) => (
              <th key={i} className="border p-2">
                {format(d, "EEE dd/MM")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((h, i) => (
            <tr key={i}>
              <td className="border p-2">{h}</td>
              {days.map((d, j) => {
                const [hr, min] = h.split(":").map(Number);
                const dt = setMinutes(setHours(d, hr), min);
                const dtClean = setMilliseconds(setSeconds(dt, 0), 0);
                const iso = dtClean.toISOString().split(".")[0] + "Z";

                const isBooked = bookedSlots.includes(iso);
                const isSelected = selected === iso;
                console.log("bookSlots",bookedSlots);
                console.log("iso",iso);
                
                return (
                  <td
                    key={j}
                    onClick={() => {
                      if (isBooked) return;
                      setSelected(iso);
                      onSelect(iso);
                    }}
                    className={`border p-2 cursor-pointer text-center ${
                      isBooked
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : isSelected
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {isBooked ? "x" : isSelected ? "✓" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <p className="mt-4 text-white">
          Selected: {format(new Date(selected), "EEEE dd MMM yyyy HH:mm")}
        </p>
      )}
    </div>
  );
}
