// stores/counter.js
import { defineStore } from 'pinia'
import { supabase } from "@/supabase" 

// const allTrips = fetchOrders();
// console.log(allTrips)

const useTripsStore = defineStore('trips', {
    state: () => ({
        tripsList: [], 
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
                console.error(error)
                return []
            }
        },

        async addTrip(tripObj) {
            console.log('Creating...');
            try {
                const { data, error: err } = await supabase
                    .from('trips')
                    .insert(tripObj) //[tripObj]  
                    .select()

                if (data) {
                    console.log("Created");
                }
            } catch (err) {
                console.error(err)
                return []
            }
        },

        async getTrip(tripId) {
            console.log('Reading...');

            try {
                const { data: trip, error: err } = await supabase
                    .from('trips')
                    .select("*")
                    .eq('id', tripId)

                if (trip) {
                    return trip
                } else {
                    throw err
                }
            } catch (err) {
                console.error(err)
                return []
            }
        },

        async updateTrip(id, tripObj) {
            console.log('Updating', id, tripObj);
            try {
                const { data, error } = await supabase
                    .from('trips')
                    // .update({ records: 88 })
                    .update(tripObj)
                    .eq('id', id)
                    .select()
                if (data) {
                    console.log(data);
                    return data
                } else {
                    throw error
                }
            } catch (err) {
                console.error(err)
                return []
            }
        },

        async deleteTrip(id) {
        
            try {
                const { error } = await supabase
                    .from('trips')
                    .delete()
                    .eq('id', id)
                if (error) {
                    throw error
                } else { 
                    console.log('Deleted', id);
                }

            } catch (err) {
                console.error(err)
                return []
            }
        },
    },
})
export { useTripsStore }