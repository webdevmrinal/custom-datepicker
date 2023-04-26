import {
    format,
    getUnixTime,
    fromUnixTime,
    addMonths,
    subMonths,
    startOfWeek,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay
  } from "date-fns";
  
  const datePickerButton = document.querySelector(".date-picker-button");
  const datePicker = document.querySelector(".date-picker");
  const datePickerHeaderText = document.querySelector(".current-month");
  const prevMonthButton = document.querySelector(".prev-month-button");
  const nextMonthButton = document.querySelector(".next-month-button");
  const datesGrid = document.querySelector(".date-picker-grid-dates");
  let currentDate = new Date();
  
  datePickerButton.addEventListener("click", () => {
    datePicker.classList.toggle("show");
    const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
    currentDate = selectedDate;
    setupDatePicker(selectedDate);
  });
  
  function setDate(date) {
    datePickerButton.innerText = format(date, "MMMM do, yyyy");
    datePickerButton.dataset.selectedDate = getUnixTime(date);
  }
  
  setDate(new Date());
  
  function setupDatePicker(selectedDate) {
    datePickerHeaderText.innerText = format(currentDate, "MMMM - yyyy");
    setupDates(selectedDate);
  }
  
  function setupDates(selectedDate) {
    const firstWeekStart = startOfWeek(startOfMonth(currentDate));
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate));
    const eachDay = eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekEnd
    });
    datesGrid.innerHTML = "";
  
    eachDay.forEach((date) => {
      // node.innerText = format(eachDay[index], "d")
      const dateElement = document.createElement("button");
      dateElement.classList.add("date");
      if (!isSameMonth(date, currentDate)) {
        dateElement.classList.add("date-picker-other-month-date");
      }
      if (isSameDay(date, selectedDate)) {
        dateElement.classList.add("selected");
      }
      dateElement.innerText = date.getDate();
      datesGrid.appendChild(dateElement);
  
      dateElement.addEventListener("click", () => {
        setDate(date);
        // selectedDate.classList.remove("selected");
        // dateElement.classList.remove("selected");
        // dateElement.classList.add("selected");
        datePicker.classList.remove("show");
      });
    });
  }
  
  nextMonthButton.addEventListener("click", () => {
    const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
    currentDate = addMonths(currentDate, 1);
    setupDatePicker(selectedDate);
  });
  prevMonthButton.addEventListener("click", () => {
    const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
    currentDate = subMonths(currentDate, 1);
    setupDatePicker(selectedDate);
  });
  