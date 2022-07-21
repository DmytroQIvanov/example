type date = "numeric" | "2-digit";
export let dateOptions: {
  year: date;
  month: date;
  day: date;
  hour: date;
  minute: date;
  timeZone: string;
} = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",

  timeZone: "America/Los_Angeles",
};
