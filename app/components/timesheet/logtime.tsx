import React, { useState, useEffect } from "react";
import axios from "axios";
import IAllocation from "@/models/allocation"; // Import the interface for allocation data
<<<<<<< HEAD
import Button from "../button";
import { getDate } from "date-fns";
import { date } from "zod";
=======
import Button from "@/app/components/ui/button";
import { getDate } from "date-fns";
import { date } from "zod";
import { logTime } from "@/app/lib/timesheetActions";
import { TimeSheet } from "@/models/TimeSheet";
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546

interface effort {
  date: Date;
  effort: number;
}

interface Task {
  taskId?: string;
  taskName: string;
  status: boolean;
  efforts: Array<effort>;
}

interface TimeSheetProps {
  currentWeek: Date;
}

const LogTime: React.FC<TimeSheetProps> = ({ currentWeek }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [hours, setHours] = useState<number[][]>([]);
<<<<<<< HEAD
  const[dayindexnew,setDayindexnew] =useState<number>(1)// State to store hours for each task
=======
  const [dayindexnew, setDayindexnew] = useState<number>(1); // State to store hours for each task
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546

  useEffect(() => {
    const getAllocations = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          data: IAllocation[];
        }>("/api/Gajanan/tasks"); // Fetch allocation data
        const allocationData = response.data.data; // Extract the allocation data array
        if (Array.isArray(allocationData)) {
          const filteredTasks = allocationData
            .filter((allocation) => allocation.status === "in progress") // Filter tasks with status "in progress"
            .map((allocation) => ({
<<<<<<< HEAD
              taskId:allocation._id,
=======
              taskId: allocation._id,
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
              taskName: allocation.task_desc || "",
              status: false,
              efforts: [],
            })); // Map allocation data to Task interface
          setTasks(filteredTasks); // Set tasks state
          setHours(
            Array.from({ length: filteredTasks.length }, () =>
              Array(7).fill(0),
            ),
          ); // Initialize hours state with 0 values
        } else {
          console.error("Response data is not an array:", allocationData);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getAllocations();
  }, []); // Fetch tasks on component mount

  // Function to get the current week's weekdays
  const getWeekdays = () => {
    const weekStart = new Date(currentWeek);
<<<<<<< HEAD
   
=======

>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
    const weekdaysArr: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekdaysArr.push(day);
    }
<<<<<<< HEAD
    
=======

>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
    return weekdaysArr;
  };

  // Function to handle text input change
  const handleTextChange = (
    taskIndex: number,
    dayIndex: number,
    value: number,
<<<<<<< HEAD
    day:Date
  ) => {
   
   const newtask=[...tasks];
   console.log("day",day);
   console.log("index",taskIndex);
   
   const newtaskindex=newtask[taskIndex].efforts.findIndex((effort)=>
    
      effort.date.getDate()===day.getDate() && 
      effort.date.getMonth()===day.getMonth()&&
      effort.date.getFullYear()===day.getFullYear()
   )
   console.log("indexfind",newtaskindex)
 if(newtaskindex === -1)
 {
     newtask[taskIndex].efforts.push(
        {date:day,
        effort:value
        }

     )
 }
 else{
    setDayindexnew(newtaskindex);
    
    newtask[taskIndex].efforts[newtaskindex].effort=value
 }
 console.log("newtask",newtask);
 setTasks(newtask);
 
 console.log("task",tasks);
=======
    day: Date,
  ) => {
    const newtask = [...tasks];
    console.log("day", day);
    console.log("index", taskIndex);

    const newtaskindex = newtask[taskIndex].efforts.findIndex(
      (effort) =>
        effort.date.getDate() === day.getDate() &&
        effort.date.getMonth() === day.getMonth() &&
        effort.date.getFullYear() === day.getFullYear(),
    );
    console.log("indexfind", newtaskindex);
    if (newtaskindex === -1) {
      newtask[taskIndex].efforts.push({ date: day, effort: value });
    } else {
      setDayindexnew(newtaskindex);

      newtask[taskIndex].efforts[newtaskindex].effort = value;
    }
    console.log("newtask", newtask);
    setTasks(newtask);

    console.log("task", tasks);
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (taskIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      status: !newTasks[taskIndex].status,
    };
    setTasks(newTasks);
  };

  // Function to submit logs
<<<<<<< HEAD
  const submitLog = () => {
=======
  const submitLog = async () => {
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
    // const updatedTasks = tasks.map((task, taskIndex) => ({
    //   ...task,
    //   efforts: task.efforts.concat(
    //     getWeekdays().map((day, dayIndex) => ({
    //       date: day,
    //       effort: hours[taskIndex]?.[dayIndex] ?? 0,
    //     })),
    //   ),
    // }));
    // setTasks(updatedTasks);
    // Here you can send the updated tasks to your backend API if needed
    console.log(tasks); // Log updated tasks with hours
<<<<<<< HEAD
=======
    
    //let updatedTasks = await logTime(tasks);
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
  };

  // Function to render column headings
  const renderColumnHeadings = () => {
    const weekDays = getWeekdays();
    return (
      <tr className="border-b bg-blue-400/50 text-center  ">
        <th className="whitespace-nowrap border border-gray-400 px-4  py-2 text-center">
          Task
        </th>
        {weekDays.map((day, index) => (
          <th
            key={index}
            className="whitespace-nowrap border border-gray-400 px-4 py-2 text-center"
          >
            {day.getDate()} {monthNames[day.getMonth()]} <br />{" "}
            {weekdays[day.getDay()]}
          </th>
        ))}
        <th className="whitespace-nowrap border border-gray-400 px-4 py-2 text-center">
          Action
        </th>
      </tr>
    );
  };

  // Function to render task grid
  const renderTaskGrid = () => {
    const weekDays = getWeekdays(); // Get weekdays for the selected week

    return tasks.map((task, taskIndex) => (
      <tr className="border-b text-center" key={task.taskId}>
        <td className="whitespace-nowrap border border-gray-400 px-4 py-2 text-center">
          {task.taskName}
        </td>
        {weekDays.map((day, dayIndex) => (
          <td
            className="whitespace-nowrap border border-gray-400 px-4  py-2 text-center"
            key={dayIndex}
          >
<<<<<<< HEAD
            
            <input
              type="number"
              value={tasks[taskIndex].efforts[dayIndex]?.effort ?? 0 }
              onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                if ( inputValue <= 9) {
                  handleTextChange(taskIndex, dayIndex, inputValue,day);
=======
            <input
              type="number"
              value={tasks[taskIndex].efforts[dayIndex]?.effort ?? 0}
              onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                if (inputValue <= 9) {
                  handleTextChange(taskIndex, dayIndex, inputValue, day);
>>>>>>> 0002e0129ea82778a11c2c99b5c5834ba84a4546
                }
              }}
              className="w-12"
              max="9"
              min="0"
            />
          </td>
        ))}
        <td className="whitespace-nowrap border border-gray-400 px-4  py-2 text-center">
          <input
            type="checkbox"
            checked={task.status || false}
            onChange={() => handleCheckboxChange(taskIndex)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <h2>Time Sheet</h2>
      <table className="w-full text-sm">
        <thead>{renderColumnHeadings()}</thead>
        <tbody>{renderTaskGrid()}</tbody>
      </table>
      <div className="whitespace-nowrap px-4 py-2 text-right ">
        <Button onClick={submitLog}>Submit Tasks</Button>
      </div>
    </div>
  );
};

export default LogTime;
