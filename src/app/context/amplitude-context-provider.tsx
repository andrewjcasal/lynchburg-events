"use client";
import { useEffect } from "react";
import { init, track } from "@amplitude/analytics-browser";
import { AmplitudeContext } from "./amplitude-context";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string;

interface AmplitudeContextProviderProps {
  children: React.ReactNode;
}

const AmplitudeContextProvider = ({
  children,
}: AmplitudeContextProviderProps) => {
  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
      autocapture: true,
    });
  }, []);

  const trackAmplitudeEvent = (
    eventName: string,
    eventProperties: Record<string, any>
  ) => {
    track(eventName, eventProperties);
  };

  const value = { trackAmplitudeEvent };

  return (
    <AmplitudeContext.Provider value={value}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
