"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, Pause, RotateCcw, ExternalLink } from "lucide-react";

interface Segment {
  label: string;
  duration: number; // s
  speed: number; // m/s
}

const DEFAULT_SEGMENTS: Segment[] = [
  { label: "A", duration: 4, speed: 0 },
  { label: "B", duration: 6, speed: 3 },
  { label: "C", duration: 4, speed: 6 },
];

const SEGMENT_COLORS = ["#1d4ed8", "#059669", "#D32F2F"];

// Graph geometry (SVG units)
const W = 640;
const H = 300;
const PAD_L = 50;
const PAD_R = 20;
const PAD_T = 20;
const PAD_B = 40;

/** Distance travelled at time t for a piecewise constant-speed journey. */
function distanceAt(segments: Segment[], t: number) {
  let elapsed = 0;
  let dist = 0;
  for (const s of segments) {
    if (t <= elapsed + s.duration) return dist + s.speed * (t - elapsed);
    elapsed += s.duration;
    dist += s.speed * s.duration;
  }
  return dist;
}

export default function InteractiveTab() {
  const [segments, setSegments] = useState<Segment[]>(DEFAULT_SEGMENTS);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<number | null>(null);

  const totalTime = segments.reduce((sum, s) => sum + s.duration, 0);
  const totalDist = segments.reduce((sum, s) => sum + s.speed * s.duration, 0);
  const currentDist = distanceAt(segments, time);

  // Axes rescale so the whole journey always fits, in steps of 6 gridlines
  const maxDist = Math.max(60, Math.ceil(totalDist / 60) * 60);
  const maxTime = Math.max(10, Math.ceil(totalTime / 5) * 5);
  const tx = (t: number) => PAD_L + (t / maxTime) * (W - PAD_L - PAD_R);
  const dy = (d: number) => H - PAD_B - (d / maxDist) * (H - PAD_T - PAD_B);

  const activeIndex = useMemo(() => {
    let elapsed = 0;
    for (let i = 0; i < segments.length; i++) {
      elapsed += segments[i].duration;
      if (time < elapsed) return i;
    }
    return segments.length - 1;
  }, [segments, time]);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setTime((t) => {
        const next = t + dt * 2; // 2x real time
        if (next >= totalTime) {
          setPlaying(false);
          return totalTime;
        }
        return next;
      });
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [playing, totalTime]);

  const updateSegment = (i: number, key: "duration" | "speed", value: number) => {
    setSegments((segs) => segs.map((s, j) => (j === i ? { ...s, [key]: value } : s)));
    setTime(0);
    setPlaying(false);
  };

  const togglePlay = () => {
    if (time >= totalTime) setTime(0);
    setPlaying((p) => !p);
  };

  const reset = () => {
    setSegments(DEFAULT_SEGMENTS);
    setTime(0);
    setPlaying(false);
  };

  // Segment start points for drawing lines
  const points = segments.reduce<{ t: number; d: number }[]>(
    (acc, s) => {
      const prev = acc[acc.length - 1];
      return [...acc, { t: prev.t + s.duration, d: prev.d + s.speed * s.duration }];
    },
    [{ t: 0, d: 0 }]
  );

  const active = segments[activeIndex];

  return (
    <div>
      <div className="border-b border-gray-200 pb-4 mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-[10px] bg-blue-900 text-white font-mono uppercase px-1.5 py-0.5">Interactive Lab</span>
          <h2 className="text-xl font-bold text-blue-900 mt-1">Build a Distance-Time Graph</h2>
          <p className="text-xs text-gray-500">
            Set the speed and duration of each phase, then play the journey and watch the gradient match the speed.
          </p>
        </div>
        <Link
          href="/interactives/physics-motion-graphs"
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
        >
          Open full Motion Graphs lab <ExternalLink size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph + track */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-gray-200 rounded-lg p-3 bg-white">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none font-sans">
              {/* Grid */}
              {Array.from({ length: maxTime / 5 + 1 }, (_, k) => k * 5).map((t) => (
                <g key={`t${t}`}>
                  <line x1={tx(t)} y1={PAD_T} x2={tx(t)} y2={H - PAD_B} stroke="#f3f4f6" />
                  <text x={tx(t)} y={H - PAD_B + 16} fontSize="10" fill="#6b7280" textAnchor="middle" fontFamily="monospace">
                    {t}
                  </text>
                </g>
              ))}
              {[0, 1, 2, 3, 4, 5, 6].map((k) => (k * maxDist) / 6).map((d) => (
                <g key={`d${d}`}>
                  <line x1={PAD_L} y1={dy(d)} x2={W - PAD_R} y2={dy(d)} stroke="#f3f4f6" />
                  <text x={PAD_L - 8} y={dy(d) + 3} fontSize="10" fill="#6b7280" textAnchor="end" fontFamily="monospace">
                    {d}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#111827" strokeWidth="2" />
              <line x1={PAD_L} y1={H - PAD_B} x2={PAD_L} y2={PAD_T} stroke="#111827" strokeWidth="2" />
              <text x={W - PAD_R} y={H - 6} fontSize="11" fill="#6b7280" textAnchor="end" fontFamily="monospace">time / s</text>
              <text x={PAD_L + 6} y={PAD_T + 10} fontSize="11" fill="#6b7280" fontFamily="monospace">distance / m</text>

              {/* Full planned journey (faint) */}
              {segments.map((s, i) => (
                <line
                  key={`plan${i}`}
                  x1={tx(points[i].t)}
                  y1={dy(points[i].d)}
                  x2={tx(points[i + 1].t)}
                  y2={dy(points[i + 1].d)}
                  stroke={SEGMENT_COLORS[i]}
                  strokeWidth="2"
                  strokeOpacity="0.2"
                />
              ))}

              {/* Traced journey so far */}
              {segments.map((s, i) => {
                if (time <= points[i].t) return null;
                const endT = Math.min(time, points[i + 1].t);
                return (
                  <line
                    key={`trace${i}`}
                    x1={tx(points[i].t)}
                    y1={dy(points[i].d)}
                    x2={tx(endT)}
                    y2={dy(distanceAt(segments, endT))}
                    stroke={SEGMENT_COLORS[i]}
                    strokeWidth="3"
                  />
                );
              })}

              {/* Segment labels */}
              {segments.map((s, i) => (
                <text
                  key={`lbl${i}`}
                  x={(tx(points[i].t) + tx(points[i + 1].t)) / 2}
                  y={(dy(points[i].d) + dy(points[i + 1].d)) / 2 - 8}
                  fontSize="11"
                  fontWeight="bold"
                  fill={SEGMENT_COLORS[i]}
                  textAnchor="middle"
                >
                  {s.label}
                </text>
              ))}

              {/* Current point */}
              <circle cx={tx(time)} cy={dy(currentDist)} r="5" fill={SEGMENT_COLORS[activeIndex]} stroke="white" strokeWidth="2" />
            </svg>
          </div>

          {/* Motion track */}
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div className="relative h-10">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300" />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white shadow"
                style={{
                  left: `${Math.min(100, (currentDist / maxDist) * 100)}%`,
                  backgroundColor: SEGMENT_COLORS[activeIndex],
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span>0 m</span>
              <span>{maxDist} m</span>
            </div>
          </div>

          {/* Playback */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-2 rounded"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? "Pause" : "Play Journey"}
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-blue-700 text-gray-900 text-xs font-bold px-3 py-2 rounded bg-white"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <input
              type="range"
              min={0}
              max={totalTime}
              step={0.1}
              value={time}
              onChange={(e) => {
                setPlaying(false);
                setTime(Number(e.target.value));
              }}
              className="flex-1 min-w-[160px] accent-blue-700"
            />
            <span className="text-xs font-mono text-gray-500">t = {time.toFixed(1)} s</span>
          </div>
        </div>

        {/* Controls & readout */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="text-[10px] uppercase font-bold text-gray-500">Distance</div>
              <div className="text-lg font-bold text-blue-900 font-mono">{currentDist.toFixed(1)} m</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="text-[10px] uppercase font-bold text-gray-500">Speed (gradient)</div>
              <div className="text-lg font-bold font-mono" style={{ color: SEGMENT_COLORS[activeIndex] }}>
                {active.speed.toFixed(1)} m/s
              </div>
            </div>
          </div>

          {segments.map((s, i) => (
            <div
              key={s.label}
              className={`border rounded-lg p-3 space-y-2 ${i === activeIndex ? "border-blue-700 bg-blue-50/40" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: SEGMENT_COLORS[i] }}>
                  Phase {s.label}
                </span>
                <span className="text-[10px] font-mono text-gray-500">
                  {s.speed === 0 ? "at rest — flat line" : `gradient = ${s.speed * s.duration} ÷ ${s.duration}`}
                </span>
              </div>
              <label className="block text-[11px] text-gray-600">
                Speed: <span className="font-mono font-bold">{s.speed} m/s</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={s.speed}
                  onChange={(e) => updateSegment(i, "speed", Number(e.target.value))}
                  className="w-full accent-blue-700"
                />
              </label>
              <label className="block text-[11px] text-gray-600">
                Duration: <span className="font-mono font-bold">{s.duration} s</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={s.duration}
                  onChange={(e) => updateSegment(i, "duration", Number(e.target.value))}
                  className="w-full accent-blue-700"
                />
              </label>
            </div>
          ))}

          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs space-y-1">
            <span className="font-bold text-amber-900">Average speed for the whole journey</span>
            <p className="font-mono text-amber-900">
              {totalDist} m ÷ {totalTime} s = {(totalDist / totalTime).toFixed(2)} m/s
            </p>
            <p className="text-amber-800">
              Notice this is not the mean of the three speeds unless every phase lasts the same time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
