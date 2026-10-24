import { useEffect, useRef, useState } from 'react'
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
    CHUNK_FADE_MARGIN,
    CHUNK_OFFSETS,
    CHUNK_SIZE,
    DEPTH_FADE_END,
    DEPTH_FADE_START,
    INITIAL_CAMERA_Z,
    INVIS_THRESHOLD,
    KEYBOARD_SPEED,
    MAX_VELOCITY,
    RENDER_DISTANCE,
    VELOCITY_DECAY,
    VELOCITY_LERP,
} from './constants.js'
import {
    clamp,
    generateChunkPlanesCached,
    getChunkUpdateThrottleMs,
    lerp,
    shouldThrottleUpdate,
} from './utils.js'
import {
    getTexture,
    setActiveVideoTexture,
    updateVideoTextures,
} from './textureManager.js'
import './infinite.css'

const PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1)
const BACKGROUND = '#0c0c0c'

const KEYBOARD_MAP = [
    { name: 'forward', keys: ['w', 'W', 'ArrowUp'] },
    { name: 'backward', keys: ['s', 'S', 'ArrowDown'] },
    { name: 'left', keys: ['a', 'A', 'ArrowLeft'] },
    { name: 'right', keys: ['d', 'D', 'ArrowRight'] },
    { name: 'up', keys: ['e', 'E'] },
    { name: 'down', keys: ['q', 'Q'] },
]

function useIsTouchDevice() {
    const [isTouchDevice, setIsTouchDevice] = useState(() => {
        if (typeof window === 'undefined') return false
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia?.('(pointer: coarse)').matches
        )
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: coarse)')
        const handleChange = () => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                    navigator.maxTouchPoints > 0 ||
                    mediaQuery.matches,
            )
        }
        handleChange()
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return isTouchDevice
}

function offsetsForDevice(isTouch) {
    const limit = isTouch ? 1 : RENDER_DISTANCE + CHUNK_FADE_MARGIN
    return CHUNK_OFFSETS.filter((offset) => offset.dist <= limit)
}

function chunkList(origin, offsets) {
    return offsets.map((offset) => ({
        key: `${origin.cx + offset.dx},${origin.cy + offset.dy},${origin.cz + offset.dz}`,
        cx: origin.cx + offset.dx,
        cy: origin.cy + offset.dy,
        cz: origin.cz + offset.dz,
    }))
}

function placeLabel(mesh, camera, gl, label, labelPoint) {
    if (!label) return
    if (!mesh) {
        label.style.opacity = '0'
        return
    }
    mesh.getWorldPosition(labelPoint)
    labelPoint.y += (mesh.scale.y || 10) * 0.55
    labelPoint.project(camera)
    const width = gl.domElement.clientWidth
    const height = gl.domElement.clientHeight
    label.textContent = mesh.userData.label || ''
    label.style.opacity = labelPoint.z < 1 ? '1' : '0'
    label.style.transform = `translate(${(labelPoint.x * 0.5 + 0.5) * width}px, ${(-labelPoint.y * 0.5 + 0.5) * height}px) translate(-50%, -120%)`
}

