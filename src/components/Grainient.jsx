'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Grainient.css';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const rgbStringToRgb = value => {
  const match = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (!match) return null;
  return [
    Math.max(0, Math.min(255, Number(match[1]))) / 255,
    Math.max(0, Math.min(255, Number(match[2]))) / 255,
    Math.max(0, Math.min(255, Number(match[3]))) / 255
  ];
};

const parsePercentOrUnit = raw => {
  const value = raw.trim();
  if (value.endsWith('%')) return Math.max(0, Math.min(1, Number(value.slice(0, -1)) / 100));
  return Number(value);
};

const linearToSrgb = value => (
  value <= 0.0031308 ? 12.92 * value : (1.055 * (value ** (1 / 2.4))) - 0.055
);

const parseOklchToRgb = value => {
  const normalized = value.trim().replace(/,/g, ' ');
  const match = normalized.match(
    /^oklch\(\s*([+-]?\d*\.?\d+%?)\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)(deg|rad|turn)?(?:\s*\/\s*[+-]?\d*\.?\d+%?)?\s*\)$/i
  );
  if (!match) return null;

  const lRaw = parsePercentOrUnit(match[1]);
  const c = Number(match[2]);
  const hRaw = Number(match[3]);
  const hUnit = (match[4] || 'deg').toLowerCase();

  if (!Number.isFinite(lRaw) || !Number.isFinite(c) || !Number.isFinite(hRaw)) return null;

  const l = match[1].includes('%') ? lRaw : Math.max(0, Math.min(1, lRaw));
  const hueRad =
    hUnit === 'rad' ? hRaw :
      hUnit === 'turn' ? hRaw * Math.PI * 2 :
        (hRaw * Math.PI) / 180;

  const a = c * Math.cos(hueRad);
  const b = c * Math.sin(hueRad);

  const lComp = l + (0.3963377774 * a) + (0.2158037573 * b);
  const mComp = l - (0.1055613458 * a) - (0.0638541728 * b);
  const sComp = l - (0.0894841775 * a) - (1.291485548 * b);

  const lLinear = lComp ** 3;
  const mLinear = mComp ** 3;
  const sLinear = sComp ** 3;

  const rLinear = (4.0767416621 * lLinear) - (3.3077115913 * mLinear) + (0.2309699292 * sLinear);
  const gLinear = (-1.2684380046 * lLinear) + (2.6097574011 * mLinear) - (0.3413193965 * sLinear);
  const bLinear = (-0.0041960863 * lLinear) - (0.7034186147 * mLinear) + (1.707614701 * sLinear);

  return [
    Math.max(0, Math.min(1, linearToSrgb(rLinear))),
    Math.max(0, Math.min(1, linearToSrgb(gLinear))),
    Math.max(0, Math.min(1, linearToSrgb(bLinear)))
  ];
};

