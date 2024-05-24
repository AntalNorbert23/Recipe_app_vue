import { defineStore } from "pinia";
import router from '@/router';

import { AUTH, DB } from '@/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import errorCodes from "@/firebase/userErrors";

const defaultUser={
    uid:null,
    email:null,
    firstname:null,
    lastname:null,
}

export const useUserStore=defineStore('user',{
    state:()=>({
        user:defaultUser,
        authenticated:false
    }),
    actions:{
        //action to set the current user
        setUser(user){
            this.user={...this.user,...user}
            this.authenticated=true;
        },
        //action to sign out the user
        async signOut(){
            signOut(AUTH);
            this.user=defaultUser;
            this.authenticated=false;
            router.push({name:'home'});
        },
        async autosignIn(uid){
            try{
                const userData=await this.getUserProfile(uid);

                this.setUser(userData);
                return true;
            }catch(error){
                throw new Error(error.message);
            }
        },
        // action to check if the user exists in the database, if so return the user data
        async getUserProfile(uid){
            try{
                const userReference= await getDoc(doc(DB,'users',uid));

                if(!userReference.exists()){
                    throw new Error('Could not find user!');
                }

                return userReference.data()
            }catch(error){
                throw new Error(error);
            }
        },
        //action to sign in the user
        async signIn(formValues){
            try{
                //sign in user
                const response = await signInWithEmailAndPassword(
                    AUTH, formValues.email, formValues.password
                );

                //get the user data 
                const userData= await this.getUserProfile(response.user.uid);

                //set the current user
                this.setUser(userData);
                
                //redirect user
                router.push({name:'savedRecipes'});

            }catch(error){
               // throw new Error(errorCodes(error.code))
            }finally{
                //loader set back
            }
        },
        async register(formValues){
            try{
                const response= await createUserWithEmailAndPassword(
                    AUTH, formValues.email, formValues.password
                );

                const newUser={
                    uid: response.user.uid,
                    email:response.user.email,
                }

                await setDoc(doc(DB,'users',response.user.uid),newUser);

                this.setUser(newUser);

                router.push({name:'home'})
            }catch(error){
               // throw new Error(errorCodes(error.code))
            }
        }
    }
})