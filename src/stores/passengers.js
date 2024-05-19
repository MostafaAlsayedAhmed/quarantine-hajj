import { defineStore } from 'pinia'
import { getFirestore, addDoc, collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import firebaseApp from '../firebase'

const db = getFirestore(firebaseApp);
const passengersCol = collection(db, 'passengers');

const usePassengersStore = defineStore('passengers', {
    state: () => ({
        passengersList: [],
    }),

    getters: {}, // = computed() properties of the store 


    actions: {
        subscribeToPassengersChannel() {
            console.log("subscribeToPassengersChannel");
        },

        async getAllPassengers(tripId) {
          
            try {
                const passengersListCollection = collection(db, "passengers", tripId, "list");
                const listSnapshot = await getDocs(passengersListCollection);
                const passengersList = listSnapshot.docs.map(doc => {
                    let data = doc.data();
                    data.id = doc?.id;
                    return data
                });  
                 
                if (passengersList) {
                    console.log("Document data:", passengersList.length, passengersList);
                    this.passengersList = passengersList 
                } else { 
                    throw Error("No such document for that ID!", tripId)
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