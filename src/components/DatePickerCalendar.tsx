import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerCalendarProps {
  selectedDate: string;
  onChange: (date: string) => void;
  minDate?: string;
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({ 
  selectedDate, 
  onChange,
  minDate = new Date().toISOString().split('T')[0]
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedDate) {
      return new Date(selectedDate);
    }
    return new Date();
  });
  
  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.date-picker-calendar') && showCalendar) {
        setShowCalendar(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);
  
  // Get days in month (all days including those from prev/next months to fill the grid)
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week of the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    // Total days in month
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add days from previous month to fill the first row
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Add days from next month to complete the grid (6 rows of 7 days = 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };
  
  // Prev month handler
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Next month handler
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Check if a date is the selected date
  const isSelectedDate = (date: Date) => {
    return formatDate(date) === selectedDate;
  };
  
  // Check if a date is disabled (before min date)
  const isDisabledDate = (date: Date) => {
    return formatDate(date) < minDate;
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDisabledDate(date)) return;
    
    onChange(formatDate(date));
    setShowCalendar(false);
  };
  
  // Format the date for display in the input
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Day of week headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="relative date-picker-calendar">
      {/* Input field with calendar icon */}
      <div className="relative">
        <input
          type="text"
          value={formatDisplayDate(selectedDate)}
          placeholder="Select a date"
          onClick={() => setShowCalendar(!showCalendar)}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent cursor-pointer"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <CalendarIcon size={18} />
        </div>
      </div>
      
      {/* Hidden native date input for accessibility and mobile support */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        className="sr-only"
        aria-label="Select date"
      />
      
      {/* Calendar dropdown */}
      {showCalendar && (
        <div className="absolute z-10 mt-1 p-4 bg-white rounded-lg shadow-xl border border-gray-200 w-[300px]">
          {/* Month navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            
            <h3 className="font-medium">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map(({ date, isCurrentMonth }, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                disabled={isDisabledDate(date)}
                className={`
                  h-9 w-9 flex items-center justify-center rounded-full text-sm
                  ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                  ${isSelectedDate(date) ? 'bg-[#F59E0B] text-white font-medium' : ''}
                  ${isDisabledDate(date) ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}
                `}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
          
          {/* Today button */}
          <div className="mt-4 text-right">
            <button
              onClick={() => handleDateSelect(new Date())}
              disabled={isDisabledDate(new Date())}
              className="text-sm text-[#F59E0B] font-medium hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerCalendar; 