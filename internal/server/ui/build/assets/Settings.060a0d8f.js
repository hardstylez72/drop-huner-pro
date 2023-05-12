import{s as u,a as N}from"./services.99864b47.js";import{D as S}from"./helper.8a7057fb.js";import{d as V,_ as y,c as o,w as n,h as C,o as r,b as a,p as f,z as w,g as G,a as m,j as g,V as p,E as U,x as h,A as d,e as $,r as E,n as k,i as B,s as P}from"./index.4ac873d2.js";const R=V({name:"SettingsNetwork",props:{modelValue:{type:Object,required:!0},network:{type:Object,required:!0}},emits:["update:modelValue"],data(){return{loading:!1,suggestedGasPrice:0,ETHPrice:2e3}},computed:{params:{get(){return this.modelValue},async set(e){this.$emit("update:modelValue",e)}},limitGasUSD(){return this.ETHPrice/1e19*Number(this.params.gasTotal)}},methods:{async useLimitGasChanged(){},async endpointChanged(e){if(console.log("endpointChanged",e),!e){const t=this.params.rpcEndpoint;if(await S(1e3),this.params.rpcEndpoint!==t)return}if(this.loading=!0,!await this.validate()){this.loading=!1;return}this.loading=!1},async validate(){const{valid:e}=await this.$refs["network-input"].validate();return e},networkRules(){return[async e=>{var t;if(!((t=this.params)!=null&&t.rpcEndpoint))return"rpc required";try{const l=await u.settingsServiceGetNetworkByRpc({body:{network:this.network,endpoint:this.params.rpcEndpoint}});return l.valid?(this.params.id=l.id,this.suggestedGasPrice=Number(l.suggestedGasPrice),!0):(this.params.id="",this.suggestedGasPrice=0,l.error?l.error:"call an ambulance. api error")}catch{return"call an ambulance. api error"}}]}},async created(){const e=await u.settingsServiceGetNetworkByRpc({body:{network:this.network,endpoint:this.params.rpcEndpoint}});e.valid&&(this.suggestedGasPrice=Number(e.suggestedGasPrice))}}),T={key:0};function D(e,t,l,b,c,v){return r(),o(C,null,{default:n(()=>[a($,null,{default:n(()=>[f(w(e.network)+" ",1),a(G,null,{default:n(()=>[a(m,null,{default:n(()=>[a(g,null,{default:n(()=>[a(p,{ref:"network-input",modelValue:e.params.rpcEndpoint,"onUpdate:modelValue":t[0]||(t[0]=s=>e.params.rpcEndpoint=s),label:"rpc endpoint",density:"compact",variant:"outlined",rules:e.networkRules(),onInput:t[1]||(t[1]=s=>e.endpointChanged(!1)),loading:e.loading,disabled:e.loading},null,8,["modelValue","rules","loading","disabled"])]),_:1})]),_:1}),a(m,null,{default:n(()=>[a(g,null,{default:n(()=>[a(p,{modelValue:e.params.id,"onUpdate:modelValue":t[2]||(t[2]=s=>e.params.id=s),label:"network id",density:"compact",variant:"outlined",loading:e.loading,disabled:!0},null,8,["modelValue","loading"])]),_:1})]),_:1}),a(U,{density:"compact",focused:"",modelValue:e.params.useLimitGas,"onUpdate:modelValue":t[3]||(t[3]=s=>e.params.useLimitGas=s),label:"use custom limits for gas",onInput:e.useLimitGasChanged},null,8,["modelValue","onInput"]),e.params.useLimitGas?(r(),h("div",T,[a(m,null,{default:n(()=>[a(g,null,{default:n(()=>[a(p,{modelValue:e.params.gasTotal,"onUpdate:modelValue":t[4]||(t[4]=s=>e.params.gasTotal=s),label:"max gas used for tx (wei)",density:"compact",variant:"outlined"},null,8,["modelValue"])]),_:1}),a(g,null,{default:n(()=>[a(p,{modelValue:e.suggestedGasPrice,"onUpdate:modelValue":t[5]||(t[5]=s=>e.suggestedGasPrice=s),label:"network gas price (wei)",density:"compact",variant:"outlined",loading:e.loading,disabled:!0},null,8,["modelValue","loading"])]),_:1})]),_:1}),a(m,null,{default:n(()=>[f(" Gas in USD: "+w(e.limitGasUSD),1)]),_:1})])):d("",!0)]),_:1})]),_:1})]),_:1})}const I=y(R,[["render",D]]),L=V({name:"Settings",components:{SettingsNetwork:I},data(){return{loading:!1,settings:{},error:!1,updating:!1,reseting:!1}},computed:{Network(){return N}},methods:{async loadSettings(){try{this.error=!1,this.loading=!0;const e=await u.settingsServiceGetSettings({body:{}});this.settings=e.settings}catch{this.error=!0}finally{this.loading=!1}},async Reset(){this.reseting=!0;try{const e=await u.settingsServiceReset();this.settings=e.settings}finally{this.reseting=!1}},async Update(){this.updating=!0,await this.validate()||(this.updating=!1);try{const e=await u.settingsServiceUpdateSettings({body:{settings:this.settings}});this.settings=e.settings}finally{this.updating=!1}},async validate(){const{valid:e}=await this.$refs["settings-form"].validate();return e}},async created(){await this.loadSettings()}}),A={class:"d-flex justify-end"};function j(e,t,l,b,c,v){const s=P("SettingsNetwork");return r(),h("div",null,[E("div",A,[a(k,{onClick:e.Update,loading:e.updating,class:"ma-3"},{default:n(()=>[f("Update settings")]),_:1},8,["onClick","loading"]),a(k,{onClick:e.Reset,loading:e.reseting,class:"ma-3"},{default:n(()=>[f("Reset settings")]),_:1},8,["onClick","loading"])]),a(B,{ref:"settings-form"},{default:n(()=>[e.loading?d("",!0):(r(),o(s,{key:0,modelValue:e.settings.arbitrum,"onUpdate:modelValue":t[0]||(t[0]=i=>e.settings.arbitrum=i),network:e.Network.ARBITRUM},null,8,["modelValue","network"])),e.loading?d("",!0):(r(),o(s,{key:1,modelValue:e.settings.optimism,"onUpdate:modelValue":t[1]||(t[1]=i=>e.settings.optimism=i),network:e.Network.OPTIMISM},null,8,["modelValue","network"])),e.loading?d("",!0):(r(),o(s,{key:2,modelValue:e.settings.etherium,"onUpdate:modelValue":t[2]||(t[2]=i=>e.settings.etherium=i),network:e.Network.Etherium},null,8,["modelValue","network"])),e.loading?d("",!0):(r(),o(s,{key:3,modelValue:e.settings.bnb,"onUpdate:modelValue":t[3]||(t[3]=i=>e.settings.bnb=i),network:e.Network.BinanaceBNB},null,8,["modelValue","network"])),e.loading?d("",!0):(r(),o(s,{key:4,modelValue:e.settings.avalanche,"onUpdate:modelValue":t[4]||(t[4]=i=>e.settings.avalanche=i),network:e.Network.AVALANCHE},null,8,["modelValue","network"]))]),_:1},512)])}const O=y(L,[["render",j]]);export{O as default};
