import { Context, Next } from 'koa'

const logger = async (ctx: Context, next: Next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}

export default logger