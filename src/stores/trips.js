import { defineStore } from 'pinia'
import { getFirestore, addDoc, collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import firebaseApp from '../firebase'

const db = getFirestore(firebaseApp);
const tripsCol = collection(db, 'trips');

const useTripsStore = defineStore("trips", {
    state: () => ({
        tripsList: [],
    }),

    getters: {},// = computed() properties of the store

    actions: {
        subscribeToTripsChannel() {
            console.log("subscribeToTripsChannel");
        },

        async createTripPartition(trip_id) {
            try {
                console.log("createTripPartition");
            } catch (error) {
                console.error(error)
            }
        },

        async getAllTrips() {
            try {
                async function getTrips() {
                    const tripSnapshot = await getDocs(tripsCol);
                    const tripList = tripSnapshot.docs.map(doc => {
                        let data = doc.data();
                        data.id = doc.id;
                        return data
                    });

                    return tripList;
                }

                const allTrips = await getTrips()

                if (allTrips) {
                    this.tripsList = allTrips
                    console.log(allTrips)
                }
            } catch (error) {
                console.error(error)
                return []
            }
        },

        async addTrip(tripObj) {
            console.log('Creating...');

            try {
                const docRef = await addDoc(collection(db, "trips"), tripObj);
                console.log("Document written with ID: ", docRef.id);
                return docRef.id
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },

        async getTrip(tripId) {
            console.log('Reading...');

            try {
                const docRef = doc(db, "trips", tripId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    return docSnap.data()
                } else {
                    // docSnap.data() will be undefined in this case 
                    throw Error("No such document for that ID!", tripId)
                }
            } catch (err) {
                console.error(err)
                return {}
            }
        },

        async updateTrip(id, tripObj) {
            console.log('Updating', id, tripObj);
            try {
                await setDoc(doc(db, "trips", id), tripObj);

            } catch (err) {
                console.error(err)
            }
        },

        async deleteTrip(id) {

            try {
                await deleteDoc(doc(db, "trips", id));

            } catch (err) {
                console.error(err)
                return []
            }
        },
    },
})
export { useTripsStore }