import Link from "next/link";
import getConfig from "next/config";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { Button, Icon, Tabs } from "antd";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import LRU from "lru-cache";
import Repo from "../components/Repo";
import { setCacheArray } from "../lib/repo-basic-cache";
const api = require("../lib/api");
const { isServer } = require("../utils");

const { publicRuntimeConfig } = getConfig();

// 10分钟内没有使用过cache数据就会删除
// 没有使用过是指没有调用过cache.get()方法
const cache = new LRU({
  maxAge: 1000 * 60 * 10,
});

const IndexDemo = () => {
  useEffect(() => {
    axios.get("/api/user/info").then((res) => {
      console.log(res, "/api/user/info---res");
    });
  }, []);
  return (
    <>
      <p>Index</p>
      <Link href="/next-demo">
        <a>to view next-demo</a>
      </Link>
      <hr />
      <Link href="/hooks-demo">
        <a>to view hooks-demo</a>
      </Link>
      <hr />
      <Link href="/redux-demo">
        <a>to view redux-demo</a>
      </Link>
      <hr />
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  );
};

const Index = ({ userRepos, userStarred, user, router }) => {
  const tabKey = router.query.key || "1";

  const handleChangeTab = useCallback(
    (activeKey) => {
      router.replace(`/?key=${activeKey}`);
    },
    [router]
  );

  useEffect(() => {
    if (!isServer) {
      if (userRepos) {
        cache.set("userRepos", userRepos);
      }
      if (userStarred) {
        cache.set("userStarred", userStarred);
      }
    }
  }, [userRepos, userStarred]);

  useEffect(() => {
    // 只有在客户端才增新的cache
    if (!isServer) {
      setCacheArray(userRepos);
      setCacheArray(userStarred);
    }
  }, [userRepos, userStarred]);

  if (!user || !user.id) {
    return (
      <div className="root">
        <p>亲，你还没有登录， 请去登录吧</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avarat" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="mail">
          <Icon type="mail" style={{ marginRight: 8 }}></Icon>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>
      <div className="user-repos">
        <Tabs
          defaultActiveKey={tabKey}
          animated={false}
          onChange={handleChangeTab}
        >
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStarred.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-szie: 16;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
        .user-repos {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {};
  }

  if (!isServer) {
    if (cache.get("userRepos") && cache.get("userStarred")) {
      return {
        userRepos: cache.get("userRepos"),
        userStarred: cache.get("userStarred"),
      };
    }
  }

  let userReposResq = await api.request(
    {
      url: "/user/repos",
    },
    ctx.req,
    ctx.res
  );

  let userStarredResq = await api.request(
    {
      url: "/user/starred",
    },
    ctx.req,
    ctx.res
  );

  return {
    userRepos: userReposResq.data,
    userStarred: userStarredResq.data,
  };
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Index));
