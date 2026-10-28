export const CHUNK_SIZE = 78
export const RENDER_DISTANCE = 2
export const CHUNK_FADE_MARGIN = 1
export const MAX_VELOCITY = 3.2
export const DEPTH_FADE_START = 140
export const DEPTH_FADE_END = 260
export const INVIS_THRESHOLD = 0.01
export const KEYBOARD_SPEED = 0.18
export const VELOCITY_LERP = 0.16
export const VELOCITY_DECAY = 0.9
export const INITIAL_CAMERA_Z = 50

// Foreground defocus. Planes stay sharp until DOF_FOCUS_FAR, then ease
// toward a DOF_MAX_BLUR_PX screen-space blur as they reach DOF_FOCUS_NEAR.
export const DOF_FOCUS_FAR = 34
export const DOF_FOCUS_NEAR = 7
export const DOF_MAX_BLUR_PX = 38

const maxDist = RENDER_DISTANCE + CHUNK_FADE_MARGIN
export const CHUNK_OFFSETS = []
for (let dx = -maxDist; dx <= maxDist; dx++) {
    for (let dy = -maxDist; dy <= maxDist; dy++) {
        for (let dz = -maxDist; dz <= maxDist; dz++) {
            const dist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz))
            if (dist > maxDist) continue
            CHUNK_OFFSETS.push({ dx, dy, dz, dist })
        }
    }
}
