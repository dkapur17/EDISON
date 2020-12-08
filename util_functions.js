const parseTime = (time, location = null) => {
    let hours = time.getHours();
    let mins = time.getMinutes();
    let period = hours < 12 ? "AM" : "PM";
    hours %= 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? `0${mins.toString()}` : mins.toString();
    if (!location)
        return `The time is ${hours}:${mins}${period}`;
    else
        return `The time in ${location} is ${hours}:${mins}${period}`;
};

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
    const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = dayMap[currentDate.getDay()];
    const date = ordinal(currentDate.getDate());
    const month = monthMap[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const todayDate = { day, date, month, year };
    return todayDate;
}

module.exports = { parseTime, parseDate };