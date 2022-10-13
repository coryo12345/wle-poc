import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export function relativeFromNow(date: string) {
  const utcAdj = date + ' -00:00';
  return dayjs(utcAdj, 'YYYY-MM-DD HH-mm-ss.SSS Z').fromNow();
}
