import { defineStore } from 'pinia';

interface BreadcrumbState {
  breadcrumbString: {[x:string]:any;}[] ;
}

export const useBreadcrumbStore = defineStore({
    id:'breadcrumb',
    state: (): BreadcrumbState =>({
        breadcrumbString: []
    }),
    getters:{
        getBreadcrumb(state){
            return state.breadcrumbString;
        }
    },
    actions:{
        setBreadcrumb(incoming: {[x:string]:any;}[]){
            this.breadcrumbString = incoming;
        }
    }
});