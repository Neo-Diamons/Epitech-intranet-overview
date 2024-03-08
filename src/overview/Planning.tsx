import React, { useEffect } from "react";
import { CaretLeft, CaretRight } from "@carbon/icons-react";

function getWeekDay(monday: Date, x: number) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const offset = pastNDays(monday, x);
  return `${days[x]} ${offset.getDate()}/${offset.getMonth() + 1}`;
}

function getHourMinute(date: string) {
  const d = new Date(date);
  return `${d.getHours() == 0 ? 24 : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
}

function getPos(date: string) {
  const d = new Date(date);
  return ((d.getHours() - 8) * 60 + d.getMinutes()) / 15;
}

function getColor(type: string) {
  switch (type) {
  case "tp":
    return "bg-purple-500";
  case "rdv":
    return "bg-orange-500";
  case "class":
    return "bg-blue-500";
  case "other":
    return "bg-blue-700";
  default:
    return "bg-gray-200";
  }
}

function getMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function pastNDays(day: Date, n: number) {
  const dayCopy = new Date(day);
  return new Date(dayCopy.setTime(dayCopy.getTime() + (1000 * 60 * 60 * 24 * n)));
}

function Planning() {
  const [Monday, setMonday] = React.useState(getMonday());
  const [days, setDays] = React.useState([[], [], [], [], [], [], []]);

  useEffect(() => {
    async function fetchData() {
      const start = Monday.toISOString().split("T")[0];
      const end = pastNDays(Monday, 6).toISOString().split("T")[0];
      const reponse = fetch(`https://intra.epitech.eu/planning/load?format=json&start=${start}&end=${end}`);
      const data = await (await reponse).json();
      const tmp: any[] = [[], [], [], [], [], [], []];

      data.forEach((element: any) => {
        if (element.event_registered !== "registered")
          return;

        const day = (new Date(element.start).getDay() - 1) % 7;
        tmp[day].push(element);
      });
      setDays(tmp);
    }

    fetchData();
  }, [Monday]);

  return (
    <>
      <h1>Schedule</h1>
      <p className="text-sm text-gray-500">*Only registered events are shown</p>

      <div className="grid grid-cols-3 gap-4 w-full"
        style={{ gridTemplateColumns: "auto 1fr auto" }}
      >
        <button className="w-10" onClick={() => {setMonday(pastNDays(Monday, -7));}}>
          <CaretLeft size={32} className="fixed top-[50%] -translate-y-1/2 bg-[#8d8d8d3d] h-36 rounded-xl" />
        </button>
        <div className="grid grid-cols-7 gap-4 my-8">
          {days.map((day: any, index: number) => (
            <div key={index}>
              <h4 className="text-center">{getWeekDay(Monday, index)}</h4>
              <div className="grid grid-rows-60 gap-4 my-4">
                {day.map((element: any, index: number) => (
                  <div key={index} className={`border-gray-300 rounded-lg overflow-hidden ${getColor(element.type_code)}`}
                    style={{ gridRow: `${getPos(element.start)} / ${getPos(element.end)}` }}
                  >
                    <p className="bg-black bg-opacity-15 p-2 text-sm">{getHourMinute(element.start)} - {getHourMinute(element.end)}</p>
                    <p className="font-bold p-2 text-sm">{element.acti_title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="w-10" onClick={() => {setMonday(pastNDays(Monday, 7));}}>
          <CaretRight size={32} className="fixed top-[50%] -translate-y-1/2 bg-[#8d8d8d3d] h-36 rounded-xl" />
        </button>
      </div>
    </>
  );
}

export default Planning;
