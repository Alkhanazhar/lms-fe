
export function getFormattedDate() {
    const date = new Date();

    // Days and months arrays
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return "th"; // Handles 11th to 19th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    return `${dayName}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}
