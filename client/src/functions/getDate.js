import Edison_Speak from '../partials/Speak';

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const ordinal = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

const parseDate = (currentDate) => {
    const day = dayMap[currentDate.getDay()];
    const date = ordinal(currentDate.getDate());
    const month = monthMap[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const todayDate = { day, date, month, year };
    return todayDate;
}

const todayDate = (type) => {
    const data = parseDate(new Date());
    let res;
    if (type === "DATE")
        res = `Today is ${data.day}, the ${data.date} of ${data.month}, ${data.year}`;
    else
        res = `Today is ${data.day}`;
    Edison_Speak.say(res);
};

export default todayDate;