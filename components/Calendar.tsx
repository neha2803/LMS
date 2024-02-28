import clsx from "clsx";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const Header: React.FC = () => {
  const date = new Date();

  return (
    <div className="dark:bg-slate-800/70 rounded-t-lg p-2">
      {date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
      })}
    </div>
  );
};

const Navigate: React.FC<{ date: Date; navigate: (date: Date) => void }> = ({
  date,
  navigate,
}) => {
  console.log("component created");
  const next = (event: React.MouseEvent<HTMLDivElement>) => {
    const tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() + 1);
    navigate(tempDate);
  };

  const previous = (event: React.MouseEvent<HTMLDivElement>) => {
    const tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() - 1);
    navigate(tempDate);
  };

  return (
    <div className=" flex flex-row p-2">
      <div
        className="rounded-md
          dark:hover:bg-blue-300/50 
          dark:hover:text-blue-300
          hover:bg-white
          hover:text-black
          dark:active:bg-blue-600/50 
          dark:active:text-blue-100"
        onClick={previous}
      >
        <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
      </div>
      <div className="flex-grow text-center font-bold">
        {date.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </div>
      <div
        className="rounded-md
          dark:hover:bg-blue-300/50 
          dark:hover:text-blue-300
          hover:bg-white
          hover:text-black
          dark:active:bg-blue-600/50 
          dark:active:text-blue-100"
        onClick={next}
      >
        <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
      </div>
    </div>
  );
};

const Weekday: React.FC = () => {
  return (
    <div className="grid grid-cols-7 text-center text-sm font-bold">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div className="dark:bg-slate-700/50 bg-red-500/50">Sat</div>
      <div className="dark:bg-slate-700/50 bg-red-500/50">Sun</div>
    </div>
  );
};

const Calendar: React.FC<{
  events?: { date: Date; description: string }[];
  weekstart?: string;
  weekend?: string;
}> = ({ events, weekstart, weekend }) => {
  const today = new Date();
  const [x, setX] = useState<Date>(today);

  const dateChanged = (date: Date) => {
    setX(date);
  };

  return (
    <div
      className="border dark: border-slate-900 rounded-lg m-1
      bg-gradient-to-b dark:from-slate-800/50 dark:to-slate-900/70 dark:divide-y dark:divide-slate-600/50"
    >
      <Header></Header>
      <Navigate date={x} navigate={dateChanged}></Navigate>
      <Weekday></Weekday>
      <Days date={x} />
      <Footer />
    </div>
  );
};

const Days: React.FC<{ date: Date }> = ({ date }) => {
  let emidsHolidays = getHolidays();
  const dates: {
    date: Date;
    current: boolean;
    eventType?: "Fixed" | "Optional";
    desc?: string;
  }[] = [];
  let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
  let current: boolean = false;

  for (let index = 0; index < 42; index++) {
    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + index);
    current = tempDate.getDate() == 1 ? !current : current;
    let holiday = emidsHolidays.find(
      (item) => item.date.toDateString() === tempDate.toDateString()
    );
    dates.push({
      date: tempDate,
      current: current,
      eventType: holiday?.type,
      desc: holiday?.desc,
    });
  }

  return (
    <div className="grid grid-cols-7 text-sm">
      {dates.map((item, key) => (
        <Day
          key={key}
          date={item.date}
          current={item.current}
          eventType={item.eventType}
          desc={item.desc}
        ></Day>
      ))}
    </div>
  );
};

const Day: React.FC<{
  date: Date;
  current: boolean;
  eventType?: "Fixed" | "Optional";
  desc?: string;
}> = ({ date, current, eventType, desc }) => {
  const today: boolean = new Date().toDateString() === date.toDateString();
  const isWeekend: boolean = date.getDay() === 0 || date.getDay() === 6;
  return (
    <div
      className={clsx("text-center", {
        "dark:bg-indigo-300/75 bg-yellow-300 outline dark:outline-indigo-700 outline-2":
          today,
        "dark:hover:bg-slate-500/50": current && !isWeekend,
        "hover:bg-blue-300": current,
        "dark:text-slate-500/50 text-slate-700/50": !current,
        "dark:bg-teal-300/50 bg-green-500/50": eventType === "Fixed",
        "dark:bg-teal-300/70 bg-green-700/50": eventType === "Optional",
        "dark:bg-slate-700/50 bg-red-500/50": isWeekend,
      })}
    >
      {date.toLocaleDateString("en-IN", { day: "2-digit" })}
    </div>
  );
};

const Footer: React.FC = () => {
  return <div className="p-2">Footer</div>;
};

function getHolidays() {
  /*  const holidays = await fs.readFile(process.cwd() + "mock-data/holidays.json", "utf8");
  return holidays; */
  const holidays: { type: "Fixed" | "Optional"; date: Date; desc: string }[] = [
    { type: "Fixed", date: new Date(2024, 0, 1), desc: "New Year" },
    { type: "Fixed", date: new Date(2024, 0, 26), desc: "Republic Day" },
    { type: "Optional", date: new Date(2024, 1, 26), desc: "Rest Day" },
  ];
  return holidays;
}

export default Calendar;
