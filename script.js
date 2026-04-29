const select = document.getElementById('locationSelect');
const results = document.getElementById('results');

// Fill the dropdown with locations
locations.forEach(loc => {
    let opt = document.createElement('option');
    opt.value = loc;
    opt.innerHTML = loc;
    select.appendChild(opt);
});

select.addEventListener('change', () => {
    const selectedPlace = select.value;
    results.innerHTML = ""; // Clear old results

    if (!selectedPlace) {
        results.innerHTML = '<p class="placeholder-text">Please select a location above.</p>';
        return;
    }

    // Filter buses that go to the selected place
    const filteredBuses = busData.filter(bus => 
        bus.route.toLowerCase().includes(selectedPlace.toLowerCase())
    );

    if (filteredBuses.length > 0) {
        filteredBuses.forEach(bus => {
            const card = document.createElement('div');
            card.className = 'bus-card';
            card.innerHTML = `
                <div class="bus-no">Bus No: ${bus.no}</div>
                <div class="route-desc"><strong>Route:</strong> ${bus.route}</div>
            `;
            results.appendChild(card);
        });
    } else {
        results.innerHTML = '<p class="placeholder-text">No direct bus found for this exact name. Try a nearby location.</p>';
    }
});
