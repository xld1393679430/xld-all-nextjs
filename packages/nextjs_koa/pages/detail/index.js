import dynamic from "next/dynamic";
import WithRepoBasic from "../../components/WithRepoBasic";

const MarkdownRender = dynamic(
  () => import("../../components/MarkdownRender"),
  {
    loading: () => <span>loading...</span>,
  }
);
const api = require("../../lib/api");

const Index = ({ readme }) => {
  return <MarkdownRender content={readme.content} isBase64={true} />;
};

Index.getInitialProps = async ({ router, ctx }) => {
  const { owner, name } = ctx.query;
  const readmeResp = await api.request(
    {
      url: `/repos/${owner}/${name}/readme`,
    },
    ctx.req,
    ctx.res
  );

  return {
    readme: readmeResp.data,
  };
};

export default WithRepoBasic(Index, "index");
