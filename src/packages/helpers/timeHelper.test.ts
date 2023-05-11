import { tranformFromTypeToTime } from './timeHelper';

describe('tranformFromTypeToTime', () => {
  describe('Convert from hour', () => {
    it('convert from 2 hour to 120 min', () => {
      const value = tranformFromTypeToTime('hours', 'minutes', 2);

      expect(value).toBe(120);
    });

    it('convert from 1 hour to secs', () => {
      const value = tranformFromTypeToTime('hours', 'secs', 1);

      expect(value).toBe(3600);
    });
  });

  describe('Convert from minutes', () => {
    it('convert from 90 min to hours', () => {
      const value = tranformFromTypeToTime('minutes', 'hours', 90);

      expect(value).toBe(1.5);
    });

    it('convert from 2 min to secs', () => {
      const value = tranformFromTypeToTime('minutes', 'secs', 2);

      expect(value).toBe(120);
    });
  });

  describe('Convert from secs', () => {
    it('convert from 60 secs to min', () => {
      const value = tranformFromTypeToTime('secs', 'minutes', 60);

      expect(value).toBe(1);
    });

    it('convert from 60 secs to hours', () => {
      const value = tranformFromTypeToTime('secs', 'hours', 60);

      expect(value).toBe(0.016);
    });
  });
});
