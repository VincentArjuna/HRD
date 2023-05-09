import { defineStore } from 'pinia';

interface AlertState {
  formAlertMsg: string ;
  formAlertVariant: string;
  fieldAlertMsg: string;
  fieldAlertVariant: string;
  recordAlertMsg: string;
  recordAlertVariant: string;
  codeAlertMsg: string;
  codeAlertVariant: string;
}

export const useAlertStore = defineStore({
  id: 'alert',
  state: (): AlertState =>({
    formAlertMsg:'',
    formAlertVariant:'',
    fieldAlertMsg:'',
    fieldAlertVariant:'',
    recordAlertMsg:'',
    recordAlertVariant:'',
    codeAlertMsg:'',
    codeAlertVariant:'',
  }),
  getters:{
    getFormAlert(state){
      return{
        'message': state.formAlertMsg,
        'variant': state.formAlertVariant,
      }
    },
    getFieldAlert(state){
      return{
        'message': state.fieldAlertMsg,
        'variant': state.fieldAlertVariant,
      }
    },
    getRecordAlert(state){
      return{
        'message': state.recordAlertMsg,
        'variant': state.recordAlertVariant,
      }
    },
    getCodeAlert(state){
      return{
        'message': state.codeAlertMsg,
        'variant': state.codeAlertVariant,
      }
    }
  },
  actions:{
    setFormAlert(message:string, variant:string){
      this.formAlertMsg = message;
      this.formAlertVariant = variant;
    },
    setFieldAlert(message:string, variant:string){
      this.fieldAlertMsg = message;
      this.fieldAlertVariant = variant;
    },
    setRecordAlert(message:string, variant:string){
      this.recordAlertMsg = message;
      this.recordAlertVariant = variant;
    },
    setCodeAlert(message:string, variant:string){
      this.codeAlertMsg = message;
      this.codeAlertVariant = variant;
    }
  }
});