import {
    DOF_FOCUS_FAR,
    DOF_FOCUS_NEAR,
    DOF_MAX_BLUR_PX,
} from './constants.js'

export function foregroundDofAmount(viewZ) {
    const span = DOF_FOCUS_NEAR - DOF_FOCUS_FAR
    const t = Math.min(1, Math.max(0, (viewZ - DOF_FOCUS_FAR) / span))
    return t * t * (3 - 2 * t)
}

const FRAGMENT_PRELUDE = /* glsl */ `
#include <common>
varying float vDofViewZ;
uniform float dofFocusNear;
uniform float dofFocusFar;
uniform float dofMaxBlurPx;
uniform float dofFocus;
`

const MAP_PARS = /* glsl */ `
#include <map_pars_fragment>
#ifdef USE_MAP
vec4 sampleDofMap(vec2 uv) {
    vec4 color = texture2D(map, uv);
    #ifdef DECODE_VIDEO_TEXTURE
        color = sRGBTransferEOTF(color);
    #endif
    return color;
}
#endif
`

const MAP_FRAGMENT = /* glsl */ `
#ifdef USE_MAP
    vec2 dofPx = vec2(length(dFdx(vMapUv)), length(dFdy(vMapUv)));
    float dof = smoothstep(dofFocusFar, dofFocusNear, vDofViewZ) * (1.0 - dofFocus);
    vec4 sampledDiffuseColor = sampleDofMap(vMapUv);

    if (dof > 0.02) {
        float radius = dof * dofMaxBlurPx;
        vec2 spread = dofPx * radius;
        vec4 blur = sampledDiffuseColor * 0.16;
        blur += sampleDofMap(vMapUv + spread * vec2(0.380, 0.000)) * 0.065;
        blur += sampleDofMap(vMapUv + spread * vec2(0.190, 0.329)) * 0.065;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.190, 0.329)) * 0.065;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.380, 0.000)) * 0.065;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.190, -0.329)) * 0.065;
        blur += sampleDofMap(vMapUv + spread * vec2(0.190, -0.329)) * 0.065;
        blur += sampleDofMap(vMapUv + spread * vec2(0.589, 0.340)) * 0.045;
        blur += sampleDofMap(vMapUv + spread * vec2(0.000, 0.680)) * 0.045;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.589, 0.340)) * 0.045;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.589, -0.340)) * 0.045;
        blur += sampleDofMap(vMapUv + spread * vec2(0.000, -0.680)) * 0.045;
        blur += sampleDofMap(vMapUv + spread * vec2(0.589, -0.340)) * 0.045;
        blur += sampleDofMap(vMapUv + spread * vec2(0.924, 0.383)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(0.383, 0.924)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.383, 0.924)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.924, 0.383)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.924, -0.383)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(-0.383, -0.924)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(0.383, -0.924)) * 0.0225;
        blur += sampleDofMap(vMapUv + spread * vec2(0.924, -0.383)) * 0.0225;
        sampledDiffuseColor = blur;

        float edgePx = min(
            min(vMapUv.x, 1.0 - vMapUv.x) / max(dofPx.x, 1e-5),
            min(vMapUv.y, 1.0 - vMapUv.y) / max(dofPx.y, 1e-5)
        );
        float feather = smoothstep(0.0, max(radius * 1.15, 1.0), edgePx);
        sampledDiffuseColor.a *= mix(1.0, feather, smoothstep(0.12, 0.5, dof));
    }

    diffuseColor *= sampledDiffuseColor;
#endif
`

export function applyForegroundDepthOfField(shader, focusUniform) {
    shader.uniforms.dofFocusNear = { value: DOF_FOCUS_NEAR }
    shader.uniforms.dofFocusFar = { value: DOF_FOCUS_FAR }
    shader.uniforms.dofMaxBlurPx = { value: DOF_MAX_BLUR_PX }
    shader.uniforms.dofFocus = focusUniform

    shader.vertexShader = shader.vertexShader
        .replace(
            '#include <common>',
            '#include <common>\nvarying float vDofViewZ;',
        )
        .replace(
            '#include <project_vertex>',
            '#include <project_vertex>\nvDofViewZ = -mvPosition.z;',
        )

    shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', FRAGMENT_PRELUDE)
        .replace('#include <map_pars_fragment>', MAP_PARS)
        .replace('#include <map_fragment>', MAP_FRAGMENT)
}

export function foregroundDofCacheKey() {
    return 'foreground-dof-v4'
}
