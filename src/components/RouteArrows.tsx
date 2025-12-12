import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-polylinedecorator";

interface Props {
    coordinates: [number, number][];
}

export default function RouteArrows({ coordinates }: Props) {
    const map = useMap();

    useEffect(() => {
        if (!coordinates.length) return;

        const decorator = (L as any)
            .polylineDecorator(coordinates, {
                patterns: [
                    {
                        offset: "5%",
                        repeat: "10%",
                        symbol: (L as any).Symbol.arrowHead({
                            pixelSize: 10,
                            pathOptions: { color: "red", fillOpacity: 1 },
                        }),
                    },
                ],
            })
            .addTo(map);

        return () => decorator.remove();
    }, [coordinates, map]);

    return null;
}
