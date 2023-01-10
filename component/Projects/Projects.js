import { forwardRef, useEffect, useState } from 'react'
import styles from './Projects.module.css'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { Transition } from '../../utils/Transition'

import { deviceModels } from '../Model/deviceModels'
import { media } from '../../utils/style'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const Model = dynamic(() => import('../Model/Model').then((mod) => mod.Model))

const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`

const Projects = (props, projectRef) => {
	const { ref: projectsRef, inView: projectsVisible } = useInView()
	const [modelVisible, setModelVisible] = useState(false)

	useEffect(() => {
		if (projectsVisible) {
			setModelVisible(true)
		}
	}, [projectsVisible])

	const projects = props.projects

	const [projectIndex, setProjectIndex] = useState(0)
	const currentProject = projects.at(projectIndex)
	const nextProject = () => {
		const nextIndex = (projectIndex + 1) % projects.length
		setProjectIndex(nextIndex)
	}

	const prevProject = () => {
		const prevIndex = (projectIndex - 1) % projects.length
		setProjectIndex(prevIndex)
	}

	return (
		<div className={styles.container}>
			<div ref={projectRef} className={styles.header}>
				Projects
			</div>
			<div className={styles.projectCount}>
				<div className={styles.prevBtnWrap}>
					<div className={styles.round} onClick={prevProject}>
						<div id={styles.cta}>
							<span
								className={`${styles.arrow} ${styles.prevarrw} ${styles.primera} ${styles.next}`}
							></span>
							<span
								className={`${styles.arrow} ${styles.prevarrw} ${styles.segunda} ${styles.next}`}
							></span>
						</div>
					</div>
				</div>
				<div className={styles.projectCntWrap}>
					{currentProject.id}/{projects.length}
				</div>
				<div className={styles.nxtBtnWrap}>
					<div className={styles.round} onClick={nextProject}>
						<div id={styles.cta}>
							<span
								className={`${styles.arrow} ${styles.nxtarrw} ${styles.primera} ${styles.next}`}
							></span>
							<span
								className={`${styles.arrow} ${styles.nxtarrw} ${styles.segunda} ${styles.next}`}
							></span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.projectContainer}>
				<div
					className={styles.textContainer}
					ref={projectsRef}
					data-visible={modelVisible}
				>
					<div className={styles.projectTitle}>
						<div className={styles.animateContainer}>
							<AnimatePresence>
								{projects.map((item) => (
									<Transition
										unmount
										in={item === currentProject}
										timeout={{ enter: 3000, exit: 2000 }}
										key={item.title}
									>
										{(visible, status) => (
											<span
												aria-hidden
												className={`${styles.animateWord} ${styles.animateTitle}`}
												data-plus={true}
												data-status={status}
												style={{ delay: '600ms' }}
											>
												{item.title}
											</span>
										)}
									</Transition>
								))}
							</AnimatePresence>
						</div>
					</div>
					<div className={styles.projectText}>
						<div className={styles.animateContainer}>
							<AnimatePresence>
								{projects.map((item) => (
									<Transition
										unmount
										in={item === currentProject}
										timeout={{ enter: 3000, exit: 2000 }}
										key={item.text}
									>
										{(visible, status) => (
											<span
												aria-hidden
												className={`${styles.animateWord} ${styles.animateText}`}
												data-plus={true}
												data-status={status}
											>
												{item.text}
											</span>
										)}
									</Transition>
								))}
							</AnimatePresence>
						</div>
					</div>
					<div className={styles.projectText}>
						<div className={styles.animateContainer}>
							<AnimatePresence>
								{projects.map((item) => (
									<Transition
										unmount
										in={item === currentProject}
										timeout={{ enter: 3000, exit: 2000 }}
										key={item.detail}
									>
										{(visible, status) => (
											<span
												aria-hidden
												className={`${styles.animateWord} ${styles.animateDetail}`}
												data-plus={true}
												data-status={status}
											>
												{item.detail.map((item, key) => (
													<li key={key}>{item}</li>
												))}
											</span>
										)}
									</Transition>
								))}
							</AnimatePresence>
						</div>
					</div>
					<div className={styles.projectTech}>
						<div className={styles.animateContainer}>
							<AnimatePresence>
								{projects.map((item) => (
									<Transition
										unmount
										in={item === currentProject}
										timeout={{ enter: 3000, exit: 2000 }}
										key={item.tech}
									>
										{(visible, status) => (
											<span
												aria-hidden
												className={`${styles.animateWord} ${styles.animateTech}`}
												data-plus={true}
												data-status={status}
											>
												{item.tech}
											</span>
										)}
									</Transition>
								))}
							</AnimatePresence>
						</div>
					</div>
					<div className={styles.button}>
						<Link
							target='_blank'
							rel='noopener noreferrer'
							href={currentProject.demoLink}
						>
							<button className={styles.demoBtn}>Demo</button>
						</Link>
						<Link
							target='_blank'
							rel='noopener noreferrer'
							href={currentProject.gitLink}
						>
							<button className={styles.gitBtn}>GitHub</button>
						</Link>
					</div>
				</div>

				<div className={styles.model} data-device='laptop'>
					{projects.map((project) => {
						const model = {
							type: 'laptop',
							alt: '',
							textures: project.textures,
						}
						return project.id === currentProject.id ? (
							<Model
								key={project.id}
								alt={model.alt}
								cameraPosition={{ x: 0, y: 0, z: 7.5 }}
								showDelay={700}
								show={modelVisible}
								models={[
									{
										...deviceModels.laptop,
										texture: {
											...model.textures[0],
											sizes: laptopSizes,
										},
									},
								]}
							/>
						) : (
							''
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default forwardRef(Projects)
