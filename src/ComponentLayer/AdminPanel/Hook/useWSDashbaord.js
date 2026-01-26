import { useEffect, useRef, useState, useCallback } from "react";

const WS_BASE = import.meta.env.VITE_API_URL_WEBSOCKET; // ws://localhost:8070/

export default function useWSDashboard() {
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const [data, setData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);

    const connect = useCallback(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("No token found");
            return;
        }

        // Clear any existing connection
        if (wsRef.current) {
            wsRef.current.close();
        }

        const wsUrl = `${WS_BASE}dashboard?token=${encodeURIComponent(token)}`;
        console.log("🔌 Connecting to WebSocket:", wsUrl);

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("✅ WebSocket connected");
            setConnected(true);
            setError(null);
            // Clear reconnect timeout if successful
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        };

        ws.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                setData(parsed);
            } catch (e) {
                console.error("❌ WS JSON parse error:", e, event.data);
            }
        };

        ws.onerror = (e) => {
            console.error("❌ WebSocket error:", e);
            setError("WebSocket error");
        };

        ws.onclose = (e) => {
            console.log("🔌 WebSocket closed:", e.reason);
            setConnected(false);

            // Auto-reconnect after 3 seconds
            if (!reconnectTimeoutRef.current) {
                reconnectTimeoutRef.current = setTimeout(() => {
                    reconnectTimeoutRef.current = null;
                    connect();
                }, 3000);
            }
        };
    }, []);

    useEffect(() => {
        connect();
        return () => {
            if (wsRef.current) wsRef.current.close();
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        };
    }, [connect]);

    return { data, connected, error };
}
