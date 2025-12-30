import React, { useState, useEffect, useRef } from 'react';

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

interface DatePickerProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    minDate?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, minDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const initialDate = selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date();
    const [displayDate, setDisplayDate] = useState(initialDate);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const minDateObj = minDate ? new Date(`${minDate}T00:00:00`) : null;
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        setDisplayDate(selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date());
    }, [selectedDate]);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const changeMonth = (offset: number) => {
        setDisplayDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const handleDateSelect = (day: number) => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        onDateChange(newDate.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    const renderCalendar = () => {
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth();
        const numDays = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);

        const blanks = Array(firstDay).fill(null);
        const days = Array.from({ length: numDays }, (_, i) => i + 1);

        return (
            <div className="absolute top-full mt-2 w-72 bg-surface p-4 rounded-lg shadow-xl z-50 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeftIcon />
                    </button>
                    <div className="font-semibold text-text-primary capitalize">
                        {displayDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                    </div>
                    <button type="button" onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronRightIcon />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-text-secondary font-medium">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                    {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                    {days.map(day => {
                        const currentDate = new Date(year, month, day);
                        const isSelected = selectedDate === currentDate.toISOString().split('T')[0];
                        const isDisabled = minDateObj && currentDate < minDateObj;
                        
                        return (
                            <button
                                type="button"
                                key={day}
                                onClick={() => handleDateSelect(day)}
                                disabled={isDisabled}
                                className={`
                                    w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors
                                    ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary-light'}
                                    ${isSelected ? 'bg-primary text-white font-bold' : 'text-text-primary'}
                                `}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="relative" ref={datePickerRef}>
            <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className={`text-left ${selectedDate ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {selectedDate ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric'}) : 'Selecciona una fecha'}
                </span>
                <CalendarIcon />
            </button>
            {isOpen && renderCalendar()}
        </div>
    );
};

export default DatePicker;
