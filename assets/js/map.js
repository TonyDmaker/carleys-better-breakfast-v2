// Leaflet init for #map on the home page
document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  const center = [26.6409, -81.8723]; // mock Fort Myers area coords
  const map = L.map('map', { scrollWheelZoom: false }).setView(center, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  L.marker(center).addTo(map)
    .bindPopup("<b>Carley’s Better Breakfast</b><br>SR-82 pull-off (mock location).")
    .openPopup();

  // center on me
  const centerBtn = document.getElementById('center-me');
  centerBtn && centerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!navigator.geolocation) return alert('Geo not available');
    navigator.geolocation.getCurrentPosition(pos => {
      const you = [pos.coords.latitude, pos.coords.longitude];
      map.setView(you, 14);
      L.marker(you).addTo(map).bindPopup('You are here').openPopup();
    }, () => alert('Could not get your location'));
  }, { passive: false });
});
