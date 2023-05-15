import { useCallback, useState } from "react";
import { Avatar, Button } from "antd";
import dynamic from "next/dynamic";
import WithRepoBasic from "../../components/WithRepoBasic";
const api = require("../../lib/api");
const { getLastUpdated } = require("../../utils");

const MarkdownRender = dynamic(
  () => import("../../components/MarkdownRender"),
  {
    loading: () => <span>loading...</span>,
  }
);

function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MarkdownRender content={issue.body} />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">
          打开Issue讨论页面
        </Button>
      </div>
      <style jsx>{`
        .root {
          background: #fefefe;
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

function IssueItem({ issue }) {
  const [show, setShow] = useState(false);

  const handleToggle = useCallback(() => {
    setShow((s) => !s);
  }, []);
  return (
    <div>
      <div className="issue">
        <Button
          type="primary"
          size="small"
          onClick={handleToggle}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          {show ? "隐藏" : "查看"}
        </Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
          </h6>
          <p className="sub-info">
            <span>Updated at {getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>
      </div>

      {show ? <IssueDetail issue={issue} /> : null}

      <style jsx>{`
        .issue {
          display: flex;
          position: relative;
          padding: 10px;
        }
        .issue:hover {
          background: #fafafa;
        }
        .issue + .issue {
          border-bottom: 1px solid #eee;
        }
        .main-info > h6 {
          max-width: 600px;
          font-size: 16px;
          padding-right: 40px;
        }
        .avatar {
          margin-right: 20px;
        }
        .sub-info {
          margin-bottom: 0;
        }
        .sub-info > span + span {
          display: inline-block;
          margin-left: 20px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

const Index = ({ issues }) => {
  return (
    <div className="root">
      <div className="issues">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

Index.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;
  const issuesReq = await api.request(
    {
      url: `/repos/${owner}/${name}/issues`,
    },
    ctx.req,
    ctx.res
  );
  return {
    issues: issuesReq.data,
  };
};

export default WithRepoBasic(Index, "issues");
