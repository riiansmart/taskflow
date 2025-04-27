import React from 'react';

interface DateTimeSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ value, onChange }) => {
  // Derive current selections
  const current = value || new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const day = current.getDate();
  const hour24 = current.getHours();
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  const minute = current.getMinutes();

  // Generate dropdown options
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 6}, (_, i) => currentYear + i);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({length: daysInMonth}, (_, i) => i + 1);
  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = Array.from({length: 12}, (_, i) => i * 5);
  const ampmArr = ['AM', 'PM'];

  // Handle field changes
  const handleFieldChange = (field: string, val: number | string) => {
    let newYear = year;
    let newMonth = month;
    let newDay = day;
    let newHour = hour12;
    let newMinute = minute;
    let newAmPm = ampm;
    switch (field) {
      case 'year': newYear = Number(val); break;
      case 'month': newMonth = Number(val); break;
      case 'day': newDay = Number(val); break;
      case 'hour': newHour = Number(val); break;
      case 'minute': newMinute = Number(val); break;
      case 'ampm': newAmPm = String(val); break;
    }
    // Convert 12h to 24h
    let adjustedHour = newHour;
    if (newAmPm === 'PM' && newHour < 12) adjustedHour = newHour + 12;
    if (newAmPm === 'AM' && newHour === 12) adjustedHour = 0;
    // Create new Date
    const updated = new Date(newYear, newMonth, newDay, adjustedHour, newMinute);
    onChange(updated);
  };

  return (
    <div className="date-time-selector">
      <select className="form-select" value={month} onChange={e => handleFieldChange('month', Number(e.target.value))}>
        {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
      </select>
      <select className="form-select" value={day} onChange={e => handleFieldChange('day', Number(e.target.value))}>
        {days.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select className="form-select" value={year} onChange={e => handleFieldChange('year', Number(e.target.value))}>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <select className="form-select" value={hour12} onChange={e => handleFieldChange('hour', Number(e.target.value))}>
        {hours.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
      <select className="form-select" value={minute} onChange={e => handleFieldChange('minute', Number(e.target.value))}>
        {minutes.map(m => <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>)}
      </select>
      <select className="form-select" value={ampm} onChange={e => handleFieldChange('ampm', e.target.value)}>
        {ampmArr.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
};

export default DateTimeSelector; 