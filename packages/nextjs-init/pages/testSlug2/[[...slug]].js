import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"

const Index = () => {
	const [state, setState] = useState(null)
	const { query } = useRouter()

	console.log(query, 222)
	useEffect(() => {

	}, [])

	return (
		<div>
			<p>catch-all 路由 非严格模式</p>
			<p>当路由为/testSlug2 不会报404错误</p>
			<p>当前Slug: {query.slug?.[0]}</p>
		</div>
	)
}

export default Index