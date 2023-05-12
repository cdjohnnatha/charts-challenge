import { TimeType } from '../../types';

export const secondsToMinutes = (value: number): number => value / 60;
export const hourToMinutes = (value: number): number => value * 60;
export const minutesToSeconds = (value: number): number => value * 60;

export const minutesToHours = (value: number): number => value / 60;

export const formatDecimalHourToHHMM = (decimalHours: number): string => {
  const n = new Date(0, 0);
  n.setMinutes(+Math.round(decimalHours * 60));
  const hours = n.getHours();
  const minutes = n.getMinutes();
  return `${hours}h:${minutes}min`;
};

export const roundDecimals = (value: number, qtyDecimals?: number): number => {
  const [digits, decimals] = `${value}`.split('.');
  let formattedNumber = parseInt(digits);

  if (decimals) {
    const decimalsFormatted = decimals.substring(0, qtyDecimals || 2);
    formattedNumber = parseFloat(`${digits}.${decimalsFormatted}`);
  }

  return formattedNumber;
};

const toMinutes = (from: TimeType, value: number): number => {
  if (from === 'hours') {
    return hourToMinutes(value);
  }

  if (from === 'secs') {
    return secondsToMinutes(value);
  }

  return value;
};

const toHours = (from: TimeType, value: number): number => {
  if (from === 'minutes') {
    return minutesToHours(value);
  }

  if (from === 'secs') {
    return value / 3600;
  }

  return value;
};

const toSeconds = (from: TimeType, value: number): number => {
  if (from === 'minutes') {
    return minutesToSeconds(value);
  }

  if (from === 'hours') {
    return minutesToSeconds(hourToMinutes(value));
  }

  return value;
};

export const tranformFromTypeToTime = (from: TimeType, to: TimeType, value: number): number => {
  switch (to) {
    case 'hours': {
      const qtyDecimals = from === 'secs' ? 3 : 2;
      return roundDecimals(toHours(from, value), qtyDecimals);
    }

    case 'minutes': {
      return roundDecimals(toMinutes(from, value));
    }

    case 'secs': {
      return roundDecimals(toSeconds(from, value), 3);
    }
  }
};
