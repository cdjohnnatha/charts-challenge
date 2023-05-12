import { rest } from 'msw';
import mockDataApi from './mockDataApi.json';

export const handlers = [
  // Handles a GET /user request
  rest.get('http://localhost:3000/chart-api', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.log('called');
    return res(ctx.status(200), ctx.json(mockDataApi));
  }),
];
