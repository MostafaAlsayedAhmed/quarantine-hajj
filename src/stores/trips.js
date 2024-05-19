import { defineStore } from 'pinia'
import { supabase } from "@/supabase"

const useTripsStore = defineStore("trips", {
    state: () => ({
        tripsList: [],
    }),

    getters: {},// = computed() properties of the store

    actions: {
        subscribeToTripsChannel() {
            return supabase
                .channel('my_new_channel_for_trip')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'trips2' },
                    (payload) => {
                        console.log(payload);
                        const { new: newTrip, old } = payload;

                        if (!Object.hasOwn(old, 'id') && Object.hasOwn(newTrip, 'id')) {
                            console.log("Add New Trip");
                            this.tripsList.push(newTrip);
                        }
                        if (Object.hasOwn(old, 'id') && !Object.hasOwn(newTrip, 'id')) {
                            console.log("Delete Trip");
                            this.tripsList = this.tripsList.filter(trip => trip.id !== old.id)
                        }


                        this.tripsList = this.tripsList.map(trip => {
                            if (trip.id === newTrip.id) {
                                return { ...trip, ...newTrip }
                            }
                            return trip
                        })
                    }
                )
                .subscribe()
        },

        async createTripPartition(trip_id) {
            try {
                let { data, error } = await supabase
                    .rpc('test', {
                        trip_id
                    })
                if (error) throw error
                else console.log(data)

            } catch (error) {
                console.error(error)
            }
        },

        async getAllTrips() {
            try {
                let { data: trips, error } = await supabase
                    .from('trips2')
                    .select('*')
                //  .range(0, 4)

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
            // this.tripsList.push(tripObj)
            try {
                const { data, error: err } = await supabase
                    .from('trips2')
                    .insert(tripObj) //[tripObj]  
                    .select()

                if (data) {
                    console.log("Created");
                    return data
                }
                else throw err
            } catch (err) {
                console.error(err)
                return err
            }
        },

        async getTrip(tripId) {
            console.log('Reading...');

            try {
                const { data: trip, error: err } = await supabase
                    .from('trips2')
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
                    .from('trips2')
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
                    .from('trips2')
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