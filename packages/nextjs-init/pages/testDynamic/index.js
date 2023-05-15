import React, { Component, useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import A from "./A"

// const A = dynamic(() => import("./A"), { ssr: true })
const B = dynamic(() => import("./B"), { ssr: true })


function getType() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("A")
		}, 1000)
	})
}

class Index extends Component {

	static async getInitialProps(...rest) {

		const type = await getType()
		return {
			type
		}

	}

	render() {
		const { type } = this.props

		console.log(this.props, 222);

		if (type === "A") {
			return <A />
		}
		if (type === "B") {
			return <B />
		}
		return (
			<div>Loading</div>
		)
	}
}


// export async function getStaticProps() {
// export async function getInitialProps() {
// 	const type = await getType()
// 	return {
// 		props: {
// 			type
// 		},
// 	}
// }

export default Index