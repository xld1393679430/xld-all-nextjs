const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const Redis = require("ioredis");
const koaBody = require("koa-body");
const atob = require("atob");
const RedisSessionStore = require("./server/session-store");
const auth = require("./server/auth");
const api = require("./server/api");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const redis = new Redis();

// 设置nodejs全局增加一个变量atob
global.atob = atob;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ["xld develop GitHub App"];

  // 使用koa-body获取post请求的数据
  server.use(koaBody());

  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));

  // 配置处理GitHub oauth登录
  auth(server);

  // 调用GitHub接口相关的服务
  api(server);

  // 解决路由映射刷新页面404的问题
  router.get("/next-demo/detail/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/next-demo/detail",
      query: {
        id,
      },
    });
    ctx.response = false;
  });

  router.get("/api/user/info", async (ctx) => {
    const user = ctx.session.userInfo;
    if (!user) {
      ctx.status = 401;
      ctx.body = "Need Login";
    } else {
      ctx.body = user;
      ctx.set("Content-Type", "application/json");
    }
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.response = false;
  });

  server.listen(3000, () => {
    // console.log("Koa server start on 3000");
  });
});
