import { memo, useMemo } from "react";
import MarkdownIt from "markdown-it";
import "github-markdown-css";

const md = new MarkdownIt({
  html: true,
  linkify: true,
});

// 将中文转成一个非乱码字符串
function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)));
}

const MarkdownRender = memo(({ content, isBase64 }) => {
  const markdown = useMemo(() => {
    return isBase64 ? b64_to_utf8(content) : content;
  }, [isBase64, content]);

  // markdown渲染比较耗时 使用useMemo优化
  const html = useMemo(() => {
    return md.render(markdown);
  }, [markdown]);

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
});

export default MarkdownRender;
