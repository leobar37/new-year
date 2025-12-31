import { Calendar, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const MONTHS = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

function getDaysInMonth(month: number, year: number): number {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate();
}

export function DatePicker({ value, onChange, error }: DatePickerProps) {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 120;
  const maxYear = currentYear - 10;

  // Parse current value
  const [year, month, day] = useMemo(() => {
    if (!value) return [0, 0, 0];
    const parts = value.split('-').map(Number);
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
  }, [value]);

  // Generate years array (descending - most recent first)
  const years = useMemo(() => {
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) {
      arr.push(y);
    }
    return arr;
  }, [minYear, maxYear]);

  // Generate days based on selected month/year
  const days = useMemo(() => {
    const daysCount = getDaysInMonth(month, year || maxYear);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  }, [month, year, maxYear]);

  const handleChange = (type: 'day' | 'month' | 'year', val: number) => {
    let newDay = day;
    let newMonth = month;
    let newYear = year;

    if (type === 'day') newDay = val;
    if (type === 'month') newMonth = val;
    if (type === 'year') newYear = val;

    // Adjust day if it exceeds max days in the new month
    const maxDays = getDaysInMonth(newMonth, newYear || maxYear);
    if (newDay > maxDays) newDay = maxDays;

    // Only emit if all values are set
    if (newDay && newMonth && newYear) {
      const formatted = `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`;
      onChange(formatted);
    } else if (newDay || newMonth || newYear) {
      // Partial value - store it
      const formatted = `${newYear || ''}-${newMonth ? String(newMonth).padStart(2, '0') : ''}-${newDay ? String(newDay).padStart(2, '0') : ''}`;
      onChange(formatted);
    }
  };

  const selectClass = `
    w-full appearance-none bg-white/10 border border-white/20 rounded-xl 
    pl-4 pr-10 py-3.5
    text-white text-base font-medium text-center
    focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400
    transition-all cursor-pointer
    [&>option]:bg-[#1a1a2e] [&>option]:text-white [&>option]:text-left
  `;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white/80 flex items-center gap-2">
        <Calendar size={16} className="text-yellow-400" />
        Fecha de Nacimiento
      </label>

      <div className="grid grid-cols-3 gap-3">
        {/* Day */}
        <div className="relative">
          <select
            value={day || ''}
            onChange={(e) => handleChange('day', Number(e.target.value))}
            className={selectClass}
            aria-label="Día"
          >
            <option value="" disabled>Día</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        </div>

        {/* Month */}
        <div className="relative">
          <select
            value={month || ''}
            onChange={(e) => handleChange('month', Number(e.target.value))}
            className={selectClass}
            aria-label="Mes"
          >
            <option value="" disabled>Mes</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        </div>

        {/* Year */}
        <div className="relative">
          <select
            value={year || ''}
            onChange={(e) => handleChange('year', Number(e.target.value))}
            className={selectClass}
            aria-label="Año"
          >
            <option value="" disabled>Año</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}
