export default function addDaysToToday(days: number):Date{
    let date = new Date();
  
    return new Date(date.setDate(date.getDate() + days));
  }