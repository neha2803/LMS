"use client";
import { read } from "@/store/firestore";
import { useState, useEffect } from "react";

const Holidays: React.FC = () => {
  const [holidays, setHoliday] = useState<{ date: Date; value: string }[]>([]);

  useEffect(() => {
    read("holidays/2024")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const list = snapshot.val();
          const keys = Object.keys(list);
          const r: { date: Date; value: string }[] = [];

          keys.map((item, index) => {
            r.push({
              date: new Date(
                2024,
                Number(item.substring(0, 2)) - 1,
                Number(item.substring(2, 4))
              ),
              value: list[item],
            });
          });

          r.sort((a, b) => (a.date > b.date ? 1 : -1));

          setHoliday(r);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-col">
      {holidays.map((item, index) => (
        <div key={index}>
          {" "}
          {`${item.date.toLocaleDateString()} - ${item.value}`}
        </div>
      ))}
    </div>
  );
};

export default Holidays;
