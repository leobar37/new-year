/**
 * Numerology calculation utilities for Personal Year Number
 * 
 * Formula: Personal Year = Day + Month + Current Year (reduced to single digit)
 * Example: March 15 in 2026 = 15 + 3 + 2026 = 2044 → 2+0+4+4 = 1
 */

const CURRENT_YEAR = 2026;

/**
 * Reduces a number to a single digit by summing its digits
 * @param num - Number to reduce
 * @returns Single digit (1-9)
 */
export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}

/**
 * Calculates the Personal Year Number for 2026
 * @param birthDay - Day of birth (1-31)
 * @param birthMonth - Month of birth (1-12)
 * @returns Personal Year Number (1-9)
 */
export function calculatePersonalYear(birthDay: number, birthMonth: number): number {
  const sum = birthDay + birthMonth + CURRENT_YEAR;
  return reduceToSingleDigit(sum);
}

/**
 * Validates a birth date
 * @param day - Day of birth
 * @param month - Month of birth
 * @param year - Year of birth
 * @returns Object with validation result and error message
 */
export function validateBirthDate(
  day: number,
  month: number,
  year: number
): { valid: boolean; error?: string } {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 120; // Max age 120 years
  const maxYear = currentYear - 10; // Min age 10 years

  if (month < 1 || month > 12) {
    return { valid: false, error: 'Mes inválido' };
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { valid: false, error: 'Día inválido para el mes seleccionado' };
  }

  if (year < minYear || year > maxYear) {
    return { valid: false, error: 'Debes tener entre 10 y 120 años' };
  }

  return { valid: true };
}

/**
 * Formats a date for display
 * @param day - Day
 * @param month - Month
 * @param year - Year
 * @returns Formatted date string
 */
export function formatBirthDate(day: number, month: number, year: number): string {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${day} de ${months[month - 1]} de ${year}`;
}

/**
 * Gets the calculation breakdown for display
 * @param birthDay - Day of birth
 * @param birthMonth - Month of birth
 * @returns Calculation steps for UI display
 */
export function getCalculationBreakdown(birthDay: number, birthMonth: number): {
  sum: number;
  steps: string[];
  result: number;
} {
  const sum = birthDay + birthMonth + CURRENT_YEAR;
  const steps: string[] = [];
  
  steps.push(`${birthDay} + ${birthMonth} + ${CURRENT_YEAR} = ${sum}`);
  
  let current = sum;
  while (current > 9) {
    const digits = String(current).split('');
    const newSum = digits.reduce((s, d) => s + parseInt(d, 10), 0);
    steps.push(`${digits.join(' + ')} = ${newSum}`);
    current = newSum;
  }
  
  return {
    sum,
    steps,
    result: current,
  };
}
