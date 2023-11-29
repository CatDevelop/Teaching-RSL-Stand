import React, {useRef} from 'react';
import * as THREE from 'three';
import {Canvas, useFrame} from '@react-three/fiber';

const colors = [
    [11, 36, 71],
    [25, 55, 109],
    [87, 108, 188],
    [66, 125, 157],
]

const TextureMesh = () => {
    const mesh = useRef(null)
    useFrame(state => {
        const {clock, mouse, gl, scene, camera} = state
        if (mesh.current) {
            mesh.current.material.uniforms.u_mouse.value = [mouse.x, mouse.y]
            mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
        }
    })

    return React.createElement('mesh',
        {
            ref: mesh,
            position: [0, 0, 0],
            scale: 1,
            rotation: [0, 0, 0]
        },
        React.createElement('planeGeometry', {args: [1280, 720]}),
        React.createElement('shaderMaterial', {
            fragmentShader: `// Fragment shader
// Uniforms
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec4 u_colors[4];
uniform float u_blur;
uniform bool u_animate;
uniform float u_animate_speed;
uniform float u_frequency;

#define S(a,b,t) smoothstep(a,b,t)

#ifndef SRGB_EPSILON
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_SRGB2RGB
#define FNC_SRGB2RGB

// 1.0 / 12.92 = 0.0773993808
// 1.0 / (1.0 + 0.055) = 0.947867298578199

float srgb2rgb(float channel) {
    return (channel < 0.04045) ? channel * 0.0773993808 : pow((channel + 0.055) * 0.947867298578199, 2.4);
}

vec3 srgb2rgb(vec3 srgb) {
    return vec3(srgb2rgb(srgb.r + SRGB_EPSILON),
                srgb2rgb(srgb.g + SRGB_EPSILON),                 srgb2rgb(srgb.b + SRGB_EPSILON));
}

vec4 srgb2rgb(vec4 srgb) {
    return vec4(srgb2rgb(srgb.rgb), srgb.a);
}

#endif

#if !defined(FNC_SATURATE) && !defined(saturate)
#define FNC_SATURATE
#define saturate(x) clamp(x, 0.0, 1.0)
#endif

#ifndef SRGB_EPSILON
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_RGB2SRGB
#define FNC_RGB2SRGB

// 1.0 / 2.4 = 0.4166666666666667
float rgb2srgb(float channel) {
    return (channel < 0.0031308) ? channel * 12.92 : 1.055 * pow(channel, 0.4166666666666667) - 0.055;
}

vec3 rgb2srgb(vec3 rgb) {
    return saturate(vec3(rgb2srgb(rgb.r - SRGB_EPSILON), rgb2srgb(rgb.g - SRGB_EPSILON), rgb2srgb(rgb.b - SRGB_EPSILON)));
}

vec4 rgb2srgb(vec4 rgb) {
    return vec4(rgb2srgb(rgb.rgb), rgb.a);
}

#endif

#ifndef FNC_MIXOKLAB
#define FNC_MIXOKLAB
vec3 mixOklab( vec3 colA, vec3 colB, float h ) {

    #ifdef MIXOKLAB_COLORSPACE_SRGB
    colA = srgb2rgb(colA);
    colB = srgb2rgb(colB);
    #endif

    const mat3 kCONEtoLMS = mat3(
         0.4121656120,  0.2118591070,  0.0883097947,
         0.5362752080,  0.6807189584,  0.2818474174,
         0.0514575653,  0.1074065790,  0.6302613616);
    const mat3 kLMStoCONE = mat3(
         4.0767245293, -1.2681437731, -0.0041119885,
        -3.3072168827,  2.6093323231, -0.7034763098,
         0.2307590544, -0.3411344290,  1.7068625689);

    // rgb to cone (arg of pow can't be negative)
    vec3 lmsA = pow( kCONEtoLMS * colA, vec3(1.0/3.0) );
    vec3 lmsB = pow( kCONEtoLMS * colB, vec3(1.0/3.0) );
    // lerp
    vec3 lms = mix( lmsA, lmsB, h );

    // cone to rgb
    vec3 rgb = kLMStoCONE*(lms*lms*lms);

    #ifdef MIXOKLAB_COLORSPACE_SRGB
    return rgb2srgb(rgb);
    #else
    return rgb;
    #endif
}

vec4 mixOklab( vec4 colA, vec4 colB, float h ) {
    return vec4( mixOklab(colA.rgb, colB.rgb, h), mix(colA.a, colB.a, h) );
}
#endif
mat2 Rot(float a)
{
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 hash( vec2 p )
{
    p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
	return fract(sin(p)*43758.5453);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
	return 0.5 + 0.5*n;
}

void main(){

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    float ratio = u_resolution.x / u_resolution.y;

    vec2 tuv = uv;
    tuv -= .5;

    //animation
    float speed = u_time * 10. * u_animate_speed;
    if(u_animate == false){
      speed = 0.0;
    }

    // rotate with Noise
    float degree = noise(vec2(speed/100.0, tuv.x*tuv.y));

    tuv.y *= 1./ratio;
    tuv *= Rot(radians((degree-.5)*720.+180.));
	tuv.y *= ratio;

    // Wave warp with sin
    float frequency = 20. * u_frequency;
    float amplitude = 30. * (10.*(0.01+u_blur));

    tuv.x += sin(tuv.y*frequency+speed)/amplitude;
   	tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);


    // draw the image
    vec4 layer1 = mixOklab(u_colors[0], u_colors[1], S(-.3, .2, (tuv*Rot(radians(-5.))).x));
    vec4 layer2 = mixOklab(u_colors[2], u_colors[3], S(-.3, .2, (tuv*Rot(radians(-5.))).x));

    vec4 finalComp = mixOklab(layer1, layer2, S(.5, -.3, tuv.y));


    gl_FragColor = finalComp;

}
`,
            vertexShader: `// Vertex shader
                void main() {
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            uniforms: {
                u_colors: {value: [new THREE.Vector4(colors[0][0]/255,colors[0][1]/255,colors[0][2]/255,1),new THREE.Vector4(colors[1][0]/255,colors[1][1]/255,colors[1][2]/255,1),new THREE.Vector4(colors[2][0]/255,colors[2][1]/255,colors[2][2]/255,1),new THREE.Vector4(colors[3][0]/255,colors[3][1]/255,colors[3][2]/255,1)]},
                u_blur: {value: 0.646},
                u_animate: {value: true},
                u_animate_speed: {value: 0.5},
                u_frequency: {value: 0.282},
                u_time: {value: 0},
                u_mouse: {value: [0, 0]},
                u_resolution: {value: [720,1280]}
            },
            wireframe: false,
            wireframeLinewidth: 0,
            dithering: false,
            flatShading: true,
            doubleSided: true,
            glslVersion: "100"
        })
    );
}

export const Gradient = (props) => {
    return <Canvas
        gl={{
            preserveDrawingBuffer: true,
            premultipliedAlpha: false,
            alpha: true,
            transparent: true,
            antialias: true,
            precision: "highp",
            powerPreference: "high-performance"
        }}
        dpr={[1, 1]}
        camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 5]
        }}
        className={props.className}
    >
        <TextureMesh/>
    </Canvas>
}
