import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const str = "Hello"
const Hello = dynamic(() => import(`./${str}`))

const Index = () => {
	const [Com, setCom] = useState(undefined)

	useEffect(() => {
		import(`./${str}`).then(res => {
			setCom(() => res.default)
		})
	}, [])

	console.log(Com);

	return (
		<div>
			<p>Page</p>
			<Hello />
			{ Com && <Com />}
		</div>
	)
}

export default Index