function MediaPlane({
    position,
    scale,
    media,
    chunkCx,
    chunkCy,
    chunkCz,
    cameraGridRef,
    hoverMeshRef,
}) {
    const meshRef = useRef(null)
    const materialRef = useRef(null)
    const localState = useRef({ opacity: 0, frame: 0, ready: false })
    const displayScaleRef = useRef(scale)
    const [texture, setTexture] = useState(null)
    const [isReady, setIsReady] = useState(false)

    useFrame(() => {
        const material = materialRef.current
        const mesh = meshRef.current
        const state = localState.current
        if (!material || !mesh) return

        state.frame = (state.frame + 1) & 1
        if (state.opacity < INVIS_THRESHOLD && !mesh.visible && state.frame === 0) {
            return
        }

        const cam = cameraGridRef.current
        const dist = Math.max(
            Math.abs(chunkCx - cam.cx),
            Math.abs(chunkCy - cam.cy),
            Math.abs(chunkCz - cam.cz),
        )
        const absDepth = Math.abs(position.z - cam.camZ)

        if (absDepth > DEPTH_FADE_END + 50) {
            state.opacity = 0
            material.opacity = 0
            material.depthWrite = false
            mesh.visible = false
            return
        }

        const gridFade =
            dist <= RENDER_DISTANCE
                ? 1
                : Math.max(
                      0,
                      1 -
                          (dist - RENDER_DISTANCE) /
                              Math.max(CHUNK_FADE_MARGIN, 0.0001),
                  )
        const depthFade =
            absDepth <= DEPTH_FADE_START
                ? 1
                : Math.max(
                      0,
                      1 -
                          (absDepth - DEPTH_FADE_START) /
                              Math.max(DEPTH_FADE_END - DEPTH_FADE_START, 0.0001),
                  )
        const target = Math.min(gridFade, depthFade * depthFade)
        state.opacity =
            target < INVIS_THRESHOLD && state.opacity < INVIS_THRESHOLD
                ? 0
                : lerp(state.opacity, target, 0.18)

        const isFullyOpaque = state.opacity > 0.99
        material.opacity = isFullyOpaque ? 1 : state.opacity
        material.depthWrite = isFullyOpaque
        mesh.visible = state.opacity > INVIS_THRESHOLD

        const base = displayScaleRef.current
        if (base) {
            const boost = hoverMeshRef.current === mesh ? 1.08 : 1
            mesh.scale.copy(base).multiplyScalar(boost)
        }
    })

    useEffect(() => {
        const state = localState.current
        state.ready = false
        state.opacity = 0
        setIsReady(false)

        const material = materialRef.current
        if (material) {
            material.opacity = 0
            material.depthWrite = false
            material.map = null
        }

        const tex = getTexture(media, () => {
            state.ready = true
            setIsReady(true)
        })
        setTexture(tex)
    }, [media])

    useEffect(() => {
        const material = materialRef.current
        const mesh = meshRef.current
        const state = localState.current
        if (!material || !mesh || !texture || !isReady || !state.ready) return

        const image = texture.image
        const width = image?.videoWidth || image?.naturalWidth || media.width || 1
        const height = image?.videoHeight || image?.naturalHeight || media.height || 1
        const aspect = width / Math.max(height, 1)
        const display = new THREE.Vector3(scale.y * aspect, scale.y, 1)
        displayScaleRef.current = display
        mesh.scale.copy(display)
        mesh.userData.label = media.label || ''
        mesh.userData.mediaUrl = media.url
        mesh.userData.mediaType = media.type || 'image'
        mesh.userData.texture = texture

        material.map = texture
        material.opacity = state.opacity
        material.depthWrite = state.opacity >= 1
    }, [texture, isReady, media, scale])

    if (!texture || !isReady) return null

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            visible={false}
            geometry={PLANE_GEOMETRY}
        >
            <meshBasicMaterial
                ref={materialRef}
                transparent
                opacity={0}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

function Chunk({ cx, cy, cz, media, cameraGridRef, hoverMeshRef }) {
    const [planes, setPlanes] = useState(null)

    useEffect(() => {
        let canceled = false
        const run = () => {
            if (!canceled) setPlanes(generateChunkPlanesCached(cx, cy, cz, media.length))
        }

        if (typeof requestIdleCallback !== 'undefined') {
            const id = requestIdleCallback(run, { timeout: 100 })
            return () => {
                canceled = true
                cancelIdleCallback(id)
            }
        }

        const id = setTimeout(run, 0)
        return () => {
            canceled = true
            clearTimeout(id)
        }
    }, [cx, cy, cz, media.length])

    if (!planes) return null

    return (
        <group>
            {planes.map((plane) => {
                const mediaItem = media[plane.mediaIndex % media.length]
                if (!mediaItem) return null
                return (
                    <MediaPlane
                        key={plane.id}
                        position={plane.position}
                        scale={plane.scale}
                        media={mediaItem}
                        chunkCx={cx}
                        chunkCy={cy}
                        chunkCz={cz}
                        cameraGridRef={cameraGridRef}
                        hoverMeshRef={hoverMeshRef}
                    />
                )
            })}
        </group>
    )
}

function createInitialState(camZ) {
    return {
        velocity: { x: 0, y: 0, z: 0 },
        targetVel: { x: 0, y: 0, z: 0 },
        basePos: { x: 0, y: 0, z: camZ },
        drift: { x: 0, y: 0 },
        mouse: { x: 0, y: 0 },
        lastMouse: { x: 0, y: 0 },
        scrollAccum: 0,
        isDragging: false,
        lastTouches: [],
        lastTouchDist: 0,
        lastChunkKey: '',
        lastChunkUpdate: 0,
        pendingChunk: null,
    }
}

function isTyping() {
    const element = document.activeElement
    if (!element) return false
    const tag = element.tagName
    return tag === 'TEXTAREA' || tag === 'INPUT' || element.isContentEditable
}

function SceneController({ media, labelRef, onSelect }) {
    const { camera, gl, scene } = useThree()
    const isTouchDevice = useIsTouchDevice()
    const [, getKeys] = useKeyboardControls()
    const state = useRef(createInitialState(INITIAL_CAMERA_Z))
    const cameraGridRef = useRef({ cx: 0, cy: 0, cz: 0, camZ: camera.position.z })
    const hoverMeshRef = useRef(null)
    const onSelectRef = useRef(onSelect)
    onSelectRef.current = onSelect
    const raycaster = useRef(new THREE.Raycaster())
    const ndc = useRef(new THREE.Vector2())
    const labelPoint = useRef(new THREE.Vector3())
    const offsetsRef = useRef(offsetsForDevice(isTouchDevice))
    const [chunks, setChunks] = useState([])

    useEffect(() => {
        offsetsRef.current = offsetsForDevice(isTouchDevice)
    }, [isTouchDevice])

    useEffect(() => {
        const canvas = gl.domElement
        const s = state.current
        const pointers = new Map()
        canvas.style.cursor = 'grab'

        const setMouse = (x, y) => {
            s.mouse.x = (x / window.innerWidth) * 2 - 1
            s.mouse.y = -(y / window.innerHeight) * 2 + 1
        }

        const selectAt = (x, y) => {
            setMouse(x, y)
            ndc.current.set(s.mouse.x, s.mouse.y)
            raycaster.current.setFromCamera(ndc.current, camera)
            const mesh =
                raycaster.current
                    .intersectObjects(scene.children, true)
                    .find((item) => item.object.userData.mediaUrl)?.object ?? null
            hoverMeshRef.current = mesh
            s.pinnedHover = Boolean(mesh)
            setActiveVideoTexture(mesh?.userData.texture ?? null)
            placeLabel(mesh, camera, gl, labelRef.current, labelPoint.current)
        }

        const onPointerDown = (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return
            if (event.target !== canvas && !canvas.contains(event.target)) return
            pointers.set(event.pointerId, {
                x: event.clientX,
                y: event.clientY,
                startX: event.clientX,
                startY: event.clientY,
                type: event.pointerType,
            })
            s.pinnedHover = false
            hoverMeshRef.current = null
            setActiveVideoTexture(null)
            if (pointers.size === 1) {
                s.isDragging = true
                s.dragMoved = false
                canvas.style.cursor = 'grabbing'
            } else if (pointers.size === 2) {
                const [a, b] = [...pointers.values()]
                s.lastTouchDist = Math.hypot(a.x - b.x, a.y - b.y)
                s.isDragging = false
            }
            if (event.pointerType !== 'mouse' && event.cancelable) {
                event.preventDefault()
            }
        }

        const onPointerMove = (event) => {
            const current = pointers.get(event.pointerId)
            if (!current) {
                if (event.pointerType === 'mouse') setMouse(event.clientX, event.clientY)
                return
            }

            const dx = event.clientX - current.x
            const dy = event.clientY - current.y
            current.x = event.clientX
            current.y = event.clientY
            if (
                Math.hypot(event.clientX - current.startX, event.clientY - current.startY) > 10
            ) {
                s.dragMoved = true
            }

            if (pointers.size >= 2) {
                const [a, b] = [...pointers.values()]
                const dist = Math.hypot(a.x - b.x, a.y - b.y)
                if (s.lastTouchDist > 0) {
                    s.scrollAccum += (s.lastTouchDist - dist) * 0.008
                }
                s.lastTouchDist = dist
                return
            }

            const sensitivity = current.type === 'mouse' ? 0.025 : 0.04
            s.targetVel.x -= dx * sensitivity
            s.targetVel.y += dy * sensitivity
            if (event.pointerType !== 'mouse' && event.cancelable) {
                event.preventDefault()
            }
        }

        const onPointerUp = (event) => {
            const current = pointers.get(event.pointerId)
            pointers.delete(event.pointerId)
            if (pointers.size < 2) s.lastTouchDist = 0
            if (pointers.size > 0) return

            s.isDragging = false
            canvas.style.cursor = 'grab'
            if (current && !s.dragMoved) {
                selectAt(event.clientX, event.clientY)
                const mesh = hoverMeshRef.current
                const url = mesh?.userData.mediaUrl
                if (url) {
                    onSelectRef.current?.({
                        url,
                        type: mesh.userData.mediaType || 'image',
                        label: mesh.userData.label || '',
                    })
                } else {
                    onSelectRef.current?.(null)
                }
            } else {
                s.pinnedHover = false
                hoverMeshRef.current = null
                setActiveVideoTexture(null)
                placeLabel(null, camera, gl, labelRef.current, labelPoint.current)
            }
        }

        const onWheel = (event) => {
            event.preventDefault()
            s.scrollAccum += event.deltaY * 0.006
        }

        const blockGesture = (event) => event.preventDefault()

        canvas.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointermove', onPointerMove, { passive: false })
        window.addEventListener('pointerup', onPointerUp)
        window.addEventListener('pointercancel', onPointerUp)
        canvas.addEventListener('wheel', onWheel, { passive: false })
        document.addEventListener('gesturestart', blockGesture)
        document.addEventListener('gesturechange', blockGesture)

        return () => {
            canvas.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
            window.removeEventListener('pointercancel', onPointerUp)
            canvas.removeEventListener('wheel', onWheel)
            document.removeEventListener('gesturestart', blockGesture)
            document.removeEventListener('gesturechange', blockGesture)
        }
    }, [camera, gl, scene])

    useFrame(() => {
        const s = state.current
        const now = performance.now()
        const { forward, backward, left, right, up, down } = getKeys()
        const typing = isTyping()

        if (!typing) {
            if (forward) s.targetVel.z -= KEYBOARD_SPEED
            if (backward) s.targetVel.z += KEYBOARD_SPEED
            if (left) s.targetVel.x -= KEYBOARD_SPEED
            if (right) s.targetVel.x += KEYBOARD_SPEED
            if (down) s.targetVel.y -= KEYBOARD_SPEED
            if (up) s.targetVel.y += KEYBOARD_SPEED
        }

        const isZooming = Math.abs(s.velocity.z) > 0.05
        const zoomFactor = clamp(s.basePos.z / 50, 0.3, 2)
        const driftAmount = 8 * zoomFactor
        const driftLerp = isZooming ? 0.2 : 0.12

        if (!s.isDragging && !isTouchDevice) {
            s.drift.x = lerp(s.drift.x, s.mouse.x * driftAmount, driftLerp)
            s.drift.y = lerp(s.drift.y, s.mouse.y * driftAmount, driftLerp)
        } else if (!s.isDragging && isTouchDevice) {
            s.drift.x = lerp(s.drift.x, 0, driftLerp)
            s.drift.y = lerp(s.drift.y, 0, driftLerp)
        }

        s.targetVel.z += s.scrollAccum
        s.scrollAccum *= 0.8
        s.targetVel.x = clamp(s.targetVel.x, -MAX_VELOCITY, MAX_VELOCITY)
        s.targetVel.y = clamp(s.targetVel.y, -MAX_VELOCITY, MAX_VELOCITY)
        s.targetVel.z = clamp(s.targetVel.z, -MAX_VELOCITY, MAX_VELOCITY)

        s.velocity.x = lerp(s.velocity.x, s.targetVel.x, VELOCITY_LERP)
        s.velocity.y = lerp(s.velocity.y, s.targetVel.y, VELOCITY_LERP)
        s.velocity.z = lerp(s.velocity.z, s.targetVel.z, VELOCITY_LERP)

        s.basePos.x += s.velocity.x
        s.basePos.y += s.velocity.y
        s.basePos.z += s.velocity.z
        camera.position.set(
            s.basePos.x + s.drift.x,
            s.basePos.y + s.drift.y,
            s.basePos.z,
        )

        s.targetVel.x *= VELOCITY_DECAY
        s.targetVel.y *= VELOCITY_DECAY
        s.targetVel.z *= VELOCITY_DECAY

        const cx = Math.floor(s.basePos.x / CHUNK_SIZE)
        const cy = Math.floor(s.basePos.y / CHUNK_SIZE)
        const cz = Math.floor(s.basePos.z / CHUNK_SIZE)
        cameraGridRef.current = { cx, cy, cz, camZ: s.basePos.z }

        const key = `${cx},${cy},${cz}`
        if (key !== s.lastChunkKey) {
            s.pendingChunk = { cx, cy, cz }
            s.lastChunkKey = key
        }

        const throttleMs = getChunkUpdateThrottleMs(isZooming, Math.abs(s.velocity.z))
        if (s.pendingChunk && shouldThrottleUpdate(s.lastChunkUpdate, throttleMs, now)) {
            const { cx: ucx, cy: ucy, cz: ucz } = s.pendingChunk
            s.pendingChunk = null
            s.lastChunkUpdate = now
            setChunks(chunkList({ cx: ucx, cy: ucy, cz: ucz }, offsetsRef.current))
        }

        updateVideoTextures()

        const label = labelRef.current
        if (s.isDragging) {
            placeLabel(null, camera, gl, label, labelPoint.current)
            return
        }

        if (!s.pinnedHover) {
            ndc.current.set(s.mouse.x, s.mouse.y)
            raycaster.current.setFromCamera(ndc.current, camera)
            const mesh =
                raycaster.current
                    .intersectObjects(scene.children, true)
                    .find((item) => item.object.userData.mediaUrl)?.object ?? null
            if (hoverMeshRef.current !== mesh) {
                hoverMeshRef.current = mesh
                setActiveVideoTexture(mesh?.userData.texture ?? null)
            }
        }

        placeLabel(hoverMeshRef.current, camera, gl, label, labelPoint.current)
    })

    useEffect(() => {
        const s = state.current
        s.basePos = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z,
        }
        setChunks(chunkList({ cx: 0, cy: 0, cz: 0 }, offsetsRef.current))
    }, [camera])

    return (
        <>
            {chunks.map((chunk) => (
                <Chunk
                    key={chunk.key}
                    cx={chunk.cx}
                    cy={chunk.cy}
                    cz={chunk.cz}
                    media={media}
                    cameraGridRef={cameraGridRef}
                    hoverMeshRef={hoverMeshRef}
                />
            ))}
        </>
    )
}

export function InfiniteCanvas({ media, onSelect }) {
    const isTouchDevice = useIsTouchDevice()
    const labelRef = useRef(null)
    const dpr = Math.min(
        window.devicePixelRatio || 1,
        isTouchDevice ? 1.25 : 1.5,
    )

    if (!media.length) return null

    return (
        <KeyboardControls map={KEYBOARD_MAP}>
            <div className="infinite-stage">
                <Canvas
                    camera={{
                        position: [0, 0, INITIAL_CAMERA_Z],
                        fov: 60,
                        near: 1,
                        far: 500,
                    }}
                    dpr={dpr}
                    flat
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                >
                    <color attach="background" args={[BACKGROUND]} />
                    <fog attach="fog" args={[BACKGROUND, 120, 320]} />
                    <SceneController
                        media={media}
                        labelRef={labelRef}
                        onSelect={onSelect}
                    />
                </Canvas>
                <div ref={labelRef} className="infinite-hover-label" />
            </div>
        </KeyboardControls>
    )
}