const cssColorToRgb = color => {
  if (typeof color !== 'string' || color.trim().length === 0) return hexToRgb('#2B3DEA');

  const trimmed = color.trim();
  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(trimmed);
  if (hexMatch) return hexToRgb(trimmed);

  const oklchRgb = parseOklchToRgb(trimmed);
  if (oklchRgb) return oklchRgb;

  if (typeof document === 'undefined') return hexToRgb('#2B3DEA');
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return hexToRgb('#2B3DEA');

  const fallback = '#2B3DEA';
  ctx.fillStyle = fallback;
  ctx.fillStyle = trimmed;
  const resolved = ctx.fillStyle;

  if (typeof resolved !== 'string') return hexToRgb(fallback);
  if (resolved.startsWith('#')) return hexToRgb(resolved);
  const rgb = rgbStringToRgb(resolved);
  return rgb || hexToRgb(fallback);
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

let sharedRuntime = null;

const lerp = (a, b, t) => a + (b - a) * t;
const COLOR_LERP_FACTOR = 0.06;
const WARP_SPEED_LERP_FACTOR = 0.14;
const TRANSITION_WARP_SPEED_FACTOR = 0.78;
const MAX_FRAME_DELTA_SECONDS = 1 / 30;

const isPageTransitionActive = () => {
  const region = document.querySelector('.page-transition');
  if (!region) return false;
  return (
    region.classList.contains('page-transition-leave') ||
    region.classList.contains('page-transition-enter-start') ||
    region.classList.contains('page-transition-enter')
  );
};

const ensureSharedRuntime = initial => {
  if (sharedRuntime) return sharedRuntime;

  const renderer = new Renderer({
    webgl: 2,
    alpha: true,
    antialias: false,
    dpr: Math.min(window.devicePixelRatio || 1, 2)
  });

  const gl = renderer.gl;
  const canvas = gl.canvas;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Float32Array([1, 1]) },
      uTimeSpeed: { value: initial.timeSpeed },
      uColorBalance: { value: initial.colorBalance },
      uWarpStrength: { value: initial.warpStrength },
      uWarpFrequency: { value: initial.warpFrequency },
      uWarpSpeed: { value: initial.warpSpeed },
      uWarpAmplitude: { value: initial.warpAmplitude },
      uBlendAngle: { value: initial.blendAngle },
      uBlendSoftness: { value: initial.blendSoftness },
      uRotationAmount: { value: initial.rotationAmount },
      uNoiseScale: { value: initial.noiseScale },
      uGrainAmount: { value: initial.grainAmount },
      uGrainScale: { value: initial.grainScale },
      uGrainAnimated: { value: initial.grainAnimated ? 1.0 : 0.0 },
      uContrast: { value: initial.contrast },
      uGamma: { value: initial.gamma },
      uSaturation: { value: initial.saturation },
      uCenterOffset: { value: new Float32Array([initial.centerX, initial.centerY]) },
      uZoom: { value: initial.zoom },
      uColor1: { value: new Float32Array(cssColorToRgb(initial.color1)) },
      uColor2: { value: new Float32Array(cssColorToRgb(initial.color2)) },
      uColor3: { value: new Float32Array(cssColorToRgb(initial.color3)) }
    }
  });
  const mesh = new Mesh(gl, { geometry, program });

  sharedRuntime = {
    renderer,
    gl,
    canvas,
    program,
    mesh,
    raf: 0,
    lastFrameTs: null,
    accumulatedTimeSeconds: 0,
    width: 0,
    height: 0,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    attachCount: 0,
    baseWarpSpeed: initial.warpSpeed,
    targetColor1: cssColorToRgb(initial.color1),
    targetColor2: cssColorToRgb(initial.color2),
    targetColor3: cssColorToRgb(initial.color3)
  };

  return sharedRuntime;
};

const setRuntimeSize = (runtime, container) => {
  const rect = container.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const sizeChanged = width !== runtime.width || height !== runtime.height || dpr !== runtime.dpr;
  if (!sizeChanged) {
    if (container.dataset.resizeSnapshot === 'true') {
      container.style.removeProperty('background-image');
      container.style.removeProperty('background-size');
      container.style.removeProperty('background-position');
      container.style.removeProperty('background-repeat');
      container.dataset.resizeSnapshot = 'false';
    }
    return;
  }

  runtime.width = width;
  runtime.height = height;
  runtime.dpr = dpr;
  runtime.renderer.dpr = dpr;
  runtime.renderer.setSize(width, height);
  const res = runtime.program.uniforms.iResolution.value;
  res[0] = runtime.gl.drawingBufferWidth;
  res[1] = runtime.gl.drawingBufferHeight;

  // During window resize some browsers pause RAF briefly; draw immediately so the
  // canvas never appears transparent and reveals the section fallback color.
  runtime.renderer.render({ scene: runtime.mesh });

  if (container.dataset.resizeSnapshot === 'true') {
    container.style.removeProperty('background-image');
    container.style.removeProperty('background-size');
    container.style.removeProperty('background-position');
    container.style.removeProperty('background-repeat');
    container.dataset.resizeSnapshot = 'false';
  }
};

