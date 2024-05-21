import { defineStore } from 'pinia'
import { getFirestore, addDoc, collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import firebaseApp from '../firebase'

const db = getFirestore(firebaseApp);
const passengersCol = collection(db, 'passengers');
function getToday() {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd;
    return today;
}


const usePassengersStore = defineStore('passengers', {
    state: () => {
        return {
            trip: {
                tripNumber: "B_55",
                portOfArrival: 'Hurghada',
                dateArrival: getToday(),
                transportAgency: 'AMC air',
            },

            passengersList: [],

            passenger: {
                full_name: '',
                passport_number: '',

                seat_number: '',
                phone_number: '',

                nationality: '',
                governorate: '',
                region: '',
                address: '',
                dobDay: '',
                confirmation: false,
                created_at: new Date().toLocaleString()
            },
        }
    },

    getters: {}, // = computed() properties of the store 

    actions: {
        subscribeToPassengersChannel() {
            console.log("subscribeToPassengersChannel");
        },

        async getAllPassengers(tripId) {

            try {
                const passengersListCol = collection(db, "passengers", tripId, "list");
                const listSnapshot = await getDocs(passengersListCol);
                const passengersList = listSnapshot.docs.map(doc => {
                    let data = doc.data();
                    data.id = doc?.id;
                    return data
                });

                if (passengersList) {
                    // console.log("Document data:", passengersList.length, passengersList);
                    this.passengersList = passengersList
                } else {
                    throw Error("No such document for that ID!", tripId)
                }

            } catch (error) {
                console.error(error)
                return []
            }
        },

        async addPassenger(tripId, passengerObj) {
            console.log('Creating...');
            const passengersListCol = collection(db, "passengers", tripId, "list");

            try {
                const docRef = await addDoc(passengersListCol, passengerObj);
                console.log("Document written with ID: ", docRef.id);
                return docRef.id
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },

        async getPassenger(tripId, passengerId) {
            console.log('Reading...');
            try {
                const docRef = doc(db, "passengers", tripId, "list", passengerId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("this.passenger:", this.passenger);

                    console.log("Document data:", docSnap.data());
                    this.passenger = docSnap.data();
                    console.log("this.passenger:", this.passenger);

                    // return docSnap.data()
                } else {
                    // docSnap.data() will be undefined in this case 
                    throw Error("No such document for that ID!", tripId)
                }
            } catch (err) {
                console.error(err)
                return {}
            }
        },

        async updatePassenger(tripId, passengerId, passengerObj) {
            console.log('Updating', tripId, passengerId, passengerObj);
           
            try {
                await setDoc(doc(db, "passengers", tripId, "list", passengerId), passengerObj);

            } catch (err) {
                console.error(err)
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