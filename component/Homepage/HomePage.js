import styles from './HomePage.module.css'
import { forwardRef, Fragment } from 'react'
import Typewriter from 'typewriter-effect'
import dynamic from 'next/dynamic'
import { Transition } from '../../utils/Transition'
const DisplacementSphere = dynamic(() =>
	import('../DisplacementSphere/DisplacementSphere').then(
		(mod) => mod.DisplacementSphere
	)
)
const HomePage = (props, homeRef) => {
	return (
		<Fragment>
			<DisplacementSphere />
			<div className={styles.container}>
				<div ref={homeRef} className={styles.introText}>
					Hi,
					<Typewriter
						onInit={(typewriter) => {
							typewriter
								.typeString('I am Arshdeep Sandhu')
								.pauseFor(2500)
								.deleteChars(15)
								.typeString('a Web Developer')
								.pauseFor(2500)
								.start()
						}}
						options={{ autoStart: true, loop: true }}
					/>
				</div>
			</div>
		</Fragment>
	)
}

export default forwardRef(HomePage)
