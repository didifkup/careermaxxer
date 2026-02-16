"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float t = uTime * 0.15;
    float wave = sin(uv.x * 3.0 + t) * 0.04 + sin(uv.y * 2.5 + t * 1.1) * 0.03;
    float v = 0.92 + wave;
    gl_FragColor = vec4(v * 0.96, v * 0.98, 1.0, 0.4);
  }
`;

export function WaveBackground({
  resolutionScale = 1,
}: {
  resolutionScale?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let rafId = 0;
    let startTime = 0;
    let resizeObs: ResizeObserver | null = null;
    let renderer: { setSize: (w: number, h: number) => void; gl: WebGLRenderingContext | WebGL2RenderingContext; render: (opts: { scene: unknown; frustumCull?: boolean }) => void } | null = null;
    let program: { uniforms: { uTime: { value: number }; uResolution: { value: Float32Array } } } | null = null;
    let mesh: unknown = null;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const scale = typeof resolutionScale === "number" ? resolutionScale : 1;
      const w = Math.max(1, Math.floor(rect.width * scale));
      const h = Math.max(1, Math.floor(rect.height * scale));
      if (renderer && program) {
        renderer.setSize(w, h);
        program.uniforms.uResolution.value[0] = w;
        program.uniforms.uResolution.value[1] = h;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      } else {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }
    };

    let cancelled = false;
    (async () => {
      try {
        const ogl = await import("ogl");
        if (cancelled) return;
        const { Renderer, Geometry, Program, Mesh } = ogl;
        const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true }) ?? canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
        if (!gl || cancelled) return;

        const glForOgl = gl as InstanceType<typeof Renderer>["gl"];
        renderer = new Renderer({ canvas, width: 1, height: 1, alpha: true, dpr: 1 }) as unknown as typeof renderer;
        const geo = new Geometry(glForOgl, {
          position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
        });
        const prog = new Program(glForOgl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          transparent: true,
          depthTest: false,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new Float32Array([1, 1]) },
          },
        });
        program = prog as unknown as typeof program;
        mesh = new Mesh(glForOgl, { geometry: geo, program: prog });
        if (cancelled) return;

        resize();
        startTime = performance.now();

        const tick = () => {
          if (cancelled || !program || !renderer) return;
          program.uniforms.uTime.value = (performance.now() - startTime) * 0.001;
          renderer.render({ scene: mesh, frustumCull: false });
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener("resize", resize);
        resizeObs = new ResizeObserver(() => resize());
        resizeObs.observe(parent);
        requestAnimationFrame(() => resize());
      } catch {
        // fail gracefully
      }
    })();

    return () => {
      cancelled = true;
      resizeObs?.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      if (renderer?.gl) {
        try {
          (renderer.gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
        } catch {
          // ignore
        }
      }
    };
  }, [resolutionScale]);

  return (
    <canvas
      aria-hidden="true"
      ref={ref}
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
