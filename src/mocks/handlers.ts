import { rest } from 'msw';
import mockDataApi from './mockDataApi.json';

export const handlers = [
  // Handles a GET /user request
  rest.get('http://localhost:3000/chart-api', (req, res, ctx) => {
    const h = req.url.searchParams.get('h');
    switch (h) {
      case 'emptyData': {
        return res(ctx.delay(1500), ctx.status(200), ctx.json({ data: [] }));
      }

      default: {
        return res(ctx.status(200), ctx.json(mockDataApi));
      }
    }
  }),
];
