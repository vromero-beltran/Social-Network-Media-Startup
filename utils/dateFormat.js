const addDateSuffix = date => {
    let dateSuffix = date.toString();
    const lastChar = dateSuffix.charAt(dateSuffix.length - 1);

    if (lastChar === '1' && dateSuffix !== '11') {
        dateSuffix = `${dateSuffix}st`;
    } else if (lastChar === '2' && dateSuffix !== '12') {
        dateSuffix = `${dateSuffix}nd`;
    } else if (lastChar === '3' && dateSuffix !== '13') {
        dateSuffix = `${dateSuffix}rd`;
    } else {
        dateSuffix = `${dateSuffix}th`;
    }

    return dateSuffix;
};

module.exports = (
    timestamp,
    {
        monthLength = 'short', dateSuffix = true
    } = {}
) => {
    let months;

    if (monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    } else {
        months = {
            0: 'January',
            1: 'Febuary',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'Augest',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
    const dayOfMonth = dateObj.getDate();
    let year = dateObj.getFullYear();

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dayOfMonth);
    }

    let hour;

    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }

    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObj.getMinutes();

    let periodOfDay;

    if (dateObj.getHours() >= 12) {
        periodOfDay = 'pm';
    } else {
        periodOfDay = 'am';
    }

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
}