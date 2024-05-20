
import { defineStore } from 'pinia'

const useFormDataStore = defineStore('formData', {
    state: () => ({

        countries_list: {
            Egypt: ["Alexaa", "Cairo", "Hurghada"],
            Italy: ["Rome", "Milan", "Naples"],
            Japan: ["Tokyo", "Osaka", "Kyoto"],
            Brazil: ["Rio de Janeiro", "São Paulo", "Salvador"],
            Canada: ["Toronto", "Vancouver", "Montreal"],
            Australia: ["Sydney", "Melbourne", "Brisbane"]
        },

    }),
 
})
export { useFormDataStore }