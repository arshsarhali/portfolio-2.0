import { Transition } from '../../utils/Transition'
import { useReducedMotion, useSpring } from 'framer-motion'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useInViewport } from '../../hooks/useInViewport'
import { startTransition, useEffect, useRef } from 'react'
import {
	AmbientLight,
	Color,
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	Scene,
	SphereBufferGeometry,
	UniformsUtils,
	Vector2,
	WebGLRenderer,
	sRGBEncoding,
} from 'three'
import { cleanRenderer, cleanScene, removeLights } from '../../utils/three'
import styles from './DisplacementSphere.module.css'
import fragShader from './displacementSphereFragment.glsl'
import vertShader from './displacementSphereVertex.glsl'

const springConfig = {
	stiffness: 30,
	damping: 20,
	mass: 2,
}

/**
 * Media query breakpoints
 */
export const media = {
	desktop: 2080,
	laptop: 1680,
	tablet: 1040,
	mobile: 696,
	mobileS: 400,
}

/**
 * Convert an rgb theme property (e.g. rgbBlack: '0 0 0')
 * to values that can be spread into a ThreeJS Color class
 */
const rgbToThreeColor = (rgb) =>
	rgb?.split(' ').map((value) => Number(value) / 255) || []

export const DisplacementSphere = (props) => {
	const rgbBackground = '17 17 17'
	const themeId = 'dark'
	const colorWhite = undefined
	const start = useRef(Date.now())
	const canvasRef = useRef()
	const mouse = useRef()
	const renderer = useRef()
	const camera = useRef()
	const scene = useRef()
	const lights = useRef()
	const uniforms = useRef()
	const material = useRef()
	const geometry = useRef()
	const sphere = useRef()
	const reduceMotion = useReducedMotion()
	const isInViewport = useInViewport(canvasRef)
	const windowSize = useWindowSize()
	const rotationX = useSpring(0, springConfig)
	const rotationY = useSpring(0, springConfig)

	useEffect(() => {
		const { innerWidth, innerHeight } = window
		mouse.current = new Vector2(0.8, 0.5)
		renderer.current = new WebGLRenderer({
			canvas: canvasRef.current,
			antialias: false,
			alpha: true,
			powerPreference: 'high-performance',
			failIfMajorPerformanceCaveat: true,
		})
		renderer.current.setSize(innerWidth, innerHeight)
		renderer.current.setPixelRatio(1)
		renderer.current.outputEncoding = sRGBEncoding

		camera.current = new PerspectiveCamera(
			54,
			innerWidth / innerHeight,
			0.1,
			100
		)
		camera.current.position.z = 52

		scene.current = new Scene()

		material.current = new MeshPhongMaterial()
		material.current.onBeforeCompile = (shader) => {
			uniforms.current = UniformsUtils.merge([
				shader.uniforms,
				{ time: { type: 'f', value: 0 } },
			])

			shader.uniforms = uniforms.current
			shader.vertexShader = vertShader
			shader.fragmentShader = fragShader
		}

		startTransition(() => {
			geometry.current = new SphereBufferGeometry(32, 128, 128)
			sphere.current = new Mesh(geometry.current, material.current)
			sphere.current.position.z = 0
			sphere.current.modifier = Math.random()
			scene.current.add(sphere.current)
		})

		return () => {
			cleanScene(scene.current)
			cleanRenderer(renderer.current)
		}
	}, [])

	useEffect(() => {
		const dirLight = new DirectionalLight(colorWhite, 0.6)
		const ambientLight = new AmbientLight(
			colorWhite,
			themeId === 'dark' ? 0.1 : 0.8
		)

		dirLight.position.z = 200
		dirLight.position.x = 100
		dirLight.position.y = 100

		lights.current = [dirLight, ambientLight]
		scene.current.background = new Color(...rgbToThreeColor(rgbBackground))
		lights.current.forEach((light) => scene.current.add(light))

		return () => {
			removeLights(lights.current)
		}
	}, [rgbBackground, colorWhite, themeId])

	useEffect(() => {
		const { width, height } = windowSize

		renderer.current.setSize(width, height)
		camera.current.aspect = width / height
		camera.current.updateProjectionMatrix()

		// Render a single frame on resize when not animating
		if (reduceMotion) {
			renderer.current.render(scene.current, camera.current)
		}

		if (width <= media.mobile) {
			sphere.current.position.x = 14
			sphere.current.position.y = 10
		} else if (width <= media.tablet) {
			sphere.current.position.x = 18
			sphere.current.position.y = 8
		} else {
			sphere.current.position.x = 20
			sphere.current.position.y = 6
		}
	}, [reduceMotion, windowSize])

	useEffect(() => {
		const onMouseMove = (event) => {
			const position = {
				x: event.clientX / window.innerWidth,
				y: event.clientY / window.innerHeight,
			}

			rotationX.set(position.y / 2)
			rotationY.set(position.x / 2)
		}

		if (!reduceMotion && isInViewport) {
			window.addEventListener('mousemove', onMouseMove)
		}

		return () => {
			window.removeEventListener('mousemove', onMouseMove)
		}
	}, [isInViewport, reduceMotion, rotationX, rotationY])

	useEffect(() => {
		let animation

		const animate = () => {
			animation = requestAnimationFrame(animate)

			if (uniforms.current !== undefined) {
				uniforms.current.time.value = 0.00005 * (Date.now() - start.current)
			}

			sphere.current.rotation.z += 0.001
			sphere.current.rotation.x = rotationX.get()
			sphere.current.rotation.y = rotationY.get()

			renderer.current.render(scene.current, camera.current)
		}

		if (!reduceMotion && isInViewport) {
			animate()
		} else {
			renderer.current.render(scene.current, camera.current)
		}

		return () => {
			cancelAnimationFrame(animation)
		}
	}, [isInViewport, reduceMotion, rotationX, rotationY])

	return (
		<Transition in timeout={3000}>
			{() => (
				<canvas
					aria-hidden
					className={styles.canvas}
					ref={canvasRef}
					{...props}
				/>
			)}
		</Transition>
	)
}
