function reversestr(str) {
    
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedstr = reverseListOfChars.join('');

    return reversedstr;
}

function isPalindrome(str) {
     
    var reverse = reversestr(str);
    return str === reverse;
}

    function convertDateToString(date) {
    var dateStr = {day: '', month: '', year: ''};
    
    if(date.day < 10) {
        dateStr.day = '0' + date.day;
    }else {
        dateStr.day = date.day.toString();
    }

    if(date.month < 10) {
        dateStr.month = '0' + date.month;
    }else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    
    var dateStr = convertDateToString(date);
 
 var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
 var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
 var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
 var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
 var MMDDYY = dateStr.month + dateStr.day + dateStr.year.slice(-2);
 var YYMMDD = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
}



function checkPalindromeForAllFormats(date) {
    var listOfPalindromes = getAllDateFormats(date)
    
    var flag = false;

    for(var i = 0; i < listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;

}

 function isLeapYear(year) {
   if(year%400 === 0) {
    return true;
   }
   if(year%100 === 0){
    return false;
   }
   if(year%4 === 0) {
    return true;
   }
   return false;
 }


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
     
    if(month === 2) {
        if(isLeapYear(year)){
            if(day > 29){
                day = 1
                month = month + 1
    
            }
        }else {
            if(day > 28){
                day = 1
                month = month + 1
            }
        }
    }else {
       if(day > daysInMonth[month-1]){
        day = 1
        month = month + 1
       }
    }

    if(month > 12) {
        month = 1
        year = year + 1
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var ctr = 0;

    var nextDate = getNextDate(date);

     while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate)
        if(isPalindrome) {
            break;
        }else {
            nextDate = getNextDate(nextDate)
        }
     }

     return [ctr, nextDate]
 }

 const dateInput = document.querySelector("#date-input");
 const showBtn = document.querySelector("#submit-btn");
 const outputEl = document.querySelector("#output");

function clickHandler(e) {
var bdayStr = dateInput.value;
if(bdayStr !== '') {
    var listOfDates = bdayStr.split('-');
    var date = {
        day: Number(listOfDates[2]),
        month: Number(listOfDates[1]),
        year: Number(listOfDates[0])
    } 
    var isPalindrome = checkPalindromeForAllFormats(date)
    if(isPalindrome){
        outputEl.innerText = "yay! your birthday is palindrome"
    }else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
        
        outputEl.innerText ="next palindrome date is " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year  + "you missed it by" + ctr + " days"
    }
    
}
}

 showBtn.addEventListener("click", clickHandler)

