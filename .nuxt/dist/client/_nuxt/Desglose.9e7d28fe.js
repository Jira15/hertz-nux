import{_ as w,a as E,b as M,c as U,d as A,e as x,f as B}from"./ac.1f0a7ec1.js";import{g as P}from"./get-asset-url.2ad900aa.js";import{u as C}from"./pedido.40310641.js";import{a as I,q as b,o as d,b as l,e,t as i,u as t,E as c,p as L,j,r as O,k as S,F as Y,s as z}from"./entry.970bf235.js";import{h as G}from"./moment.fbc5633a.js";const h=s=>(L("data-v-257ab4b2"),s=s(),j(),s),X=h(()=>e("em",null,"o similar",-1)),q=["src"],W={class:"specs"},H={key:0},J=h(()=>e("dt",null,[e("img",{src:w,alt:"Pasajeros"})],-1)),K={key:1},Q=h(()=>e("dt",null,[e("img",{src:E,alt:"Puertas"})],-1)),Z={key:2},ee=h(()=>e("dt",null,[e("img",{src:M,alt:"Maletas"})],-1)),te={key:3},oe=h(()=>e("dt",null,[e("img",{src:U,alt:"Transmision"})],-1)),ne={key:4},se=h(()=>e("dt",null,[e("img",{src:A,alt:"Motor"})],-1)),ie=h(()=>e("dd",null,"1200cc",-1)),re=[se,ie],de={key:5},le=h(()=>e("dt",null,[e("img",{src:x,alt:"Gasolina"})],-1)),ae=h(()=>e("div",null,[e("dt",null,[e("img",{src:B,alt:"ac"})]),e("dd",null,"A/C")],-1)),ue={__name:"CarroSeleccionado",setup(s){const n=C(),o=b(()=>n.pedido.carro);return(y,g)=>(d(),l("section",null,[e("header",null,[e("div",null,[e("h3",null,i(t(o).marca)+" "+i(t(o).modelo),1),X]),e("figure",null,[e("img",{src:t(P)(t(o).imagen),loading:"lazy"},null,8,q)])]),e("dl",W,[t(o).pasajeros?(d(),l("div",H,[J,e("dd",null,i(t(o).pasajeros),1)])):c("",!0),t(o).puertas?(d(),l("div",K,[Q,e("dd",null,i(t(o).puertas),1)])):c("",!0),t(o).maletas?(d(),l("div",Z,[ee,e("dd",null,i(t(o).maletas),1)])):c("",!0),t(o).transmision?(d(),l("div",te,[oe,e("dd",null,i(t(o).transmision),1)])):c("",!0),t(o).motor?(d(),l("div",ne,re)):c("",!0),t(o).combustible?(d(),l("div",de,[le,e("dd",null,i(t(o).combustible),1)])):c("",!0),ae])]))}},ot=I(ue,[["__scopeId","data-v-257ab4b2"]]);var _e={props:{value:Number,locale:{type:String,default:"en"},currencyCode:{type:String,default:"USD"},supplementalPrecision:{type:Number,default:0},subunitsValue:{type:Boolean,default:!1},subunitsToUnit:{type:Number,default:1},hideSubunits:{type:Boolean,default:!1}},methods:{formatMoney:function(s,n,o,y,g,D,m){var p=0;if(Number.isFinite(s))try{var f=new Intl.NumberFormat(n,{style:"currency",currency:o}),a=f.resolvedOptions(),_=a.minimumFractionDigits;g>1?s=s/g:y==!0&&(s=s/Math.pow(10,a.minimumFractionDigits)),D==!0?f=new Intl.NumberFormat(n,{style:"currency",currency:o,minimumFractionDigits:0,maximumFractionDigits:0}):m>0&&(f=new Intl.NumberFormat(n,{style:"currency",currency:o,minimumFractionDigits:a.minimumFractionDigits+m,maximumFractionDigits:a.maximumFractionDigits+m})),p=f.format(s)}catch(r){p=r.message}else p="#NaN!";return p}}};function ce(s,n,o,y,g,D,m,p,f,a){typeof m!="boolean"&&(f=p,p=m,m=!1);var _=typeof o=="function"?o.options:o;s&&s.render&&(_.render=s.render,_.staticRenderFns=s.staticRenderFns,_._compiled=!0,g&&(_.functional=!0)),y&&(_._scopeId=y);var r;if(D?(r=function(u){u=u||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!u&&typeof __VUE_SSR_CONTEXT__<"u"&&(u=__VUE_SSR_CONTEXT__),n&&n.call(this,f(u)),u&&u._registeredComponents&&u._registeredComponents.add(D)},_._ssrRegister=r):n&&(r=m?function(u){n.call(this,a(u,this.$root.$options.shadowRoot))}:function(u){n.call(this,p(u))}),r)if(_.functional){var R=_.render;_.render=function(V,F){return r.call(F),R(V,F)}}else{var v=_.beforeCreate;_.beforeCreate=v?[].concat(v,r):[r]}return o}var pe=_e,N=function(){var s=this,n=s.$createElement,o=s._self._c||n;return o("div",{staticClass:"money_format"},[s._v(`
  `+s._s(s.formatMoney(s.value,s.locale,s.currencyCode,s.subunitsValue,s.subunitsToUnit,s.hideSubunits,s.supplementalPrecision))+`
`)])},me=[];N._withStripped=!0;var fe=void 0,he=void 0,ye=void 0,ve=!1,T=ce({render:N,staticRenderFns:me},fe,pe,he,ve,ye,!1,void 0,void 0,void 0);function k(s){k.installed||(k.installed=!0,s.component("MoneyFormat",T))}var be={install:k},$=null;typeof window<"u"?$=window.Vue:typeof global<"u"&&($=global.Vue);$&&$.use(be);const ge={class:"desglose"},De=e("h6",null,"Detalles:",-1),Re=e("br",null,null,-1),Se=e("br",null,null,-1),$e=e("dt",null," Día de Retiro: ",-1),ke=e("dt",null," Día de Retorno: ",-1),Fe={key:0},Ce=e("dt",null," Drop-off ",-1),Ne=e("h6",null,"Modelo:",-1),Te={key:0},Ve={key:1},we=e("h6",null,"Coberturas:",-1),Ee={key:1},Me={key:0},Ue={key:2},Ae=e("dt",null," Asistencia Vial(ERA) ",-1),xe=e("h6",null,"Extras:",-1),Be={key:3,class:"extras"},Pe=e("h6",null,"Sub-Total: ",-1),Ie=e("dt",null," Sub-Total ",-1),Le={key:4},je=e("dt",null," Impuesto de Aeropuerto ",-1),Oe=e("dt",null," ITBMS ",-1),Ye=e("h6",null,"Total: ",-1),ze={key:5},Ge=e("dt",null,null,-1),Xe={key:6},qe=e("dt",{class:"warn"}," Te Falta elegir un tipo de cobertura para poder continuar ",-1),We=e("dd",null,null,-1),He=[qe,We],Je={components:{"money-format":T}},nt=Object.assign(Je,{__name:"Desglose",setup(s){const n=C(),o=b(()=>n.pedido),y=b(()=>n.pedido.dropoff=n.checkDropoff(n.pedido.sucursal.LocationCode,n.pedido.sucursalRetorno.LocationCode));b(()=>n.pedido.totalDeDias=n.diffDias(n.pedido.diaRetorno,n.pedido.diaRetiro));const g=b(()=>n.pedido.impuesto=n.impuesto()),D=b(()=>n.pedido.impuesto_aeropuerto=n.impuestoAeropuerto()),m=b(()=>n.pedido.sub_total=n.subTotal()),p=b(()=>n.pedido.total=n.total()),f=function(r){if(r)return G(r).format("DD MMM YYYY hh:mm A")},a=function(r){if(r)return r.toLocaleString("en-US",{style:"currency",currency:"USD"})},_=function(r){let R=5;const v=r*(R/100),u=r-v;return console.log("precio"+r+"descuento"+R+"descuento calculado"+v+"nuevo precio"+u),n.pedido.carro.precio_prepago=u,u.toLocaleString("en-US",{style:"currency",currency:"USD"})};return O(()=>{n.pedido.totalDeDias=n.diffDias(n.pedido.diaRetorno,n.pedido.diaRetiro)}),(r,R)=>(d(),l("section",ge,[De,e("dl",null,[e("dt",null,[S(" Retiro:"),Re,S(i(t(o).sucursal.name),1)]),e("dd",null,[S(" Retorno: "),Se,S(i(t(o).sucursalRetorno.name),1)])]),e("dl",null,[$e,e("dd",null,i(f(t(o).diaRetiro)),1)]),e("dl",null,[ke,e("dd",null,i(f(t(o).diaRetorno)),1)]),t(y)>0?(d(),l("dl",Fe,[Ce,e("dd",null,i(a(t(y))),1)])):c("",!0),Ne,e("dl",null,[e("dt",null,i(t(o).carro.marca)+" "+i(t(o).carro.modelo),1),t(o).reserva==="prepago"?(d(),l("dd",Te,i(_(t(o).carro.precio_thrifty*t(n).diffDias(t(o).diaRetorno,t(o).diaRetiro))),1)):(d(),l("dd",Ve,i(a(t(o).carro.precio_thrifty*t(n).diffDias(t(o).diaRetorno,t(o).diaRetiro))),1))]),we,t(o).carro.tipo!="Sedan"?(d(),l("dl",Ee,[t(o).cobertura.nombre?(d(),l("dt",Me,i(t(o).cobertura.nombre),1)):c("",!0),e("dd",null,i(a(t(o).cobertura.precio_2*t(n).diffDias(t(o).diaRetorno,t(o).diaRetiro))),1)])):(d(),l("dl",Ue,[e("dt",null,i(t(o).cobertura.nombre),1),e("dd",null,i(a(t(o).cobertura.precio*t(n).diffDias(t(o).diaRetorno,t(o).diaRetiro))),1)])),e("dl",null,[Ae,e("dd",null,i(a(t(o).era*t(n).diffDias(t(o).diaRetorno,t(o).diaRetiro))),1)]),xe,t(o).extras?(d(),l("dl",Be,[(d(!0),l(Y,null,z(t(o).extras,v=>(d(),l("div",null,[e("dt",null,i(v.nombre),1),e("dd",null,i(a(v.precio*t(n).diffDias(t(o).diaRetorno,t(o).diaRetiro))),1)]))),256))])):c("",!0),Pe,e("dl",null,[Ie,e("dd",null,i(a(t(m))),1)]),t(D)>0?(d(),l("dl",Le,[je,e("dd",null,i(a(t(D))),1)])):c("",!0),e("dl",null,[Oe,e("dd",null,i(a(t(g))),1)]),Ye,t(p)?(d(),l("dl",ze,[Ge,e("dd",null," B/. "+i(a(t(p))),1)])):c("",!0),t(o).cobertura.precio?c("",!0):(d(),l("dl",Xe,He))]))}});export{ot as _,nt as a};
