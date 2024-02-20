'use client'
import Calendar from "@/components/Calendar";
import { update, write, read } from "@/store/firestore";
import { useEffect} from "react";

export default function Home() {
  const date: Date = new Date();
  const dates: Date[] = [];


  for (let index = 0; index < 41; index++) {
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + index);
    dates.push(tempDate);
  }

  const dateSelected = (date: Date) => {
    console.log(date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const storeUrl: string = `/leaves/${date.getFullYear()}/${month}${day}`;
    update(storeUrl, { o: 8 });
  };

  const events: { date: Date; description: string }[] = [
    { date: new Date(2024, 1, 1), description: "First feb" },
  ];

  useEffect(() => {
    read("holidays/2024").then((snapshot) => {
      if (snapshot.exists()) {
        const list = snapshot.val();
        const keys = Object.keys(list);
        const holidays: { date: Date; description: string }[] = [];

        keys.map((item, index) => {
          holidays.push({
            date: new Date(
              2024,
              Number(item.substring(0, 2)) - 1,
              Number(item.substring(2, 4))
            ),
            description: list[item],
          });
        });

        holidays.sort((a, b) => (a.date > b.date ? 1 : -1));

      }
    });
  }, []);

  return (
    <>
      <Calendar dateSelected={dateSelected} events={events}></Calendar>
    </>
  );
}
