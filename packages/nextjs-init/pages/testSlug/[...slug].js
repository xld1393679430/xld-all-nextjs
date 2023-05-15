import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"

const Index = () => {
	const [state, setState] = useState(null)
	const { query } = useRouter()

	console.log(query, 1111)
	useEffect(() => {

	}, [])

	return (
		<div>
			<p>catch-all 路由 严格模式</p>
			<p>当路由为/testSlug 报404错误</p>
		</div>
	)
}

export default Index