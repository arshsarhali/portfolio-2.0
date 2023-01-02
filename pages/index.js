import Head from 'next/head'

import ReactFullpage from '@fullpage/react-fullpage'

import styles from '../styles/Home.module.css'
import Navbar from '../component/navbar/NavBar'
import HomePage from '../component/homepage/HomePage'
import Projects from '../component/projects/Projects'
import Experience from '../component/Experience/Experience'
import { useInView } from 'react-intersection-observer'

import flicknextLarge from '../assets/flick-Next-large.jpg'
import flicknextPlaceholder from '../assets/flick-Next-placeholder.jpg'
import flicknext from '../assets/flick-Next.jpg'

import primeClthLarge from '../assets/prime-clothing-large.jpg'
import primeClthPlaceholder from '../assets/prime-clothing-placeholder.jpg'
import primeClth from '../assets/prime-clothing.jpg'

import nasaLarge from '../assets/nasa-project-large.jpg'
import nasaPlaceholder from '../assets/nasa-project-placeholder.jpg'
import nasa from '../assets/nasa-project.jpg'

import coffeeLarge from '../assets/coffee-finder-large.jpg'
import coffeePlaceholder from '../assets/coffee-finder-placeholder.jpg'
import coffee from '../assets/coffee-finder.jpg'

import Contact from '../component/contact/contact'
export default function Home() {
	const { ref: homeRef, inView: homePageVisible } = useInView()
	const { ref: projectRef, inView: projectVisible } = useInView()
	const { ref: workRef, inView: workVisible } = useInView()
	const { ref: contactRef, inView: contactVisible } = useInView()

	const projects = [
		{
			id: '1',
			title: 'Netflix Clone',
			text: 'A Netflix clone that uses Magic.link to login users, Hasura as database and Youtube API to fetch videos from Youtube.',
			tech: 'NextJS, Hasura, Magic.link, Youtube API',
			demoLink: 'https://flicknext-clone.arshsandhu.com/',
			gitLink: 'https://github.com/arshsarhali/flickNext',
			textures: [
				{
					srcSet: [flicknext, flicknextLarge],
					placeholder: flicknextPlaceholder,
				},
			],
		},
		{
			id: '2',
			title: 'Prime Clothing',
			text: 'An online clothing store build using Stripe as payment method, Firebase as database and Login.',
			tech: 'ReactJS, Redux, Firebase, Stripe',
			demoLink: 'https://prime-clothing.arshsandhu.com/',
			gitLink: 'https://github.com/arshsarhali/prime-clothing',
			textures: [
				{
					srcSet: [primeClth, primeClthLarge],
					placeholder: primeClthPlaceholder,
				},
			],
		},
		{
			id: '3',
			title: 'NASA Mission',
			text: 'NASA Mission control fetch the present and future SpaceX mission and also allow user to add new mission.',
			tech: 'NodeJS, Express, ReactJS, MongoDB, SpaceX API',
			demoLink: 'https://nasa-mission.arshsandhu.com/',
			gitLink: 'https://github.com/arshsarhali/nasa-project',
			textures: [
				{
					srcSet: [nasa, nasaLarge],
					placeholder: nasaPlaceholder,
				},
			],
		},
		{
			id: '4',
			title: 'Nearby Coffee',
			text: 'Helps in find nearby coffee stores using location and also show Vancouver downtown stores as default.',
			tech: 'NextJs, FourSquare API, Airtable API, Unsplash API',
			demoLink: 'https://coffee-stores.arshsandhu.com/',
			gitLink: 'https://github.com/arshsarhali/coffee-store-finder',
			textures: [
				{
					srcSet: [coffee, coffeeLarge],
					placeholder: coffeePlaceholder,
				},
			],
		},
	]

	const workExp = [
		{
			id: '1',
			company: 'South Asian Studies Institute (SASI) – UFV',
			position: 'Web Developer',
			duration: 'January 2021 – August 2022',
			detail: [
				'Developed the front-end for SACDA Homepage using using HTML, PHP and CSS.',
				'Created digital exhibits using Bootstrap.',
				'Optimized the configuration files of back-end software (Collective Access Providence) to decrease the server load by 40%.',
				'Added new content and made design changes to WordPress blogs.',
				'Maintained the SACDA.CA website front-end and back-end.',
				'Decreased the resource load time by 15% using a dedicated server for MySQL database.',
				'Saved more than 50% space on server by changing the page cache policy to cache only most visited pages.',
			],
		},
		{
			id: '2',
			company: 'University of the Fraser Valley',
			position: 'Teaching Assistant',
			duration: 'January 2020 – April 2022',
			detail: [
				'Overlooked web development and Data Structure labs.',
				'Created digital exhibits using Bootstrap.',
				'Helped student in understanding concepts of object-oriented programming and solve programming related problems.',
				'Assisted professors during the lectures.',
			],
		},
	]

	const anchors = ['home', 'projects', 'work', 'contact']

	const credits = {
		enabled: false,
		label: 'Made with fullPage.js',
		position: 'right',
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Arshdeep Sandhu</title>

				<meta
					name='description'
					content='Arshdeep Sandhu Web Developer Portfolio'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Navbar
					homePageVisible={homePageVisible}
					projectVisible={projectVisible}
					workVisible={workVisible}
					contactVisible={contactVisible}
				/>

				<ReactFullpage
					licenseKey={process.env.NEXT_PUBLIC_FULL_PAGE_API_KEY}
					anchors={anchors}
					menu='myMenu'
					credits={credits}
					scrollOverflow={false}
					responsiveWidth='768'
					render={() => (
						<ReactFullpage.Wrapper>
							<div key='1' className='section'>
								<HomePage ref={homeRef} />
							</div>
							<div key='2' className='section fp-auto-height-responsive'>
								<Projects projects={projects} ref={projectRef} />
							</div>
							<div key='3' className='section fp-auto-height-responsive'>
								<Experience ref={workRef} workExp={workExp} />
							</div>
							<div key='4' className='section fp-auto-height-responsive'>
								<Contact ref={contactRef} />
							</div>
						</ReactFullpage.Wrapper>
					)}
				/>
			</main>
		</div>
	)
}
