import Link from "next/link";
import { Icon } from "antd";

const { getLastUpdated } = require('../../utils')
function getLicense(license) {
  return license ? `${license.spdx_id} license` : "";
}

const Index = ({ repo }) => {
  return (
    <div className="root">
      <div className="basic-info">
        <h3 className="repo-title">
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.full_name}</a>
          </Link>
        </h3>
        <p className="repo-desc">{repo.desciption}</p>
        <p className="other-info">
          {repo.license ? (
            <span className="license">{getLicense(repo.license)}</span>
          ) : null}
          <span className="last-updated">
            {getLastUpdated(repo.updated_at)}
          </span>
          <span className="open_issues">{repo.open_issues} open issues</span>
        </p>
      </div>
      <div className="lang-star">
        <span className="lang">{repo.language}</span>
        <span className="stars">
          {repo.stargazers_count}
          <Icon type="star" theme="filled" style={{marginLeft: 20}}></Icon>
        </span>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
        }
        .other-info > span + span {
          margin-left: 10px;
        }
        .root + .root {
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .repo-title {
          font-size: 20px;
        }
        .land-star {
          display: flex;
        }
        .lang-star > span {
          width: 120px;
          text-align: right;
          margin-left: 20px;
        }
        .repo-desc {
          width: 400px;
        }
      `}</style>
    </div>
  );
};
export default Index;