const applyRuntimeTargets = (runtime, settings) => {
  const uniforms = runtime.program.uniforms;

  uniforms.uTimeSpeed.value = settings.timeSpeed;
  uniforms.uColorBalance.value = settings.colorBalance;
  uniforms.uWarpStrength.value = settings.warpStrength;
  uniforms.uWarpFrequency.value = settings.warpFrequency;
  uniforms.uWarpAmplitude.value = settings.warpAmplitude;
  uniforms.uBlendAngle.value = settings.blendAngle;
  uniforms.uBlendSoftness.value = settings.blendSoftness;
  uniforms.uRotationAmount.value = settings.rotationAmount;
  uniforms.uNoiseScale.value = settings.noiseScale;
  uniforms.uGrainAmount.value = settings.grainAmount;
  uniforms.uGrainScale.value = settings.grainScale;
  uniforms.uGrainAnimated.value = settings.grainAnimated ? 1.0 : 0.0;
  uniforms.uContrast.value = settings.contrast;
  uniforms.uGamma.value = settings.gamma;
  uniforms.uSaturation.value = settings.saturation;
  uniforms.uCenterOffset.value[0] = settings.centerX;
  uniforms.uCenterOffset.value[1] = settings.centerY;
  uniforms.uZoom.value = settings.zoom;

  runtime.baseWarpSpeed = settings.warpSpeed;
  runtime.targetColor1 = cssColorToRgb(settings.color1);
  runtime.targetColor2 = cssColorToRgb(settings.color2);
  runtime.targetColor3 = cssColorToRgb(settings.color3);
};

const startRuntimeLoop = runtime => {
  if (runtime.raf) return;

  const loop = t => {
    if (runtime.lastFrameTs === null) {
      runtime.lastFrameTs = t;
    }

    const rawDeltaSeconds = Math.max(0, (t - runtime.lastFrameTs) * 0.001);
    const clampedDeltaSeconds = Math.min(rawDeltaSeconds, MAX_FRAME_DELTA_SECONDS);
    runtime.lastFrameTs = t;
    runtime.accumulatedTimeSeconds += clampedDeltaSeconds;
    runtime.program.uniforms.iTime.value = runtime.accumulatedTimeSeconds;

    const desiredWarpSpeed = isPageTransitionActive()
      ? runtime.baseWarpSpeed * TRANSITION_WARP_SPEED_FACTOR
      : runtime.baseWarpSpeed;
    runtime.program.uniforms.uWarpSpeed.value = lerp(
      runtime.program.uniforms.uWarpSpeed.value,
      desiredWarpSpeed,
      WARP_SPEED_LERP_FACTOR
    );

    const color1 = runtime.program.uniforms.uColor1.value;
    const color2 = runtime.program.uniforms.uColor2.value;
    const color3 = runtime.program.uniforms.uColor3.value;
    for (let i = 0; i < 3; i += 1) {
      color1[i] = lerp(color1[i], runtime.targetColor1[i], COLOR_LERP_FACTOR);
      color2[i] = lerp(color2[i], runtime.targetColor2[i], COLOR_LERP_FACTOR);
      color3[i] = lerp(color3[i], runtime.targetColor3[i], COLOR_LERP_FACTOR);
    }

    runtime.renderer.render({ scene: runtime.mesh });
    runtime.raf = requestAnimationFrame(loop);
  };

  runtime.raf = requestAnimationFrame(loop);
};

