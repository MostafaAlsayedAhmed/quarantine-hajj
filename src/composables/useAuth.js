import { RouterView, useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { supabase } from "@/supabase.js";
import { storeToRefs } from "pinia";
import { provide } from 'vue'
import Loading from "@/components/Loading.vue";

export function useAuth() {
    let userStore = useUserStore();
    let { user, setUser } = userStore;
    const router = useRouter();
    const route = useRoute();
 
    const { isLoggedIn } = storeToRefs(userStore);
    
    provide('isLoggedIn', isLoggedIn)
    
    const validateEmail = () => {
        if (!str) return false;
        const pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(str);
    };

    const signOut = async () => {
        let { error } = await supabase.auth.signOut();
        router.currentRoute.value.path === '/' ?
            router.replace('/login') :
            router.replace('/login')
        router.go()
    }
    return {
        isLoggedIn,
        Loading,
        route,
        router,
        RouterView,
        setUser,
        supabase,
        useRouter,
        user,
        validateEmail,
        signOut
    };
}
