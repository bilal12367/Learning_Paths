const getDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const reqWeekNames = [...weekNames];
    let week: any = reqWeekNames.shift();
    reqWeekNames.push(week);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const dates = [];
    let day = firstDayOfMonth;

    // Add blank dates from the previous month
    while (day.getDay() !== 1) {
        day.setDate(day.getDate() - 1);
        dates.push({ Date: day.getDate(), Day: reqWeekNames[day.getDay() - 1], IsCurrentMonth: false });
    }

    // Add current month's dates
    while (day <= lastDayOfMonth) {
        dates.push({ Date: day.getDate(), Day: weekNames[day.getDay()], IsCurrentMonth: true });
        day.setDate(day.getDate() + 1);
    }

    // Add blank dates from the next month
    while (dates.length % 7 !== 0) {
        dates.push({ Date: null, Day: reqWeekNames[dates.length % 7], IsCurrentMonth: false });
    }
    console.log(dates)
    return dates;
}

export default getDays