import { defineStore } from 'pinia'
import { supabase } from "@/supabase"

const usePassengersStore = defineStore('passengers', {
    state: () => ({
        passengersList: [],
    }),

    getters: {}, // = computed() properties of the store 


    actions: {
        subscribeToPassengersChannel() {
            return supabase
                .channel('my_new_channel_for_passenger')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'passengers' },
                    (payload) => {
                        console.log(payload);
                        const { new: newPassenger, old } = payload;

                        if (!Object.hasOwn(old, 'id') && Object.hasOwn(newPassenger, 'id')) {
                            console.log("Add New Passenger");
                            this.passengersList.push(newPassenger);
                        }
                        if (Object.hasOwn(old, 'id') && !Object.hasOwn(newPassenger, 'id')) {
                            console.log("Delete Passenger");
                            this.passengersList = this.passengersList.filter(passenger => passenger.id !== old.id)
                        }


                        this.passengersList = this.passengersList.map(passenger => {
                            if (passenger.id === newPassenger.id) {
                                return { ...passenger, ...newPassenger }
                            }
                            return passenger
                        })
                    }
                )
                .subscribe()
        },

        async getAllPassengers(tripId) {
            // console.log(tripId);
            // return
            try {
                let { data: passengers, error } = await supabase
                    .from('passengers_' + tripId)
                    .select('*')
                    // .select('passengers')
                    // .eq('id', tripId)
                    // .range(0, 9)

                console.log(passengers);
                if (passengers) {
                    this.passengersList = passengers 
                    return  passengers
                }
            } catch (error) {
                console.error(error)
                return []
            }
        },

        async addPassenger(passengerObj) {
            console.log('Creating...');
            try {
                const { data, error: err } = await supabase
                    .from('passengers')
                    .insert(passengerObj) //[passengerObj]  
                    .select()

                if (data) {
                    console.log("Created");
                }
            } catch (err) {
                console.error(err)
                return []
            }
        },

        async getPassenger(passengerId) {
            console.log('Reading...');

            try {
                const { data: passenger, error: err } = await supabase
                    .from('passengers')
                    .select("*")
                    .eq('id', passengerId)

                if (passenger) {
                    return passenger
                } else {
                    throw err
                }
            } catch (err) {
                console.error(err)
                return []
            }
        },

        async updatePassenger(id, passengerObj) {
            console.log('Updating', id, passengerObj);
            try {
                const { data, error } = await supabase
                    .from('passengers')
                    // .update({ records: 88 })
                    .update(passengerObj)
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

        async deletePassenger(id) {

            try {
                const { error } = await supabase
                    .from('passengers')
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
export { usePassengersStore }