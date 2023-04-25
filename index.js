const months = [31,28,31,30,31,30,31,31,30,31,30,31];
var flag=0;
function ageCalculate(){
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth,birthDate,birthYear;
    let birthDetails = {
        date:inputDate.getDate(),
        month:inputDate.getMonth()+1,
        year:inputDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate();
    console.log(birthDetails.date,birthDetails.month,months[birthDetails.month-1],currentMonth);
    leapChecker(currentYear);
    if(birthDetails.date == currentDate && birthDetails.month == currentMonth){
        flag = 1;
    }
    if(
        birthDetails.year > currentYear ||
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear) ||(birthDetails.date > months[birthDetails.month-1])
    ){
        displayResult("-","-","-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
        birthMonth = currentMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if(currentDate >= birthDetails.date){
        birthDate = currentDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate,bMonth,bYear){
    if(isNaN(bDate)){
        document.getElementById("alerts").innerText = "Invalid date of birth";
        document.getElementById("years").textContent = "-";
        document.getElementById("months").textContent = "-";
        document.getElementById("days").textContent = "-";
    }
    else{
        document.getElementById("alerts").innerText = "";
        document.getElementById("years").textContent = bYear;
        document.getElementById("months").textContent = bMonth;
        document.getElementById("days").textContent = bDate;
    }
    if(flag == 1){
        document.getElementById("alerts").innerText = "Happy BirthDay🎉";
        document.getElementById("years").textContent = bYear;
        document.getElementById("months").textContent = bMonth;
        document.getElementById("days").textContent = bDate;
    }
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}