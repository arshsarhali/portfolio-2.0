import styles from './Experience.module.css'
import { forwardRef, useState } from 'react'
import DecoderText from '../DecoderText/DecoderText'
import { useInView } from 'react-intersection-observer'
const Experience = (props, workRef) => {
	const workExp = props.workExp

	const [experienceRef, experienceVisible] = useInView()
	const [translate, setTranslate] = useState({
		x: 0,
		y: 0,
	})

	const pointerMove = (e) => {
		setTranslate({
			x: translate.x + e.movementX,
			y: translate.y + e.movementY,
		})
	}

	return (
		<div className={styles.conatiner}>
			<div className={styles.header} ref={workRef}>
				Work Experience
			</div>
			<div className={styles.workWrap} ref={experienceRef}>
				{workExp.map((item) => (
					<div
						className={styles.work}
						key={item.id}
						onPointerMove={pointerMove}
					>
						<div className={styles.workCard}>
							<svg
								style={{
									position: 'absolute',
									top: 0,
									right: 0,
									bottom: 0,
									left: 0,
									width: '100%',
									height: '100%',
									pointerEvents: 'none',
									zIndex: 2,
								}}
							>
								<rect
									className={styles.workRect}
									style={{
										strokeDashoffset: (translate.x + translate.y) * 0.2,
										width: '100%',
										height: '100%',
										zIndex: 2,
									}}
								/>
							</svg>
							<DecoderText
								className={styles.company}
								text={item.company}
								start={experienceVisible}
								delay={500}
							/>
							<div className={styles.position} data-visible={experienceVisible}>
								{item.position}
							</div>
							<DecoderText
								className={styles.duration}
								text={item.duration}
								start={experienceVisible}
								delay={500}
							/>
							<ul className={styles.detail} data-visible={experienceVisible}>
								{item.detail.map((item2, key) => (
									<li key={key}>{item2}</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
export default forwardRef(Experience)
