import type { NextPage } from 'next'

interface IProps {
    articleId: number;
}

const Article: NextPage<IProps> = ({ articleId }) => {
    return (
        <div>
            <h2>文章ID: {articleId}</h2>
        </div>
    )
}

Article.getInitialProps = async (context) => {
    const { articleId } = context.query

    return {
        articleId: Number(articleId)
    }
}

export default Article;