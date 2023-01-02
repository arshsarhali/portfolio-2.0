import styles from './NavBar.module.css'
import Link from 'next/link'
import { useState } from 'react'
const Navbar = (props) => {
	const { homePageVisible, projectVisible, workVisible, contactVisible } = props

	const [navToggle, setNavToggle] = useState(false)
	return (
		<div
			className={
				homePageVisible ? `${styles.homeContainer}` : `${styles.container}`
			}
		>
			<div
				className={styles.navToggle}
				data-visible={navToggle}
				onClick={() => {
					setNavToggle(!navToggle)
				}}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul className={styles.containerUl} data-visible={navToggle} id='myMenu'>
				<a href='#home'>
					<li data-menuanchor='home'>
						Home
						{homePageVisible ? <span className={styles.navBorder}></span> : ''}
					</li>
				</a>
				<a href='#projects'>
					<li data-menuanchor='projects'>
						Projects
						{projectVisible ? <span className={styles.navBorder}></span> : ''}
					</li>
				</a>
				<a href='#work'>
					<li data-menuanchor='work'>
						Work
						{workVisible ? <span className={styles.navBorder}></span> : ''}
					</li>
				</a>
				<a href='#contact'>
					<li data-menuanchor='contact'>
						Contact
						{contactVisible ? <span className={styles.navBorder}></span> : ''}
					</li>
				</a>
				<Link className={styles.gitLink} href='https://github.com/arshsarhali'>
					<li>
						<button className={styles.gitBtn}>GitHub</button>
					</li>
				</Link>
			</ul>
		</div>
	)
}
export default Navbar
