"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const MAX_DURATION_SEC = 120;

export function RecorderCard({
  onRecorded,
  onMaxDurationReached,
  disabled,
}: {
  onRecorded: (blob: Blob, durationSeconds: number) => void;
  onMaxDurationReached?: () => void;
  disabled?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== "inactive") {
      mr.stop();
    }
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setRecording(false);
  }, [stream]);

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    if (!recording) return;
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        secondsRef.current = next;
        if (next >= MAX_DURATION_SEC) {
          onMaxDurationReached?.();
          stopRecording();
          return MAX_DURATION_SEC;
        }
        return next;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording, stopRecording, onMaxDurationReached]);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      setSeconds(0);
      secondsRef.current = 0;
      chunksRef.current = [];
      const mr = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        onRecorded(blob, secondsRef.current);
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };
      mr.start(1000);
      setRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStop = () => {
    stopRecording();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <GlassCard className="overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5">
      <div className="p-5">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-black/5 bg-slate-900">
          {stream && recording ? (
            <video
              autoPlay
              muted
              playsInline
              ref={(el) => {
                if (el) el.srcObject = stream;
              }}
              className="h-full w-full object-cover"
            />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              Camera preview will appear when you start recording
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {recording && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                {formatTime(seconds)} / {MAX_DURATION_SEC}s
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {!recording && !videoUrl && (
              <button
                type="button"
                onClick={startRecording}
                disabled={disabled}
                className={cn(
                  "rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] disabled:opacity-60"
                )}
              >
                Record
              </button>
            )}
            {recording && (
              <button
                type="button"
                onClick={handleStop}
                className="rounded-2xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-600"
              >
                Stop
              </button>
            )}
            {videoUrl && !recording && (
              <button
                type="button"
                onClick={() => {
                  if (videoUrl) URL.revokeObjectURL(videoUrl);
                  setVideoUrl(null);
                }}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Retake
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
