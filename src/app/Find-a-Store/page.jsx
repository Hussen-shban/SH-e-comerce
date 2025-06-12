"use client"
import { useEffect, useState, useRef } from "react";

import 'leaflet/dist/leaflet.css';
import Nav from "../components/Nav";
export default async function Contact() {
await new Promise((resolve) => setTimeout(resolve, 3000));
    // State for form inputs
    const [input, setInput] = useState({
        name: "",
        email: "",
        Subject: "",
        message: ""
    })

    // Refs to store map, user marker, and route line
    const mapRef = useRef(null);
    const userMarkerRef = useRef(null);
    const routeLineRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loadMap = async () => {
                const L = await import('leaflet');
                if (L.DomUtil.get('map') !== null && L.DomUtil.get('map')._leaflet_id) {
                    L.DomUtil.get('map')._leaflet_id = null;
                }
                // Initialize map with default center and zoom
                const map = L.map('map').setView([34.5138, 38.2765], 6);
                mapRef.current = map;

                // Add OpenStreetMap tile layer
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                    maxZoom: 19,
                    tileSize: 256,
                    detectRetina: true
                }).addTo(map);

                // Custom SVG icon for branches
                const customSvgIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#111111" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                // Coordinates of branches
                const branch1Coords = [34.82042, 36.11908]; // Homs branch
                const branch2Coords = [33.44290, 36.33179]; // Damascus branch

                // Add markers for branches with popup and flyTo on click
                const branchMarker1 = L.marker(branch1Coords, { icon: customSvgIcon }).addTo(map).bindPopup("Homs Branch");
                branchMarker1.on('click', () => map.flyTo(branch1Coords, 13, { duration: 1.5 }));

                const branchMarker2 = L.marker(branch2Coords, { icon: customSvgIcon }).addTo(map).bindPopup("Damascus Branch");
                branchMarker2.on('click', () => map.flyTo(branch2Coords, 13, { duration: 1.5 }));


            };

            loadMap();
        }
    }, []);

    // Calculate distance between two lat/lng points in km
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Handle user's location and show closest branch on map
    const handleLocate = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const userLatLng = [latitude, longitude];

            const branch1 = [34.82042, 36.11908];
            const branch2 = [33.44290, 36.33179];

            const distance1 = getDistance(latitude, longitude, ...branch1);
            const distance2 = getDistance(latitude, longitude, ...branch2);

            // Determine closest branch and distance
            const closestBranch = distance1 < distance2 ? branch1 : branch2;
            const distance = Math.min(distance1, distance2);

            const map = mapRef.current;
            if (!map) return;

            // Remove previous user marker and route line if any
            if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
            if (routeLineRef.current) map.removeLayer(routeLineRef.current);

            // Add marker for user's location
            userMarkerRef.current = L.marker(userLatLng).addTo(map).bindPopup('📍 Your current location').openPopup();

            // Draw polyline from user to closest branch
            routeLineRef.current = L.polyline([userLatLng, closestBranch], { color: 'red', weight: 3 }).addTo(map);

            // Fit map to show the route line fully
            map.fitBounds(routeLineRef.current.getBounds());

            // Popup on the closest branch showing distance
            L.popup()
                .setLatLng(closestBranch)
                .setContent(`📍 Closest branch is ${distance.toFixed(2)} km away`)
                .openOn(map);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    }



    return (
        <div>
            <Nav />
            <section className="bg-[#111111] overflow-hidden pt-[100px] pb-[40px]  max-sm:py-[80px] max-sm:pb-[10px]">

                <div>
                    {/* Map container */}
                    <div id="map" className="w-full h-[400px] mb-6"></div>
                    {/* Button to locate user */}
                    <button onClick={handleLocate} className="px-2 py-2 ml-5 text-white border-[1px] rounded-full border-white  gap-1 flex items-center">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12.56 20.82a.96.96 0 0 1-1.12 0C6.611 17.378 1.486 10.298 6.667 5.182A7.6 7.6 0 0 1 12 3c2 0 3.919.785 5.333 2.181c5.181 5.116.056 12.196-4.773 15.64" /><path d="M12 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4" /></g></svg>
                        <p>My Location</p>

                    </button>
                </div>


                <div className="px-28 max-sm:px-2 ">
                    {/* Contact info header */}
                    <div className="p-[15px] flex flex-col items-center justify-center text-white">
                        <p className="text-[48px] font-mediu text-center">Get In Touch</p>
                    </div>

                    {/* Contact info cards */}
                    <div className="mt-[15px] flex sm:items-center sm:justify-center gap-10 max-sm:flex-col">
                        <div className="h-[220px] flex-grow bg-[#3f3b3b] rounded-[5px] p-[30px] text-white flex flex-col items-center justify-center">
                            <svg className="w-[2.25rem] h-[2.25rem] mb-[1.25rem]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12.56 20.82a.96.96 0 0 1-1.12 0C6.611 17.378 1.486 10.298 6.667 5.182A7.6 7.6 0 0 1 12 3c2 0 3.919.785 5.333 2.181c5.181 5.116.056 12.196-4.773 15.64" /><path d="M12 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4" /></g></svg>
                            <p className="text-[15px] mb-[8px] font-[500]">102 Street 2714 Donovan</p>
                            <p className="text-[14px] text-center">Lorem ipsum dolor sit amet, consectetur</p>
                        </div>

                        <div className="h-[220px] flex-grow bg-[#3f3b3b] rounded-[5px] p-[30px] text-white flex flex-col items-center justify-center">
                            <svg className="w-[2.25rem] h-[2.25rem] mb-[1.25rem]" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5" /></svg>
                            <p className="text-[15px] text-center mb-[8px] font-[500]">+963 934865509</p>
                            <p className="text-[14px] text-center">Lorem ipsum dolor sit amet, consectetur</p>
                        </div>

                        <div className="h-[220px] flex-grow bg-[#3f3b3b] rounded-[5px] p-[30px] text-white flex flex-col items-center justify-center">
                            <svg className="w-[2.25rem] h-[2.25rem] mb-[1.25rem]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#fff" fillRule="evenodd" d="M14.95 3.684L8.637 8.912a1 1 0 0 1-1.276 0l-6.31-5.228A1 1 0 0 0 1 4v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-.05-.316M2 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m-.21 1l5.576 4.603a1 1 0 0 0 1.27.003L14.268 3z" /></svg>
                            <p className="text-[15px] mb-[8px] font-[500]">info@example.com</p>
                            <p className="text-[14px] text-center">Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                    </div>

                    {/* Contact form section */}
                    <div className="py-[60px] mt-[40px] bg-[#3f3b3b] flex items-center justify-center flex-col px-32 max-md:px-4 max-sm:py-[10px] ">
                        <div className="w-fit p-[15px] flex flex-col items-center justify-center text-white pb-[60px] mb-[52px] max-sm:pb-[30px] max-sm:mb-[32px]">
                            <p className="text-[48px] max-sm:text-[32px] text-center font-mediu">Contact Form</p>
                        </div>

                        <form
                            action=""
                            className="w-full flex flex-col gap-5 max-md:w-[90%] max-sm:w-full"
                        >
                            <div className="flex gap-5 flex-wrap">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    required
                                    className="text-[18px] rounded-lg outline-none py-4 px-6 flex-grow"
                                    value={input.name}
                                    onChange={(e) => setInput({ ...input, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    required
                                    className="text-[18px] rounded-lg outline-none py-4 px-6 flex-grow"
                                    value={input.email}
                                    onChange={(e) => setInput({ ...input, email: e.target.value })}
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Subject"
                                name="Subject"
                                className="text-[18px] rounded-lg py-4 outline-none px-6"
                                value={input.Subject}
                                required
                                onChange={(e) => setInput({ ...input, Subject: e.target.value })}
                            />

                            <textarea
                                placeholder="Your Message"
                                rows={8}
                                required
                                name="message"
                                className="resize-none rounded-lg py-4 px-6 text-[18px] outline-none"
                                value={input.message}
                                onChange={(e) => setInput({ ...input, message: e.target.value })}
                            />

                            <button
                                type="submit"
                                className="text-white bg-[#0c0c0c96] py-4 px-10 rounded-lg hover:bg-[#0c0c0c63] duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}
