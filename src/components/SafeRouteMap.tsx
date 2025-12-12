import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";

// Define the structure of your safe route JSON
interface SafePoint {
    lat: number;
    lon: number;
}

interface SafeRouteResponse {
    points: SafePoint[];
}

const SafeRouteMap: React.FC = () => {
    const mapRef = useRef<L.Map | null>(null);
    const [routePoints, setRoutePoints] = useState<SafePoint[]>([]);

    // Fetch safe route points from your API
    const loadSafePoints = async () => {
        try {
            const response = await fetch("/safe-route.json"); // Replace with your API endpoint
            if (!response.ok)
                throw new Error("Failed to fetch safe route points");
            const data: SafeRouteResponse = await response.json();
            setRoutePoints(data.points);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadSafePoints();
    }, []);

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize map
            mapRef.current = L.map("map", {
                center: [6.5244, 3.3792], // Default to Lagos
                zoom: 12,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);
        }

        if (routePoints.length > 0 && mapRef.current) {
            // Clear existing layers
            mapRef.current.eachLayer((layer) => {
                if ((layer as any)._url === undefined) layer.remove();
            });

            // Create polyline
            const latlngs = routePoints.map(
                (p) => [p.lat, p.lon] as [number, number]
            );
            const polyline = L.polyline(latlngs, {
                color: "green",
                weight: 5,
            }).addTo(mapRef.current);

            // Fit map to route bounds
            mapRef.current.fitBounds(polyline.getBounds());

            // Add arrow decorators
            // @ts-ignore
            L.polylineDecorator(polyline, {
                patterns: [
                    {
                        offset: "5%",
                        repeat: "20%",
                        // @ts-ignore
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 10,
                            pathOptions: { color: "green", fillOpacity: 1 },
                        }),
                    },
                ],
            }).addTo(mapRef.current);
        }
    }, [routePoints]);

    return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default SafeRouteMap;