const Grainient = ({
  timeSpeed = 0.25,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.1,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  color1 = '#FF9FFC',
  color2 = '#5227FF',
  color3 = '#B19EEF',
  className = ''
}) => {
  const containerRef = useRef(null);
  const runtimeRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const runtime = runtimeRef.current || sharedRuntime;
    if (!runtime) return;

    const resetFrameClock = () => {
      runtime.lastFrameTs = null;
    };

    document.addEventListener('visibilitychange', resetFrameClock);
    window.addEventListener('focus', resetFrameClock);

    return () => {
      document.removeEventListener('visibilitychange', resetFrameClock);
      window.removeEventListener('focus', resetFrameClock);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const runtime = ensureSharedRuntime({
      timeSpeed,
      colorBalance,
      warpStrength,
      warpFrequency,
      warpSpeed,
      warpAmplitude,
      blendAngle,
      blendSoftness,
      rotationAmount,
      noiseScale,
      grainAmount,
      grainScale,
      grainAnimated,
      contrast,
      gamma,
      saturation,
      centerX,
      centerY,
      zoom,
      color1,
      color2,
      color3
    });
    runtimeRef.current = runtime;

    const container = containerRef.current;
    container.style.opacity = '0';
    container.style.transition = 'opacity 520ms cubic-bezier(0.22, 1, 0.36, 1)';
    applyRuntimeTargets(runtime, {
      timeSpeed,
      colorBalance,
      warpStrength,
      warpFrequency,
      warpSpeed,
      warpAmplitude,
      blendAngle,
      blendSoftness,
      rotationAmount,
      noiseScale,
      grainAmount,
      grainScale,
      grainAnimated,
      contrast,
      gamma,
      saturation,
      centerX,
      centerY,
      zoom,
      color1,
      color2,
      color3
    });

    container.appendChild(runtime.canvas);
    runtime.attachCount += 1;

    const ro = new ResizeObserver(() => setRuntimeSize(runtime, container));
    resizeObserverRef.current = ro;
    ro.observe(container);
    setRuntimeSize(runtime, container);
    startRuntimeLoop(runtime);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.style.opacity = '1';
      });
    });

    let resizeSnapshotTimer = 0;
    const onWindowResize = () => {
      // Preserve the last frame immediately at resize start to avoid a visible
      // flash of the section fallback color before the resized frame is drawn.
      if (container.dataset.resizeSnapshot !== 'true') {
        try {
          container.style.backgroundImage = `url(${runtime.canvas.toDataURL('image/png')})`;
          container.style.backgroundSize = 'cover';
          container.style.backgroundPosition = 'center';
          container.style.backgroundRepeat = 'no-repeat';
          container.dataset.resizeSnapshot = 'true';
        } catch {
          // Ignore snapshot failures (cross-origin or memory pressure).
        }
      }

      window.clearTimeout(resizeSnapshotTimer);
      resizeSnapshotTimer = window.setTimeout(() => {
        if (container.dataset.resizeSnapshot === 'true') {
          container.style.removeProperty('background-image');
          container.style.removeProperty('background-size');
          container.style.removeProperty('background-position');
          container.style.removeProperty('background-repeat');
          container.dataset.resizeSnapshot = 'false';
        }
      }, 180);

      setRuntimeSize(runtime, container);
    };
    window.addEventListener('resize', onWindowResize, { passive: true });

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      window.removeEventListener('resize', onWindowResize);
      window.clearTimeout(resizeSnapshotTimer);
      if (container.dataset.resizeSnapshot === 'true') {
        container.style.removeProperty('background-image');
        container.style.removeProperty('background-size');
        container.style.removeProperty('background-position');
        container.style.removeProperty('background-repeat');
        container.dataset.resizeSnapshot = 'false';
      }
      container.style.removeProperty('opacity');
      container.style.removeProperty('transition');
      runtime.attachCount = Math.max(0, runtime.attachCount - 1);
      // Keep the shared loop alive to avoid restart flicker between route swaps.
    };
    // Intentionally mount once; shared runtime receives prop updates below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const runtime = runtimeRef.current || sharedRuntime;
    if (!runtime) return;
    applyRuntimeTargets(runtime, {
      timeSpeed,
      colorBalance,
      warpStrength,
      warpFrequency,
      warpSpeed,
      warpAmplitude,
      blendAngle,
      blendSoftness,
      rotationAmount,
      noiseScale,
      grainAmount,
      grainScale,
      grainAnimated,
      contrast,
      gamma,
      saturation,
      centerX,
      centerY,
      zoom,
      color1,
      color2,
      color3
    });
  }, [
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3
  ]);

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} />;
};

export default Grainient;
