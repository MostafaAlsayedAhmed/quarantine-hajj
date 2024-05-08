// stores/counter.js
import { defineStore } from 'pinia'

function getToday() {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const useFormDataStore = defineStore('formData', {
    state: () => ({
        count: 0,
 
        countries_list: {
            Egypt: ["Alexaa", "Cairo", "Hurghada"],
            Italy: ["Rome", "Milan", "Naples"],
            Japan: ["Tokyo", "Osaka", "Kyoto"],
            Brazil: ["Rio de Janeiro", "São Paulo", "Salvador"],
            Canada: ["Toronto", "Vancouver", "Montreal"],
            Australia: ["Sydney", "Melbourne", "Brisbane"]
        },

        form: {
            tripNumber: "A 255",
            portOfArrival: 'Hurghada',
            dateArrival: getToday(),
            transportAgency: 'AMC air',


            seatNo: '',
            passportNumber: '',
            nationality: 'egyption',
            fullName: '',

            dobDay: '0',
            dobMonth: '0',
            dobYear: '0',

            occupation: '',
            detailedAddress: '',
            governorate: '',
            region: '',
            address: '',
            email: '',
            phone: '',
            confirmation: false
        }
    }),

    getters: {
        //doubleCount: (state) => state.count * 2,
        getCountry2: (state) => state.countries_list["Italy"]
    },
    actions: {
        increment() {
            this.count++
        },


    },
})
export { useFormDataStore }