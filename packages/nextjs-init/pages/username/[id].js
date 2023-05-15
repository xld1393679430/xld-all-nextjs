import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"

const Index = ({post}) => {
	const [state, setState] = useState(null)
	const { query } = useRouter()

	console.log(post, 222);
	return (
		<div>
			<p>Hello World</p>
			<p>id: { query.id }</p>
			<p>post: { post }</p>
		</div>
	)
}

export async function getStaticPaths() {
    const paths = new Array(10).fill(0).map((_, i) => ({
        params: { id: i + 1 + '' }
    }));

    console.log('paths', paths);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    console.log('params', params);

    return { props: { post: `post ${params.id}` } };
}

export default Index