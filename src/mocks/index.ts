import { MockedRequest } from 'msw';

function logUnhandledMockReq(req: MockedRequest) {
  // eslint-disable-next-line no-console
  console.log('Found an unhandled %s request to %s', req.method, req.url.href);
}

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./browser');
  worker.start({ onUnhandledRequest: (req: MockedRequest) => logUnhandledMockReq(req) });
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require('./server');
  server.listen({
    onUnhandledRequest: (req: MockedRequest) => {
      logUnhandledMockReq(req);
    },
  });
}

export {};
