// stores/counter.js
import { defineStore } from 'pinia'
import { supabase } from "@/supabase"

// const allTrips = fetchOrders();
// console.log(allTrips)

const useTripsStore = defineStore('trips', {
    state: () => ({
        tripsList: [],
        // || [] allTrips.value 

        // tripsList: [ 
        //     {
        //         id: 1,
        //         tripName: 'Summer Excursion',
        //         records: 150,
        //         link: ' https://example.com  ',
        //         responsible: 'John Doe',
        //         portOfArrival: 'Safaga',
        //         tripNumber: 'XA123',
        //         dateOfArrival: '2024-06-15',
        //         transportAgency: 'Delta'
        //     },
        //     {
        //         id: 5,
        //         tripName: 'Island Hopping',
        //         records: 95,
        //         link: '',
        //         responsible: 'Dave Wilson',
        //         portOfArrival: 'Hurghada',
        //         tripNumber: 'IH572',
        //         dateOfArrival: '2024-08-15',
        //         transportAgency: 'Aegean Airlines'
        //     },
        // ]
    }),

    getters: { // = computed() properties of the store
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        async getAllTrips() {
            try {
                let { data: trips, error } = await supabase
                    .from('trips')
                    .select('*')

                if (trips) {
                    this.tripsList = trips
                    console.log(trips)
                    return trips
                }
            } catch (error) {
                console.log(error)
                return []
            }
        },
        async addTrip(tripObj) {
            console.log('Creating');
            try {
                const { data, error: err } = await supabase
                    .from('trips')
                    .insert([tripObj])
                    .select()

                if (data) {
                    console.log(data)
                    return trips
                }
            } catch (err) {
                console.error(err)
                return []
            }

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