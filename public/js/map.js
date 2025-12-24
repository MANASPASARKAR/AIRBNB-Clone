document.addEventListener("DOMContentLoaded", function () {

    maptilersdk.config.apiKey = window.mapAPIKey;
    const coords = window.listingCoords;

    if (!Array.isArray(coords)) {
        console.error("Coords broken:", coords);
        return;
    }

    const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.STREETS,
        center: coords,
        zoom: 13,
    });


    const marker = new maptilersdk.Marker({ color: "red" })
        .setLngLat(coords)
        .setPopup(new maptilersdk.Popup({ offset: 25, closeButton: false })
        .setHTML('<h4>' + window.listingTitle + '</h4><p>Exact location shown After booking</p>')
        )
        .addTo(map);


    // const markerEl = marker.getElement();

    // markerEl.addEventListener("mouseenter", () => {
    //     popup.addTo(map);
    // });

    // markerEl.addEventListener("mouseleave", () => {
    //     popup.remove();
    // });
}); 
