import axios from "axios";

export const fetchRoute = async (
    start: [number, number],
    end: [number, number]
) => {
    const url =
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
    const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjVjYjlkYWMwOThjMzQ1MTJhMTdkMWNhOTJhMzNhYzkyIiwiaCI6Im11cm11cjY0In0="; // ORS free API key

    const response = await axios.post(
        url,
        {
            coordinates: [
                [start[1], start[0]], // ORS uses [lon, lat]
                [end[1], end[0]],
            ],
        },
        {
            headers: { Authorization: apiKey },
        }
    );

    return response.data; // GeoJSON
};
