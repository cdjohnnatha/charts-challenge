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

      case 'notFound': {
        return res(ctx.delay(1000), ctx.status(404));
      }

      case 'internalError': {
        return res(ctx.delay(1000), ctx.status(500));
      }

      default: {
        return res(ctx.status(200), ctx.json(mockDataApi));
      }
    }
  }),
];
