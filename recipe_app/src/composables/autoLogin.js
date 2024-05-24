
import { ref } from "vue";

//firebase import 
import { AUTH } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

//userstore import
import { useUserStore } from "@/stores/userStore";

export const firstLoad=()=>{
    const userStore=useUserStore();
    const loading=ref(true);
    
    onAuthStateChanged(AUTH,async(user)=>{
        if(user){
            await userStore.autosignIn(user.uid);
        }
        loading.value=false;
    })
    return {loading}
}