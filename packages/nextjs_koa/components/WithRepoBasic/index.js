import { useEffect } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import api from "../../lib/api";
import { getCache, setCache } from "../../lib/repo-basic-cache";
import Repo from "../Repo";
const { isServer } = require("../../utils");

function makeqQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((prev, entry) => {
      prev.push(entry.join("="));
      return prev;
    }, [])
    .join("&");

  return query;
}

export default (Comp, type = "index") => {
  const WithDetail = ({ repoBasic, router, ...rest }) => {
    const query = makeqQuery(router.query);

    useEffect(() => {
      // 只有在客户端才增新的cache
      if (!isServer) {
        setCache(repoBasic);
      }
    }, [repoBasic]);

    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          <div className="tabs">
            {type === "index" ? (
              <span className="tab">ReadMe</span>
            ) : (
              <Link href={`/detail?${query}`}>
                <a className="tab index">ReadMe</a>
              </Link>
            )}
            {type === "issues" ? (
              <span className="tab">Issues</span>
            ) : (
              <Link href={`/detail/issues?${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </div>

        <div>
          <Comp {...rest} />
        </div>

        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    );
  };

  WithDetail.getInitialProps = async (context) => {
    // 这里如果使用router.query会有一个问题： query先是旧的query 过一会才是新的query
    // 所以使用ctx.query。ctx.query获取的是最新的query

    const { router, ctx } = context;
    const { owner, name } = ctx.query;
    const full_name = `${owner}/name`;

    // !!! 这里需要调用Comp的getInitialProps并给Comp传递props数据
    let pageDetail = {};
    if (Comp.getInitialProps) {
      pageDetail = await Comp.getInitialProps(context);
    }

    // 如果有cache数据 则使用cache数据
    const cacheData = getCache(full_name);
    if (cacheData) {
      return {
        repoBasic: cacheData,
        ...pageDetail,
      };
    }

    const repoBasicReq = await api.request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res
    );

    return {
      repoBasic: repoBasicReq.data,
      ...pageDetail,
    };
  };

  return withRouter(WithDetail);
};
