// types/schedule.ts
export type JobEntry = {
    title: string;
    hours: string;
    clock: string;
  };
  
  export type ScheduleItem = {
    date: string;
    entries: JobEntry[];
  };
  