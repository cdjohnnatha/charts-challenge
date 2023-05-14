import { rest } from 'msw';
import mockDataApi from './mockDataApi.json';

const delayTimes = {
  short: 1000,
  medium: 1500,
};

export const handlers = [
  // Handles a GET /user request
  rest.get('http://localhost:3000/chart-api', (req, res, ctx) => {
    const h = req.url.searchParams.get('h');
    switch (h) {
      case 'emptyData': {
        return res(ctx.delay(delayTimes.medium), ctx.status(200), ctx.json({ data: [] }));
      }

      case 'notFound': {
        return res(ctx.delay(delayTimes.short), ctx.status(404));
      }

      case 'internalError': {
        return res(ctx.delay(delayTimes.short), ctx.status(500));
      }

      case 'successDelayed': {
        return res(ctx.delay(delayTimes.short), ctx.status(200), ctx.json(mockDataApi));
      }

      default: {
        return res(ctx.status(200), ctx.json(mockDataApi));
      }
    }
  }),
];
