import createServer from './src';
import logger from './src/middleware/logger';
import responseTime from './src/middleware/responseTime';

const app = createServer()

// logger
app.use(logger);

// x-response-time
app.use(responseTime);

// response
app.use(async ctx => {
  ctx.body = 'Hello World!'
})

app.listen(8108)