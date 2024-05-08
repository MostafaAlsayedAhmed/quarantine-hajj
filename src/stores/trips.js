// stores/counter.js
import { defineStore } from 'pinia'


const useTripsStore = defineStore('trips', {
    state: () => ({
        count: 0,
        name: 'Eduardo',
        tripsList: [
           
            {
                id: 1,
                tripName: 'Summer Excursion',
                records: 150,
                link: '<a href="https://example.com" target="_blank">View</a>',
                responsible: 'John Doe',
                portArrival: 'USA',
                tripNumber: 'XA123',
                dateOfArrival: '2024-06-15',
                airlineName: 'Delta'
            },
            {
                id: 5,
                tripName: 'Island Hopping',
                records: 95,
                link: '',
                responsible: 'Dave Wilson',
                portArrival: 'Greece',
                tripNumber: 'IH572',
                dateOfArrival: '2024-08-15',
                airlineName: 'Aegean Airlines'
            },
        ]
    }),

    getters: { // = computed() properties of the store
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        addTrip(tripObj) {
            console.log('Creating');
            this.tripsList.push(tripObj)
        },
        updateTrip() {
            console.log('Updating');

        },
        deleteTrip() {
            console.log('Deleting'); 
        },
    },
})
export { useTripsStore }