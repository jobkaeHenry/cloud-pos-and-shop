import { EventSourcePolyfillInit } from "event-source-polyfill";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useEffect } from "react";
import { getLS } from "../utils/localStorage";
import { ACCESSTOKEN } from "../const/localstorageKey";

interface useSSEProps {
  url: string;
  options?: EventSourcePolyfillInit;
  onOpen?: (this: EventSource, ev: Event) => any;
  onMessage?: (this: EventSource, ev: Event) => any;
  onError?: (this: EventSource, ev: Event) => any;
}

const useSSE = ({ url, options, onError, onMessage, onOpen }: useSSEProps) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${getLS(ACCESSTOKEN)}`,
      },
      heartbeatTimeout: 1000 * 30,
      ...options,
    });
    eventSource.onopen = onOpen;
    eventSource.onmessage = onMessage;
    eventSource.onerror = onError;
    return () => eventSource.close();
  }, []);
};

export default useSSE;
