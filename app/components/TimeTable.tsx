"use client";

import { useState } from "react";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { th, tr } from "date-fns/locale";

const hours = Array.from({ length:  32 }, (_, i) => {
  const start = 9 * 60; // 9 am - 17 pm = 540 mins
  const totalMins = start + i *  15;
  const hour = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  return `${hour.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
});

const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

export default function TimeTable({
  onSelect,
}: {
  onSelect: (datetime: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

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
                const iso = dt.toISOString();
                return (
                  <td
                    key={j}
                    onClick={() => {
                      setSelected(iso);
                      onSelect(iso);
                    }}
                    className={`border p-2 cursor-pointer text-center ${
                      selected === iso
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {selected === iso ? "✓" : ""}
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
