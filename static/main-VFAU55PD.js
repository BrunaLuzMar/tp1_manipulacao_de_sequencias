var hC=Object.defineProperty,pC=Object.defineProperties;var mC=Object.getOwnPropertyDescriptors;var U_=Object.getOwnPropertySymbols;var gC=Object.prototype.hasOwnProperty,vC=Object.prototype.propertyIsEnumerable;var B_=(n,e,t)=>e in n?hC(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,re=(n,e)=>{for(var t in e||={})gC.call(e,t)&&B_(n,t,e[t]);if(U_)for(var t of U_(e))vC.call(e,t)&&B_(n,t,e[t]);return n},Je=(n,e)=>pC(n,mC(e));var Ki=(n,e,t)=>new Promise((i,r)=>{var s=c=>{try{a(t.next(c))}catch(l){r(l)}},o=c=>{try{a(t.throw(c))}catch(l){r(l)}},a=c=>c.done?i(c.value):Promise.resolve(c.value).then(s,o);a((t=t.apply(n,e)).next())});var Lp;function ou(){return Lp}function Ti(n){let e=Lp;return Lp=n,e}var V_=Symbol("NotFound");function _o(n){return n===V_||n?.name==="\u0275NotFound"}var an=null,au=!1,kp=1,yC=null,cn=Symbol("SIGNAL");function $e(n){let e=an;return an=n,e}function du(){return an}var xo={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Eo(n){if(au)throw new Error("");if(an===null)return;an.consumerOnSignalRead(n);let e=an.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=an.recomputing;if(i&&(t=e!==void 0?e.nextProducer:an.producers,t!==void 0&&t.producer===n)){an.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===an&&(!i||xC(r,an)))return;let s=bo(an),o={producer:n,consumer:an,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};an.producersTail=o,e!==void 0?e.nextProducer=o:an.producers=o,s&&j_(n,o)}function H_(){kp++}function fu(n){if(!(bo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===kp)){if(!n.producerMustRecompute(n)&&!nc(n)){uu(n);return}n.producerRecomputeValue(n),uu(n)}}function Up(n){if(n.consumers===void 0)return;let e=au;au=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||_C(i)}}finally{au=e}}function Bp(){return an?.consumerAllowSignalWrites!==!1}function _C(n){n.dirty=!0,Up(n),n.consumerMarkedDirty?.(n)}function uu(n){n.dirty=!1,n.lastCleanEpoch=kp}function Mo(n){return n&&z_(n),$e(n)}function z_(n){n.producersTail=void 0,n.recomputing=!0}function tc(n,e){$e(e),n&&G_(n)}function G_(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(bo(n))do t=Vp(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function nc(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(fu(t),i!==t.version))return!0}return!1}function ic(n){if(bo(n)){let e=n.producers;for(;e!==void 0;)e=Vp(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function j_(n,e){let t=n.consumersTail,i=bo(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)j_(r.producer,r)}function Vp(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!bo(e)){let s=e.producers;for(;s!==void 0;)s=Vp(s)}return t}function bo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function hu(n){yC?.(n)}function xC(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function pu(n,e){return Object.is(n,e)}function mu(n,e){let t=Object.create(EC);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(fu(t),Eo(t),t.value===ec)throw t.error;return t.value};return i[cn]=t,hu(t),i}var cu=Symbol("UNSET"),lu=Symbol("COMPUTING"),ec=Symbol("ERRORED"),EC=Je(re({},xo),{value:cu,dirty:!0,error:null,equal:pu,kind:"computed",producerMustRecompute(n){return n.value===cu||n.value===lu},producerRecomputeValue(n){if(n.value===lu)throw new Error("");let e=n.value;n.value=lu;let t=Mo(n),i,r=!1;try{i=n.computation(),$e(null),r=e!==cu&&e!==ec&&i!==ec&&n.equal(e,i)}catch(s){i=ec,n.error=s}finally{tc(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function MC(){throw new Error}var W_=MC;function $_(n){W_(n)}function Hp(n){W_=n}var bC=null;function zp(n,e){let t=Object.create(gu);t.value=n,e!==void 0&&(t.equal=e);let i=()=>q_(t);return i[cn]=t,hu(t),[i,o=>So(t,o),o=>Gp(t,o)]}function q_(n){return Eo(n),n.value}function So(n,e){Bp()||$_(n),n.equal(n.value,e)||(n.value=e,SC(n))}function Gp(n,e){Bp()||$_(n),So(n,e(n.value))}var gu=Je(re({},xo),{equal:pu,value:void 0,kind:"signal"});function SC(n){n.version++,H_(),Up(n),bC?.(n)}function Ve(n){return typeof n=="function"}function wo(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var vu=wo(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function gs(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var Pt=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(Ve(i))try{i()}catch(s){e=s instanceof vu?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{X_(s)}catch(o){e=e??[],o instanceof vu?e=[...e,...o.errors]:e.push(o)}}if(e)throw new vu(e)}}add(e){var t;if(e&&e!==this)if(this.closed)X_(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&gs(t,e)}remove(e){let{_finalizers:t}=this;t&&gs(t,e),e instanceof n&&e._removeParent(this)}};Pt.EMPTY=(()=>{let n=new Pt;return n.closed=!0,n})();var jp=Pt.EMPTY;function yu(n){return n instanceof Pt||n&&"closed"in n&&Ve(n.remove)&&Ve(n.add)&&Ve(n.unsubscribe)}function X_(n){Ve(n)?n():n.unsubscribe()}var ui={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Co={setTimeout(n,e,...t){let{delegate:i}=Co;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Co;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function _u(n){Co.setTimeout(()=>{let{onUnhandledError:e}=ui;if(e)e(n);else throw n})}function rc(){}var Y_=Wp("C",void 0,void 0);function Z_(n){return Wp("E",void 0,n)}function J_(n){return Wp("N",n,void 0)}function Wp(n,e,t){return{kind:n,value:e,error:t}}var vs=null;function To(n){if(ui.useDeprecatedSynchronousErrorHandling){let e=!vs;if(e&&(vs={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=vs;if(vs=null,t)throw i}}else n()}function K_(n){ui.useDeprecatedSynchronousErrorHandling&&vs&&(vs.errorThrown=!0,vs.error=n)}var ys=class extends Pt{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,yu(e)&&e.add(this)):this.destination=TC}static create(e,t,i){return new Do(e,t,i)}next(e){this.isStopped?qp(J_(e),this):this._next(e)}error(e){this.isStopped?qp(Z_(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?qp(Y_,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},wC=Function.prototype.bind;function $p(n,e){return wC.call(n,e)}var Xp=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){xu(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){xu(i)}else xu(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){xu(t)}}},Do=class extends ys{constructor(e,t,i){super();let r;if(Ve(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&ui.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&$p(e.next,s),error:e.error&&$p(e.error,s),complete:e.complete&&$p(e.complete,s)}):r=e}this.destination=new Xp(r)}};function xu(n){ui.useDeprecatedSynchronousErrorHandling?K_(n):_u(n)}function CC(n){throw n}function qp(n,e){let{onStoppedNotification:t}=ui;t&&Co.setTimeout(()=>t(n,e))}var TC={closed:!0,next:rc,error:CC,complete:rc};var Ao=typeof Symbol=="function"&&Symbol.observable||"@@observable";function mn(n){return n}function Yp(...n){return Zp(n)}function Zp(n){return n.length===0?mn:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var tt=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=AC(t)?t:new Do(t,i,r);return To(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=Q_(i),new i((r,s)=>{let o=new Do({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Ao](){return this}pipe(...t){return Zp(t)(this)}toPromise(t){return t=Q_(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function Q_(n){var e;return(e=n??ui.Promise)!==null&&e!==void 0?e:Promise}function DC(n){return n&&Ve(n.next)&&Ve(n.error)&&Ve(n.complete)}function AC(n){return n&&n instanceof ys||DC(n)&&yu(n)}function Jp(n){return Ve(n?.lift)}function Ke(n){return e=>{if(Jp(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function Ye(n,e,t,i,r){return new Kp(n,e,t,i,r)}var Kp=class extends ys{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};function Io(){return Ke((n,e)=>{let t=null;n._refCount++;let i=Ye(e,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){t=null;return}let r=n._connection,s=t;t=null,r&&(!s||r===s)&&r.unsubscribe(),e.unsubscribe()});n.subscribe(i),i.closed||(t=n.connect())})}var Ro=class extends tt{constructor(e,t){super(),this.source=e,this.subjectFactory=t,this._subject=null,this._refCount=0,this._connection=null,Jp(e)&&(this.lift=e.lift)}_subscribe(e){return this.getSubject().subscribe(e)}getSubject(){let e=this._subject;return(!e||e.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:e}=this;this._subject=this._connection=null,e?.unsubscribe()}connect(){let e=this._connection;if(!e){e=this._connection=new Pt;let t=this.getSubject();e.add(this.source.subscribe(Ye(t,void 0,()=>{this._teardown(),t.complete()},i=>{this._teardown(),t.error(i)},()=>this._teardown()))),e.closed&&(this._connection=null,e=Pt.EMPTY)}return e}refCount(){return Io()(this)}};var e0=wo(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var St=(()=>{class n extends tt{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new Eu(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new e0}next(t){To(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){To(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){To(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?jp:(this.currentObservers=null,s.push(t),new Pt(()=>{this.currentObservers=null,gs(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new tt;return t.source=this,t}}return n.create=(e,t)=>new Eu(e,t),n})(),Eu=class extends St{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:jp}};var tn=class extends St{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var Qp={now(){return(Qp.delegate||Date).now()},delegate:void 0};var Mu=class extends Pt{constructor(e,t){super()}schedule(e,t=0){return this}};var sc={setInterval(n,e,...t){let{delegate:i}=sc;return i?.setInterval?i.setInterval(n,e,...t):setInterval(n,e,...t)},clearInterval(n){let{delegate:e}=sc;return(e?.clearInterval||clearInterval)(n)},delegate:void 0};var bu=class extends Mu{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){var i;if(this.closed)return this;this.state=e;let r=this.id,s=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(s,r,t)),this.pending=!0,this.delay=t,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(s,this.id,t),this}requestAsyncId(e,t,i=0){return sc.setInterval(e.flush.bind(e,this),i)}recycleAsyncId(e,t,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return t;t!=null&&sc.clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(e,t);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let i=!1,r;try{this.work(e)}catch(s){i=!0,r=s||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:e,scheduler:t}=this,{actions:i}=t;this.work=this.state=this.scheduler=null,this.pending=!1,gs(i,this),e!=null&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null,super.unsubscribe()}}};var No=class n{constructor(e,t=n.now){this.schedulerActionCtor=e,this.now=t}schedule(e,t=0,i){return new this.schedulerActionCtor(this,e).schedule(i,t)}};No.now=Qp.now;var Su=class extends No{constructor(e,t=No.now){super(e,t),this.actions=[],this._active=!1}flush(e){let{actions:t}=this;if(this._active){t.push(e);return}let i;this._active=!0;do if(i=e.execute(e.state,e.delay))break;while(e=t.shift());if(this._active=!1,i){for(;e=t.shift();)e.unsubscribe();throw i}}};var t0=new Su(bu);var wn=new tt(n=>n.complete());function n0(n){return n&&Ve(n.schedule)}function i0(n){return n[n.length-1]}function wu(n){return Ve(i0(n))?n.pop():void 0}function Dr(n){return n0(i0(n))?n.pop():void 0}function s0(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function r0(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function _s(n){return this instanceof _s?(this.v=n,this):new _s(n)}function o0(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(y){return new Promise(function(m,p){s.push([h,y,m,p])>1||c(h,y)})},g&&(r[h]=g(r[h])))}function c(h,g){try{l(i[h](g))}catch(y){f(s[0][3],y)}}function l(h){h.value instanceof _s?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,g){h(g),s.shift(),s.length&&c(s[0][0],s[0][1])}}function a0(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof r0=="function"?r0(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var Cu=n=>n&&typeof n.length=="number"&&typeof n!="function";function Tu(n){return Ve(n?.then)}function Du(n){return Ve(n[Ao])}function Au(n){return Symbol.asyncIterator&&Ve(n?.[Symbol.asyncIterator])}function Iu(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function IC(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ru=IC();function Nu(n){return Ve(n?.[Ru])}function Pu(n){return o0(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield _s(t.read());if(r)return yield _s(void 0);yield yield _s(i)}}finally{t.releaseLock()}})}function Ou(n){return Ve(n?.getReader)}function Vt(n){if(n instanceof tt)return n;if(n!=null){if(Du(n))return RC(n);if(Cu(n))return NC(n);if(Tu(n))return PC(n);if(Au(n))return c0(n);if(Nu(n))return OC(n);if(Ou(n))return FC(n)}throw Iu(n)}function RC(n){return new tt(e=>{let t=n[Ao]();if(Ve(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function NC(n){return new tt(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function PC(n){return new tt(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,_u)})}function OC(n){return new tt(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function c0(n){return new tt(e=>{LC(n,e).catch(t=>e.error(t))})}function FC(n){return c0(Pu(n))}function LC(n,e){var t,i,r,s;return s0(this,void 0,void 0,function*(){try{for(t=a0(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Cn(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function Fu(n,e=0){return Ke((t,i)=>{t.subscribe(Ye(i,r=>Cn(i,n,()=>i.next(r),e),()=>Cn(i,n,()=>i.complete(),e),r=>Cn(i,n,()=>i.error(r),e)))})}function Lu(n,e=0){return Ke((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function l0(n,e){return Vt(n).pipe(Lu(e),Fu(e))}function u0(n,e){return Vt(n).pipe(Lu(e),Fu(e))}function d0(n,e){return new tt(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function f0(n,e){return new tt(t=>{let i;return Cn(t,e,()=>{i=n[Ru](),Cn(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>Ve(i?.return)&&i.return()})}function ku(n,e){if(!n)throw new Error("Iterable cannot be null");return new tt(t=>{Cn(t,e,()=>{let i=n[Symbol.asyncIterator]();Cn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function h0(n,e){return ku(Pu(n),e)}function p0(n,e){if(n!=null){if(Du(n))return l0(n,e);if(Cu(n))return d0(n,e);if(Tu(n))return u0(n,e);if(Au(n))return ku(n,e);if(Nu(n))return f0(n,e);if(Ou(n))return h0(n,e)}throw Iu(n)}function Ot(n,e){return e?p0(n,e):Vt(n)}function Pe(...n){let e=Dr(n);return Ot(n,e)}function Po(n,e){let t=Ve(n)?n:()=>n,i=r=>r.error(t());return new tt(e?r=>e.schedule(i,0,r):i)}function em(n){return!!n&&(n instanceof tt||Ve(n.lift)&&Ve(n.subscribe))}var Qi=wo(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function qe(n,e){return Ke((t,i)=>{let r=0;t.subscribe(Ye(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:kC}=Array;function UC(n,e){return kC(e)?n(...e):n(e)}function Uu(n){return qe(e=>UC(n,e))}var{isArray:BC}=Array,{getPrototypeOf:VC,prototype:HC,keys:zC}=Object;function Bu(n){if(n.length===1){let e=n[0];if(BC(e))return{args:e,keys:null};if(GC(e)){let t=zC(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function GC(n){return n&&typeof n=="object"&&VC(n)===HC}function Vu(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function Hu(...n){let e=Dr(n),t=wu(n),{args:i,keys:r}=Bu(n);if(i.length===0)return Ot([],e);let s=new tt(jC(i,e,r?o=>Vu(r,o):mn));return t?s.pipe(Uu(t)):s}function jC(n,e,t=mn){return i=>{m0(e,()=>{let{length:r}=n,s=new Array(r),o=r,a=r;for(let c=0;c<r;c++)m0(e,()=>{let l=Ot(n[c],e),u=!1;l.subscribe(Ye(i,d=>{s[c]=d,u||(u=!0,a--),a||i.next(t(s.slice()))},()=>{--o||i.complete()}))},i)},i)}}function m0(n,e,t){n?Cn(t,n,e):e()}function g0(n,e,t,i,r,s,o,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=y=>l<i?g(y):c.push(y),g=y=>{s&&e.next(y),l++;let m=!1;Vt(t(y,u++)).subscribe(Ye(e,p=>{r?.(p),s?h(p):e.next(p)},()=>{m=!0},void 0,()=>{if(m)try{for(l--;c.length&&l<i;){let p=c.shift();o?Cn(e,o,()=>g(p)):g(p)}f()}catch(p){e.error(p)}}))};return n.subscribe(Ye(e,h,()=>{d=!0,f()})),()=>{a?.()}}function jt(n,e,t=1/0){return Ve(e)?jt((i,r)=>qe((s,o)=>e(i,s,r,o))(Vt(n(i,r))),t):(typeof e=="number"&&(t=e),Ke((i,r)=>g0(i,r,n,t)))}function v0(n=1/0){return jt(mn,n)}function y0(){return v0(1)}function Oo(...n){return y0()(Ot(n,Dr(n)))}function oc(n){return new tt(e=>{Vt(n()).subscribe(e)})}function tm(...n){let e=wu(n),{args:t,keys:i}=Bu(n),r=new tt(s=>{let{length:o}=t;if(!o){s.complete();return}let a=new Array(o),c=o,l=o;for(let u=0;u<o;u++){let d=!1;Vt(t[u]).subscribe(Ye(s,f=>{d||(d=!0,l--),a[u]=f},()=>c--,void 0,()=>{(!c||!d)&&(l||s.next(i?Vu(i,a):a),s.complete())}))}});return e?r.pipe(Uu(e)):r}function Tn(n,e){return Ke((t,i)=>{let r=0;t.subscribe(Ye(i,s=>n.call(e,s,r++)&&i.next(s)))})}function Ar(n){return Ke((e,t)=>{let i=null,r=!1,s;i=e.subscribe(Ye(t,void 0,void 0,o=>{s=Vt(n(o,Ar(n)(e))),i?(i.unsubscribe(),i=null,s.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,s.subscribe(t))})}function _0(n,e,t,i,r){return(s,o)=>{let a=t,c=e,l=0;s.subscribe(Ye(o,u=>{let d=l++;c=a?n(c,u,d):(a=!0,u),i&&o.next(c)},r&&(()=>{a&&o.next(c),o.complete()})))}}function Ir(n,e){return Ve(e)?jt(n,e,1):jt(n,1)}function ac(n,e=t0){return Ke((t,i)=>{let r=null,s=null,o=null,a=()=>{if(r){r.unsubscribe(),r=null;let l=s;s=null,i.next(l)}};function c(){let l=o+n,u=e.now();if(u<l){r=this.schedule(void 0,l-u),i.add(r);return}a()}t.subscribe(Ye(i,l=>{s=l,o=e.now(),r||(r=e.schedule(c,n),i.add(r))},()=>{a(),i.complete()},void 0,()=>{s=r=null}))})}function Rr(n){return Ke((e,t)=>{let i=!1;e.subscribe(Ye(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function er(n){return n<=0?()=>wn:Ke((e,t)=>{let i=0;e.subscribe(Ye(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function cc(n,e=mn){return n=n??WC,Ke((t,i)=>{let r,s=!0;t.subscribe(Ye(i,o=>{let a=e(o);(s||!n(r,a))&&(s=!1,r=a,i.next(o))}))})}function WC(n,e){return n===e}function zu(n=$C){return Ke((e,t)=>{let i=!1;e.subscribe(Ye(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function $C(){return new Qi}function xs(n){return Ke((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function tr(n,e){let t=arguments.length>=2;return i=>i.pipe(n?Tn((r,s)=>n(r,s,i)):mn,er(1),t?Rr(e):zu(()=>new Qi))}function Fo(n){return n<=0?()=>wn:Ke((e,t)=>{let i=[];e.subscribe(Ye(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function nm(n,e){let t=arguments.length>=2;return i=>i.pipe(n?Tn((r,s)=>n(r,s,i)):mn,Fo(1),t?Rr(e):zu(()=>new Qi))}function im(n,e){return Ke(_0(n,e,arguments.length>=2,!0))}function rm(...n){let e=Dr(n);return Ke((t,i)=>{(e?Oo(n,t,e):Oo(n,t)).subscribe(i)})}function ln(n,e){return Ke((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(Ye(i,c=>{r?.unsubscribe();let l=0,u=s++;Vt(n(c,u)).subscribe(r=Ye(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}function Gu(n){return Ke((e,t)=>{Vt(n).subscribe(Ye(t,()=>t.complete(),rc)),!t.closed&&e.subscribe(t)})}function Jt(n,e,t){let i=Ve(n)||e||t?{next:n,error:e,complete:t}:n;return i?Ke((r,s)=>{var o;(o=i.subscribe)===null||o===void 0||o.call(i);let a=!0;r.subscribe(Ye(s,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),s.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),s.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),s.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):mn}function x0(n){let e=$e(null);try{return n()}finally{$e(e)}}var qu="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",de=class extends Error{code;constructor(e,t){super(Cs(e,t)),this.code=e}};function qC(n){return`NG0${Math.abs(n)}`}function Cs(n,e){return`${qC(n)}${e?": "+e:""}`}var fc=globalThis;function mt(n){for(let e in n)if(n[e]===mt)return e;throw Error("")}function b0(n,e){for(let t in e)e.hasOwnProperty(t)&&!n.hasOwnProperty(t)&&(n[t]=e[t])}function ir(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(ir).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function gm(n,e){return n?e?`${n} ${e}`:n:e||""}var XC=mt({__forward_ref__:mt});function Ts(n){return n.__forward_ref__=Ts,n.toString=function(){return ir(this())},n}function nn(n){return vm(n)?n():n}function vm(n){return typeof n=="function"&&n.hasOwnProperty(XC)&&n.__forward_ref__===Ts}function ye(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Jn(n){return{providers:n.providers||[],imports:n.imports||[]}}function hc(n){return YC(n,Xu)}function ym(n){return hc(n)!==null}function YC(n,e){return n.hasOwnProperty(e)&&n[e]||null}function ZC(n){let e=n?.[Xu]??null;return e||null}function om(n){return n&&n.hasOwnProperty(Wu)?n[Wu]:null}var Xu=mt({\u0275prov:mt}),Wu=mt({\u0275inj:mt}),pe=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=ye({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function _m(n){return n&&!!n.\u0275providers}var xm=mt({\u0275cmp:mt}),Em=mt({\u0275dir:mt}),Mm=mt({\u0275pipe:mt}),bm=mt({\u0275mod:mt}),uc=mt({\u0275fac:mt}),Ds=mt({__NG_ELEMENT_ID__:mt}),E0=mt({__NG_ENV_ID__:mt});function pc(n){return typeof n=="string"?n:n==null?"":String(n)}function S0(n){return typeof n=="function"?n.name||n.toString():typeof n=="object"&&n!=null&&typeof n.type=="function"?n.type.name||n.type.toString():pc(n)}var w0=mt({ngErrorCode:mt}),JC=mt({ngErrorMessage:mt}),KC=mt({ngTokenPath:mt});function Sm(n,e){return C0("",-200,e)}function Yu(n,e){throw new de(-201,!1)}function C0(n,e,t){let i=new de(e,n);return i[w0]=e,i[JC]=n,t&&(i[KC]=t),i}function QC(n){return n[w0]}var am;function T0(){return am}function Fn(n){let e=am;return am=n,e}function wm(n,e,t){let i=hc(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Yu(n,"Injector")}var eT={},Es=eT,tT="__NG_DI_FLAG__",cm=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=Ms(t)||0;try{return this.injector.get(e,i&8?null:Es,i)}catch(r){if(_o(r))return r;throw r}}};function nT(n,e=0){let t=ou();if(t===void 0)throw new de(-203,!1);if(t===null)return wm(n,void 0,e);{let i=iT(e),r=t.retrieve(n,i);if(_o(r)){if(i.optional)return null;throw r}return r}}function Te(n,e=0){return(T0()||nT)(nn(n),e)}function Y(n,e){return Te(n,Ms(e))}function Ms(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function iT(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function lm(n){let e=[];for(let t=0;t<n.length;t++){let i=nn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new de(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=rT(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(Te(r,s))}else e.push(Te(i))}return e}function rT(n){return n[tT]}function bs(n,e){let t=n.hasOwnProperty(uc);return t?n[uc]:null}function D0(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function A0(n){return n.flat(Number.POSITIVE_INFINITY)}function Zu(n,e){n.forEach(t=>Array.isArray(t)?Zu(t,e):e(t))}function Cm(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function mc(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function I0(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function R0(n,e,t){let i=ko(n,e);return i>=0?n[i|1]=t:(i=~i,I0(n,i,e,t)),i}function Ju(n,e){let t=ko(n,e);if(t>=0)return n[t|1]}function ko(n,e){return sT(n,e,1)}function sT(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var Or={},Ln=[],rr=new pe(""),Tm=new pe("",-1),Dm=new pe(""),dc=class{get(e,t=Es){if(t===Es){let r=C0("",-201);throw r.name="\u0275NotFound",r}return t}};function Am(n){return n[bm]||null}function Fr(n){return n[xm]||null}function Im(n){return n[Em]||null}function N0(n){return n[Mm]||null}function sr(n){return{\u0275providers:n}}function P0(n){return sr([{provide:rr,multi:!0,useValue:n}])}function O0(...n){return{\u0275providers:Rm(!0,n),\u0275fromNgModule:!0}}function Rm(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Zu(e,o=>{let a=o;$u(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&F0(r,s),t}function F0(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Nm(r,s=>{e(s,i)})}}function $u(n,e,t,i){if(n=nn(n),!n)return!1;let r=null,s=om(n),o=!s&&Fr(n);if(!s&&!o){let c=n.ngModule;if(s=om(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)$u(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;try{Zu(s.imports,u=>{$u(u,e,t,i)&&(l||=[],l.push(u))})}finally{}l!==void 0&&F0(l,e)}if(!a){let l=bs(r)||(()=>new r);e({provide:r,useFactory:l,deps:Ln},r),e({provide:Dm,useValue:r,multi:!0},r),e({provide:rr,useValue:()=>Te(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;Nm(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function Nm(n,e){for(let t of n)_m(t)&&(t=t.\u0275providers),Array.isArray(t)?Nm(t,e):e(t)}var oT=mt({provide:String,useValue:mt});function L0(n){return n!==null&&typeof n=="object"&&oT in n}function aT(n){return!!(n&&n.useExisting)}function cT(n){return!!(n&&n.useFactory)}function Ss(n){return typeof n=="function"}function k0(n){return!!n.useClass}var gc=new pe(""),ju={},M0={},sm;function vc(){return sm===void 0&&(sm=new dc),sm}var Ht=class{},ws=class extends Ht{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,dm(e,o=>this.processProvider(o)),this.records.set(Tm,Lo(void 0,this)),r.has("environment")&&this.records.set(Ht,Lo(void 0,this));let s=this.records.get(gc);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(Dm,Ln,{self:!0}))}retrieve(e,t){let i=Ms(t)||0;try{return this.get(e,Es,i)}catch(r){if(_o(r))return r;throw r}}destroy(){lc(this),this._destroyed=!0;let e=$e(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),$e(e)}}onDestroy(e){return lc(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){lc(this);let t=Ti(this),i=Fn(void 0),r;try{return e()}finally{Ti(t),Fn(i)}}get(e,t=Es,i){if(lc(this),e.hasOwnProperty(E0))return e[E0](this);let r=Ms(i),s,o=Ti(this),a=Fn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=hT(e)&&hc(e);u&&this.injectableDefInScope(u)?l=Lo(um(e),ju):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?vc():this.parent;return t=r&8&&t===Es?null:t,c.get(e,t)}catch(c){let l=QC(c);throw l===-200||l===-201?new de(l,null):c}finally{Fn(a),Ti(o)}}resolveInjectorInitializers(){let e=$e(null),t=Ti(this),i=Fn(void 0),r;try{let s=this.get(rr,Ln,{self:!0});for(let o of s)o()}finally{Ti(t),Fn(i),$e(e)}}toString(){let e=[],t=this.records;for(let i of t.keys())e.push(ir(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=nn(e);let t=Ss(e)?e:nn(e&&e.provide),i=uT(e);if(!Ss(e)&&e.multi===!0){let r=this.records.get(t);r||(r=Lo(void 0,ju,!0),r.factory=()=>lm(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=$e(null);try{if(t.value===M0)throw Sm(ir(e));return t.value===ju&&(t.value=M0,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&fT(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{$e(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=nn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function um(n){let e=hc(n),t=e!==null?e.factory:bs(n);if(t!==null)return t;if(n instanceof pe)throw new de(204,!1);if(n instanceof Function)return lT(n);throw new de(204,!1)}function lT(n){if(n.length>0)throw new de(204,!1);let t=ZC(n);return t!==null?()=>t.factory(n):()=>new n}function uT(n){if(L0(n))return Lo(void 0,n.useValue);{let e=Pm(n);return Lo(e,ju)}}function Pm(n,e,t){let i;if(Ss(n)){let r=nn(n);return bs(r)||um(r)}else if(L0(n))i=()=>nn(n.useValue);else if(cT(n))i=()=>n.useFactory(...lm(n.deps||[]));else if(aT(n))i=(r,s)=>Te(nn(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=nn(n&&(n.useClass||n.provide));if(dT(n))i=()=>new r(...lm(n.deps));else return bs(r)||um(r)}return i}function lc(n){if(n.destroyed)throw new de(205,!1)}function Lo(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function dT(n){return!!n.deps}function fT(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function hT(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function dm(n,e){for(let t of n)Array.isArray(t)?dm(t,e):t&&_m(t)?dm(t.\u0275providers,e):e(t)}function rn(n,e){let t;n instanceof ws?(lc(n),t=n):t=new cm(n);let i,r=Ti(t),s=Fn(void 0);try{return e()}finally{Ti(r),Fn(s)}}function U0(){return T0()!==void 0||ou()!=null}var fi=0,ke=1,Ue=2,Kt=3,Kn=4,Qn=5,yc=6,Uo=7,un=8,Lr=9,Ai=10,Ft=11,Bo=12,Om=13,As=14,ei=15,kr=16,Is=17,Ii=18,_c=19,Fm=20,nr=21,Ku=22,xc=23,kn=24,Qu=25,Ec=26,Un=27,B0=1;var Ur=7,Mc=8,Rs=9,gn=10;function Ri(n){return Array.isArray(n)&&typeof n[B0]=="object"}function hi(n){return Array.isArray(n)&&n[B0]===!0}function Lm(n){return(n.flags&4)!==0}function Br(n){return n.componentOffset>-1}function bc(n){return(n.flags&1)===1}function Ni(n){return!!n.template}function Vo(n){return(n[Ue]&512)!==0}function Ns(n){return(n[Ue]&256)===256}var V0="svg",H0="math";function ti(n){for(;Array.isArray(n);)n=n[fi];return n}function km(n,e){return ti(e[n])}function pi(n,e){return ti(e[n.index])}function ed(n,e){return n.data[e]}function ni(n,e){let t=e[n];return Ri(t)?t:t[fi]}function z0(n){return(n[Ue]&4)===4}function td(n){return(n[Ue]&128)===128}function G0(n){return hi(n[Kt])}function Sc(n,e){return e==null?null:n[e]}function Um(n){n[Is]=0}function Bm(n){n[Ue]&1024||(n[Ue]|=1024,td(n)&&Cc(n))}function j0(n,e){for(;n>0;)e=e[As],n--;return e}function wc(n){return!!(n[Ue]&9216||n[kn]?.dirty)}function nd(n){n[Ai].changeDetectionScheduler?.notify(8),n[Ue]&64&&(n[Ue]|=1024),wc(n)&&Cc(n)}function Cc(n){n[Ai].changeDetectionScheduler?.notify(0);let e=Nr(n);for(;e!==null&&!(e[Ue]&8192||(e[Ue]|=8192,!td(e)));)e=Nr(e)}function Vm(n,e){if(Ns(n))throw new de(911,!1);n[nr]===null&&(n[nr]=[]),n[nr].push(e)}function W0(n,e){if(n[nr]===null)return;let t=n[nr].indexOf(e);t!==-1&&n[nr].splice(t,1)}function Nr(n){let e=n[Kt];return hi(e)?e[Kt]:e}function Hm(n){return n[Uo]??=[]}function zm(n){return n.cleanup??=[]}function $0(n,e,t,i){let r=Hm(e);r.push(t),n.firstCreatePass&&zm(n).push(i,r.length-1)}var Qe={lFrame:lx(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var fm=!1;function q0(){return Qe.lFrame.elementDepthCount}function X0(){Qe.lFrame.elementDepthCount++}function Y0(){Qe.lFrame.elementDepthCount--}function Gm(){return Qe.bindingsEnabled}function Z0(){return Qe.skipHydrationRootTNode!==null}function J0(n){return Qe.skipHydrationRootTNode===n}function K0(){Qe.skipHydrationRootTNode=null}function gt(){return Qe.lFrame.lView}function vn(){return Qe.lFrame.tView}function ii(n){return Qe.lFrame.contextLView=n,n[un]}function ri(n){return Qe.lFrame.contextLView=null,n}function yn(){let n=jm();for(;n!==null&&n.type===64;)n=n.parent;return n}function jm(){return Qe.lFrame.currentTNode}function Q0(){let n=Qe.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Ho(n,e){let t=Qe.lFrame;t.currentTNode=n,t.isParent=e}function Wm(){return Qe.lFrame.isParent}function ex(){Qe.lFrame.isParent=!1}function $m(){return fm}function qm(n){let e=fm;return fm=n,e}function tx(){let n=Qe.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function nx(n){return Qe.lFrame.bindingIndex=n}function Tc(){return Qe.lFrame.bindingIndex++}function ix(n){let e=Qe.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function rx(){return Qe.lFrame.inI18n}function sx(n,e){let t=Qe.lFrame;t.bindingIndex=t.bindingRootIndex=n,id(e)}function ox(){return Qe.lFrame.currentDirectiveIndex}function id(n){Qe.lFrame.currentDirectiveIndex=n}function ax(n){let e=Qe.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function Xm(){return Qe.lFrame.currentQueryIndex}function rd(n){Qe.lFrame.currentQueryIndex=n}function pT(n){let e=n[ke];return e.type===2?e.declTNode:e.type===1?n[Qn]:null}function Ym(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=pT(s),r===null||(s=s[As],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=Qe.lFrame=cx();return i.currentTNode=e,i.lView=n,!0}function sd(n){let e=cx(),t=n[ke];Qe.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function cx(){let n=Qe.lFrame,e=n===null?null:n.child;return e===null?lx(n):e}function lx(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function ux(){let n=Qe.lFrame;return Qe.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Zm=ux;function od(){let n=ux();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function dx(n){return(Qe.lFrame.contextLView=j0(n,Qe.lFrame.contextLView))[un]}function Ps(){return Qe.lFrame.selectedIndex}function Vr(n){Qe.lFrame.selectedIndex=n}function ad(){let n=Qe.lFrame;return ed(n.tView,n.selectedIndex)}function fx(){return Qe.lFrame.currentNamespace}var hx=!0;function cd(){return hx}function ld(n){hx=n}function hm(n,e=null,t=null,i){let r=Jm(n,e,t,i);return r.resolveInjectorInitializers(),r}function Jm(n,e=null,t=null,i,r=new Set){let s=[t||Ln,O0(n)];return i=i||(typeof n=="object"?void 0:ir(n)),new ws(s,e||vc(),i||null,r)}var di=class n{static THROW_IF_NOT_FOUND=Es;static NULL=new dc;static create(e,t){if(Array.isArray(e))return hm({name:""},t,e,"");{let i=e.name??"";return hm({name:i},e.parent,e.providers,i)}}static \u0275prov=ye({token:n,providedIn:"any",factory:()=>Te(Tm)});static __NG_ELEMENT_ID__=-1},zt=new pe(""),or=(()=>{class n{static __NG_ELEMENT_ID__=mT;static __NG_ENV_ID__=t=>t}return n})(),pm=class extends or{_lView;constructor(e){super(),this._lView=e}get destroyed(){return Ns(this._lView)}onDestroy(e){let t=this._lView;return Vm(t,e),()=>W0(t,e)}};function mT(){return new pm(gt())}var Di=class{_console=console;handleError(e){this._console.error("ERROR",e)}},_n=new pe("",{providedIn:"root",factory:()=>{let n=Y(Ht),e;return t=>{n.destroyed&&!e?setTimeout(()=>{throw t}):(e??=n.get(Di),e.handleError(t))}}}),px={provide:rr,useValue:()=>void Y(Di),multi:!0},gT=new pe("",{providedIn:"root",factory:()=>{let n=Y(zt).defaultView;if(!n)return;let e=Y(_n),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),Y(or).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function Km(){return sr([P0(()=>void Y(gT))])}function Qm(n){return typeof n=="function"&&n[cn]!==void 0}function si(n,e){let[t,i,r]=zp(n,e?.equal),s=t,o=s[cn];return s.set=i,s.update=r,s.asReadonly=mx.bind(s),s}function mx(){let n=this[cn];if(n.readonlyFn===void 0){let e=()=>this();e[cn]=n,n.readonlyFn=e}return n.readonlyFn}function eg(n){return Qm(n)&&typeof n.set=="function"}var Pr=class{},Dc=new pe("",{providedIn:"root",factory:()=>!1});var tg=new pe(""),ng=new pe(""),Pi=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new tn(!1);get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new tt(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=ye({token:n,providedIn:"root",factory:()=>new n})}return n})(),ud=(()=>{class n{internalPendingTasks=Y(Pi);scheduler=Y(Pr);errorHandler=Y(_n);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let i=this.add();t().catch(this.errorHandler).finally(i)}static \u0275prov=ye({token:n,providedIn:"root",factory:()=>new n})}return n})();function Ac(...n){}var ig=(()=>{class n{static \u0275prov=ye({token:n,providedIn:"root",factory:()=>new mm})}return n})(),mm=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}};function kc(n){return{toString:n}.toString()}function CT(n){return typeof n=="function"}var vd=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function Xx(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var Gr=(()=>{let n=()=>Yx;return n.ngInherit=!0,n})();function Yx(n){return n.type.prototype.ngOnChanges&&(n.setInput=DT),TT}function TT(){let n=Jx(this),e=n?.current;if(e){let t=n.previous;if(t===Or)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function DT(n,e,t,i,r){let s=this.declaredInputs[i],o=Jx(n)||AT(n,{previous:Or,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new vd(l&&l.currentValue,t,c===Or),Xx(n,e,r,t)}var Zx="__ngSimpleChanges__";function Jx(n){return n[Zx]||null}function AT(n,e){return n[Zx]=e}var gx=[];var xt=function(n,e=null,t){for(let i=0;i<gx.length;i++){let r=gx[i];r(n,e,t)}};function IT(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=Yx(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function Kx(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function hd(n,e,t){Qx(n,e,3,t)}function pd(n,e,t,i){(n[Ue]&3)===t&&Qx(n,e,t,i)}function rg(n,e){let t=n[Ue];(t&3)===e&&(t&=16383,t+=1,n[Ue]=t)}function Qx(n,e,t,i){let r=i!==void 0?n[Is]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Is]+=65536),(a<s||s==-1)&&(RT(n,t,e,c),n[Is]=(n[Is]&4294901760)+c+2),c++}function vx(n,e){xt(4,n,e);let t=$e(null);try{e.call(n)}finally{$e(t),xt(5,n,e)}}function RT(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Ue]>>14<n[Is]>>16&&(n[Ue]&3)===e&&(n[Ue]+=16384,vx(a,s)):vx(a,s)}var Go=-1,Fs=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function NT(n){return(n.flags&8)!==0}function PT(n){return(n.flags&16)!==0}function OT(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];FT(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function eE(n){return n===3||n===4||n===6}function FT(n){return n.charCodeAt(0)===64}function Nc(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?yx(n,t,r,null,e[++i]):yx(n,t,r,null,null))}}return n}function yx(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function tE(n){return n!==Go}function yd(n){return n&32767}function LT(n){return n>>16}function _d(n,e){let t=LT(n),i=e;for(;t>0;)i=i[As],t--;return i}var pg=!0;function _x(n){let e=pg;return pg=n,e}var kT=256,nE=kT-1,iE=5,UT=0,Oi={};function BT(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Ds)&&(i=t[Ds]),i==null&&(i=t[Ds]=UT++);let r=i&nE,s=1<<r;e.data[n+(r>>iE)]|=s}function xd(n,e){let t=rE(n,e);if(t!==-1)return t;let i=e[ke];i.firstCreatePass&&(n.injectorIndex=e.length,sg(i.data,n),sg(e,null),sg(i.blueprint,null));let r=Bg(n,e),s=n.injectorIndex;if(tE(r)){let o=yd(r),a=_d(r,e),c=a[ke].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function sg(n,e){n.push(0,0,0,0,0,0,0,0,e)}function rE(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function Bg(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=lE(r),i===null)return Go;if(t++,r=r[As],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Go}function mg(n,e,t){BT(n,e,t)}function VT(n,e){if(e==="class")return n.classes;if(e==="style")return n.styles;let t=n.attrs;if(t){let i=t.length,r=0;for(;r<i;){let s=t[r];if(eE(s))break;if(s===0)r=r+2;else if(typeof s=="number")for(r++;r<i&&typeof t[r]=="string";)r++;else{if(s===e)return t[r+1];r=r+2}}}return null}function sE(n,e,t){if(t&8||n!==void 0)return n;Yu(e,"NodeInjector")}function oE(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Lr],s=Fn(void 0);try{return r?r.get(e,i,t&8):wm(e,i,t&8)}finally{Fn(s)}}return sE(i,e,t)}function aE(n,e,t,i=0,r){if(n!==null){if(e[Ue]&2048&&!(i&2)){let o=jT(n,e,t,i,Oi);if(o!==Oi)return o}let s=cE(n,e,t,i,Oi);if(s!==Oi)return s}return oE(e,t,i,r)}function cE(n,e,t,i,r){let s=zT(t);if(typeof s=="function"){if(!Ym(e,n,i))return i&1?sE(r,t,i):oE(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))Yu(t);else return o}finally{Zm()}}else if(typeof s=="number"){let o=null,a=rE(n,e),c=Go,l=i&1?e[ei][Qn]:null;for((a===-1||i&4)&&(c=a===-1?Bg(n,e):e[a+8],c===Go||!Ex(i,!1)?a=-1:(o=e[ke],a=yd(c),e=_d(c,e)));a!==-1;){let u=e[ke];if(xx(s,a,u.data)){let d=HT(a,e,t,o,i,l);if(d!==Oi)return d}c=e[a+8],c!==Go&&Ex(i,e[ke].data[a+8]===l)&&xx(s,a,e)?(o=u,a=yd(c),e=_d(c,e)):a=-1}}return r}function HT(n,e,t,i,r,s){let o=e[ke],a=o.data[n+8],c=i==null?Br(a)&&pg:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=md(a,o,t,c,l);return u!==null?Pc(e,o,u,a,r):Oi}function md(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=o[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=o[c];if(h&&Ni(h)&&h.type===t)return c}return null}function Pc(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof Fs){let a=s;if(a.resolving){let h=S0(o[t]);throw Sm(h)}let c=_x(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?Fn(a.injectImpl):null,f=Ym(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&IT(t,o[t],e)}finally{d!==null&&Fn(d),_x(c),a.resolving=!1,Zm()}}return s}function zT(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Ds)?n[Ds]:void 0;return typeof e=="number"?e>=0?e&nE:GT:e}function xx(n,e,t){let i=1<<n;return!!(t[e+(n>>iE)]&i)}function Ex(n,e){return!(n&2)&&!(n&1&&e)}var Os=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return aE(this._tNode,this._lView,e,Ms(i),t)}};function GT(){return new Os(yn(),gt())}function Xo(n){return kc(()=>{let e=n.prototype.constructor,t=e[uc]||gg(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[uc]||gg(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function gg(n){return vm(n)?()=>{let e=gg(nn(n));return e&&e()}:bs(n)}function jT(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Ue]&2048&&!Vo(o);){let a=cE(s,o,t,i|2,Oi);if(a!==Oi)return a;let c=s.parent;if(!c){let l=o[Fm];if(l){let u=l.get(t,Oi,i);if(u!==Oi)return u}c=lE(o),o=o[As]}s=c}return r}function lE(n){let e=n[ke],t=e.type;return t===2?e.declTNode:t===1?n[Qn]:null}function Uc(n){return VT(yn(),n)}function WT(){return Yo(yn(),gt())}function Yo(n,e){return new gi(pi(n,e))}var gi=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=WT}return n})();function $T(n){return n instanceof gi?n.nativeElement:n}function qT(){return this._results[Symbol.iterator]()}var Ed=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new St}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=A0(e);(this._changesDetected=!D0(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=qT};function uE(n){return(n.flags&128)===128}var Vg=(function(n){return n[n.OnPush=0]="OnPush",n[n.Default=1]="Default",n})(Vg||{}),dE=new Map,XT=0;function YT(){return XT++}function ZT(n){dE.set(n[_c],n)}function vg(n){dE.delete(n[_c])}var Mx="__ngContext__";function jo(n,e){Ri(e)?(n[Mx]=e[_c],ZT(e)):n[Mx]=e}function fE(n){return pE(n[Bo])}function hE(n){return pE(n[Kn])}function pE(n){for(;n!==null&&!hi(n);)n=n[Kn];return n}var yg;function Hg(n){yg=n}function mE(){if(yg!==void 0)return yg;if(typeof document<"u")return document;throw new de(210,!1)}var Nd=new pe("",{providedIn:"root",factory:()=>JT}),JT="ng",Pd=new pe(""),Zo=new pe("",{providedIn:"platform",factory:()=>"unknown"});var Od=new pe("",{providedIn:"root",factory:()=>mE().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var KT="h",QT="b";var gE=!1,vE=new pe("",{providedIn:"root",factory:()=>gE});var eD=(n,e,t,i)=>{};function tD(n,e,t,i){eD(n,e,t,i)}function zg(n){return(n.flags&32)===32}var nD=()=>null;function yE(n,e,t=!1){return nD(n,e,t)}function _E(n,e){let t=n.contentQueries;if(t!==null){let i=$e(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];rd(s),a.contentQueries(2,e[o],o)}}}finally{$e(i)}}}function _g(n,e,t){rd(0);let i=$e(null);try{e(n,t)}finally{$e(i)}}function xE(n,e,t){if(Lm(e)){let i=$e(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{$e(i)}}}var ar=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n})(ar||{});var dd;function iD(){if(dd===void 0&&(dd=null,fc.trustedTypes))try{dd=fc.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return dd}function bx(n){return iD()?.createScriptURL(n)||n}var Md=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${qu})`}};function Fd(n){return n instanceof Md?n.changingThisBreaksApplicationSecurity:n}function Gg(n,e){let t=EE(n);if(t!=null&&t!==e){if(t==="ResourceURL"&&e==="URL")return!0;throw new Error(`Required a safe ${e}, got a ${t} (see ${qu})`)}return t===e}function EE(n){return n instanceof Md&&n.getTypeName()||null}var rD=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function ME(n){return n=String(n),n.match(rD)?n:"unsafe:"+n}var Ld=(function(n){return n[n.NONE=0]="NONE",n[n.HTML=1]="HTML",n[n.STYLE=2]="STYLE",n[n.SCRIPT=3]="SCRIPT",n[n.URL=4]="URL",n[n.RESOURCE_URL=5]="RESOURCE_URL",n})(Ld||{});function bE(n){let e=wE();return e?e.sanitize(Ld.URL,n)||"":Gg(n,"URL")?Fd(n):ME(pc(n))}function SE(n){let e=wE();if(e)return bx(e.sanitize(Ld.RESOURCE_URL,n)||"");if(Gg(n,"ResourceURL"))return bx(Fd(n));throw new de(904,!1)}function sD(n,e){return e==="src"&&(n==="embed"||n==="frame"||n==="iframe"||n==="media"||n==="script")||e==="href"&&(n==="base"||n==="link")?SE:bE}function jg(n,e,t){return sD(e,t)(n)}function wE(){let n=gt();return n&&n[Ai].sanitizer}function CE(n){return n instanceof Function?n():n}function oD(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var TE="ng-template";function aD(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&oD(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(Wg(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function Wg(n){return n.type===4&&n.value!==TE}function cD(n,e,t){let i=n.type===4&&!t?TE:n.value;return e===i}function lD(n,e,t){let i=4,r=n.attrs,s=r!==null?fD(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!mi(i)&&!mi(c))return!1;if(o&&mi(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!cD(n,c,t)||c===""&&e.length===1){if(mi(i))return!1;o=!0}}else if(i&8){if(r===null||!aD(n,r,c,t)){if(mi(i))return!1;o=!0}}else{let l=e[++a],u=uD(c,r,Wg(n),t);if(u===-1){if(mi(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(mi(i))return!1;o=!0}}}}return mi(i)||o}function mi(n){return(n&1)===0}function uD(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return hD(e,n)}function dD(n,e,t=!1){for(let i=0;i<e.length;i++)if(lD(n,e[i],t))return!0;return!1}function fD(n){for(let e=0;e<n.length;e++){let t=n[e];if(eE(t))return e}return n.length}function hD(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function Sx(n,e){return n?":not("+e.trim()+")":e}function pD(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!mi(o)&&(e+=Sx(s,r),r=""),i=o,s=s||!mi(i);t++}return r!==""&&(e+=Sx(s,r)),e}function mD(n){return n.map(pD).join(",")}function gD(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!mi(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var cr={};function vD(n,e){return n.createText(e)}function yD(n,e,t){n.setValue(e,t)}function DE(n,e,t){return n.createElement(e,t)}function bd(n,e,t,i,r){n.insertBefore(e,t,i,r)}function AE(n,e,t){n.appendChild(e,t)}function wx(n,e,t,i,r){i!==null?bd(n,e,t,i,r):AE(n,e,t)}function _D(n,e,t,i){n.removeChild(null,e,t,i)}function xD(n,e,t){n.setAttribute(e,"style",t)}function ED(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function IE(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&OT(n,e,i),r!==null&&ED(n,e,r),s!==null&&xD(n,e,s)}function $g(n,e,t,i,r,s,o,a,c,l,u){let d=Un+i,f=d+r,h=MD(d,f),g=typeof l=="function"?l():l;return h[ke]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function MD(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:cr);return t}function bD(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=$g(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function qg(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[fi]=r,d[Ue]=i|4|128|8|64|1024,(l!==null||n&&n[Ue]&2048)&&(d[Ue]|=2048),Um(d),d[Kt]=d[As]=n,d[un]=t,d[Ai]=o||n&&n[Ai],d[Ft]=a||n&&n[Ft],d[Lr]=c||n&&n[Lr]||null,d[Qn]=s,d[_c]=YT(),d[yc]=u,d[Fm]=l,d[ei]=e.type==2?n[ei]:d,d}function SD(n,e,t){let i=pi(e,n),r=bD(t),s=n[Ai].rendererFactory,o=Xg(n,qg(n,r,null,RE(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function RE(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function NE(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function Xg(n,e){return n[Bo]?n[Om][Kn]=e:n[Bo]=e,n[Om]=e,e}function it(n=1){PE(vn(),gt(),Ps()+n,!1)}function PE(n,e,t,i){if(!i)if((e[Ue]&3)===3){let s=n.preOrderCheckHooks;s!==null&&hd(e,s,t)}else{let s=n.preOrderHooks;s!==null&&pd(e,s,0,t)}Vr(t)}var kd=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(kd||{});function xg(n,e,t,i){let r=$e(null);try{let[s,o,a]=n.inputs[t],c=null;(o&kd.SignalBased)!==0&&(c=e[s][cn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):Xx(e,c,s,i)}finally{$e(r)}}var Fi=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Fi||{}),wD;function Yg(n,e){return wD(n,e)}var Wo=new Set,Zg=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(Zg||{}),Bc=new pe(""),Cx=new Set;function Ud(n){Cx.has(n)||(Cx.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var OE=!1,Eg=class extends St{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,U0()&&(this.destroyRef=Y(or,{optional:!0})??void 0,this.pendingTasks=Y(Pi,{optional:!0})??void 0)}emit(e){let t=$e(null);try{super.next(e)}finally{$e(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof Pt&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Wt=Eg;function FE(n){let e,t;function i(){n=Ac;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function Tx(n){return queueMicrotask(()=>n()),()=>{n=Ac}}var Jg="isAngularZone",Sd=Jg+"_ID",CD=0,Lt=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Wt(!1);onMicrotaskEmpty=new Wt(!1);onStable=new Wt(!1);onError=new Wt(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=OE}=e;if(typeof Zone>"u")throw new de(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,AD(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Jg)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new de(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new de(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,TD,Ac,Ac);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},TD={};function Kg(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function DD(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){FE(()=>{n.callbackScheduled=!1,Mg(n),n.isCheckStableRunning=!0,Kg(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Mg(n)}function AD(n){let e=()=>{DD(n)},t=CD++;n._inner=n._inner.fork({name:"angular",properties:{[Jg]:!0,[Sd]:t,[Sd+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(ID(c))return i.invokeTask(s,o,a,c);try{return Dx(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),Ax(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return Dx(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!RD(c)&&e(),Ax(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Mg(n),Kg(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Mg(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function Dx(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function Ax(n){n._nesting--,Kg(n)}var wd=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Wt;onMicrotaskEmpty=new Wt;onStable=new Wt;onError=new Wt;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function ID(n){return LE(n,"__ignore_ng_zone__")}function RD(n){return LE(n,"__scheduler_tick__")}function LE(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var kE=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=ye({token:n,providedIn:"root",factory:()=>new n})}return n})();var ND=new pe("",{providedIn:"root",factory:()=>({queue:new Set,isScheduled:!1,scheduler:null})});function UE(n,e){let t=n.get(ND);if(Array.isArray(e))for(let i of e)t.queue.add(i);else t.queue.add(e);t.scheduler&&t.scheduler(n)}function PD(n,e){for(let[t,i]of e)UE(n,i.animateFns)}function Ix(n,e,t,i){let r=n?.[Ec]?.enter;e!==null&&r&&r.has(t.index)&&PD(i,r)}function zo(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;hi(r)?c=r:Ri(r)&&(l=!0,r=r[fi]);let u=ti(r);n===0&&i!==null?(Ix(a,i,s,t),o==null?AE(e,i,u):bd(e,i,u,o||null,!0)):n===1&&i!==null?(Ix(a,i,s,t),bd(e,i,u,o||null,!0)):n===2?Rx(a,s,t,d=>{_D(e,u,l,d)}):n===3&&Rx(a,s,t,()=>{e.destroyNode(u)}),c!=null&&$D(e,n,t,c,s,i,o)}}function OD(n,e){BE(n,e),e[fi]=null,e[Qn]=null}function FD(n,e,t,i,r,s){i[fi]=r,i[Qn]=e,Bd(n,i,t,1,r,s)}function BE(n,e){e[Ai].changeDetectionScheduler?.notify(9),Bd(n,e,e[Ft],2,null,null)}function LD(n){let e=n[Bo];if(!e)return og(n[ke],n);for(;e;){let t=null;if(Ri(e))t=e[Bo];else{let i=e[gn];i&&(t=i)}if(!t){for(;e&&!e[Kn]&&e!==n;)Ri(e)&&og(e[ke],e),e=e[Kt];e===null&&(e=n),Ri(e)&&og(e[ke],e),t=e&&e[Kn]}e=t}}function Qg(n,e){let t=n[Rs],i=t.indexOf(e);t.splice(i,1)}function VE(n,e){if(Ns(e))return;let t=e[Ft];t.destroyNode&&Bd(n,e,t,3,null,null),LD(e)}function og(n,e){if(Ns(e))return;let t=$e(null);try{e[Ue]&=-129,e[Ue]|=256,e[kn]&&ic(e[kn]),BD(n,e),UD(n,e),e[ke].type===1&&e[Ft].destroy();let i=e[kr];if(i!==null&&hi(e[Kt])){i!==e[Kt]&&Qg(i,e);let r=e[Ii];r!==null&&r.detachView(n)}vg(e)}finally{$e(t)}}function Rx(n,e,t,i){let r=n?.[Ec];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);if(r.skipLeaveAnimations)return r.skipLeaveAnimations=!1,i(!1);n&&Wo.add(n),UE(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o)for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.running=Promise.allSettled(a),kD(n,i)}else n&&Wo.delete(n),i(!1)})}function kD(n,e){let t=n[Ec]?.running;if(t){t.then(()=>{n[Ec].running=void 0,Wo.delete(n),e(!0)});return}e(!1)}function UD(n,e){let t=n.cleanup,i=e[Uo];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[Uo]=null);let r=e[nr];if(r!==null){e[nr]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[xc];if(s!==null){e[xc]=null;for(let o of s)o.destroy()}}function BD(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Fs)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];xt(4,a,c);try{c.call(a)}finally{xt(5,a,c)}}else{xt(4,r,s);try{s.call(r)}finally{xt(5,r,s)}}}}}function VD(n,e,t){return HD(n,e.parent,t)}function HD(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[fi];if(Br(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===ar.None||r===ar.Emulated)return null}return pi(i,t)}function zD(n,e,t){return jD(n,e,t)}function GD(n,e,t){return n.type&40?pi(n,t):null}var jD=GD,Nx;function ev(n,e,t,i){let r=VD(n,i,e),s=e[Ft],o=i.parent||e[Qn],a=zD(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)wx(s,r,t[c],a,!1);else wx(s,r,t,a,!1);Nx!==void 0&&Nx(s,i,e,t,r)}function Ic(n,e){if(e!==null){let t=e.type;if(t&3)return pi(e,n);if(t&4)return bg(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Ic(n,i);{let r=n[e.index];return hi(r)?bg(-1,r):ti(r)}}else{if(t&128)return Ic(n,e.next);if(t&32)return Yg(e,n)()||ti(n[e.index]);{let i=HE(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Nr(n[ei]);return Ic(r,i)}else return Ic(n,e.next)}}}return null}function HE(n,e){if(e!==null){let i=n[ei][Qn],r=e.projection;return i.projection[r]}return null}function bg(n,e){let t=gn+n+1;if(t<e.length){let i=e[t],r=i[ke].firstChild;if(r!==null)return Ic(i,r)}return e[Ur]}function tv(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Lr];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&jo(ti(c),i),t.flags|=2),!zg(t))if(l&8)tv(n,e,t.child,i,r,s,!1),zo(e,n,a,r,c,t,s,i);else if(l&32){let u=Yg(t,i),d;for(;d=u();)zo(e,n,a,r,d,t,s,i);zo(e,n,a,r,c,t,s,i)}else l&16?WD(n,e,i,t,r,s):zo(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function Bd(n,e,t,i,r,s){tv(t,i,n.firstChild,e,r,s,!1)}function WD(n,e,t,i,r,s){let o=t[ei],c=o[Qn].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];zo(e,n,t[Lr],r,u,i,s,t)}else{let l=c,u=o[Kt];uE(i)&&(l.flags|=128),tv(n,e,l,u,r,s,!0)}}function $D(n,e,t,i,r,s,o){let a=i[Ur],c=ti(i);a!==c&&zo(e,n,t,s,a,r,o);for(let l=gn;l<i.length;l++){let u=i[l];Bd(u[ke],u,n,e,s,a)}}function qD(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:Fi.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=Fi.Important),n.setStyle(t,i,r,s))}}function zE(n,e,t,i,r){let s=Ps(),o=i&2;try{Vr(-1),o&&e.length>Un&&PE(n,e,Un,!1),xt(o?2:0,r,t),t(i,r)}finally{Vr(s),xt(o?3:1,r,t)}}function nv(n,e,t){eA(n,e,t),(t.flags&64)===64&&tA(n,e,t)}function GE(n,e,t=pi){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function XD(n,e,t,i){let s=i.get(vE,gE)||t===ar.ShadowDom,o=n.selectRootElement(e,s);return YD(o),o}function YD(n){ZD(n)}var ZD=()=>null;function JD(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function jE(n,e,t,i,r,s){let o=e[ke];if(iv(n,o,e,t,i)){Br(n)&&QD(e,n.index);return}n.type&3&&(t=JD(t)),KD(n,e,t,i,r,s)}function KD(n,e,t,i,r,s){if(n.type&3){let o=pi(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function QD(n,e){let t=ni(e,n);t[Ue]&16||(t[Ue]|=64)}function eA(n,e,t){let i=t.directiveStart,r=t.directiveEnd;Br(t)&&SD(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||xd(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=Pc(e,n,o,t);if(jo(c,e),s!==null&&sA(e,o-i,c,a,t,s),Ni(a)){let l=ni(t.index,e);l[un]=Pc(e,n,o,t)}}}function tA(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=ox();try{Vr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];id(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&nA(c,l)}}finally{Vr(-1),id(o)}}function nA(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function WE(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];dD(e,s.selectors,!1)&&(i??=[],Ni(s)?i.unshift(s):i.push(s))}return i}function iA(n,e,t,i,r,s){let o=pi(n,e);rA(e[Ft],o,s,n.value,t,i,r)}function rA(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?pc(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function sA(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];xg(i,t,c,l)}}function oA(n,e,t,i,r){let s=Un+t,o=e[ke],a=r(o,e,n,i,t);e[s]=a,Ho(n,!0);let c=n.type===2;return c?(IE(e[Ft],a,n),(q0()===0||bc(n))&&jo(a,e),X0()):jo(a,e),cd()&&(!c||!zg(n))&&ev(o,e,a,n),n}function aA(n){let e=n;return Wm()?ex():(e=e.parent,Ho(e,!1)),e}function cA(n,e){let t=n[Lr];if(!t)return;let i;try{i=t.get(_n,null)}catch{i=null}i?.(e)}function iv(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];xg(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];xg(u,l,i,r),a=!0}return a}function lA(n,e){let t=ni(e,n),i=t[ke];uA(i,t);let r=t[fi];r!==null&&t[yc]===null&&(t[yc]=yE(r,t[Lr])),xt(18),rv(i,t,t[un]),xt(19,t[un])}function uA(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function rv(n,e,t){sd(e);try{let i=n.viewQuery;i!==null&&_g(1,i,t);let r=n.template;r!==null&&zE(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Ii]?.finishViewCreation(n),n.staticContentQueries&&_E(n,e),n.staticViewQueries&&_g(2,n.viewQuery,t);let s=n.components;s!==null&&dA(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Ue]&=-5,od()}}function dA(n,e){for(let t=0;t<e.length;t++)lA(n,e[t])}function fA(n,e,t,i){let r=$e(null);try{let s=e.tView,a=n[Ue]&4096?4096:16,c=qg(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[kr]=l;let u=n[Ii];return u!==null&&(c[Ii]=u.createEmbeddedView(s)),rv(s,c,t),c}finally{$e(r)}}function Px(n,e){return!e||e.firstChild===null||uE(n)}function Oc(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(ti(s)),hi(s)&&$E(s,i);let o=t.type;if(o&8)Oc(n,e,t.child,i);else if(o&32){let a=Yg(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=HE(e,t);if(Array.isArray(a))i.push(...a);else{let c=Nr(e[ei]);Oc(c[ke],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function $E(n,e){for(let t=gn;t<n.length;t++){let i=n[t],r=i[ke].firstChild;r!==null&&Oc(i[ke],i,r,e)}n[Ur]!==n[fi]&&e.push(n[Ur])}function qE(n){if(n[Qu]!==null){for(let e of n[Qu])e.impl.addSequence(e);n[Qu].length=0}}var XE=[];function hA(n){return n[kn]??pA(n)}function pA(n){let e=XE.pop()??Object.create(gA);return e.lView=n,e}function mA(n){n.lView[kn]!==n&&(n.lView=null,XE.push(n))}var gA=Je(re({},xo),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Cc(n.lView)},consumerOnSignalRead(){this.lView[kn]=this}});function vA(n){let e=n[kn]??Object.create(yA);return e.lView=n,e}var yA=Je(re({},xo),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=Nr(n.lView);for(;e&&!YE(e[ke]);)e=Nr(e);e&&Bm(e)},consumerOnSignalRead(){this.lView[kn]=this}});function YE(n){return n.type!==2}function ZE(n){if(n[xc]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[xc])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[Ue]&8192)}}var _A=100;function JE(n,e=0){let i=n[Ai].rendererFactory,r=!1;r||i.begin?.();try{xA(n,e)}finally{r||i.end?.()}}function xA(n,e){let t=$m();try{qm(!0),Sg(n,e);let i=0;for(;wc(n);){if(i===_A)throw new de(103,!1);i++,Sg(n,1)}}finally{qm(t)}}function EA(n,e,t,i){if(Ns(e))return;let r=e[Ue],s=!1,o=!1;sd(e);let a=!0,c=null,l=null;s||(YE(n)?(l=hA(e),c=Mo(l)):du()===null?(a=!1,l=vA(e),c=Mo(l)):e[kn]&&(ic(e[kn]),e[kn]=null));try{Um(e),nx(n.bindingStartIndex),t!==null&&zE(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&hd(e,h,null)}else{let h=n.preOrderHooks;h!==null&&pd(e,h,0,null),rg(e,0)}if(o||MA(e),ZE(e),KE(e,0),n.contentQueries!==null&&_E(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&hd(e,h)}else{let h=n.contentHooks;h!==null&&pd(e,h,1),rg(e,1)}SA(n,e);let d=n.components;d!==null&&eM(e,d,0);let f=n.viewQuery;if(f!==null&&_g(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&hd(e,h)}else{let h=n.viewHooks;h!==null&&pd(e,h,2),rg(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Ku]){for(let h of e[Ku])h();e[Ku]=null}s||(qE(e),e[Ue]&=-73)}catch(u){throw s||Cc(e),u}finally{l!==null&&(tc(l,c),a&&mA(l)),od()}}function KE(n,e){for(let t=fE(n);t!==null;t=hE(t))for(let i=gn;i<t.length;i++){let r=t[i];QE(r,e)}}function MA(n){for(let e=fE(n);e!==null;e=hE(e)){if(!(e[Ue]&2))continue;let t=e[Rs];for(let i=0;i<t.length;i++){let r=t[i];Bm(r)}}}function bA(n,e,t){xt(18);let i=ni(e,n);QE(i,t),xt(19,i[un])}function QE(n,e){td(n)&&Sg(n,e)}function Sg(n,e){let i=n[ke],r=n[Ue],s=n[kn],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&nc(s)),o||=!1,s&&(s.dirty=!1),n[Ue]&=-9217,o)EA(i,n,i.template,n[un]);else if(r&8192){let a=$e(null);try{ZE(n),KE(n,1);let c=i.components;c!==null&&eM(n,c,1),qE(n)}finally{$e(a)}}}function eM(n,e,t){for(let i=0;i<e.length;i++)bA(n,e[i],t)}function SA(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Vr(~r);else{let s=r,o=t[++i],a=t[++i];sx(o,s);let c=e[s];xt(24,c),a(2,c),xt(25,c)}}}finally{Vr(-1)}}function sv(n,e){let t=$m()?64:1088;for(n[Ai].changeDetectionScheduler?.notify(e);n;){n[Ue]|=t;let i=Nr(n);if(Vo(n)&&!i)return n;n=i}return null}function tM(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function wA(n,e,t,i=!0){let r=e[ke];if(CA(r,e,n,t),i){let o=bg(t,n),a=e[Ft],c=a.parentNode(n[Ur]);c!==null&&FD(r,n[Qn],a,e,c,o)}let s=e[yc];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function wg(n,e){if(n.length<=gn)return;let t=gn+e,i=n[t];if(i){let r=i[kr];r!==null&&r!==n&&Qg(r,i),e>0&&(n[t-1][Kn]=i[Kn]);let s=mc(n,gn+e);OD(i[ke],i);let o=s[Ii];o!==null&&o.detachView(s[ke]),i[Kt]=null,i[Kn]=null,i[Ue]&=-129}return i}function CA(n,e,t,i){let r=gn+i,s=t.length;i>0&&(t[r-1][Kn]=e),i<s-gn?(e[Kn]=t[r],Cm(t,gn+i,e)):(t.push(e),e[Kn]=null),e[Kt]=t;let o=e[kr];o!==null&&t!==o&&nM(o,e);let a=e[Ii];a!==null&&a.insertView(n),nd(e),e[Ue]|=128}function nM(n,e){let t=n[Rs],i=e[Kt];if(Ri(i))n[Ue]|=2;else{let r=i[Kt][ei];e[ei]!==r&&(n[Ue]|=2)}t===null?n[Rs]=[e]:t.push(e)}var Hr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[ke];return Oc(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[un]}set context(e){this._lView[un]=e}get destroyed(){return Ns(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[Kt];if(hi(e)){let t=e[Mc],i=t?t.indexOf(this):-1;i>-1&&(wg(e,i),mc(t,i))}this._attachedToViewContainer=!1}VE(this._lView[ke],this._lView)}onDestroy(e){Vm(this._lView,e)}markForCheck(){sv(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Ue]&=-129}reattach(){nd(this._lView),this._lView[Ue]|=128}detectChanges(){this._lView[Ue]|=1024,JE(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new de(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Vo(this._lView),t=this._lView[kr];t!==null&&!e&&Qg(t,this._lView),BE(this._lView[ke],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new de(902,!1);this._appRef=e;let t=Vo(this._lView),i=this._lView[kr];i!==null&&!t&&nM(i,this._lView),nd(this._lView)}};var zr=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=TA;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=fA(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new Hr(s)}}return n})();function TA(){return ov(yn(),gt())}function ov(n,e){return n.type&4?new zr(e,n,Yo(n,e)):null}function av(n,e,t,i,r){let s=n.data[e];if(s===null)s=DA(n,e,t,i,r),rx()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=Q0();s.injectorIndex=o===null?-1:o.injectorIndex}return Ho(s,!0),s}function DA(n,e,t,i,r){let s=jm(),o=Wm(),a=o?s:s&&s.parent,c=n.data[e]=IA(n,a,t,e,i,r);return AA(n,c,s,o),c}function AA(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function IA(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return Z0()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var ej=new RegExp(`^(\\d+)*(${QT}|${KT})*(.*)`);var RA=()=>null;function Ox(n,e){return RA(n,e)}var iM=class{},Vd=class{},Cg=class{resolveComponentFactory(e){throw new de(917,!1)}},Vc=class{static NULL=new Cg},Ls=class{},Bs=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>NA()}return n})();function NA(){let n=gt(),e=yn(),t=ni(e.index,n);return(Ri(t)?t:n)[Ft]}var rM=(()=>{class n{static \u0275prov=ye({token:n,providedIn:"root",factory:()=>null})}return n})();var gd={},Tg=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,gd,i);return r!==gd||t===gd?r:this.parentInjector.get(e,t,i)}};function Fx(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=gm(r,a);else if(s==2){let c=a,l=e[++o];i=gm(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function He(n,e=0){let t=gt();if(t===null)return Te(n,e);let i=yn();return aE(i,t,nn(n),e)}function sM(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}FA(n,e,t,a,s,c,l)}s!==null&&i!==null&&PA(t,i,s)}function PA(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new de(-301,!1);i.push(e[r],s)}}function OA(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function FA(n,e,t,i,r,s,o){let a=i.length,c=!1;for(let f=0;f<a;f++){let h=i[f];!c&&Ni(h)&&(c=!0,OA(n,t,f)),mg(xd(t,e),n,h.type)}HA(t,n.data.length,a);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=NE(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=Nc(t.mergedAttrs,h.hostAttrs),kA(n,t,e,d,h),VA(d,h,r),o!==null&&o.has(h)){let[y,m]=o.get(h);t.directiveToIndex.set(h.type,[d,y+t.directiveStart,m+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let g=h.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}LA(n,t,s)}function LA(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Lx(0,e,r,i),Lx(1,e,r,i),Ux(e,i,!1);else{let s=t.get(r);kx(0,e,s,i),kx(1,e,s,i),Ux(e,i,!0)}}}function Lx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),oM(e,s)}}function kx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),oM(e,o)}}function oM(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Ux(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||Wg(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function kA(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=bs(r.type,!0)),o=new Fs(s,Ni(r),He,null);n.blueprint[i]=o,t[i]=o,UA(n,e,i,NE(n,t,r.hostVars,cr),r)}function UA(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;BA(o)!=a&&o.push(a),o.push(t,i,s)}}function BA(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function VA(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Ni(e)&&(t[""]=n)}}function HA(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function aM(n,e,t,i,r,s,o,a){let c=e[ke],l=c.consts,u=Sc(l,o),d=av(c,n,t,i,u);return s&&sM(c,e,d,Sc(l,a),r),d.mergedAttrs=Nc(d.mergedAttrs,d.attrs),d.attrs!==null&&Fx(d,d.attrs,!1),d.mergedAttrs!==null&&Fx(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function cM(n,e){Kx(n,e),Lm(e)&&n.queries.elementEnd(e)}function cv(n){return uM(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function lM(n,e){if(Array.isArray(n))for(let t=0;t<n.length;t++)e(n[t]);else{let t=n[Symbol.iterator](),i;for(;!(i=t.next()).done;)e(i.value)}}function uM(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function zA(n,e,t){return n[e]=t}function Jo(n,e,t){if(t===cr)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function ag(n,e,t){return function i(r){let s=Br(n)?ni(n.index,e):e;sv(s,5);let o=e[un],a=Bx(e,o,t,r),c=i.__ngNextListenerFn__;for(;c;)a=Bx(e,o,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function Bx(n,e,t,i){let r=$e(null);try{return xt(6,e,t),t(i)!==!1}catch(s){return cA(n,s),!1}finally{xt(7,e,t),$e(r)}}function GA(n,e,t,i,r,s,o,a){let c=bc(n),l=!1,u=null;if(!i&&c&&(u=WA(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=pi(n,t),f=i?i(d):d;tD(t,f,s,a);let h=r.listen(f,s,a);if(!jA(s)){let g=i?y=>i(ti(y[n.index])):n.index;dM(g,e,t,s,a,h,!1)}}return l}function jA(n){return n.startsWith("animation")||n.startsWith("transition")}function WA(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Uo],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function dM(n,e,t,i,r,s,o){let a=e.firstCreatePass?zm(e):null,c=Hm(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}function Vx(n,e,t,i,r,s){let o=e[t],a=e[ke],l=a.data[t].outputs[i],d=o[l].subscribe(s);dM(n.index,a,e,r,s,d,!0)}var Dg=Symbol("BINDING");var Cd=class extends Vc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Fr(e);return new $o(t,this.ngModule)}};function $A(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&kd.SignalBased)!==0};return r&&(s.transform=r),s})}function qA(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function XA(n,e,t){let i=e instanceof Ht?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Tg(t,i):t}function YA(n){let e=n.get(Ls,null);if(e===null)throw new de(407,!1);let t=n.get(rM,null),i=n.get(Pr,null);return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1}}function ZA(n,e){let t=fM(n);return DE(e,t,t==="svg"?V0:t==="math"?H0:null)}function fM(n){return(n.selectors[0][0]||"div").toLowerCase()}var $o=class extends Vd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=$A(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=qA(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=mD(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){xt(22);let a=$e(null);try{let c=this.componentDef,l=JA(i,c,o,s),u=XA(c,r||this.ngModule,e),d=YA(u),f=d.rendererFactory.createRenderer(null,c),h=i?XD(f,i,c.encapsulation,u):ZA(c,f),g=o?.some(Hx)||s?.some(p=>typeof p!="function"&&p.bindings.some(Hx)),y=qg(null,l,null,512|RE(c),null,null,d,f,u,null,yE(h,u,!0));y[Un]=h,sd(y);let m=null;try{let p=aM(Un,y,2,"#host",()=>l.directiveRegistry,!0,0);IE(f,h,p),jo(h,y),nv(l,y,p),xE(l,p,y),cM(l,p),t!==void 0&&QA(p,this.ngContentSelectors,t),m=ni(p.index,y),y[un]=m[un],rv(l,y,null)}catch(p){throw m!==null&&vg(m),vg(y),p}finally{xt(23),od()}return new Td(this.componentType,y,!!g)}finally{$e(a)}}};function JA(n,e,t,i){let r=n?["ng-version","20.3.7"]:gD(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[Dg].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[Dg].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=Im(d);c.push(f)}return $g(0,null,KA(s,o),1,a,c,null,null,null,[r],null)}function KA(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Hx(n){let e=n[Dg].kind;return e==="input"||e==="twoWay"}var Td=class extends iM{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=ed(t[ke],Un),this.location=Yo(this._tNode,t),this.instance=ni(this._tNode.index,t)[un],this.hostView=this.changeDetectorRef=new Hr(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=iv(i,r[ke],r,e,t);this.previousInputValues.set(e,t);let o=ni(i.index,r);sv(o,1)}get injector(){return new Os(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function QA(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var lr=(()=>{class n{static __NG_ELEMENT_ID__=eI}return n})();function eI(){let n=yn();return pM(n,gt())}var tI=lr,hM=class extends tI{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Yo(this._hostTNode,this._hostLView)}get injector(){return new Os(this._hostTNode,this._hostLView)}get parentInjector(){let e=Bg(this._hostTNode,this._hostLView);if(tE(e)){let t=_d(e,this._hostLView),i=yd(e),r=t[ke].data[i+8];return new Os(r,t)}else return new Os(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=zx(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-gn}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=Ox(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,Px(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let c=e&&!CT(e),l;if(c)l=t;else{let m=t||{};l=m.index,i=m.injector,r=m.projectableNodes,s=m.environmentInjector||m.ngModuleRef,o=m.directives,a=m.bindings}let u=c?e:new $o(Fr(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let p=(c?d:this.parentInjector).get(Ht,null);p&&(s=p)}let f=Fr(u.componentType??{}),h=Ox(this._lContainer,f?.id??null),g=h?.firstChild??null,y=u.create(d,r,g,s,o,a);return this.insertImpl(y.hostView,l,Px(this._hostTNode,h)),y}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(G0(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[Kt],l=new hM(c,c[Qn],c[Kt]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return wA(o,r,s,i),e.attachToViewContainerRef(),Cm(cg(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=zx(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=wg(this._lContainer,t);i&&(mc(cg(this._lContainer),t),VE(i[ke],i))}detach(e){let t=this._adjustIndex(e,-1),i=wg(this._lContainer,t);return i&&mc(cg(this._lContainer),t)!=null?new Hr(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function zx(n){return n[Mc]}function cg(n){return n[Mc]||(n[Mc]=[])}function pM(n,e){let t,i=e[n.index];return hi(i)?t=i:(t=tM(i,e,null,n),e[n.index]=t,Xg(e,t)),iI(t,e,n,i),new hM(t,n,e)}function nI(n,e){let t=n[Ft],i=t.createComment(""),r=pi(e,n),s=t.parentNode(r);return bd(t,s,i,t.nextSibling(r),!1),i}var iI=oI,rI=()=>!1;function sI(n,e,t){return rI(n,e,t)}function oI(n,e,t,i){if(n[Ur])return;let r;t.type&8?r=ti(i):r=nI(e,t),n[Ur]=r}var Ag=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Ig=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)lv(e,t).matches!==null&&this.queries[t].setDirty()}},Rg=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=pI(e):this.predicate=e}},Ng=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Pg=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,aI(t,s)),this.matchTNodeWithReadOption(e,t,md(t,e,s,!1,!1))}else i===zr?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,md(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===gi||r===lr||r===zr&&t.type&4)this.addMatch(t.index,-2);else{let s=md(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function aI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function cI(n,e){return n.type&11?Yo(n,e):n.type&4?ov(n,e):null}function lI(n,e,t,i){return t===-1?cI(e,n):t===-2?uI(n,e,i):Pc(n,n[ke],t,e)}function uI(n,e,t){if(t===gi)return Yo(e,n);if(t===zr)return ov(e,n);if(t===lr)return pM(e,n)}function mM(n,e,t,i){let r=e[Ii].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(lI(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Og(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=mM(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=gn;d<u.length;d++){let f=u[d];f[kr]===f[Kt]&&Og(f[ke],f,l,i)}if(u[Rs]!==null){let d=u[Rs];for(let f=0;f<d.length;f++){let h=d[f];Og(h[ke],h,l,i)}}}}}return i}function dI(n,e){return n[Ii].queries[e].queryList}function fI(n,e,t){let i=new Ed((t&4)===4);return $0(n,e,i,i.destroy),(e[Ii]??=new Ig).queries.push(new Ag(i))-1}function hI(n,e,t){let i=vn();return i.firstCreatePass&&(mI(i,new Rg(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),fI(i,gt(),e)}function pI(n){return n.split(",").map(e=>e.trim())}function mI(n,e,t){n.queries===null&&(n.queries=new Ng),n.queries.track(new Pg(e,t))}function lv(n,e){return n.queries.getByIndex(e)}function gI(n,e){let t=n[ke],i=lv(t,e);return i.crossesNgTemplate?Og(t,n,e,[]):mM(t,n,i,e)}var ks=class{},Hd=class{};var Dd=class extends ks{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Cd(this);constructor(e,t,i,r=!0){super(),this.ngModuleType=e,this._parent=t;let s=Am(e);this._bootstrapComponents=CE(s.bootstrap),this._r3Injector=Jm(e,t,[{provide:ks,useValue:this},{provide:Vc,useValue:this.componentFactoryResolver},...i],ir(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},Ad=class extends Hd{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new Dd(this.moduleType,e,[])}};var Fc=class extends ks{injector;componentFactoryResolver=new Cd(this);instance=null;constructor(e){super();let t=new ws([...e.providers,{provide:ks,useValue:this},{provide:Vc,useValue:this.componentFactoryResolver}],e.parent||vc(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function Hc(n,e,t=null){return new Fc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var vI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=Rm(!1,t.type),r=i.length>0?Hc([i],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=ye({token:n,providedIn:"environment",factory:()=>new n(Te(Ht))})}return n})();function vi(n){return kc(()=>{let e=gM(n),t=Je(re({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Vg.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(vI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||ar.Emulated,styles:n.styles||Ln,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&Ud("NgStandalone"),vM(t);let i=n.dependencies;return t.directiveDefs=Gx(i,yI),t.pipeDefs=Gx(i,N0),t.id=EI(t),t})}function yI(n){return Fr(n)||Im(n)}function yi(n){return kc(()=>({type:n.type,bootstrap:n.bootstrap||Ln,declarations:n.declarations||Ln,imports:n.imports||Ln,exports:n.exports||Ln,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function _I(n,e){if(n==null)return Or;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=kd.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function xI(n){if(n==null)return Or;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function Dn(n){return kc(()=>{let e=gM(n);return vM(e),e})}function gM(n){let e={};return{type:n.type,providersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||Or,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||Ln,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,inputs:_I(n.inputs,e),outputs:xI(n.outputs),debugInfo:null}}function vM(n){n.features?.forEach(e=>e(n))}function Gx(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function EI(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function MI(n){return Object.getPrototypeOf(n.prototype).constructor}function Vs(n){let e=MI(n.type),t=!0,i=[n];for(;e;){let r;if(Ni(n))r=e.\u0275cmp||e.\u0275dir;else{if(e.\u0275cmp)throw new de(903,!1);r=e.\u0275dir}if(r){if(t){i.push(r);let o=n;o.inputs=lg(n.inputs),o.declaredInputs=lg(n.declaredInputs),o.outputs=lg(n.outputs);let a=r.hostBindings;a&&TI(n,a);let c=r.viewQuery,l=r.contentQueries;if(c&&wI(n,c),l&&CI(n,l),bI(n,r),b0(n.outputs,r.outputs),Ni(r)&&r.data.animation){let u=n.data;u.animation=(u.animation||[]).concat(r.data.animation)}}let s=r.features;if(s)for(let o=0;o<s.length;o++){let a=s[o];a&&a.ngInherit&&a(n),a===Vs&&(t=!1)}}e=Object.getPrototypeOf(e)}SI(i)}function bI(n,e){for(let t in e.inputs){if(!e.inputs.hasOwnProperty(t)||n.inputs.hasOwnProperty(t))continue;let i=e.inputs[t];i!==void 0&&(n.inputs[t]=i,n.declaredInputs[t]=e.declaredInputs[t])}}function SI(n){let e=0,t=null;for(let i=n.length-1;i>=0;i--){let r=n[i];r.hostVars=e+=r.hostVars,r.hostAttrs=Nc(r.hostAttrs,t=Nc(t,r.hostAttrs))}}function lg(n){return n===Or?{}:n===Ln?[]:n}function wI(n,e){let t=n.viewQuery;t?n.viewQuery=(i,r)=>{e(i,r),t(i,r)}:n.viewQuery=e}function CI(n,e){let t=n.contentQueries;t?n.contentQueries=(i,r,s)=>{e(i,r,s),t(i,r,s)}:n.contentQueries=e}function TI(n,e){let t=n.hostBindings;t?n.hostBindings=(i,r)=>{e(i,r),t(i,r)}:n.hostBindings=e}function DI(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=Nc(n.mergedAttrs,n.attrs);let u=n.tView=$g(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Ho(n,!1);let c=II(t,e,n,i);cd()&&ev(t,e,c,n),jo(c,e);let l=tM(c,e,c,n);e[i+Un]=l,Xg(e,l),sI(l,n,e)}function AI(n,e,t,i,r,s,o,a,c,l,u){let d=t+Un,f;return e.firstCreatePass?(f=av(e,d,4,o||null,a||null),Gm()&&sM(e,n,f,Sc(e.consts,l),WE),Kx(e,f)):f=e.data[d],DI(f,n,e,t,i,r,s,c),bc(f)&&nv(e,n,f),l!=null&&GE(n,f,u),f}function Bn(n,e,t,i,r,s,o,a){let c=gt(),l=vn(),u=Sc(l.consts,s);return AI(c,l,n,e,t,i,r,u,void 0,o,a),Bn}var II=RI;function RI(n,e,t,i){return ld(!0),e[Ft].createComment("")}var uv=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();var dv=new pe("");function jr(n){return!!n&&typeof n.then=="function"}function fv(n){return!!n&&typeof n.subscribe=="function"}var yM=new pe("");var hv=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=Y(yM,{optional:!0})??[];injector=Y(di);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=rn(this.injector,r);if(jr(s))t.push(s);else if(fv(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),zd=new pe("");function _M(){Hp(()=>{let n="";throw new de(600,n)})}function xM(n){return n.isBoundToModule}var NI=10;var Wr=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=Y(_n);afterRenderManager=Y(kE);zonelessEnabled=Y(Dc);rootEffectScheduler=Y(ig);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new St;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=Y(Pi);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(qe(t=>!t))}constructor(){Y(Bc,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=Y(Ht);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=di.NULL){return this._injector.get(Lt).run(()=>{xt(10);let o=t instanceof Vd;if(!this._injector.get(hv).done){let g="";throw new de(405,g)}let c;o?c=t:c=this._injector.get(Vc).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=xM(c)?void 0:this._injector.get(ks),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(dv,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),Rc(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),xt(11,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){xt(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(Zg.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new de(101,!1);let t=$e(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,$e(t),this.afterTick.next(),xt(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ls,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<NI;)xt(14),this.synchronizeOnce(),xt(15)}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!wc(r))continue;let s=i&&!this.zonelessEnabled?0:1;JE(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>wc(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Rc(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(zd,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Rc(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new de(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Rc(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function zc(n,e,t,i){let r=gt(),s=Tc();if(Jo(r,s,e)){let o=vn(),a=ad();iA(a,r,n,e,t,i)}return zc}var aj=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function It(n,e,t){let i=gt(),r=Tc();if(Jo(i,r,e)){let s=vn(),o=ad();jE(o,i,n,e,i[Ft],t)}return It}function jx(n,e,t,i,r){iv(e,n,t,r?"class":"style",i)}function at(n,e,t,i){let r=gt(),s=r[ke],o=n+Un,a=s.firstCreatePass?aM(o,r,2,e,WE,Gm(),t,i):s.data[o];if(oA(a,r,n,e,PI),bc(a)){let c=r[ke];nv(c,r,a),xE(c,a,r)}return i!=null&&GE(r,a),at}function rt(){let n=vn(),e=yn(),t=aA(e);return n.firstCreatePass&&cM(n,t),J0(t)&&K0(),Y0(),t.classesWithoutHost!=null&&NT(t)&&jx(n,t,gt(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&PT(t)&&jx(n,t,gt(),t.stylesWithoutHost,!1),rt}function $r(n,e,t,i){return at(n,e,t,i),rt(),$r}var PI=(n,e,t,i,r)=>(ld(!0),DE(e[Ft],i,fx()));function qr(){return gt()}var Gc="en-US";var OI=Gc;function EM(n){typeof n=="string"&&(OI=n.toLowerCase().replace(/_/g,"-"))}function xn(n,e,t){let i=gt(),r=vn(),s=yn();return MM(r,i,i[Ft],s,n,e,t),xn}function MM(n,e,t,i,r,s,o){let a=!0,c=null;if((i.type&3||o)&&(c??=ag(i,e,s),GA(i,n,e,o,t,r,s,c)&&(a=!1)),a){let l=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],h=u[d+1];c??=ag(i,e,s),Vx(i,e,f,h,r,c)}if(l&&l.length)for(let d of l)c??=ag(i,e,s),Vx(i,e,d,r,r,c)}}function $t(n=1){return dx(n)}function pv(n,e,t){hI(n,e,t)}function Gd(n){let e=gt(),t=vn(),i=Xm();rd(i+1);let r=lv(t,i);if(n.dirty&&z0(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=gI(e,i);n.reset(s,$T),n.notifyOnChanges()}return!0}return!1}function jd(){return dI(gt(),Xm())}function fd(n,e){return n<<17|e<<2}function Us(n){return n>>17&32767}function FI(n){return(n&2)==2}function LI(n,e){return n&131071|e<<17}function Fg(n){return n|2}function qo(n){return(n&131068)>>2}function ug(n,e){return n&-131069|e<<2}function kI(n){return(n&1)===1}function Lg(n){return n|1}function UI(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=Us(o),c=qo(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||ko(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=Us(n[a+1]);n[i+1]=fd(f,a),f!==0&&(n[f+1]=ug(n[f+1],i)),n[a+1]=LI(n[a+1],i)}else n[i+1]=fd(a,0),a!==0&&(n[a+1]=ug(n[a+1],i)),a=i;else n[i+1]=fd(c,0),a===0?a=i:n[c+1]=ug(n[c+1],i),c=i;l&&(n[i+1]=Fg(n[i+1])),Wx(n,u,i,!0),Wx(n,u,i,!1),BI(e,u,n,i,s),o=fd(a,c),s?e.classBindings=o:e.styleBindings=o}function BI(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&ko(s,e)>=0&&(t[i+1]=Lg(t[i+1]))}function Wx(n,e,t,i){let r=n[t+1],s=e===null,o=i?Us(r):qo(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];VI(c,e)&&(a=!0,n[o+1]=i?Lg(l):Fg(l)),o=i?Us(l):qo(l)}a&&(n[t+1]=i?Fg(r):Lg(r))}function VI(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?ko(n,e)>=0:!1}function _i(n,e){return HI(n,e,null,!0),_i}function HI(n,e,t,i){let r=gt(),s=vn(),o=ix(2);if(s.firstUpdatePass&&GI(s,n,o,i),e!==cr&&Jo(r,o,e)){let a=s.data[Ps()];XI(s,a,r,r[Ft],n,r[o+1]=YI(e,t),i,o)}}function zI(n,e){return e>=n.expandoStartIndex}function GI(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[Ps()],o=zI(n,t);ZI(s,i)&&e===null&&!o&&(e=!1),e=jI(r,s,e,i),UI(r,s,e,t,o,i)}}function jI(n,e,t,i){let r=ax(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=dg(null,n,e,t,i),t=Lc(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=dg(r,n,e,t,i),s===null){let c=WI(n,e,i);c!==void 0&&Array.isArray(c)&&(c=dg(null,n,e,c[1],i),c=Lc(c,e.attrs,i),$I(n,e,i,c))}else s=qI(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function WI(n,e,t){let i=t?e.classBindings:e.styleBindings;if(qo(i)!==0)return n[Us(i)]}function $I(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Us(r)]=i}function qI(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=Lc(i,o,t)}return Lc(i,e.attrs,t)}function dg(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=Lc(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function Lc(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),R0(n,o,t?!0:e[++s]))}return n===void 0?null:n}function XI(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=kI(l)?$x(c,e,t,r,qo(l),o):void 0;if(!Id(u)){Id(s)||FI(l)&&(s=$x(c,null,t,r,a,o));let d=km(Ps(),t);qD(i,o,d,r,s)}}function $x(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===cr&&(f=d?Ln:void 0);let h=d?Ju(f,i):u===i?f:void 0;if(l&&!Id(h)&&(h=Ju(c,i)),Id(h)&&(a=h,o))return a;let g=n[r+1];r=o?Us(g):qo(g)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=Ju(c,i))}return a}function Id(n){return n!==void 0}function YI(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=ir(Fd(n)))),n}function ZI(n,e){return(n.flags&(e?8:16))!==0}function Rt(n,e=""){let t=gt(),i=vn(),r=n+Un,s=i.firstCreatePass?av(i,r,1,e,null):i.data[r],o=JI(i,t,s,e,n);t[r]=o,cd()&&ev(i,t,o,s),Ho(s,!1)}var JI=(n,e,t,i,r)=>(ld(!0),vD(e[Ft],i));function KI(n,e,t,i=""){return Jo(n,Tc(),t)?e+pc(t)+i:cr}function Li(n){return Xr("",n),Li}function Xr(n,e,t){let i=gt(),r=KI(i,n,e,t);return r!==cr&&QI(i,Ps(),r),Xr}function QI(n,e,t){let i=km(e,n);yD(n[Ft],i,t)}function Ko(n,e,t){eg(e)&&(e=e());let i=gt(),r=Tc();if(Jo(i,r,e)){let s=vn(),o=ad();jE(o,i,n,e,i[Ft],t)}return Ko}function jc(n,e){let t=eg(n);return t&&n.set(e),t}function Qo(n,e){let t=gt(),i=vn(),r=yn();return MM(i,t,t[Ft],r,n,e),Qo}function eR(n,e,t){let i=vn();if(i.firstCreatePass){let r=Ni(n);kg(t,i.data,i.blueprint,r,!0),kg(e,i.data,i.blueprint,r,!1)}}function kg(n,e,t,i,r){if(n=nn(n),Array.isArray(n))for(let s=0;s<n.length;s++)kg(n[s],e,t,i,r);else{let s=vn(),o=gt(),a=yn(),c=Ss(n)?n:nn(n.provide),l=Pm(n),u=a.providerIndexes&1048575,d=a.directiveStart,f=a.providerIndexes>>20;if(Ss(n)||!n.multi){let h=new Fs(l,r,He,null),g=hg(c,e,r?u:u+f,d);g===-1?(mg(xd(a,o),s,c),fg(s,n,e.length),e.push(c),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(h),o.push(h)):(t[g]=h,o[g]=h)}else{let h=hg(c,e,u+f,d),g=hg(c,e,u,u+f),y=h>=0&&t[h],m=g>=0&&t[g];if(r&&!m||!r&&!y){mg(xd(a,o),s,c);let p=iR(r?nR:tR,t.length,r,i,l,n);!r&&m&&(t[g].providerFactory=p),fg(s,n,e.length,0),e.push(c),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(p),o.push(p)}else{let p=bM(t[r?g:h],l,!r&&i);fg(s,n,h>-1?h:g,p)}!r&&i&&m&&t[g].componentProviders++}}}function fg(n,e,t,i){let r=Ss(e),s=k0(e);if(r||s){let c=(s?nn(e.useClass):e).prototype.ngOnDestroy;if(c){let l=n.destroyHooks||(n.destroyHooks=[]);if(!r&&e.multi){let u=l.indexOf(t);u===-1?l.push(t,[i,c]):l[u+1].push(i,c)}else l.push(t,c)}}}function bM(n,e,t){return t&&n.componentProviders++,n.multi.push(e)-1}function hg(n,e,t,i){for(let r=t;r<i;r++)if(e[r]===n)return r;return-1}function tR(n,e,t,i,r){return Ug(this.multi,[])}function nR(n,e,t,i,r){let s=this.multi,o;if(this.providerFactory){let a=this.providerFactory.componentProviders,c=Pc(i,i[ke],this.providerFactory.index,r);o=c.slice(0,a),Ug(s,o);for(let l=a;l<c.length;l++)o.push(c[l])}else o=[],Ug(s,o);return o}function Ug(n,e){for(let t=0;t<n.length;t++){let i=n[t];e.push(i())}return e}function iR(n,e,t,i,r,s){let o=new Fs(n,t,He,null);return o.multi=[],o.index=e,o.componentProviders=0,bM(o,r,i&&!t),o}function Wd(n,e=[]){return t=>{t.providersResolver=(i,r)=>eR(i,r?r(n):n,e)}}function mv(n,e,t,i){return sR(gt(),tx(),n,e,t,i)}function rR(n,e){let t=n[e];return t===cr?void 0:t}function sR(n,e,t,i,r,s){let o=e+t;return Jo(n,o,r)?zA(n,o+1,s?i.call(s,r):i(r)):rR(n,o+1)}var Rd=class{ngModuleFactory;componentFactories;constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},gv=(()=>{class n{compileModuleSync(t){return new Ad(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let i=this.compileModuleSync(t),r=Am(t),s=CE(r.declarations).reduce((o,a)=>{let c=Fr(a);return c&&o.push(new $o(c)),o},[]);return new Rd(i,s)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var oR=(()=>{class n{zone=Y(Lt);changeDetectionScheduler=Y(Pr);applicationRef=Y(Wr);applicationErrorHandler=Y(_n);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{try{this.applicationRef.dirtyFlags|=1,this.applicationRef._tick()}catch(t){this.applicationErrorHandler(t)}})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),SM=new pe("",{factory:()=>!1});function vv({ngZoneFactory:n,ignoreChangesOutsideZone:e,scheduleInRootZone:t}){return n??=()=>new Lt(Je(re({},_v()),{scheduleInRootZone:t})),[{provide:Lt,useFactory:n},{provide:rr,multi:!0,useFactory:()=>{let i=Y(oR,{optional:!0});return()=>i.initialize()}},{provide:rr,multi:!0,useFactory:()=>{let i=Y(aR);return()=>{i.initialize()}}},e===!0?{provide:tg,useValue:!0}:[],{provide:ng,useValue:t??OE},{provide:_n,useFactory:()=>{let i=Y(Lt),r=Y(Ht),s;return o=>{i.runOutsideAngular(()=>{r.destroyed&&!s?setTimeout(()=>{throw o}):(s??=r.get(Di),s.handleError(o))})}}}]}function yv(n){let e=n?.ignoreChangesOutsideZone,t=n?.scheduleInRootZone,i=vv({ngZoneFactory:()=>{let r=_v(n);return r.scheduleInRootZone=t,r.shouldCoalesceEventChangeDetection&&Ud("NgZone_CoalesceEvent"),new Lt(r)},ignoreChangesOutsideZone:e,scheduleInRootZone:t});return sr([{provide:SM,useValue:!0},{provide:Dc,useValue:!1},i])}function _v(n){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:n?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:n?.runCoalescing??!1}}var aR=(()=>{class n{subscription=new Pt;initialized=!1;zone=Y(Lt);pendingTasks=Y(Pi);initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Lt.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Lt.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var wM=(()=>{class n{applicationErrorHandler=Y(_n);appRef=Y(Wr);taskService=Y(Pi);ngZone=Y(Lt);zonelessEnabled=Y(Dc);tracing=Y(Bc,{optional:!0});disableScheduling=Y(tg,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Pt;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Sd):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(Y(ng,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof wd||!this.zoneIsDefined)}notify(t){if(!this.zonelessEnabled&&t===5)return;let i=!1;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,i=!0;break}case 12:{this.appRef.dirtyFlags|=16,i=!0;break}case 13:{this.appRef.dirtyFlags|=2,i=!0;break}case 11:{i=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(i))return;let r=this.useMicrotaskScheduler?Tx:FE;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(t){return!(this.disableScheduling&&!t||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Sd+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.taskService.remove(t),this.applicationErrorHandler(i)}finally{this.cleanup()}this.useMicrotaskScheduler=!0,Tx(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function cR(){return typeof $localize<"u"&&$localize.locale||Gc}var $d=new pe("",{providedIn:"root",factory:()=>Y($d,{optional:!0,skipSelf:!0})||cR()});function sn(n){return x0(n)}function Wc(n,e){return mu(n,e?.equal)}var CM=class{[cn];constructor(e){this[cn]=e}destroy(){this[cn].destroy()}};var RM=Symbol("InputSignalNode#UNSET"),TR=Je(re({},gu),{transformFn:void 0,applyValueToInputSignal(n,e){So(n,e)}});function NM(n,e){let t=Object.create(TR);t.value=n,t.transformFn=e?.transform;function i(){if(Eo(t),t.value===RM){let r=null;throw new de(-950,r)}return t.value}return i[cn]=t,i}var Xd=class{attributeName;constructor(e){this.attributeName=e}__NG_ELEMENT_ID__=()=>Uc(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}},DR=new pe("");DR.__NG_ELEMENT_ID__=n=>{let e=yn();if(e===null)throw new de(204,!1);if(e.type&2)return e.value;if(n&8)return null;throw new de(204,!1)};function TM(n,e){return NM(n,e)}function AR(n){return NM(RM,n)}var PM=(TM.required=AR,TM);var xv=new pe(""),IR=new pe("");function $c(n){return!n.moduleRef}function RR(n){let e=$c(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Lt);return t.run(()=>{$c(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(_n),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),$c(n)){let s=()=>e.destroy(),o=n.platformInjector.get(xv);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(xv);o.add(s),n.moduleRef.onDestroy(()=>{Rc(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return PR(i,t,()=>{let s=e.get(Pi),o=s.add(),a=e.get(hv);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get($d,Gc);if(EM(c||Gc),!e.get(IR,!0))return $c(n)?e.get(Wr):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if($c(n)){let u=e.get(Wr);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return NR?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>void s.remove(o))})})}var NR;function PR(n,e,t){try{let i=t();return jr(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var qd=null;function OR(n=[],e){return di.create({name:e,providers:[{provide:gc,useValue:"platform"},{provide:xv,useValue:new Set([()=>qd=null])},...n]})}function FR(n=[]){if(qd)return qd;let e=OR(n);return qd=e,_M(),LR(e),e}function LR(n){let e=n.get(Pd,null);rn(n,()=>{e?.forEach(t=>t())})}var ea=(()=>{class n{static __NG_ELEMENT_ID__=kR}return n})();function kR(n){return UR(yn(),gt(),(n&16)===16)}function UR(n,e,t){if(Br(n)&&!t){let i=ni(n.index,e);return new Hr(i,i)}else if(n.type&175){let i=e[ei];return new Hr(i,e)}return null}var Ev=class{constructor(){}supports(e){return cv(e)}create(e){return new Mv(e)}},BR=(n,e)=>e,Mv=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(e){this._trackByFn=e||BR}forEachItem(e){let t;for(t=this._itHead;t!==null;t=t._next)e(t)}forEachOperation(e){let t=this._itHead,i=this._removalsHead,r=0,s=null;for(;t||i;){let o=!i||t&&t.currentIndex<DM(i,r,s)?t:i,a=DM(o,r,s),c=o.currentIndex;if(o===i)r--,i=i._nextRemoved;else if(t=t._next,o.previousIndex==null)r++;else{s||(s=[]);let l=a-r,u=c-r;if(l!=u){for(let f=0;f<l;f++){let h=f<s.length?s[f]:s[f]=0,g=h+f;u<=g&&g<l&&(s[f]=h+1)}let d=o.previousIndex;s[d]=u-l}}a!==c&&e(o,a,c)}}forEachPreviousItem(e){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachMovedItem(e){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}forEachIdentityChange(e){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)e(t)}diff(e){if(e==null&&(e=[]),!cv(e))throw new de(900,!1);return this.check(e)?this:null}onDestroy(){}check(e){this._reset();let t=this._itHead,i=!1,r,s,o;if(Array.isArray(e)){this.length=e.length;for(let a=0;a<this.length;a++)s=e[a],o=this._trackByFn(a,s),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,s,o,a),i=!0):(i&&(t=this._verifyReinsertion(t,s,o,a)),Object.is(t.item,s)||this._addIdentityChange(t,s)),t=t._next}else r=0,lM(e,a=>{o=this._trackByFn(r,a),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,a,o,r),i=!0):(i&&(t=this._verifyReinsertion(t,a,o,r)),Object.is(t.item,a)||this._addIdentityChange(t,a)),t=t._next,r++}),this.length=r;return this._truncate(t),this.collection=e,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let e;for(e=this._previousItHead=this._itHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._additionsHead;e!==null;e=e._nextAdded)e.previousIndex=e.currentIndex;for(this._additionsHead=this._additionsTail=null,e=this._movesHead;e!==null;e=e._nextMoved)e.previousIndex=e.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(e,t,i,r){let s;return e===null?s=this._itTail:(s=e._prev,this._remove(e)),e=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._reinsertAfter(e,s,r)):(e=this._linkedRecords===null?null:this._linkedRecords.get(i,r),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._moveAfter(e,s,r)):e=this._addAfter(new bv(t,i),s,r)),e}_verifyReinsertion(e,t,i,r){let s=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return s!==null?e=this._reinsertAfter(s,e._prev,r):e.currentIndex!=r&&(e.currentIndex=r,this._addToMoves(e,r)),e}_truncate(e){for(;e!==null;){let t=e._next;this._addToRemovals(this._unlink(e)),e=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(e,t,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(e);let r=e._prevRemoved,s=e._nextRemoved;return r===null?this._removalsHead=s:r._nextRemoved=s,s===null?this._removalsTail=r:s._prevRemoved=r,this._insertAfter(e,t,i),this._addToMoves(e,i),e}_moveAfter(e,t,i){return this._unlink(e),this._insertAfter(e,t,i),this._addToMoves(e,i),e}_addAfter(e,t,i){return this._insertAfter(e,t,i),this._additionsTail===null?this._additionsTail=this._additionsHead=e:this._additionsTail=this._additionsTail._nextAdded=e,e}_insertAfter(e,t,i){let r=t===null?this._itHead:t._next;return e._next=r,e._prev=t,r===null?this._itTail=e:r._prev=e,t===null?this._itHead=e:t._next=e,this._linkedRecords===null&&(this._linkedRecords=new Yd),this._linkedRecords.put(e),e.currentIndex=i,e}_remove(e){return this._addToRemovals(this._unlink(e))}_unlink(e){this._linkedRecords!==null&&this._linkedRecords.remove(e);let t=e._prev,i=e._next;return t===null?this._itHead=i:t._next=i,i===null?this._itTail=t:i._prev=t,e}_addToMoves(e,t){return e.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=e:this._movesTail=this._movesTail._nextMoved=e),e}_addToRemovals(e){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Yd),this._unlinkedRecords.put(e),e.currentIndex=null,e._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=e,e._prevRemoved=null):(e._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=e),e}_addIdentityChange(e,t){return e.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=e:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=e,e}},bv=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(e,t){this.item=e,this.trackById=t}},Sv=class{_head=null;_tail=null;add(e){this._head===null?(this._head=this._tail=e,e._nextDup=null,e._prevDup=null):(this._tail._nextDup=e,e._prevDup=this._tail,e._nextDup=null,this._tail=e)}get(e,t){let i;for(i=this._head;i!==null;i=i._nextDup)if((t===null||t<=i.currentIndex)&&Object.is(i.trackById,e))return i;return null}remove(e){let t=e._prevDup,i=e._nextDup;return t===null?this._head=i:t._nextDup=i,i===null?this._tail=t:i._prevDup=t,this._head===null}},Yd=class{map=new Map;put(e){let t=e.trackById,i=this.map.get(t);i||(i=new Sv,this.map.set(t,i)),i.add(e)}get(e,t){let i=e,r=this.map.get(i);return r?r.get(e,t):null}remove(e){let t=e.trackById;return this.map.get(t).remove(e)&&this.map.delete(t),e}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function DM(n,e,t){let i=n.previousIndex;if(i===null)return i;let r=0;return t&&i<t.length&&(r=t[i]),i+e+r}function AM(){return new wv([new Ev])}var wv=(()=>{class n{factories;static \u0275prov=ye({token:n,providedIn:"root",factory:AM});constructor(t){this.factories=t}static create(t,i){if(i!=null){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:()=>{let i=Y(n,{optional:!0,skipSelf:!0});return n.create(t,i||AM())}}}find(t){let i=this.factories.find(r=>r.supports(t));if(i!=null)return i;throw new de(901,!1)}}return n})();function OM(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;xt(8);try{let s=r?.injector??FR(i),o=[vv({}),{provide:Pr,useExisting:wM},px,...t||[]],a=new Fc({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return RR({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{xt(9)}}function ta(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}var kM=null;function oi(){return kM}function Cv(n){kM??=n}var qc=class{},Xc=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>Y(UM),providedIn:"platform"})}return n})();var UM=(()=>{class n extends Xc{_location;_history;_doc=Y(zt);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return oi().getBaseHref(this._doc)}onPopState(t){let i=oi().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=oi().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function Jd(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function FM(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function xi(n){return n&&n[0]!=="?"?`?${n}`:n}var ki=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>Y(Tv),providedIn:"root"})}return n})(),Kd=new pe(""),Tv=(()=>{class n extends ki{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??Y(zt).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Jd(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+xi(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+xi(s));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+xi(s));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Te(Xc),Te(Kd,8))};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ur=(()=>{class n{_subject=new St;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=zR(FM(LM(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+xi(i))}normalize(t){return n.stripTrailingSlash(HR(this._basePath,LM(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+xi(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+xi(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=xi;static joinWithSlash=Jd;static stripTrailingSlash=FM;static \u0275fac=function(i){return new(i||n)(Te(ki))};static \u0275prov=ye({token:n,factory:()=>VR(),providedIn:"root"})}return n})();function VR(){return new ur(Te(ki))}function HR(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function LM(n){return n.replace(/\/index.html$/,"")}function zR(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var Dv=(()=>{class n extends ki{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(t){let i=Jd(this._baseHref,t);return i.length>0?"#"+i:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+xi(s))||this._platformLocation.pathname;this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+xi(s))||this._platformLocation.pathname;this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)(Te(Xc),Te(Kd,8))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})();var Qd=class{$implicit;ngForOf;index;count;constructor(e,t,i,r){this.$implicit=e,this.ngForOf=t,this.index=i,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},na=(()=>{class n{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,s,o)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new Qd(r.item,this._ngForOf,-1,-1),o===null?void 0:o);else if(o==null)i.remove(s===null?void 0:s);else if(s!==null){let a=i.get(s);i.move(a,o),BM(a,r)}});for(let r=0,s=i.length;r<s;r++){let a=i.get(r).context;a.index=r,a.count=s,a.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let s=i.get(r.currentIndex);BM(s,r)})}static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(He(lr),He(zr),He(wv))};static \u0275dir=Dn({type:n,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return n})();function BM(n,e){n.context.$implicit=e.item}var Hs=(()=>{class n{_viewContainer;_context=new ef;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,i){this._viewContainer=t,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){VM(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){VM(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,i){return!0}static \u0275fac=function(i){return new(i||n)(He(lr),He(zr))};static \u0275dir=Dn({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return n})(),ef=class{$implicit=null;ngIf=null};function VM(n,e){if(n&&!n.createEmbeddedView)throw new de(2020,!1)}var Ui=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=yi({type:n});static \u0275inj=Jn({})}return n})();function Yc(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var zs=class{};var HM="browser";var Zc=class{_doc;constructor(e){this._doc=e}manager},nf=(()=>{class n extends Zc{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(Te(zt))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})(),sf=new pe(""),Pv=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof nf));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof nf);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new de(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(Te(sf),Te(Lt))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})(),Av="ng-app-id";function zM(n){for(let e of n)e.remove()}function GM(n,e){let t=e.createElement("style");return t.textContent=n,t}function jR(n,e,t,i){let r=n.head?.querySelectorAll(`style[${Av}="${e}"],link[${Av}="${e}"]`);if(r)for(let s of r)s.removeAttribute(Av),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function Rv(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Ov=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,jR(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,GM);i?.forEach(r=>this.addUsage(r,this.external,Rv))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(zM(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])zM(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,GM(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Rv(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(Te(zt),Te(Nd),Te(Od,8),Te(Zo))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})(),Iv={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Fv=/%COMP%/g;var WM="%COMP%",WR=`_nghost-${WM}`,$R=`_ngcontent-${WM}`,qR=!0,XR=new pe("",{providedIn:"root",factory:()=>qR});function YR(n){return $R.replace(Fv,n)}function ZR(n){return WR.replace(Fv,n)}function $M(n,e){return e.map(t=>t.replace(Fv,n))}var Lv=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(t,i,r,s,o,a,c,l=null,u=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.platformId=a,this.ngZone=c,this.nonce=l,this.tracingService=u,this.platformIsServer=!1,this.defaultRenderer=new Jc(t,o,c,this.platformIsServer,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof rf?r.applyToHost(t):r instanceof Kc&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,f=this.tracingService;switch(i.encapsulation){case ar.Emulated:s=new rf(c,l,i,this.appId,u,o,a,d,f);break;case ar.ShadowDom:return new Nv(c,l,t,i,o,a,this.nonce,d,f);default:s=new Kc(c,l,i,u,o,a,d,f);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(Te(Pv),Te(Ov),Te(Nd),Te(XR),Te(zt),Te(Zo),Te(Lt),Te(Od),Te(Bc,8))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})(),Jc=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r,s){this.eventManager=e,this.doc=t,this.ngZone=i,this.platformIsServer=r,this.tracingService=s}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Iv[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(jM(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(jM(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new de(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=Iv[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Iv[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Fi.DashCase|Fi.Important)?e.style.setProperty(t,i,r&Fi.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Fi.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=oi().getGlobalEventTarget(this.doc,e),!e))throw new de(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function jM(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Nv=class extends Jc{sharedStylesHost;hostEl;shadowRoot;constructor(e,t,i,r,s,o,a,c,l){super(e,s,o,c,l),this.sharedStylesHost=t,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=r.styles;u=$M(r.id,u);for(let f of u){let h=document.createElement("style");a&&h.setAttribute("nonce",a),h.textContent=f,this.shadowRoot.appendChild(h)}let d=r.getExternalStyles?.();if(d)for(let f of d){let h=Rv(f,s);a&&h.setAttribute("nonce",a),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Kc=class extends Jc{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c,l){super(e,s,o,a,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let u=i.styles;this.styles=l?$M(l,u):u,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Wo.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},rf=class extends Kc{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c,l){let u=r+"-"+i.id;super(e,t,i,s,o,a,c,l,u),this.contentAttr=YR(u),this.hostAttr=ZR(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var of=class n extends qc{supportsDOMEvents=!0;static makeCurrent(){Cv(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=JR();return t==null?null:KR(t)}resetBaseElement(){Qc=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return Yc(document.cookie,e)}},Qc=null;function JR(){return Qc=Qc||document.head.querySelector("base"),Qc?Qc.getAttribute("href"):null}function KR(n){return new URL(n,document.baseURI).pathname}var QR=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})(),qM=["alt","control","meta","shift"],e1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},t1={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},XM=(()=>{class n extends Zc{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>oi().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),qM.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=e1[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),qM.forEach(o=>{if(o!==r){let a=t1[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(Te(zt))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})();function kv(n,e,t){let i=re({rootComponent:n,platformRef:t?.platformRef},n1(e));return OM(i)}function n1(n){return{appProviders:[...a1,...n?.providers??[]],platformProviders:o1}}function i1(){of.makeCurrent()}function r1(){return new Di}function s1(){return Hg(document),document}var o1=[{provide:Zo,useValue:HM},{provide:Pd,useValue:i1,multi:!0},{provide:zt,useFactory:s1}];var a1=[{provide:gc,useValue:"root"},{provide:Di,useFactory:r1},{provide:sf,useClass:nf,multi:!0,deps:[zt]},{provide:sf,useClass:XM,multi:!0,deps:[zt]},Lv,Ov,Pv,{provide:Ls,useExisting:Lv},{provide:zs,useClass:QR},[]];var sa=class{},el=class{},Yr=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(e){e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let i=t.indexOf(":");if(i>0){let r=t.slice(0,i),s=t.slice(i+1).trim();this.addHeaderEntry(r,s)}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((t,i)=>{this.addHeaderEntry(i,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([t,i])=>{this.setHeaderEntries(t,i)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){let t=new n;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let i=e.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(e.name,t);let r=(e.op==="a"?this.headers.get(t):void 0)||[];r.push(...i),this.headers.set(t,r);break;case"d":let s=e.value;if(!s)this.headers.delete(t),this.normalizedNames.delete(t);else{let o=this.headers.get(t);if(!o)return;o=o.filter(a=>s.indexOf(a)===-1),o.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,o)}break}}addHeaderEntry(e,t){let i=e.toLowerCase();this.maybeSetNormalizedName(e,i),this.headers.has(i)?this.headers.get(i).push(t):this.headers.set(i,[t])}setHeaderEntries(e,t){let i=(Array.isArray(t)?t:[t]).map(s=>s.toString()),r=e.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var cf=class{encodeKey(e){return YM(e)}encodeValue(e){return YM(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function c1(n,e){let t=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(r=>{let s=r.indexOf("="),[o,a]=s==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,s)),e.decodeValue(r.slice(s+1))],c=t.get(o)||[];c.push(a),t.set(o,c)}),t}var l1=/%(\d[a-f0-9])/gi,u1={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function YM(n){return encodeURIComponent(n).replace(l1,(e,t)=>u1[t]??e)}function af(n){return`${n}`}var dr=class n{map;encoder;updates=null;cloneFrom=null;constructor(e={}){if(this.encoder=e.encoder||new cf,e.fromString){if(e.fromObject)throw new de(2805,!1);this.map=c1(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{let i=e.fromObject[t],r=Array.isArray(i)?i.map(af):[af(i)];this.map.set(t,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){let t=[];return Object.keys(e).forEach(i=>{let r=e[i];Array.isArray(r)?r.forEach(s=>{t.push({param:i,value:s,op:"a"})}):t.push({param:i,value:r,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let t=this.encoder.encodeKey(e);return this.map.get(e).map(i=>t+"="+this.encoder.encodeValue(i)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let t=new n({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let t=(e.op==="a"?this.map.get(e.param):void 0)||[];t.push(af(e.value)),this.map.set(e.param,t);break;case"d":if(e.value!==void 0){let i=this.map.get(e.param)||[],r=i.indexOf(af(e.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(e.param,i):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var lf=class{map=new Map;set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function d1(n){switch(n){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function ZM(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function JM(n){return typeof Blob<"u"&&n instanceof Blob}function KM(n){return typeof FormData<"u"&&n instanceof FormData}function f1(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}var QM="Content-Type",eb="Accept",tb="X-Request-URL",nb="text/plain",ib="application/json",h1=`${ib}, ${nb}, */*`,ia=class n{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(e,t,i,r){this.url=t,this.method=e.toUpperCase();let s;if(d1(this.method)||r?(this.body=i!==void 0?i:null,s=r):s=i,s){if(this.reportProgress=!!s.reportProgress,this.withCredentials=!!s.withCredentials,this.keepalive=!!s.keepalive,s.responseType&&(this.responseType=s.responseType),s.headers&&(this.headers=s.headers),s.context&&(this.context=s.context),s.params&&(this.params=s.params),s.priority&&(this.priority=s.priority),s.cache&&(this.cache=s.cache),s.credentials&&(this.credentials=s.credentials),typeof s.timeout=="number"){if(s.timeout<1||!Number.isInteger(s.timeout))throw new de(2822,"");this.timeout=s.timeout}s.mode&&(this.mode=s.mode),s.redirect&&(this.redirect=s.redirect),s.integrity&&(this.integrity=s.integrity),s.referrer&&(this.referrer=s.referrer),this.transferCache=s.transferCache}if(this.headers??=new Yr,this.context??=new lf,!this.params)this.params=new dr,this.urlWithParams=t;else{let o=this.params.toString();if(o.length===0)this.urlWithParams=t;else{let a=t.indexOf("?"),c=a===-1?"?":a<t.length-1?"&":"";this.urlWithParams=t+c+o}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||ZM(this.body)||JM(this.body)||KM(this.body)||f1(this.body)?this.body:this.body instanceof dr?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||KM(this.body)?null:JM(this.body)?this.body.type||null:ZM(this.body)?null:typeof this.body=="string"?nb:this.body instanceof dr?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?ib:null}clone(e={}){let t=e.method||this.method,i=e.url||this.url,r=e.responseType||this.responseType,s=e.keepalive??this.keepalive,o=e.priority||this.priority,a=e.cache||this.cache,c=e.mode||this.mode,l=e.redirect||this.redirect,u=e.credentials||this.credentials,d=e.referrer||this.referrer,f=e.integrity||this.integrity,h=e.transferCache??this.transferCache,g=e.timeout??this.timeout,y=e.body!==void 0?e.body:this.body,m=e.withCredentials??this.withCredentials,p=e.reportProgress??this.reportProgress,C=e.headers||this.headers,S=e.params||this.params,E=e.context??this.context;return e.setHeaders!==void 0&&(C=Object.keys(e.setHeaders).reduce((T,D)=>T.set(D,e.setHeaders[D]),C)),e.setParams&&(S=Object.keys(e.setParams).reduce((T,D)=>T.set(D,e.setParams[D]),S)),new n(t,i,y,{params:S,headers:C,context:E,reportProgress:p,responseType:r,withCredentials:m,transferCache:h,keepalive:s,cache:a,priority:o,timeout:g,mode:c,redirect:l,credentials:u,referrer:d,integrity:f})}},Gs=(function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n})(Gs||{}),oa=class{headers;status;statusText;url;ok;type;redirected;constructor(e,t=200,i="OK"){this.headers=e.headers||new Yr,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||i,this.url=e.url||null,this.redirected=e.redirected,this.ok=this.status>=200&&this.status<300}},uf=class n extends oa{constructor(e={}){super(e)}type=Gs.ResponseHeader;clone(e={}){return new n({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},tl=class n extends oa{body;constructor(e={}){super(e),this.body=e.body!==void 0?e.body:null}type=Gs.Response;clone(e={}){return new n({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0,redirected:e.redirected??this.redirected})}},ra=class extends oa{name="HttpErrorResponse";message;error;ok=!1;constructor(e){super(e,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},p1=200,m1=204;function Uv(n,e){return{body:e,headers:n.headers,context:n.context,observe:n.observe,params:n.params,reportProgress:n.reportProgress,responseType:n.responseType,withCredentials:n.withCredentials,credentials:n.credentials,transferCache:n.transferCache,timeout:n.timeout,keepalive:n.keepalive,priority:n.priority,cache:n.cache,mode:n.mode,redirect:n.redirect,integrity:n.integrity,referrer:n.referrer}}var Zr=(()=>{class n{handler;constructor(t){this.handler=t}request(t,i,r={}){let s;if(t instanceof ia)s=t;else{let c;r.headers instanceof Yr?c=r.headers:c=new Yr(r.headers);let l;r.params&&(r.params instanceof dr?l=r.params:l=new dr({fromObject:r.params})),s=new ia(t,i,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:l,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,integrity:r.integrity,timeout:r.timeout})}let o=Pe(s).pipe(Ir(c=>this.handler.handle(c)));if(t instanceof ia||r.observe==="events")return o;let a=o.pipe(Tn(c=>c instanceof tl));switch(r.observe||"body"){case"body":switch(s.responseType){case"arraybuffer":return a.pipe(qe(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new de(2806,!1);return c.body}));case"blob":return a.pipe(qe(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new de(2807,!1);return c.body}));case"text":return a.pipe(qe(c=>{if(c.body!==null&&typeof c.body!="string")throw new de(2808,!1);return c.body}));case"json":default:return a.pipe(qe(c=>c.body))}case"response":return a;default:throw new de(2809,!1)}}delete(t,i={}){return this.request("DELETE",t,i)}get(t,i={}){return this.request("GET",t,i)}head(t,i={}){return this.request("HEAD",t,i)}jsonp(t,i){return this.request("JSONP",t,{params:new dr().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,i={}){return this.request("OPTIONS",t,i)}patch(t,i,r={}){return this.request("PATCH",t,Uv(r,i))}post(t,i,r={}){return this.request("POST",t,Uv(r,i))}put(t,i,r={}){return this.request("PUT",t,Uv(r,i))}static \u0275fac=function(i){return new(i||n)(Te(sa))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})();var g1=new pe("");function v1(n,e){return e(n)}function y1(n,e,t){return(i,r)=>rn(t,()=>e(i,s=>n(s,r)))}var rb=new pe(""),sb=new pe(""),ob=new pe("",{providedIn:"root",factory:()=>!0});var df=(()=>{class n extends sa{backend;injector;chain=null;pendingTasks=Y(ud);contributeToStability=Y(ob);constructor(t,i){super(),this.backend=t,this.injector=i}handle(t){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(rb),...this.injector.get(sb,[])]));this.chain=i.reduceRight((r,s)=>y1(r,s,this.injector),v1)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(t,r=>this.backend.handle(r)).pipe(xs(i))}else return this.chain(t,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||n)(Te(el),Te(Ht))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})();var _1=/^\)\]\}',?\n/,x1=RegExp(`^${tb}:`,"m");function E1(n){return"responseURL"in n&&n.responseURL?n.responseURL:x1.test(n.getAllResponseHeaders())?n.getResponseHeader(tb):null}var Bv=(()=>{class n{xhrFactory;constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new de(-2800,!1);let i=this.xhrFactory;return Pe(null).pipe(ln(()=>new tt(s=>{let o=i.build();if(o.open(t.method,t.urlWithParams),t.withCredentials&&(o.withCredentials=!0),t.headers.forEach((m,p)=>o.setRequestHeader(m,p.join(","))),t.headers.has(eb)||o.setRequestHeader(eb,h1),!t.headers.has(QM)){let m=t.detectContentTypeHeader();m!==null&&o.setRequestHeader(QM,m)}if(t.timeout&&(o.timeout=t.timeout),t.responseType){let m=t.responseType.toLowerCase();o.responseType=m!=="json"?m:"text"}let a=t.serializeBody(),c=null,l=()=>{if(c!==null)return c;let m=o.statusText||"OK",p=new Yr(o.getAllResponseHeaders()),C=E1(o)||t.url;return c=new uf({headers:p,status:o.status,statusText:m,url:C}),c},u=()=>{let{headers:m,status:p,statusText:C,url:S}=l(),E=null;p!==m1&&(E=typeof o.response>"u"?o.responseText:o.response),p===0&&(p=E?p1:0);let T=p>=200&&p<300;if(t.responseType==="json"&&typeof E=="string"){let D=E;E=E.replace(_1,"");try{E=E!==""?JSON.parse(E):null}catch(I){E=D,T&&(T=!1,E={error:I,text:E})}}T?(s.next(new tl({body:E,headers:m,status:p,statusText:C,url:S||void 0})),s.complete()):s.error(new ra({error:E,headers:m,status:p,statusText:C,url:S||void 0}))},d=m=>{let{url:p}=l(),C=new ra({error:m,status:o.status||0,statusText:o.statusText||"Unknown Error",url:p||void 0});s.error(C)},f=d;t.timeout&&(f=m=>{let{url:p}=l(),C=new ra({error:new DOMException("Request timed out","TimeoutError"),status:o.status||0,statusText:o.statusText||"Request timeout",url:p||void 0});s.error(C)});let h=!1,g=m=>{h||(s.next(l()),h=!0);let p={type:Gs.DownloadProgress,loaded:m.loaded};m.lengthComputable&&(p.total=m.total),t.responseType==="text"&&o.responseText&&(p.partialText=o.responseText),s.next(p)},y=m=>{let p={type:Gs.UploadProgress,loaded:m.loaded};m.lengthComputable&&(p.total=m.total),s.next(p)};return o.addEventListener("load",u),o.addEventListener("error",d),o.addEventListener("timeout",f),o.addEventListener("abort",d),t.reportProgress&&(o.addEventListener("progress",g),a!==null&&o.upload&&o.upload.addEventListener("progress",y)),o.send(a),s.next({type:Gs.Sent}),()=>{o.removeEventListener("error",d),o.removeEventListener("abort",d),o.removeEventListener("load",u),o.removeEventListener("timeout",f),t.reportProgress&&(o.removeEventListener("progress",g),a!==null&&o.upload&&o.upload.removeEventListener("progress",y)),o.readyState!==o.DONE&&o.abort()}})))}static \u0275fac=function(i){return new(i||n)(Te(zs))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})(),ab=new pe(""),M1="XSRF-TOKEN",b1=new pe("",{providedIn:"root",factory:()=>M1}),S1="X-XSRF-TOKEN",w1=new pe("",{providedIn:"root",factory:()=>S1}),nl=class{},C1=(()=>{class n{doc;cookieName;lastCookieString="";lastToken=null;parseCount=0;constructor(t,i){this.doc=t,this.cookieName=i}getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=Yc(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(i){return new(i||n)(Te(zt),Te(b1))};static \u0275prov=ye({token:n,factory:n.\u0275fac})}return n})();function T1(n,e){let t=n.url.toLowerCase();if(!Y(ab)||n.method==="GET"||n.method==="HEAD"||t.startsWith("http://")||t.startsWith("https://"))return e(n);let i=Y(nl).getToken(),r=Y(w1);return i!=null&&!n.headers.has(r)&&(n=n.clone({headers:n.headers.set(r,i)})),e(n)}function Vv(...n){let e=[Zr,Bv,df,{provide:sa,useExisting:df},{provide:el,useFactory:()=>Y(g1,{optional:!0})??Y(Bv)},{provide:rb,useValue:T1,multi:!0},{provide:ab,useValue:!0},{provide:nl,useClass:C1}];for(let t of n)e.push(...t.\u0275providers);return sr(e)}var cb=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||n)(Te(zt))};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var ze="primary",vl=Symbol("RouteTitle"),$v=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function $s(n){return new $v(n)}function gb(n,e,t){let i=t.path.split("/");if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let r={};for(let s=0;s<i.length;s++){let o=i[s],a=n[s];if(o[0]===":")r[o.substring(1)]=a;else if(o!==a.path)return null}return{consumed:n.slice(0,i.length),posParams:r}}function A1(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!Bi(n[t],e[t]))return!1;return!0}function Bi(n,e){let t=n?qv(n):void 0,i=e?qv(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let s=0;s<t.length;s++)if(r=t[s],!vb(n[r],e[r]))return!1;return!0}function qv(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function vb(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,s)=>i[s]===r)}else return n===e}function yb(n){return n.length>0?n[n.length-1]:null}function hr(n){return em(n)?n:jr(n)?Ot(Promise.resolve(n)):Pe(n)}var I1={exact:xb,subset:Eb},_b={exact:R1,subset:N1,ignored:()=>!0};function lb(n,e,t){return I1[t.paths](n.root,e.root,t.matrixParams)&&_b[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function R1(n,e){return Bi(n,e)}function xb(n,e,t){if(!js(n.segments,e.segments)||!pf(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!xb(n.children[i],e.children[i],t))return!1;return!0}function N1(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>vb(n[t],e[t]))}function Eb(n,e,t){return Mb(n,e,e.segments,t)}function Mb(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!js(r,t)||e.hasChildren()||!pf(r,t,i))}else if(n.segments.length===t.length){if(!js(n.segments,t)||!pf(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!Eb(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),s=t.slice(n.segments.length);return!js(n.segments,r)||!pf(n.segments,r,i)||!n.children[ze]?!1:Mb(n.children[ze],e,s,i)}}function pf(n,e,t){return e.every((i,r)=>_b[t](n[r].parameters,i.parameters))}var Hi=class{root;queryParams;fragment;_queryParamMap;constructor(e=new dt([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=$s(this.queryParams),this._queryParamMap}toString(){return F1.serialize(this)}},dt=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return mf(this)}},Jr=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=$s(this.parameters),this._parameterMap}toString(){return Sb(this)}};function P1(n,e){return js(n,e)&&n.every((t,i)=>Bi(t.parameters,e[i].parameters))}function js(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function O1(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===ze&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==ze&&(t=t.concat(e(r,i)))}),t}var yl=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>new qs,providedIn:"root"})}return n})(),qs=class{parse(e){let t=new Yv(e);return new Hi(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${il(e.root,!0)}`,i=U1(e.queryParams),r=typeof e.fragment=="string"?`#${L1(e.fragment)}`:"";return`${t}${i}${r}`}},F1=new qs;function mf(n){return n.segments.map(e=>Sb(e)).join("/")}function il(n,e){if(!n.hasChildren())return mf(n);if(e){let t=n.children[ze]?il(n.children[ze],!1):"",i=[];return Object.entries(n.children).forEach(([r,s])=>{r!==ze&&i.push(`${r}:${il(s,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=O1(n,(i,r)=>r===ze?[il(n.children[ze],!1)]:[`${r}:${il(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[ze]!=null?`${mf(n)}/${t[0]}`:`${mf(n)}/(${t.join("//")})`}}function bb(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function ff(n){return bb(n).replace(/%3B/gi,";")}function L1(n){return encodeURI(n)}function Xv(n){return bb(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function gf(n){return decodeURIComponent(n)}function ub(n){return gf(n.replace(/\+/g,"%20"))}function Sb(n){return`${Xv(n.path)}${k1(n.parameters)}`}function k1(n){return Object.entries(n).map(([e,t])=>`;${Xv(e)}=${Xv(t)}`).join("")}function U1(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${ff(t)}=${ff(r)}`).join("&"):`${ff(t)}=${ff(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var B1=/^[^\/()?;#]+/;function zv(n){let e=n.match(B1);return e?e[0]:""}var V1=/^[^\/()?;=#]+/;function H1(n){let e=n.match(V1);return e?e[0]:""}var z1=/^[^=?&#]+/;function G1(n){let e=n.match(z1);return e?e[0]:""}var j1=/^[^&#]+/;function W1(n){let e=n.match(j1);return e?e[0]:""}var Yv=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new dt([],{}):new dt([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let t={};this.peekStartsWith("/(")&&(this.capture("/"),t=this.parseParens(!0));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1)),(e.length>0||Object.keys(t).length>0)&&(i[ze]=new dt(e,t)),i}parseSegment(){let e=zv(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new de(4009,!1);return this.capture(e),new Jr(gf(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=H1(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=zv(this.remaining);r&&(i=r,this.capture(i))}e[gf(t)]=gf(i)}parseQueryParam(e){let t=G1(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=W1(this.remaining);o&&(i=o,this.capture(i))}let r=ub(t),s=ub(i);if(e.hasOwnProperty(r)){let o=e[r];Array.isArray(o)||(o=[o],e[r]=o),o.push(s)}else e[r]=s}parseParens(e){let t={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=zv(this.remaining),r=this.remaining[i.length];if(r!=="/"&&r!==")"&&r!==";")throw new de(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):e&&(s=ze);let o=this.parseChildren();t[s]=Object.keys(o).length===1&&o[ze]?o[ze]:new dt([],o),this.consumeOptional("//")}return t}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new de(4011,!1)}};function wb(n){return n.segments.length>0?new dt([],{[ze]:n}):n}function Cb(n){let e={};for(let[i,r]of Object.entries(n.children)){let s=Cb(r);if(i===ze&&s.segments.length===0&&s.hasChildren())for(let[o,a]of Object.entries(s.children))e[o]=a;else(s.segments.length>0||s.hasChildren())&&(e[i]=s)}let t=new dt(n.segments,e);return $1(t)}function $1(n){if(n.numberOfChildren===1&&n.children[ze]){let e=n.children[ze];return new dt(n.segments.concat(e.segments),e.children)}return n}function Kr(n){return n instanceof Hi}function Tb(n,e,t=null,i=null){let r=Db(n);return Ab(r,e,t,i)}function Db(n){let e;function t(s){let o={};for(let c of s.children){let l=t(c);o[c.outlet]=l}let a=new dt(s.url,o);return s===n&&(e=a),a}let i=t(n.root),r=wb(i);return e??r}function Ab(n,e,t,i){let r=n;for(;r.parent;)r=r.parent;if(e.length===0)return Gv(r,r,r,t,i);let s=q1(e);if(s.toRoot())return Gv(r,r,new dt([],{}),t,i);let o=X1(s,r,n),a=o.processChildren?sl(o.segmentGroup,o.index,s.commands):Rb(o.segmentGroup,o.index,s.commands);return Gv(r,o.segmentGroup,a,t,i)}function vf(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function cl(n){return typeof n=="object"&&n!=null&&n.outlets}function Gv(n,e,t,i,r){let s={};i&&Object.entries(i).forEach(([c,l])=>{s[c]=Array.isArray(l)?l.map(u=>`${u}`):`${l}`});let o;n===e?o=t:o=Ib(n,e,t);let a=wb(Cb(o));return new Hi(a,s,r)}function Ib(n,e,t){let i={};return Object.entries(n.children).forEach(([r,s])=>{s===e?i[r]=t:i[r]=Ib(s,e,t)}),new dt(n.segments,i)}var yf=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&vf(i[0]))throw new de(4003,!1);let r=i.find(cl);if(r&&r!==yb(i))throw new de(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function q1(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new yf(!0,0,n);let e=0,t=!1,i=n.reduce((r,s,o)=>{if(typeof s=="object"&&s!=null){if(s.outlets){let a={};return Object.entries(s.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(s.segmentPath)return[...r,s.segmentPath]}return typeof s!="string"?[...r,s]:o===0?(s.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,s]},[]);return new yf(t,e,i)}var la=class{segmentGroup;processChildren;index;constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function X1(n,e,t){if(n.isAbsolute)return new la(e,!0,0);if(!t)return new la(e,!1,NaN);if(t.parent===null)return new la(t,!0,0);let i=vf(n.commands[0])?0:1,r=t.segments.length-1+i;return Y1(t,r,n.numberOfDoubleDots)}function Y1(n,e,t){let i=n,r=e,s=t;for(;s>r;){if(s-=r,i=i.parent,!i)throw new de(4005,!1);r=i.segments.length}return new la(i,!1,r-s)}function Z1(n){return cl(n[0])?n[0].outlets:{[ze]:n}}function Rb(n,e,t){if(n??=new dt([],{}),n.segments.length===0&&n.hasChildren())return sl(n,e,t);let i=J1(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let s=new dt(n.segments.slice(0,i.pathIndex),{});return s.children[ze]=new dt(n.segments.slice(i.pathIndex),n.children),sl(s,0,r)}else return i.match&&r.length===0?new dt(n.segments,{}):i.match&&!n.hasChildren()?Zv(n,e,t):i.match?sl(n,0,r):Zv(n,e,t)}function sl(n,e,t){if(t.length===0)return new dt(n.segments,{});{let i=Z1(t),r={};if(Object.keys(i).some(s=>s!==ze)&&n.children[ze]&&n.numberOfChildren===1&&n.children[ze].segments.length===0){let s=sl(n.children[ze],e,t);return new dt(n.segments,s.children)}return Object.entries(i).forEach(([s,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[s]=Rb(n.children[s],e,o))}),Object.entries(n.children).forEach(([s,o])=>{i[s]===void 0&&(r[s]=o)}),new dt(n.segments,r)}}function J1(n,e,t){let i=0,r=e,s={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return s;let o=n.segments[r],a=t[i];if(cl(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!fb(c,l,o))return s;i+=2}else{if(!fb(c,{},o))return s;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Zv(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let s=t[r];if(cl(s)){let c=K1(s.outlets);return new dt(i,c)}if(r===0&&vf(t[0])){let c=n.segments[e];i.push(new Jr(c.path,db(t[0]))),r++;continue}let o=cl(s)?s.outlets[ze]:`${s}`,a=r<t.length-1?t[r+1]:null;o&&a&&vf(a)?(i.push(new Jr(o,db(a))),r+=2):(i.push(new Jr(o,{})),r++)}return new dt(i,{})}function K1(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=Zv(new dt([],{}),0,i))}),e}function db(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function fb(n,e,t){return n==t.path&&Bi(e,t.parameters)}var ol="imperative",Qt=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(Qt||{}),Hn=class{id;url;constructor(e,t){this.id=e,this.url=t}},Xs=class extends Hn{type=Qt.NavigationStart;navigationTrigger;restoredState;constructor(e,t,i="imperative",r=null){super(e,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},zi=class extends Hn{urlAfterRedirects;type=Qt.NavigationEnd;constructor(e,t,i){super(e,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Mn=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(Mn||{}),ll=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(ll||{}),Vi=class extends Hn{reason;code;type=Qt.NavigationCancel;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},fr=class extends Hn{reason;code;type=Qt.NavigationSkipped;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}},da=class extends Hn{error;target;type=Qt.NavigationError;constructor(e,t,i,r){super(e,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},ul=class extends Hn{urlAfterRedirects;state;type=Qt.RoutesRecognized;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},_f=class extends Hn{urlAfterRedirects;state;type=Qt.GuardsCheckStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},xf=class extends Hn{urlAfterRedirects;state;shouldActivate;type=Qt.GuardsCheckEnd;constructor(e,t,i,r,s){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=s}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Ef=class extends Hn{urlAfterRedirects;state;type=Qt.ResolveStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Mf=class extends Hn{urlAfterRedirects;state;type=Qt.ResolveEnd;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},bf=class{route;type=Qt.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Sf=class{route;type=Qt.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},wf=class{snapshot;type=Qt.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Cf=class{snapshot;type=Qt.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Tf=class{snapshot;type=Qt.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Df=class{snapshot;type=Qt.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var dl=class{},fa=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function Q1(n){return!(n instanceof dl)&&!(n instanceof fa)}function eN(n,e){return n.providers&&!n._injector&&(n._injector=Hc(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Ei(n){return n.outlet||ze}function tN(n,e){let t=n.filter(i=>Ei(i)===e);return t.push(...n.filter(i=>Ei(i)!==e)),t}function ma(n){if(!n)return null;if(n.routeConfig?._injector)return n.routeConfig._injector;for(let e=n.parent;e;e=e.parent){let t=e.routeConfig;if(t?._loadedInjector)return t._loadedInjector;if(t?._injector)return t._injector}return null}var Af=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return ma(this.route?.snapshot)??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new ga(this.rootInjector)}},ga=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new Af(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||n)(Te(Ht))};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),If=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=Jv(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=Jv(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=Kv(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return Kv(e,this._root).map(t=>t.value)}};function Jv(n,e){if(n===e.value)return e;for(let t of e.children){let i=Jv(n,t);if(i)return i}return null}function Kv(n,e){if(n===e.value)return[e];for(let t of e.children){let i=Kv(n,t);if(i.length)return i.unshift(e),i}return[]}var Vn=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function ca(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var fl=class extends If{snapshot;constructor(e,t){super(e),this.snapshot=t,oy(this,e)}toString(){return this.snapshot.toString()}};function Nb(n){let e=nN(n),t=new tn([new Jr("",{})]),i=new tn({}),r=new tn({}),s=new tn({}),o=new tn(""),a=new zn(t,i,s,o,r,ze,n,e.root);return a.snapshot=e.root,new fl(new Vn(a,[]),e)}function nN(n){let e={},t={},i={},s=new Ws([],e,i,"",t,ze,n,null,{});return new hl("",new Vn(s,[]))}var zn=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,t,i,r,s,o,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=s,this.outlet=o,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(qe(l=>l[vl]))??Pe(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(qe(e=>$s(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(qe(e=>$s(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Rf(n,e,t="emptyOnly"){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:re(re({},e.params),n.params),data:re(re({},e.data),n.data),resolve:re(re(re(re({},n.data),e.data),r?.data),n._resolvedData)}:i={params:re({},n.params),data:re({},n.data),resolve:re(re({},n.data),n._resolvedData??{})},r&&Ob(r)&&(i.resolve[vl]=r.title),i}var Ws=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[vl]}constructor(e,t,i,r,s,o,a,c,l){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s,this.outlet=o,this.component=a,this.routeConfig=c,this._resolve=l}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=$s(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=$s(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},hl=class extends If{url;constructor(e,t){super(t),this.url=e,oy(this,t)}toString(){return Pb(this._root)}};function oy(n,e){e.value._routerState=n,e.children.forEach(t=>oy(n,t))}function Pb(n){let e=n.children.length>0?` { ${n.children.map(Pb).join(", ")} } `:"";return`${n.value}${e}`}function jv(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,Bi(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),Bi(e.params,t.params)||n.paramsSubject.next(t.params),A1(e.url,t.url)||n.urlSubject.next(t.url),Bi(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function Qv(n,e){let t=Bi(n.params,e.params)&&P1(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||Qv(n.parent,e.parent))}function Ob(n){return typeof n.title=="string"||n.title===null}var Fb=new pe(""),_l=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=ze;activateEvents=new Wt;deactivateEvents=new Wt;attachEvents=new Wt;detachEvents=new Wt;routerOutletData=PM(void 0);parentContexts=Y(ga);location=Y(lr);changeDetector=Y(ea);inputBinder=Y(Ff,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new de(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new de(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new de(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new de(4013,!1);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new ey(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(o,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Dn({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Gr]})}return n})(),ey=class{route;childContexts;parent;outletData;constructor(e,t,i,r){this.route=e,this.childContexts=t,this.parent=i,this.outletData=r}get(e,t){return e===zn?this.route:e===ga?this.childContexts:e===Fb?this.outletData:this.parent.get(e,t)}},Ff=new pe("");var ay=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=vi({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&$r(0,"router-outlet")},dependencies:[_l],encapsulation:2})}return n})();function cy(n){let e=n.children&&n.children.map(cy),t=e?Je(re({},n),{children:e}):re({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==ze&&(t.component=ay),t}function iN(n,e,t){let i=pl(n,e._root,t?t._root:void 0);return new fl(i,e)}function pl(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let i=t.value;i._futureSnapshot=e.value;let r=rN(n,e,t);return new Vn(i,r)}else{if(n.shouldAttach(e.value)){let s=n.retrieve(e.value);if(s!==null){let o=s.route;return o.value._futureSnapshot=e.value,o.children=e.children.map(a=>pl(n,a)),o}}let i=sN(e.value),r=e.children.map(s=>pl(n,s));return new Vn(i,r)}}function rN(n,e,t){return e.children.map(i=>{for(let r of t.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return pl(n,i,r);return pl(n,i)})}function sN(n){return new zn(new tn(n.url),new tn(n.params),new tn(n.queryParams),new tn(n.fragment),new tn(n.data),n.outlet,n.component,n)}var ha=class{redirectTo;navigationBehaviorOptions;constructor(e,t){this.redirectTo=e,this.navigationBehaviorOptions=t}},Lb="ngNavigationCancelingError";function Nf(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=Kr(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=kb(!1,Mn.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function kb(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[Lb]=!0,t.cancellationCode=e,t}function oN(n){return Ub(n)&&Kr(n.url)}function Ub(n){return!!n&&n[Lb]}var aN=(n,e,t,i)=>qe(r=>(new ty(e,r.targetRouterState,r.currentRouterState,t,i).activate(n),r)),ty=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,i,r,s){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=s}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),jv(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=ca(t);e.children.forEach(s=>{let o=s.value.outlet;this.deactivateRoutes(s,r[o],i),delete r[o]}),Object.values(r).forEach(s=>{this.deactivateRouteAndItsChildren(s,i)})}deactivateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(r===s)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(e,t,o.children)}else this.deactivateChildRoutes(e,t,i);else s&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=ca(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:o,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=ca(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,t,i){let r=ca(t);e.children.forEach(s=>{this.activateRoutes(s,r[s.value.outlet],i),this.forwardEvent(new Df(s.value.snapshot))}),e.children.length&&this.forwardEvent(new Cf(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(jv(r),r===s)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,o.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(a.contexts),o.attachRef=a.componentRef,o.route=a.route.value,o.outlet&&o.outlet.attach(a.componentRef,a.route.value),jv(a.route.value),this.activateChildRoutes(e,null,o.children)}else o.attachRef=null,o.route=r,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(e,null,o.children)}else this.activateChildRoutes(e,null,i)}},Pf=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},ua=class{component;route;constructor(e,t){this.component=e,this.route=t}};function cN(n,e,t){let i=n._root,r=e?e._root:null;return rl(i,r,t,[i.value])}function lN(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function va(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!ym(n)?n:e.get(n):i}function rl(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=ca(e);return n.children.forEach(o=>{uN(o,s[o.value.outlet],t,i.concat([o.value]),r),delete s[o.value.outlet]}),Object.entries(s).forEach(([o,a])=>al(a,t.getContext(o),r)),r}function uN(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=n.value,o=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(o&&s.routeConfig===o.routeConfig){let c=dN(o,s,s.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new Pf(i)):(s.data=o.data,s._resolvedData=o._resolvedData),s.component?rl(n,e,a?a.children:null,i,r):rl(n,e,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new ua(a.outlet.component,o))}else o&&al(e,a,r),r.canActivateChecks.push(new Pf(i)),s.component?rl(n,null,a?a.children:null,i,r):rl(n,null,t,i,r);return r}function dN(n,e,t){if(typeof t=="function")return t(n,e);switch(t){case"pathParamsChange":return!js(n.url,e.url);case"pathParamsOrQueryParamsChange":return!js(n.url,e.url)||!Bi(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Qv(n,e)||!Bi(n.queryParams,e.queryParams);case"paramsChange":default:return!Qv(n,e)}}function al(n,e,t){let i=ca(n),r=n.value;Object.entries(i).forEach(([s,o])=>{r.component?e?al(o,e.children.getContext(s),t):al(o,null,t):al(o,e,t)}),r.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new ua(e.outlet.component,r)):t.canDeactivateChecks.push(new ua(null,r)):t.canDeactivateChecks.push(new ua(null,r))}function xl(n){return typeof n=="function"}function fN(n){return typeof n=="boolean"}function hN(n){return n&&xl(n.canLoad)}function pN(n){return n&&xl(n.canActivate)}function mN(n){return n&&xl(n.canActivateChild)}function gN(n){return n&&xl(n.canDeactivate)}function vN(n){return n&&xl(n.canMatch)}function Bb(n){return n instanceof Qi||n?.name==="EmptyError"}var hf=Symbol("INITIAL_VALUE");function pa(){return ln(n=>Hu(n.map(e=>e.pipe(er(1),rm(hf)))).pipe(qe(e=>{for(let t of e)if(t!==!0){if(t===hf)return hf;if(t===!1||yN(t))return t}return!0}),Tn(e=>e!==hf),er(1)))}function yN(n){return Kr(n)||n instanceof ha}function _N(n,e){return jt(t=>{let{targetSnapshot:i,currentSnapshot:r,guards:{canActivateChecks:s,canDeactivateChecks:o}}=t;return o.length===0&&s.length===0?Pe(Je(re({},t),{guardsResult:!0})):xN(o,i,r,n).pipe(jt(a=>a&&fN(a)?EN(i,s,n,e):Pe(a)),qe(a=>Je(re({},t),{guardsResult:a})))})}function xN(n,e,t,i){return Ot(n).pipe(jt(r=>CN(r.component,r.route,t,e,i)),tr(r=>r!==!0,!0))}function EN(n,e,t,i){return Ot(e).pipe(Ir(r=>Oo(bN(r.route.parent,i),MN(r.route,i),wN(n,r.path,t),SN(n,r.route,t))),tr(r=>r!==!0,!0))}function MN(n,e){return n!==null&&e&&e(new Tf(n)),Pe(!0)}function bN(n,e){return n!==null&&e&&e(new wf(n)),Pe(!0)}function SN(n,e,t){let i=e.routeConfig?e.routeConfig.canActivate:null;if(!i||i.length===0)return Pe(!0);let r=i.map(s=>oc(()=>{let o=ma(e)??t,a=va(s,o),c=pN(a)?a.canActivate(e,n):rn(o,()=>a(e,n));return hr(c).pipe(tr())}));return Pe(r).pipe(pa())}function wN(n,e,t){let i=e[e.length-1],s=e.slice(0,e.length-1).reverse().map(o=>lN(o)).filter(o=>o!==null).map(o=>oc(()=>{let a=o.guards.map(c=>{let l=ma(o.node)??t,u=va(c,l),d=mN(u)?u.canActivateChild(i,n):rn(l,()=>u(i,n));return hr(d).pipe(tr())});return Pe(a).pipe(pa())}));return Pe(s).pipe(pa())}function CN(n,e,t,i,r){let s=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!s||s.length===0)return Pe(!0);let o=s.map(a=>{let c=ma(e)??r,l=va(a,c),u=gN(l)?l.canDeactivate(n,e,t,i):rn(c,()=>l(n,e,t,i));return hr(u).pipe(tr())});return Pe(o).pipe(pa())}function TN(n,e,t,i){let r=e.canLoad;if(r===void 0||r.length===0)return Pe(!0);let s=r.map(o=>{let a=va(o,n),c=hN(a)?a.canLoad(e,t):rn(n,()=>a(e,t));return hr(c)});return Pe(s).pipe(pa(),Vb(i))}function Vb(n){return Yp(Jt(e=>{if(typeof e!="boolean")throw Nf(n,e)}),qe(e=>e===!0))}function DN(n,e,t,i){let r=e.canMatch;if(!r||r.length===0)return Pe(!0);let s=r.map(o=>{let a=va(o,n),c=vN(a)?a.canMatch(e,t):rn(n,()=>a(e,t));return hr(c)});return Pe(s).pipe(pa(),Vb(i))}var ml=class{segmentGroup;constructor(e){this.segmentGroup=e||null}},gl=class extends Error{urlTree;constructor(e){super(),this.urlTree=e}};function aa(n){return Po(new ml(n))}function AN(n){return Po(new de(4e3,!1))}function IN(n){return Po(kb(!1,Mn.GuardRejected))}var ny=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return Pe(i);if(r.numberOfChildren>1||!r.children[ze])return AN(`${e.redirectTo}`);r=r.children[ze]}}applyRedirectCommands(e,t,i,r,s){return RN(t,r,s).pipe(qe(o=>{if(o instanceof Hi)throw new gl(o);let a=this.applyRedirectCreateUrlTree(o,this.urlSerializer.parse(o),e,i);if(o[0]==="/")throw new gl(a);return a}))}applyRedirectCreateUrlTree(e,t,i,r){let s=this.createSegmentGroup(e,t.root,i,r);return new Hi(s,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,s])=>{if(typeof s=="string"&&s[0]===":"){let a=s.substring(1);i[r]=t[a]}else i[r]=s}),i}createSegmentGroup(e,t,i,r){let s=this.createSegments(e,t.segments,i,r),o={};return Object.entries(t.children).forEach(([a,c])=>{o[a]=this.createSegmentGroup(e,c,i,r)}),new dt(s,o)}createSegments(e,t,i,r){return t.map(s=>s.path[0]===":"?this.findPosParam(e,s,r):this.findOrReturn(s,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new de(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}};function RN(n,e,t){if(typeof n=="string")return Pe(n);let i=n,{queryParams:r,fragment:s,routeConfig:o,url:a,outlet:c,params:l,data:u,title:d}=e;return hr(rn(t,()=>i({params:l,data:u,queryParams:r,fragment:s,routeConfig:o,url:a,outlet:c,title:d})))}var iy={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function NN(n,e,t,i,r){let s=Hb(n,e,t);return s.matched?(i=eN(e,i),DN(i,e,t,r).pipe(qe(o=>o===!0?s:re({},iy)))):Pe(s)}function Hb(n,e,t){if(e.path==="**")return PN(t);if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?re({},iy):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||gb)(t,n,e);if(!r)return re({},iy);let s={};Object.entries(r.posParams??{}).forEach(([a,c])=>{s[a]=c.path});let o=r.consumed.length>0?re(re({},s),r.consumed[r.consumed.length-1].parameters):s;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function PN(n){return{matched:!0,parameters:n.length>0?yb(n).parameters:{},consumedSegments:n,remainingSegments:[],positionalParamSegments:{}}}function hb(n,e,t,i){return t.length>0&&LN(n,t,i)?{segmentGroup:new dt(e,FN(i,new dt(t,n.children))),slicedSegments:[]}:t.length===0&&kN(n,t,i)?{segmentGroup:new dt(n.segments,ON(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new dt(n.segments,n.children),slicedSegments:t}}function ON(n,e,t,i){let r={};for(let s of t)if(Lf(n,e,s)&&!i[Ei(s)]){let o=new dt([],{});r[Ei(s)]=o}return re(re({},i),r)}function FN(n,e){let t={};t[ze]=e;for(let i of n)if(i.path===""&&Ei(i)!==ze){let r=new dt([],{});t[Ei(i)]=r}return t}function LN(n,e,t){return t.some(i=>Lf(n,e,i)&&Ei(i)!==ze)}function kN(n,e,t){return t.some(i=>Lf(n,e,i))}function Lf(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function UN(n,e,t){return e.length===0&&!n.children[t]}var ry=class{};function BN(n,e,t,i,r,s,o="emptyOnly"){return new sy(n,e,t,i,r,o,s).recognize()}var VN=31,sy=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,t,i,r,s,o,a){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=s,this.paramsInheritanceStrategy=o,this.urlSerializer=a,this.applyRedirects=new ny(this.urlSerializer,this.urlTree)}noMatchError(e){return new de(4002,`'${e.segmentGroup}'`)}recognize(){let e=hb(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(e).pipe(qe(({children:t,rootSnapshot:i})=>{let r=new Vn(i,t),s=new hl("",r),o=Tb(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,s.url=this.urlSerializer.serialize(o),{state:s,tree:o}}))}match(e){let t=new Ws([],Object.freeze({}),Object.freeze(re({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),ze,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,e,ze,t).pipe(qe(i=>({children:i,rootSnapshot:t})),Ar(i=>{if(i instanceof gl)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof ml?this.noMatchError(i):i}))}processSegmentGroup(e,t,i,r,s){return i.segments.length===0&&i.hasChildren()?this.processChildren(e,t,i,s):this.processSegment(e,t,i,i.segments,r,!0,s).pipe(qe(o=>o instanceof Vn?[o]:[]))}processChildren(e,t,i,r){let s=[];for(let o of Object.keys(i.children))o==="primary"?s.unshift(o):s.push(o);return Ot(s).pipe(Ir(o=>{let a=i.children[o],c=tN(t,o);return this.processSegmentGroup(e,c,a,o,r)}),im((o,a)=>(o.push(...a),o)),Rr(null),nm(),jt(o=>{if(o===null)return aa(i);let a=zb(o);return HN(a),Pe(a)}))}processSegment(e,t,i,r,s,o,a){return Ot(t).pipe(Ir(c=>this.processSegmentAgainstRoute(c._injector??e,t,c,i,r,s,o,a).pipe(Ar(l=>{if(l instanceof ml)return Pe(null);throw l}))),tr(c=>!!c),Ar(c=>{if(Bb(c))return UN(i,r,s)?Pe(new ry):aa(i);throw c}))}processSegmentAgainstRoute(e,t,i,r,s,o,a,c){return Ei(i)!==o&&(o===ze||!Lf(r,s,i))?aa(r):i.redirectTo===void 0?this.matchSegmentAgainstRoute(e,r,i,s,o,c):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,s,o,c):aa(r)}expandSegmentAgainstRouteUsingRedirect(e,t,i,r,s,o,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=Hb(t,r,s);if(!c)return aa(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>VN&&(this.allowRedirects=!1));let h=new Ws(s,l,Object.freeze(re({},this.urlTree.queryParams)),this.urlTree.fragment,pb(r),Ei(r),r.component??r._loadedComponent??null,r,mb(r)),g=Rf(h,a,this.paramsInheritanceStrategy);return h.params=Object.freeze(g.params),h.data=Object.freeze(g.data),this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,h,e).pipe(ln(m=>this.applyRedirects.lineralizeSegments(r,m)),jt(m=>this.processSegment(e,i,t,m.concat(f),o,!1,a)))}matchSegmentAgainstRoute(e,t,i,r,s,o){let a=NN(t,i,r,e,this.urlSerializer);return i.path==="**"&&(t.children={}),a.pipe(ln(c=>c.matched?(e=i._injector??e,this.getChildConfig(e,i,r).pipe(ln(({routes:l})=>{let u=i._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:h}=c,g=new Ws(f,d,Object.freeze(re({},this.urlTree.queryParams)),this.urlTree.fragment,pb(i),Ei(i),i.component??i._loadedComponent??null,i,mb(i)),y=Rf(g,o,this.paramsInheritanceStrategy);g.params=Object.freeze(y.params),g.data=Object.freeze(y.data);let{segmentGroup:m,slicedSegments:p}=hb(t,f,h,l);if(p.length===0&&m.hasChildren())return this.processChildren(u,l,m,g).pipe(qe(S=>new Vn(g,S)));if(l.length===0&&p.length===0)return Pe(new Vn(g,[]));let C=Ei(i)===s;return this.processSegment(u,l,m,p,C?ze:s,!0,g).pipe(qe(S=>new Vn(g,S instanceof Vn?[S]:[])))}))):aa(t)))}getChildConfig(e,t,i){return t.children?Pe({routes:t.children,injector:e}):t.loadChildren?t._loadedRoutes!==void 0?Pe({routes:t._loadedRoutes,injector:t._loadedInjector}):TN(e,t,i,this.urlSerializer).pipe(jt(r=>r?this.configLoader.loadChildren(e,t).pipe(Jt(s=>{t._loadedRoutes=s.routes,t._loadedInjector=s.injector})):IN(t))):Pe({routes:[],injector:e})}};function HN(n){n.sort((e,t)=>e.value.outlet===ze?-1:t.value.outlet===ze?1:e.value.outlet.localeCompare(t.value.outlet))}function zN(n){let e=n.value.routeConfig;return e&&e.path===""}function zb(n){let e=[],t=new Set;for(let i of n){if(!zN(i)){e.push(i);continue}let r=e.find(s=>i.value.routeConfig===s.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):e.push(i)}for(let i of t){let r=zb(i.children);e.push(new Vn(i.value,r))}return e.filter(i=>!t.has(i))}function pb(n){return n.data||{}}function mb(n){return n.resolve||{}}function GN(n,e,t,i,r,s){return jt(o=>BN(n,e,t,i,o.extractedUrl,r,s).pipe(qe(({state:a,tree:c})=>Je(re({},o),{targetSnapshot:a,urlAfterRedirects:c}))))}function jN(n,e){return jt(t=>{let{targetSnapshot:i,guards:{canActivateChecks:r}}=t;if(!r.length)return Pe(t);let s=new Set(r.map(c=>c.route)),o=new Set;for(let c of s)if(!o.has(c))for(let l of Gb(c))o.add(l);let a=0;return Ot(o).pipe(Ir(c=>s.has(c)?WN(c,i,n,e):(c.data=Rf(c,c.parent,n).resolve,Pe(void 0))),Jt(()=>a++),Fo(1),jt(c=>a===o.size?Pe(t):wn))})}function Gb(n){let e=n.children.map(t=>Gb(t)).flat();return[n,...e]}function WN(n,e,t,i){let r=n.routeConfig,s=n._resolve;return r?.title!==void 0&&!Ob(r)&&(s[vl]=r.title),oc(()=>(n.data=Rf(n,n.parent,t).resolve,$N(s,n,e,i).pipe(qe(o=>(n._resolvedData=o,n.data=re(re({},n.data),o),null)))))}function $N(n,e,t,i){let r=qv(n);if(r.length===0)return Pe({});let s={};return Ot(r).pipe(jt(o=>qN(n[o],e,t,i).pipe(tr(),Jt(a=>{if(a instanceof ha)throw Nf(new qs,a);s[o]=a}))),Fo(1),qe(()=>s),Ar(o=>Bb(o)?wn:Po(o)))}function qN(n,e,t,i){let r=ma(e)??i,s=va(n,r),o=s.resolve?s.resolve(e,t):rn(r,()=>s(e,t));return hr(o)}function Wv(n){return ln(e=>{let t=n(e);return t?Ot(t).pipe(qe(()=>e)):Pe(e)})}var ly=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(s=>s.outlet===ze);return i}getResolvedTitleForRoute(t){return t.data[vl]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>Y(jb),providedIn:"root"})}return n})(),jb=(()=>{class n extends ly{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)(Te(cb))};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ya=new pe("",{providedIn:"root",factory:()=>({})}),El=new pe(""),Wb=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=Y(gv);loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Pe(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=hr(rn(t,()=>i.loadComponent())).pipe(qe(qb),ln(Xb),Jt(o=>{this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=o}),xs(()=>{this.componentLoaders.delete(i)})),s=new Ro(r,()=>new St).pipe(Io());return this.componentLoaders.set(i,s),s}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Pe({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let s=$b(i,this.compiler,t,this.onLoadEndListener).pipe(xs(()=>{this.childrenLoaders.delete(i)})),o=new Ro(s,()=>new St).pipe(Io());return this.childrenLoaders.set(i,o),o}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function $b(n,e,t,i){return hr(rn(t,()=>n.loadChildren())).pipe(qe(qb),ln(Xb),jt(r=>r instanceof Hd||Array.isArray(r)?Pe(r):Ot(e.compileModuleAsync(r))),qe(r=>{i&&i(n);let s,o,a=!1;return Array.isArray(r)?(o=r,a=!0):(s=r.create(t).injector,o=s.get(El,[],{optional:!0,self:!0}).flat()),{routes:o.map(cy),injector:s}}))}function XN(n){return n&&typeof n=="object"&&"default"in n}function qb(n){return XN(n)?n.default:n}function Xb(n){return Pe(n)}var kf=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>Y(YN),providedIn:"root"})}return n})(),YN=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Yb=new pe("");var Zb=new pe(""),Jb=(()=>{class n{currentNavigation=si(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=null;events=new St;transitionAbortWithErrorSubject=new St;configLoader=Y(Wb);environmentInjector=Y(Ht);destroyRef=Y(or);urlSerializer=Y(yl);rootContexts=Y(ga);location=Y(ur);inputBindingEnabled=Y(Ff,{optional:!0})!==null;titleStrategy=Y(ly);options=Y(ya,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=Y(kf);createViewTransition=Y(Yb,{optional:!0});navigationErrorHandler=Y(Zb,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>Pe(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new bf(r)),i=r=>this.events.next(new Sf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;sn(()=>{this.transitions?.next(Je(re({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,abortController:new AbortController,id:i}))})}setupNavigations(t){return this.transitions=new tn(null),this.transitions.pipe(Tn(i=>i!==null),ln(i=>{let r=!1;return Pe(i).pipe(ln(s=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",Mn.SupersededByNewNavigation),wn;this.currentTransition=i,this.currentNavigation.set({id:s.id,initialUrl:s.rawUrl,extractedUrl:s.extractedUrl,targetBrowserUrl:typeof s.extras.browserUrl=="string"?this.urlSerializer.parse(s.extras.browserUrl):s.extras.browserUrl,trigger:s.source,extras:s.extras,previousNavigation:this.lastSuccessfulNavigation?Je(re({},this.lastSuccessfulNavigation),{previousNavigation:null}):null,abort:()=>s.abortController.abort()});let o=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),a=s.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!o&&a!=="reload")return this.events.next(new fr(s.id,this.urlSerializer.serialize(s.rawUrl),"",ll.IgnoredSameUrlNavigation)),s.resolve(!1),wn;if(this.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))return Pe(s).pipe(ln(c=>(this.events.next(new Xs(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?wn:Promise.resolve(c))),GN(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy),Jt(c=>{i.targetSnapshot=c.targetSnapshot,i.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation.update(u=>(u.finalUrl=c.urlAfterRedirects,u));let l=new ul(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(l)}));if(o&&this.urlHandlingStrategy.shouldProcessUrl(s.currentRawUrl)){let{id:c,extractedUrl:l,source:u,restoredState:d,extras:f}=s,h=new Xs(c,this.urlSerializer.serialize(l),u,d);this.events.next(h);let g=Nb(this.rootComponentType).snapshot;return this.currentTransition=i=Je(re({},s),{targetSnapshot:g,urlAfterRedirects:l,extras:Je(re({},f),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(y=>(y.finalUrl=l,y)),Pe(i)}else return this.events.next(new fr(s.id,this.urlSerializer.serialize(s.extractedUrl),"",ll.IgnoredByUrlHandlingStrategy)),s.resolve(!1),wn}),Jt(s=>{let o=new _f(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);this.events.next(o)}),qe(s=>(this.currentTransition=i=Je(re({},s),{guards:cN(s.targetSnapshot,s.currentSnapshot,this.rootContexts)}),i)),_N(this.environmentInjector,s=>this.events.next(s)),Jt(s=>{if(i.guardsResult=s.guardsResult,s.guardsResult&&typeof s.guardsResult!="boolean")throw Nf(this.urlSerializer,s.guardsResult);let o=new xf(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);this.events.next(o)}),Tn(s=>s.guardsResult?!0:(this.cancelNavigationTransition(s,"",Mn.GuardRejected),!1)),Wv(s=>{if(s.guards.canActivateChecks.length!==0)return Pe(s).pipe(Jt(o=>{let a=new Ef(o.id,this.urlSerializer.serialize(o.extractedUrl),this.urlSerializer.serialize(o.urlAfterRedirects),o.targetSnapshot);this.events.next(a)}),ln(o=>{let a=!1;return Pe(o).pipe(jN(this.paramsInheritanceStrategy,this.environmentInjector),Jt({next:()=>a=!0,complete:()=>{a||this.cancelNavigationTransition(o,"",Mn.NoDataFromResolver)}}))}),Jt(o=>{let a=new Mf(o.id,this.urlSerializer.serialize(o.extractedUrl),this.urlSerializer.serialize(o.urlAfterRedirects),o.targetSnapshot);this.events.next(a)}))}),Wv(s=>{let o=a=>{let c=[];if(a.routeConfig?.loadComponent){let l=ma(a)??this.environmentInjector;c.push(this.configLoader.loadComponent(l,a.routeConfig).pipe(Jt(u=>{a.component=u}),qe(()=>{})))}for(let l of a.children)c.push(...o(l));return c};return Hu(o(s.targetSnapshot.root)).pipe(Rr(null),er(1))}),Wv(()=>this.afterPreactivation()),ln(()=>{let{currentSnapshot:s,targetSnapshot:o}=i,a=this.createViewTransition?.(this.environmentInjector,s.root,o.root);return a?Ot(a).pipe(qe(()=>i)):Pe(i)}),qe(s=>{let o=iN(t.routeReuseStrategy,s.targetSnapshot,s.currentRouterState);return this.currentTransition=i=Je(re({},s),{targetRouterState:o}),this.currentNavigation.update(a=>(a.targetRouterState=o,a)),i}),Jt(()=>{this.events.next(new dl)}),aN(this.rootContexts,t.routeReuseStrategy,s=>this.events.next(s),this.inputBindingEnabled),er(1),Gu(new tt(s=>{let o=i.abortController.signal,a=()=>s.next();return o.addEventListener("abort",a),()=>o.removeEventListener("abort",a)}).pipe(Tn(()=>!r&&!i.targetRouterState),Jt(()=>{this.cancelNavigationTransition(i,i.abortController.signal.reason+"",Mn.Aborted)}))),Jt({next:s=>{r=!0,this.lastSuccessfulNavigation=sn(this.currentNavigation),this.events.next(new zi(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects))),this.titleStrategy?.updateTitle(s.targetRouterState.snapshot),s.resolve(!0)},complete:()=>{r=!0}}),Gu(this.transitionAbortWithErrorSubject.pipe(Jt(s=>{throw s}))),xs(()=>{r||this.cancelNavigationTransition(i,"",Mn.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Ar(s=>{if(this.destroyed)return i.resolve(!1),wn;if(r=!0,Ub(s))this.events.next(new Vi(i.id,this.urlSerializer.serialize(i.extractedUrl),s.message,s.cancellationCode)),oN(s)?this.events.next(new fa(s.url,s.navigationBehaviorOptions)):i.resolve(!1);else{let o=new da(i.id,this.urlSerializer.serialize(i.extractedUrl),s,i.targetSnapshot??void 0);try{let a=rn(this.environmentInjector,()=>this.navigationErrorHandler?.(o));if(a instanceof ha){let{message:c,cancellationCode:l}=Nf(this.urlSerializer,a);this.events.next(new Vi(i.id,this.urlSerializer.serialize(i.extractedUrl),c,l)),this.events.next(new fa(a.redirectTo,a.navigationBehaviorOptions))}else throw this.events.next(o),s}catch(a){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(a)}}return wn}))}))}cancelNavigationTransition(t,i,r){let s=new Vi(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(s),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=sn(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ZN(n){return n!==ol}var Kb=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>Y(JN),providedIn:"root"})}return n})(),Of=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}},JN=(()=>{class n extends Of{static \u0275fac=(()=>{let t;return function(r){return(t||(t=Xo(n)))(r||n)}})();static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Qb=(()=>{class n{urlSerializer=Y(yl);options=Y(ya,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=Y(ur);urlHandlingStrategy=Y(kf);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new Hi;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let s=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,o=r??s;return o instanceof Hi?this.urlSerializer.serialize(o):o}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=Nb(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:()=>Y(KN),providedIn:"root"})}return n})(),KN=(()=>{class n extends Qb{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate")})})}handleRouterEvent(t,i){t instanceof Xs?this.updateStateMemento():t instanceof fr?this.commitTransition(i):t instanceof ul?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof dl?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof Vi&&t.code!==Mn.SupersededByNewNavigation&&t.code!==Mn.Redirect?this.restoreHistory(i):t instanceof da?this.restoreHistory(i,!0):t instanceof zi&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,{extras:i,id:r}){let{replaceUrl:s,state:o}=i;if(this.location.isCurrentPathEqualTo(t)||s){let a=this.browserPageId,c=re(re({},o),this.generateNgRouterState(r,a));this.location.replaceState(t,"",c)}else{let a=re(re({},o),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(t,"",a)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,s=this.currentPageId-r;s!==0?this.location.historyGo(s):this.getCurrentUrlTree()===t.finalUrl&&s===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:i}:{navigationId:t}}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Xo(n)))(r||n)}})();static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function uy(n,e){n.events.pipe(Tn(t=>t instanceof zi||t instanceof Vi||t instanceof da||t instanceof fr),qe(t=>t instanceof zi||t instanceof fr?0:(t instanceof Vi?t.code===Mn.Redirect||t.code===Mn.SupersededByNewNavigation:!1)?2:1),Tn(t=>t!==2),er(1)).subscribe(()=>{e()})}var QN={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},eP={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},pr=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=Y(uv);stateManager=Y(Qb);options=Y(ya,{optional:!0})||{};pendingTasks=Y(Pi);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=Y(Jb);urlSerializer=Y(yl);location=Y(ur);urlHandlingStrategy=Y(kf);injector=Y(Ht);_events=new St;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=Y(Kb);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=Y(El,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!Y(Ff,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{this.console.warn(t)}}),this.subscribeToNavigationEvents()}eventsSubscription=new Pt;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,s=sn(this.navigationTransitions.currentNavigation);if(r!==null&&s!==null){if(this.stateManager.handleRouterEvent(i,s),i instanceof Vi&&i.code!==Mn.Redirect&&i.code!==Mn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof zi)this.navigated=!0;else if(i instanceof fa){let o=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=re({browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||ZN(r.source)},o);this.scheduleNavigation(a,ol,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}Q1(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),ol,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r)=>{this.navigateToSyncWithBrowser(t,r,i)})}navigateToSyncWithBrowser(t,i,r){let s={replaceUrl:!0},o=r?.navigationId?r:null;if(r){let c=re({},r);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(s.state=c)}let a=this.parseUrl(t);this.scheduleNavigation(a,i,o,s).catch(c=>{this.disposed||this.injector.get(_n)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return sn(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(cy),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:s,fragment:o,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:o,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=re(re({},this.currentUrlTree.queryParams),s);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=s||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=Db(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return Ab(d,t,u,l??null)}navigateByUrl(t,i={skipLocationChange:!1}){let r=Kr(t)?t:this.parseUrl(t),s=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(s,ol,null,i)}navigate(t,i={skipLocationChange:!1}){return tP(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(Cs(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=re({},QN):i===!1?r=re({},eP):r=i,Kr(t))return lb(this.currentUrlTree,t,r);let s=this.parseUrl(t);return lb(this.currentUrlTree,s,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,s])=>(s!=null&&(i[r]=s),i),{})}scheduleNavigation(t,i,r,s,o){if(this.disposed)return Promise.resolve(!1);let a,c,l;o?(a=o.resolve,c=o.reject,l=o.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return uy(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:s,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(d=>Promise.reject(d))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function tP(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new de(4008,!1)}var Uf=(()=>{class n{router;route;tabIndexAttribute;renderer;el;locationStrategy;reactiveHref=si(null);get href(){return sn(this.reactiveHref)}set href(t){this.reactiveHref.set(t)}target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new St;applicationErrorHandler=Y(_n);options=Y(ya,{optional:!0});constructor(t,i,r,s,o,a){this.router=t,this.route=i,this.tabIndexAttribute=r,this.renderer=s,this.el=o,this.locationStrategy=a,this.reactiveHref.set(Y(new Xd("href"),{optional:!0}));let c=o.nativeElement.tagName?.toLowerCase();this.isAnchorElement=c==="a"||c==="area"||!!(typeof customElements=="object"&&customElements.get(c)?.observedAttributes?.includes?.("href")),this.isAnchorElement?this.setTabIndexIfNotOnNativeEl("0"):this.subscribeToNavigationEventsIfNecessary()}subscribeToNavigationEventsIfNecessary(){if(this.subscription!==void 0||!this.isAnchorElement)return;let t=this.preserveFragment,i=r=>r==="merge"||r==="preserve";t||=i(this.queryParamsHandling),t||=!this.queryParamsHandling&&!i(this.options?.defaultQueryParamsHandling),t&&(this.subscription=this.router.events.subscribe(r=>{r instanceof zi&&this.updateHref()}))}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(t){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",t)}ngOnChanges(t){this.isAnchorElement&&(this.updateHref(),this.subscribeToNavigationEventsIfNecessary()),this.onChanges.next(this)}routerLinkInput=null;set routerLink(t){t==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Kr(t)?this.routerLinkInput=t:this.routerLinkInput=Array.isArray(t)?t:[t],this.setTabIndexIfNotOnNativeEl("0"))}onClick(t,i,r,s,o){let a=this.urlTree;if(a===null||this.isAnchorElement&&(t!==0||i||r||s||o||typeof this.target=="string"&&this.target!="_self"))return!0;let c={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,c)?.catch(l=>{this.applicationErrorHandler(l)}),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let t=this.urlTree;this.reactiveHref.set(t!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(t))??"":null)}applyAttributeValue(t,i){let r=this.renderer,s=this.el.nativeElement;i!==null?r.setAttribute(s,t,i):r.removeAttribute(s,t)}get urlTree(){return this.routerLinkInput===null?null:Kr(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(i){return new(i||n)(He(pr),He(zn),Uc("tabindex"),He(Bs),He(gi),He(ki))};static \u0275dir=Dn({type:n,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(i,r){i&1&&xn("click",function(o){return r.onClick(o.button,o.ctrlKey,o.shiftKey,o.altKey,o.metaKey)}),i&2&&zc("href",r.reactiveHref(),jg)("target",r.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",ta],skipLocationChange:[2,"skipLocationChange","skipLocationChange",ta],replaceUrl:[2,"replaceUrl","replaceUrl",ta],routerLink:"routerLink"},features:[Gr]})}return n})();var iP=new pe("");function dy(n,...e){return sr([{provide:El,multi:!0,useValue:n},[],{provide:zn,useFactory:rP,deps:[pr]},{provide:zd,multi:!0,useFactory:oP},e.map(t=>t.\u0275providers)])}function rP(n){return n.routerState.root}function sP(n,e){return{\u0275kind:n,\u0275providers:e}}function oP(){let n=Y(di);return e=>{let t=n.get(Wr);if(e!==t.components[0])return;let i=n.get(pr),r=n.get(aP);n.get(cP)===1&&i.initialNavigation(),n.get(lP,null,{optional:!0})?.setUpPreloading(),n.get(iP,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var aP=new pe("",{factory:()=>new St}),cP=new pe("",{providedIn:"root",factory:()=>1});var lP=new pe("");function fy(){return sP(6,[{provide:ki,useClass:Dv}])}var vS=0,jy=1,yS=2;var Wy=1,_S=2,$i=3,Er=0,bn=1,qi=2,Sr=0,to=1,$y=2,qy=3,Xy=4,xS=5,as=100,ES=101,MS=102,bS=103,SS=104,wS=200,CS=201,TS=202,DS=203,rh=204,sh=205,AS=206,IS=207,RS=208,NS=209,PS=210,OS=211,FS=212,LS=213,kS=214,Ch=0,Th=1,Dh=2,no=3,Ah=4,Ih=5,Rh=6,Nh=7,Yy=0,US=1,BS=2,wr=0,VS=1,HS=2,zS=3,GS=4,jS=5,WS=6,$S=7;var ky=300,co=301,lo=302,Ph=303,Oh=304,jl=306,oh=1e3,os=1001,ah=1002,ci=1003,qS=1004;var Wl=1005;var Rn=1006,Fh=1007;var fs=1008;var Xi=1009,Zy=1010,Jy=1011,Ba=1012,Lh=1013,hs=1014,Yi=1015,Va=1016,kh=1017,Uh=1018,Ha=1020,Ky=35902,Qy=35899,e_=1021,t_=1022,li=1023,Na=1026,za=1027,n_=1028,Bh=1029,i_=1030,Vh=1031;var Hh=1033,$l=33776,ql=33777,Xl=33778,Yl=33779,zh=35840,Gh=35841,jh=35842,Wh=35843,$h=36196,qh=37492,Xh=37496,Yh=37808,Zh=37809,Jh=37810,Kh=37811,Qh=37812,ep=37813,tp=37814,np=37815,ip=37816,rp=37817,sp=37818,op=37819,ap=37820,cp=37821,lp=36492,up=36494,dp=36495,fp=36283,hp=36284,pp=36285,mp=36286;var Tl=2300,ch=2301,ih=2302,Uy=2400,By=2401,Vy=2402;var XS=3200,YS=3201;var ZS=0,JS=1,Cr="",Wn="srgb",io="srgb-linear",Dl="linear",vt="srgb";var Qs=7680;var Hy=519,KS=512,QS=513,ew=514,r_=515,tw=516,nw=517,iw=518,rw=519,zy=35044;var s_="300 es",wi=2e3,Al=2001;var Mr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var py=Math.PI/180,lh=180/Math.PI;function Zl(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]+"-"+dn[e&255]+dn[e>>8&255]+"-"+dn[e>>16&15|64]+dn[e>>24&255]+"-"+dn[t&63|128]+dn[t>>8&255]+"-"+dn[t>>16&255]+dn[t>>24&255]+dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]).toLowerCase()}function st(n,e,t){return Math.max(e,Math.min(t,n))}function uP(n,e){return(n%e+e)%e}function my(n,e,t){return(1-t)*n+t*e}function Ml(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function An(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var lt=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},br=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],g=s[o+2],y=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=y;return}if(d!==y||c!==f||l!==h||u!==g){let m=1-a,p=c*f+l*h+u*g+d*y,C=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){let T=Math.sqrt(S),D=Math.atan2(T,p*C);m=Math.sin(m*D)/T,a=Math.sin(a*D)/T}let E=a*C;if(c=c*m+f*E,l=l*m+h*E,u=u*m+g*E,d=d*m+y*E,m===1-a){let T=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=T,l*=T,u*=T,d*=T}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let c=1-a*a;if(c<=Number.EPSILON){let h=1-t;return this._w=h*o+t*this._w,this._x=h*i+t*this._x,this._y=h*r+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(eS.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(eS.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gy.copy(this).projectOnVector(e),this.sub(gy)}reflect(e){return this.sub(gy.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gy=new k,eS=new br,je=class n{constructor(e,t,i,r,s,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],y=r[0],m=r[3],p=r[6],C=r[1],S=r[4],E=r[7],T=r[2],D=r[5],I=r[8];return s[0]=o*y+a*C+c*T,s[3]=o*m+a*S+c*D,s[6]=o*p+a*E+c*I,s[1]=l*y+u*C+d*T,s[4]=l*m+u*S+d*D,s[7]=l*p+u*E+d*I,s[2]=f*y+h*C+g*T,s[5]=f*m+h*S+g*D,s[8]=f*p+h*E+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=d*y,e[1]=(r*l-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=f*y,e[4]=(u*t-r*c)*y,e[5]=(r*s-a*t)*y,e[6]=h*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(vy.makeScale(e,t)),this}rotate(e){return this.premultiply(vy.makeRotation(-e)),this}translate(e,t){return this.premultiply(vy.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vy=new je;function o_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Il(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function sw(){let n=Il("canvas");return n.style.display="block",n}var tS={};function Pa(n){n in tS||(tS[n]=!0,console.warn(n))}function ow(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var nS=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),iS=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dP(){let n={enabled:!0,workingColorSpace:io,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===vt&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(r.r=Ra(r.r),r.g=Ra(r.g),r.b=Ra(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Cr?Dl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Pa("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Pa("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[io]:{primaries:e,whitePoint:i,transfer:Dl,toXYZ:nS,fromXYZ:iS,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:e,whitePoint:i,transfer:vt,toXYZ:nS,fromXYZ:iS,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),n}var ct=dP();function xr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ra(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var _a,uh=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{_a===void 0&&(_a=Il("canvas")),_a.width=e.width,_a.height=e.height;let r=_a.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=_a}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Il("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=xr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xr(t[i]/255)*255):t[i]=xr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},fP=0,Oa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fP++}),this.uuid=Zl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(yy(r[o].image)):s.push(yy(r[o]))}else s=yy(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function yy(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?uh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var hP=0,_y=new k,Tr=(()=>{class n extends Mr{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=os,s=os,o=Rn,a=fs,c=li,l=Xi,u=n.DEFAULT_ANISOTROPY,d=Cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hP++}),this.uuid=Zl(),this.name="",this.source=new Oa(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(_y).x}get height(){return this.source.getSize(_y).y}get depth(){return this.source.getSize(_y).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ky)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case oh:t.x=t.x-Math.floor(t.x);break;case os:t.x=t.x<0?0:1;break;case ah:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case oh:t.y=t.y-Math.floor(t.y);break;case os:t.y=t.y<0?0:1;break;case ah:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=ky,n.DEFAULT_ANISOTROPY=1,n})(),Ut=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,E=(h+1)/2,T=(p+1)/2,D=(u+f)/4,I=(d+y)/4,F=(g+m)/4;return S>E&&S>T?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=D/i,s=I/i):E>T?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=D/r,s=F/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=I/s,r=F/s),this.set(i,r,s,t),this}let C=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(C)<.001&&(C=1),this.x=(m-g)/C,this.y=(d-y)/C,this.z=(f-u)/C,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},dh=class extends Mr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new Tr(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Oa(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wi=class extends dh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Rl=class extends Tr{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ci,this.minFilter=ci,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var fh=class extends Tr{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ci,this.minFilter=ci,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cs=class{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mi):Mi.fromBufferAttribute(s,o),Mi.applyMatrix4(e.matrixWorld),this.expandByPoint(Mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bf.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bf.copy(i.boundingBox)),Bf.applyMatrix4(e.matrixWorld),this.union(Bf)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mi),Mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bl),Vf.subVectors(this.max,bl),xa.subVectors(e.a,bl),Ea.subVectors(e.b,bl),Ma.subVectors(e.c,bl),Qr.subVectors(Ea,xa),es.subVectors(Ma,Ea),Ys.subVectors(xa,Ma);let t=[0,-Qr.z,Qr.y,0,-es.z,es.y,0,-Ys.z,Ys.y,Qr.z,0,-Qr.x,es.z,0,-es.x,Ys.z,0,-Ys.x,-Qr.y,Qr.x,0,-es.y,es.x,0,-Ys.y,Ys.x,0];return!xy(t,xa,Ea,Ma,Vf)||(t=[1,0,0,0,1,0,0,0,1],!xy(t,xa,Ea,Ma,Vf))?!1:(Hf.crossVectors(Qr,es),t=[Hf.x,Hf.y,Hf.z],xy(t,xa,Ea,Ma,Vf))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},mr=[new k,new k,new k,new k,new k,new k,new k,new k],Mi=new k,Bf=new cs,xa=new k,Ea=new k,Ma=new k,Qr=new k,es=new k,Ys=new k,bl=new k,Vf=new k,Hf=new k,Zs=new k;function xy(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Zs.fromArray(n,s);let a=r.x*Math.abs(Zs.x)+r.y*Math.abs(Zs.y)+r.z*Math.abs(Zs.z),c=e.dot(Zs),l=t.dot(Zs),u=i.dot(Zs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var pP=new cs,Sl=new k,Ey=new k,Fa=class{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):pP.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sl.subVectors(e,this.center);let t=Sl.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Sl,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ey.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sl.copy(e.center).add(Ey)),this.expandByPoint(Sl.copy(e.center).sub(Ey))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},gr=new k,My=new k,zf=new k,ts=new k,by=new k,Gf=new k,Sy=new k,hh=class{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=gr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gr.copy(this.origin).addScaledVector(this.direction,t),gr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){My.copy(e).add(t).multiplyScalar(.5),zf.copy(t).sub(e).normalize(),ts.copy(this.origin).sub(My);let s=e.distanceTo(t)*.5,o=-this.direction.dot(zf),a=ts.dot(this.direction),c=-ts.dot(zf),l=ts.lengthSq(),u=Math.abs(1-o*o),d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=s*u,d>=0)if(f>=-g)if(f<=g){let y=1/u;d*=y,f*=y,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(My).addScaledVector(zf,f),h}intersectSphere(e,t){gr.subVectors(e.center,this.origin);let i=gr.dot(this.direction),r=gr.dot(gr)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,gr)!==null}intersectTriangle(e,t,i,r,s){by.subVectors(t,e),Gf.subVectors(i,e),Sy.crossVectors(by,Gf);let o=this.direction.dot(Sy),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ts.subVectors(this.origin,e);let c=a*this.direction.dot(Gf.crossVectors(ts,Gf));if(c<0)return null;let l=a*this.direction.dot(by.cross(ts));if(l<0||c+l>o)return null;let u=-a*ts.dot(Sy);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qt=class n{constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,g,y,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,y,m)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/ba.setFromMatrixColumn(e,0).length(),s=1/ba.setFromMatrixColumn(e,1).length(),o=1/ba.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,g=a*u,y=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,y=l*d;t[0]=f+y*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,y=l*d;t[0]=f-y*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,g=a*u,y=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+y,t[1]=c*d,t[5]=y*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=y-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-y*d}else if(e.order==="XZY"){let f=o*c,h=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+y,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mP,e,gP)}lookAt(e,t,i){let r=this.elements;return Gn.subVectors(e,t),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),ns.crossVectors(i,Gn),ns.lengthSq()===0&&(Math.abs(i.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),ns.crossVectors(i,Gn)),ns.normalize(),jf.crossVectors(Gn,ns),r[0]=ns.x,r[4]=jf.x,r[8]=Gn.x,r[1]=ns.y,r[5]=jf.y,r[9]=Gn.y,r[2]=ns.z,r[6]=jf.z,r[10]=Gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],y=i[6],m=i[10],p=i[14],C=i[3],S=i[7],E=i[11],T=i[15],D=r[0],I=r[4],F=r[8],M=r[12],x=r[1],R=r[5],B=r[9],z=r[13],X=r[2],j=r[6],$=r[10],J=r[14],V=r[3],ae=r[7],fe=r[11],De=r[15];return s[0]=o*D+a*x+c*X+l*V,s[4]=o*I+a*R+c*j+l*ae,s[8]=o*F+a*B+c*$+l*fe,s[12]=o*M+a*z+c*J+l*De,s[1]=u*D+d*x+f*X+h*V,s[5]=u*I+d*R+f*j+h*ae,s[9]=u*F+d*B+f*$+h*fe,s[13]=u*M+d*z+f*J+h*De,s[2]=g*D+y*x+m*X+p*V,s[6]=g*I+y*R+m*j+p*ae,s[10]=g*F+y*B+m*$+p*fe,s[14]=g*M+y*z+m*J+p*De,s[3]=C*D+S*x+E*X+T*V,s[7]=C*I+S*R+E*j+T*ae,s[11]=C*F+S*B+E*$+T*fe,s[15]=C*M+S*z+E*J+T*De,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+s*c*d-r*l*d-s*a*f+i*l*f+r*a*h-i*c*h)+y*(+t*c*h-t*l*f+s*o*f-r*o*h+r*l*u-s*c*u)+m*(+t*l*d-t*a*h-s*o*d+i*o*h+s*a*u-i*l*u)+p*(-r*a*u-t*c*d+t*a*f+r*o*d-i*o*f+i*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],y=e[13],m=e[14],p=e[15],C=d*m*l-y*f*l+y*c*h-a*m*h-d*c*p+a*f*p,S=g*f*l-u*m*l-g*c*h+o*m*h+u*c*p-o*f*p,E=u*y*l-g*d*l+g*a*h-o*y*h-u*a*p+o*d*p,T=g*d*c-u*y*c-g*a*f+o*y*f+u*a*m-o*d*m,D=t*C+i*S+r*E+s*T;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/D;return e[0]=C*I,e[1]=(y*f*s-d*m*s-y*r*h+i*m*h+d*r*p-i*f*p)*I,e[2]=(a*m*s-y*c*s+y*r*l-i*m*l-a*r*p+i*c*p)*I,e[3]=(d*c*s-a*f*s-d*r*l+i*f*l+a*r*h-i*c*h)*I,e[4]=S*I,e[5]=(u*m*s-g*f*s+g*r*h-t*m*h-u*r*p+t*f*p)*I,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*p-t*c*p)*I,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*h+t*c*h)*I,e[8]=E*I,e[9]=(g*d*s-u*y*s-g*i*h+t*y*h+u*i*p-t*d*p)*I,e[10]=(o*y*s-g*a*s+g*i*l-t*y*l-o*i*p+t*a*p)*I,e[11]=(u*a*s-o*d*s-u*i*l+t*d*l+o*i*h-t*a*h)*I,e[12]=T*I,e[13]=(u*y*r-g*d*r+g*i*f-t*y*f-u*i*m+t*d*m)*I,e[14]=(g*a*r-o*y*r-g*i*c+t*y*c+o*i*m-t*a*m)*I,e[15]=(o*d*r-u*a*r+u*i*c-t*d*c-o*i*f+t*a*f)*I,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,g=s*d,y=o*u,m=o*d,p=a*d,C=c*l,S=c*u,E=c*d,T=i.x,D=i.y,I=i.z;return r[0]=(1-(y+p))*T,r[1]=(h+E)*T,r[2]=(g-S)*T,r[3]=0,r[4]=(h-E)*D,r[5]=(1-(f+p))*D,r[6]=(m+C)*D,r[7]=0,r[8]=(g+S)*I,r[9]=(m-C)*I,r[10]=(1-(f+y))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=ba.set(r[0],r[1],r[2]).length(),o=ba.set(r[4],r[5],r[6]).length(),a=ba.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],bi.copy(this);let l=1/s,u=1/o,d=1/a;return bi.elements[0]*=l,bi.elements[1]*=l,bi.elements[2]*=l,bi.elements[4]*=u,bi.elements[5]*=u,bi.elements[6]*=u,bi.elements[8]*=d,bi.elements[9]*=d,bi.elements[10]*=d,t.setFromRotationMatrix(bi),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=wi,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,y;if(c)g=s/(o-s),y=o*s/(o-s);else if(a===wi)g=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Al)g=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=wi,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,y;if(c)g=1/(o-s),y=o/(o-s);else if(a===wi)g=-2/(o-s),y=-(o+s)/(o-s);else if(a===Al)g=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ba=new k,bi=new qt,mP=new k(0,0,0),gP=new k(1,1,1),ns=new k,jf=new k,Gn=new k,rS=new qt,sS=new br,ro=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(i){case"XYZ":this._y=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return rS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rS,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return sS.setFromEuler(this),this.setFromQuaternion(sS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Nl=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},vP=0,oS=new k,Sa=new br,vr=new qt,Wf=new k,wl=new k,yP=new k,_P=new br,aS=new k(1,0,0),cS=new k(0,1,0),lS=new k(0,0,1),uS={type:"added"},xP={type:"removed"},wa={type:"childadded",child:null},wy={type:"childremoved",child:null},uo=(()=>{class n extends Mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vP++}),this.uuid=Zl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new k,i=new ro,r=new br,s=new k(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qt},normalMatrix:{value:new je}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Sa.setFromAxisAngle(t,i),this.quaternion.multiply(Sa),this}rotateOnWorldAxis(t,i){return Sa.setFromAxisAngle(t,i),this.quaternion.premultiply(Sa),this}rotateX(t){return this.rotateOnAxis(aS,t)}rotateY(t){return this.rotateOnAxis(cS,t)}rotateZ(t){return this.rotateOnAxis(lS,t)}translateOnAxis(t,i){return oS.copy(t).applyQuaternion(this.quaternion),this.position.add(oS.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(aS,t)}translateY(t){return this.translateOnAxis(cS,t)}translateZ(t){return this.translateOnAxis(lS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vr.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Wf.copy(t):Wf.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),wl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vr.lookAt(wl,Wf,this.up):vr.lookAt(Wf,wl,this.up),this.quaternion.setFromRotationMatrix(vr),s&&(vr.extractRotation(s.matrixWorld),Sa.setFromRotationMatrix(vr),this.quaternion.premultiply(Sa.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(uS),wa.child=t,this.dispatchEvent(wa),wa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(xP),wy.child=t,this.dispatchEvent(wy),wy.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vr.multiply(t.parent.matrixWorld)),t.applyMatrix4(vr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(uS),wa.child=t,this.dispatchEvent(wa),wa.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wl,t,yP),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wl,_P,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>Je(re({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>re({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),y=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),y.length>0&&(r.nodes=y)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new k(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),Si=new k,yr=new k,Cy=new k,_r=new k,Ca=new k,Ta=new k,dS=new k,Ty=new k,Dy=new k,Ay=new k,Iy=new Ut,Ry=new Ut,Ny=new Ut,ss=class n{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Si.subVectors(e,t),r.cross(Si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Si.subVectors(r,t),yr.subVectors(i,t),Cy.subVectors(e,t);let o=Si.dot(Si),a=Si.dot(yr),c=Si.dot(Cy),l=yr.dot(yr),u=yr.dot(Cy),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,_r)===null?!1:_r.x>=0&&_r.y>=0&&_r.x+_r.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,_r)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,_r.x),c.addScaledVector(o,_r.y),c.addScaledVector(a,_r.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return Iy.setScalar(0),Ry.setScalar(0),Ny.setScalar(0),Iy.fromBufferAttribute(e,t),Ry.fromBufferAttribute(e,i),Ny.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Iy,s.x),o.addScaledVector(Ry,s.y),o.addScaledVector(Ny,s.z),o}static isFrontFacing(e,t,i,r){return Si.subVectors(i,t),yr.subVectors(e,t),Si.cross(yr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Si.subVectors(this.c,this.b),yr.subVectors(this.a,this.b),Si.cross(yr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Ca.subVectors(r,i),Ta.subVectors(s,i),Ty.subVectors(e,i);let c=Ca.dot(Ty),l=Ta.dot(Ty);if(c<=0&&l<=0)return t.copy(i);Dy.subVectors(e,r);let u=Ca.dot(Dy),d=Ta.dot(Dy);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Ca,o);Ay.subVectors(e,s);let h=Ca.dot(Ay),g=Ta.dot(Ay);if(g>=0&&h<=g)return t.copy(s);let y=h*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Ta,a);let m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return dS.subVectors(s,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(dS,a);let p=1/(m+y+f);return o=y*p,a=f*p,t.copy(i).addScaledVector(Ca,o).addScaledVector(Ta,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},aw={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},$f={h:0,s:0,l:0};function Py(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var ft=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ct.workingColorSpace){return this.r=e,this.g=t,this.b=i,ct.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ct.workingColorSpace){if(e=uP(e,1),t=st(t,0,1),i=st(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Py(o,s,e+1/3),this.g=Py(o,s,e),this.b=Py(o,s,e-1/3)}return ct.colorSpaceToWorking(this,r),this}setStyle(e,t=Wn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wn){let i=aw[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=Ra(e.r),this.g=Ra(e.g),this.b=Ra(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wn){return ct.workingToColorSpace(fn.copy(this),e),Math.round(st(fn.r*255,0,255))*65536+Math.round(st(fn.g*255,0,255))*256+Math.round(st(fn.b*255,0,255))}getHexString(e=Wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(fn.copy(this),t);let i=fn.r,r=fn.g,s=fn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(fn.copy(this),t),e.r=fn.r,e.g=fn.g,e.b=fn.b,e}getStyle(e=Wn){ct.workingToColorSpace(fn.copy(this),e);let t=fn.r,i=fn.g,r=fn.b;return e!==Wn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(is),e.getHSL($f);let i=my(is.h,$f.h,t),r=my(is.s,$f.s,t),s=my(is.l,$f.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new ft;ft.NAMES=aw;var EP=0,so=class extends Mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:EP++}),this.uuid=Zl(),this.name="",this.type="Material",this.blending=to,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rh,this.blendDst=sh,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=no,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hy,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qs,this.stencilZFail=Qs,this.stencilZPass=Qs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==to&&(i.blending=this.blending),this.side!==Er&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rh&&(i.blendSrc=this.blendSrc),this.blendDst!==sh&&(i.blendDst=this.blendDst),this.blendEquation!==as&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==no&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hy&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Pl=class extends so{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ro,this.combine=Yy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Gt=new k,qf=new lt,MP=0,$n=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:MP++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=zy,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)qf.fromBufferAttribute(this,t),qf.applyMatrix3(e),this.setXY(t,qf.x,qf.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ml(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=An(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ml(t,this.array)),t}setX(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ml(t,this.array)),t}setY(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ml(t,this.array)),t}setZ(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ml(t,this.array)),t}setW(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array),s=An(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zy&&(e.usage=this.usage),e}};var Ol=class extends $n{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Fl=class extends $n{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var ji=class extends $n{constructor(e,t,i){super(new Float32Array(e),t,i)}},bP=0,ai=new qt,Oy=new uo,Da=new k,jn=new cs,Cl=new cs,en=new k,ls=class n extends Mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bP++}),this.uuid=Zl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(o_(e)?Fl:Ol)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ai.makeRotationFromQuaternion(e),this.applyMatrix4(ai),this}rotateX(e){return ai.makeRotationX(e),this.applyMatrix4(ai),this}rotateY(e){return ai.makeRotationY(e),this.applyMatrix4(ai),this}rotateZ(e){return ai.makeRotationZ(e),this.applyMatrix4(ai),this}translate(e,t,i){return ai.makeTranslation(e,t,i),this.applyMatrix4(ai),this}scale(e,t,i){return ai.makeScale(e,t,i),this.applyMatrix4(ai),this}lookAt(e){return Oy.lookAt(e),Oy.updateMatrix(),this.applyMatrix4(Oy.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Da).negate(),this.translate(Da.x,Da.y,Da.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ji(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];jn.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){let i=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Cl.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(jn.min,Cl.min),jn.expandByPoint(en),en.addVectors(jn.max,Cl.max),jn.expandByPoint(en)):(jn.expandByPoint(Cl.min),jn.expandByPoint(Cl.max))}jn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)en.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(en));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)en.fromBufferAttribute(a,l),c&&(Da.fromBufferAttribute(e,l),en.add(Da)),r=Math.max(r,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $n(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let F=0;F<i.count;F++)a[F]=new k,c[F]=new k;let l=new k,u=new k,d=new k,f=new lt,h=new lt,g=new lt,y=new k,m=new k;function p(F,M,x){l.fromBufferAttribute(i,F),u.fromBufferAttribute(i,M),d.fromBufferAttribute(i,x),f.fromBufferAttribute(s,F),h.fromBufferAttribute(s,M),g.fromBufferAttribute(s,x),u.sub(l),d.sub(l),h.sub(f),g.sub(f);let R=1/(h.x*g.y-g.x*h.y);isFinite(R)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(R),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(R),a[F].add(y),a[M].add(y),a[x].add(y),c[F].add(m),c[M].add(m),c[x].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let F=0,M=C.length;F<M;++F){let x=C[F],R=x.start,B=x.count;for(let z=R,X=R+B;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let S=new k,E=new k,T=new k,D=new k;function I(F){T.fromBufferAttribute(r,F),D.copy(T);let M=a[F];S.copy(M),S.sub(T.multiplyScalar(T.dot(M))).normalize(),E.crossVectors(D,M);let R=E.dot(c[F])<0?-1:1;o.setXYZW(F,S.x,S.y,S.z,R)}for(let F=0,M=C.length;F<M;++F){let x=C[F],R=x.start,B=x.count;for(let z=R,X=R+B;z<X;z+=3)I(e.getX(z+0)),I(e.getX(z+1)),I(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $n(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new k,s=new k,o=new k,a=new k,c=new k,l=new k,u=new k,d=new k;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?h=c[y]*a.data.stride+a.offset:h=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[h++]}return new $n(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},fS=new qt,Js=new hh,Xf=new Fa,hS=new k,Yf=new k,Zf=new k,Jf=new k,Fy=new k,Kf=new k,pS=new k,Qf=new k,Nn=class extends uo{constructor(e=new ls,t=new Pl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Kf.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(Fy.fromBufferAttribute(d,e),o?Kf.addScaledVector(Fy,u):Kf.addScaledVector(Fy.sub(t),u))}t.add(Kf)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xf.copy(i.boundingSphere),Xf.applyMatrix4(s),Js.copy(e.ray).recast(e.near),!(Xf.containsPoint(Js.origin)===!1&&(Js.intersectSphere(Xf,hS)===null||Js.origin.distanceToSquared(hS)>(e.far-e.near)**2))&&(fS.copy(s).invert(),Js.copy(e.ray).applyMatrix4(fS),!(i.boundingBox!==null&&Js.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Js)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],C=Math.max(m.start,h.start),S=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let E=C,T=S;E<T;E+=3){let D=a.getX(E),I=a.getX(E+1),F=a.getX(E+2);r=eh(this,p,e,i,l,u,d,D,I,F),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let m=g,p=y;m<p;m+=3){let C=a.getX(m),S=a.getX(m+1),E=a.getX(m+2);r=eh(this,o,e,i,l,u,d,C,S,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],C=Math.max(m.start,h.start),S=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let E=C,T=S;E<T;E+=3){let D=E,I=E+1,F=E+2;r=eh(this,p,e,i,l,u,d,D,I,F),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),y=Math.min(c.count,h.start+h.count);for(let m=g,p=y;m<p;m+=3){let C=m,S=m+1,E=m+2;r=eh(this,o,e,i,l,u,d,C,S,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function SP(n,e,t,i,r,s,o,a){let c;if(e.side===bn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Er,a),c===null)return null;Qf.copy(a),Qf.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Qf);return l<t.near||l>t.far?null:{distance:l,point:Qf.clone(),object:n}}function eh(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Yf),n.getVertexPosition(c,Zf),n.getVertexPosition(l,Jf);let u=SP(n,e,t,i,Yf,Zf,Jf,pS);if(u){let d=new k;ss.getBarycoord(pS,Yf,Zf,Jf,d),r&&(u.uv=ss.getInterpolatedAttribute(r,a,c,l,d,new lt)),s&&(u.uv1=ss.getInterpolatedAttribute(s,a,c,l,d,new lt)),o&&(u.normal=ss.getInterpolatedAttribute(o,a,c,l,d,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new k,materialIndex:0};ss.getNormal(Yf,Zf,Jf,f.normal),u.face=f,u.barycoord=d}return u}var La=class n extends ls{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new ji(l,3)),this.setAttribute("normal",new ji(u,3)),this.setAttribute("uv",new ji(d,2));function g(y,m,p,C,S,E,T,D,I,F,M){let x=E/I,R=T/F,B=E/2,z=T/2,X=D/2,j=I+1,$=F+1,J=0,V=0,ae=new k;for(let fe=0;fe<$;fe++){let De=fe*R-z;for(let et=0;et<j;et++){let Et=et*x-B;ae[y]=Et*C,ae[m]=De*S,ae[p]=X,l.push(ae.x,ae.y,ae.z),ae[y]=0,ae[m]=0,ae[p]=D>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push(et/I),d.push(1-fe/F),J+=1}}for(let fe=0;fe<F;fe++)for(let De=0;De<I;De++){let et=f+De+j*fe,Et=f+De+j*(fe+1),wt=f+(De+1)+j*(fe+1),ht=f+(De+1)+j*fe;c.push(et,Et,ht),c.push(Et,wt,ht),V+=6}a.addGroup(h,V,M),h+=V,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function fo(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function hn(n){let e={};for(let t=0;t<n.length;t++){let i=fo(n[t]);for(let r in i)e[r]=i[r]}return e}function wP(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function a_(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}var cw={clone:fo,merge:hn},CP=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,TP=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends so{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=CP,this.fragmentShader=TP,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fo(e.uniforms),this.uniformsGroups=wP(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Ll=class extends uo{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},rs=new k,mS=new lt,gS=new lt,In=class extends Ll{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=lh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(py*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return lh*2*Math.atan(Math.tan(py*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rs.x,rs.y).multiplyScalar(-e/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rs.x,rs.y).multiplyScalar(-e/rs.z)}getViewSize(e,t){return this.getViewBounds(e,mS,gS),t.subVectors(gS,mS)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(py*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Aa=-90,Ia=1,ph=class extends uo{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new In(Aa,Ia,e,t);r.layers=this.layers,this.add(r);let s=new In(Aa,Ia,e,t);s.layers=this.layers,this.add(s);let o=new In(Aa,Ia,e,t);o.layers=this.layers,this.add(o);let a=new In(Aa,Ia,e,t);a.layers=this.layers,this.add(a);let c=new In(Aa,Ia,e,t);c.layers=this.layers,this.add(c);let l=new In(Aa,Ia,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===wi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Al)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},kl=class extends Tr{constructor(e=[],t=co,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},mh=class extends Wi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new kl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new La(5,5,5),s=new qn({name:"CubemapFromEquirect",uniforms:fo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:bn,blending:Sr});s.uniforms.tEquirect.value=t;let o=new Nn(r,s),a=t.minFilter;return t.minFilter===fs&&(t.minFilter=Rn),new ph(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},eo=class extends uo{constructor(){super(),this.isGroup=!0,this.type="Group"}},DP={type:"move"},ka=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new eo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new eo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new eo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,i),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(DP)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new eo;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var Ul=class extends uo{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ro,this.environmentIntensity=1,this.environmentRotation=new ro,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Ly=new k,AP=new k,IP=new je,Gi=class{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Ly.subVectors(i,t).cross(AP.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Ly),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||IP.getNormalMatrix(e),r=this.coplanarPoint(Ly).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ks=new Fa,RP=new lt(.5,.5),th=new k,Bl=class{constructor(e=new Gi,t=new Gi,i=new Gi,r=new Gi,s=new Gi,o=new Gi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wi,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],y=s[9],m=s[10],p=s[11],C=s[12],S=s[13],E=s[14],T=s[15];if(r[0].setComponents(l-o,h-u,p-g,T-C).normalize(),r[1].setComponents(l+o,h+u,p+g,T+C).normalize(),r[2].setComponents(l+a,h+d,p+y,T+S).normalize(),r[3].setComponents(l-a,h-d,p-y,T-S).normalize(),i)r[4].setComponents(c,f,m,E).normalize(),r[5].setComponents(l-c,h-f,p-m,T-E).normalize();else if(r[4].setComponents(l-c,h-f,p-m,T-E).normalize(),t===wi)r[5].setComponents(l+c,h+f,p+m,T+E).normalize();else if(t===Al)r[5].setComponents(c,f,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ks.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ks)}intersectsSprite(e){Ks.center.set(0,0,0);let t=RP.distanceTo(e.center);return Ks.radius=.7071067811865476+t,Ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ks)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(th.x=r.normal.x>0?e.max.x:e.min.x,th.y=r.normal.y>0?e.max.y:e.min.y,th.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(th)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Vl=class extends Tr{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Hl=class extends Tr{constructor(e,t,i=hs,r,s,o,a=ci,c=ci,l,u=Na,d=1){if(u!==Na&&u!==za)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Oa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},zl=class extends Tr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var oo=class n extends ls{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],y=[],m=[];for(let p=0;p<u;p++){let C=p*f-o;for(let S=0;S<l;S++){let E=S*d-s;g.push(E,-C,0),y.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let C=0;C<a;C++){let S=C+l*p,E=C+l*(p+1),T=C+1+l*(p+1),D=C+1+l*p;h.push(S,E,D),h.push(E,T,D)}this.setIndex(h),this.setAttribute("position",new ji(g,3)),this.setAttribute("normal",new ji(y,3)),this.setAttribute("uv",new ji(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var gh=class extends so{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=XS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},vh=class extends so{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function nh(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function NP(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ao=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},yh=class extends ao{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uy,endingEnd:Uy}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case By:s=e,a=2*t-i;break;case Vy:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case By:o=e,c=2*i-t;break;case Vy:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),y=g*g,m=y*g,p=-f*m+2*f*y-f*g,C=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,S=(-1-h)*m+(1.5+h)*y+.5*g,E=h*m-h*y;for(let T=0;T!==a;++T)s[T]=p*o[u+T]+C*o[l+T]+S*o[c+T]+E*o[d+T];return s}},_h=class extends ao{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},xh=class extends ao{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Xn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=nh(t,this.TimeBufferType),this.values=nh(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:nh(e.times,Array),values:nh(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new xh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _h(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Tl:t=this.InterpolantFactoryMethodDiscrete;break;case ch:t=this.InterpolantFactoryMethodLinear;break;case ih:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tl;case this.InterpolantFactoryMethodLinear:return ch;case this.InterpolantFactoryMethodSmooth:return ih}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&NP(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===ih,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let y=t[d+g];if(y!==t[f+g]||y!==t[h+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=ch;var us=class extends Xn{constructor(e,t,i){super(e,t,i)}};us.prototype.ValueTypeName="bool";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=Tl;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var Eh=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Eh.prototype.ValueTypeName="color";var Mh=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Mh.prototype.ValueTypeName="number";var bh=class extends ao{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)br.slerpFlat(s,0,o,l-a,o,l,c);return s}},Gl=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new bh(this.times,this.values,this.getValueSize(),e)}};Gl.prototype.ValueTypeName="quaternion";Gl.prototype.InterpolantFactoryMethodSmooth=void 0;var ds=class extends Xn{constructor(e,t,i){super(e,t,i)}};ds.prototype.ValueTypeName="string";ds.prototype.ValueBufferType=Array;ds.prototype.DefaultInterpolation=Tl;ds.prototype.InterpolantFactoryMethodLinear=void 0;ds.prototype.InterpolantFactoryMethodSmooth=void 0;var Sh=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Sh.prototype.ValueTypeName="vector";var Ua=class extends Ll{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var wh=class extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var c_="\\[\\]\\.:\\/",PP=new RegExp("["+c_+"]","g"),l_="[^"+c_+"]",OP="[^"+c_.replace("\\.","")+"]",FP=/((?:WC+[\/:])*)/.source.replace("WC",l_),LP=/(WCOD+)?/.source.replace("WCOD",OP),kP=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",l_),UP=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",l_),BP=new RegExp("^"+FP+LP+kP+UP+"$"),VP=["material","materials","bones","map"],Gy=class{constructor(e,t,i){let r=i||kt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},kt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(PP,"")}static parseTrackName(t){let i=BP.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);VP.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=Gy,n})();kt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};kt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};kt.prototype.GetterByBindingType=[kt.prototype._getValue_direct,kt.prototype._getValue_array,kt.prototype._getValue_arrayElement,kt.prototype._getValue_toArray];kt.prototype.SetterByBindingTypeAndVersioning=[[kt.prototype._setValue_direct,kt.prototype._setValue_direct_setNeedsUpdate,kt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_array,kt.prototype._setValue_array_setNeedsUpdate,kt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_arrayElement,kt.prototype._setValue_arrayElement_setNeedsUpdate,kt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_fromArray,kt.prototype._setValue_fromArray_setNeedsUpdate,kt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var CY=new Float32Array(1);function u_(n,e,t,i){let r=HP(i);switch(t){case e_:return n*e;case n_:return n*e/r.components*r.byteLength;case Bh:return n*e/r.components*r.byteLength;case i_:return n*e*2/r.components*r.byteLength;case Vh:return n*e*2/r.components*r.byteLength;case t_:return n*e*3/r.components*r.byteLength;case li:return n*e*4/r.components*r.byteLength;case Hh:return n*e*4/r.components*r.byteLength;case $l:case ql:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xl:case Yl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Gh:case Wh:return Math.max(n,16)*Math.max(e,8)/4;case zh:case jh:return Math.max(n,8)*Math.max(e,8)/2;case $h:case qh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Jh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Kh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Qh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ep:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case tp:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case np:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ip:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case rp:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case sp:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case op:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ap:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case cp:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case lp:case up:case dp:return Math.ceil(n/4)*Math.ceil(e/4)*16;case fp:case hp:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pp:case mp:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function HP(n){switch(n){case Xi:case Zy:return{byteLength:1,components:1};case Ba:case Jy:case Va:return{byteLength:2,components:1};case kh:case Uh:return{byteLength:2,components:4};case hs:case Lh:case Yi:return{byteLength:4,components:1};case Ky:case Qy:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Nw(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function GP(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],y=d[h];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,d[f]=y)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let y=d[h];n.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var jP=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,WP=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$P=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qP=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XP=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,YP=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ZP=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,JP=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,KP=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,QP=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eO=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tO=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nO=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iO=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rO=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,sO=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,oO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,aO=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cO=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lO=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uO=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dO=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fO=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,hO=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pO=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mO=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gO=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vO=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yO=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_O=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xO="gl_FragColor = linearToOutputTexel( gl_FragColor );",EO=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,MO=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bO=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,SO=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wO=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CO=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,TO=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,DO=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AO=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IO=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RO=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,NO=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PO=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,OO=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,FO=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,LO=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kO=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UO=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BO=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,VO=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,HO=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zO=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,GO=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jO=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,WO=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$O=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qO=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XO=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YO=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ZO=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,JO=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KO=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,QO=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eF=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tF=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nF=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,iF=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rF=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sF=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,oF=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aF=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cF=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lF=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uF=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dF=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fF=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hF=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pF=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mF=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gF=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vF=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yF=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_F=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xF=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,EF=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,MF=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bF=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,SF=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wF=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,CF=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,TF=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,DF=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,AF=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,IF=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,RF=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NF=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,PF=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,OF=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,FF=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LF=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kF=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UF=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,BF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,VF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,HF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zF=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,GF=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jF=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$F=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XF=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YF=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ZF=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,JF=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,KF=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,QF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eL=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tL=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nL=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rL=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sL=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oL=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aL=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cL=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lL=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uL=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dL=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fL=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hL=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pL=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mL=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gL=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vL=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,yL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_L=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,EL=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ML=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:jP,alphahash_pars_fragment:WP,alphamap_fragment:$P,alphamap_pars_fragment:qP,alphatest_fragment:XP,alphatest_pars_fragment:YP,aomap_fragment:ZP,aomap_pars_fragment:JP,batching_pars_vertex:KP,batching_vertex:QP,begin_vertex:eO,beginnormal_vertex:tO,bsdfs:nO,iridescence_fragment:iO,bumpmap_pars_fragment:rO,clipping_planes_fragment:sO,clipping_planes_pars_fragment:oO,clipping_planes_pars_vertex:aO,clipping_planes_vertex:cO,color_fragment:lO,color_pars_fragment:uO,color_pars_vertex:dO,color_vertex:fO,common:hO,cube_uv_reflection_fragment:pO,defaultnormal_vertex:mO,displacementmap_pars_vertex:gO,displacementmap_vertex:vO,emissivemap_fragment:yO,emissivemap_pars_fragment:_O,colorspace_fragment:xO,colorspace_pars_fragment:EO,envmap_fragment:MO,envmap_common_pars_fragment:bO,envmap_pars_fragment:SO,envmap_pars_vertex:wO,envmap_physical_pars_fragment:LO,envmap_vertex:CO,fog_vertex:TO,fog_pars_vertex:DO,fog_fragment:AO,fog_pars_fragment:IO,gradientmap_pars_fragment:RO,lightmap_pars_fragment:NO,lights_lambert_fragment:PO,lights_lambert_pars_fragment:OO,lights_pars_begin:FO,lights_toon_fragment:kO,lights_toon_pars_fragment:UO,lights_phong_fragment:BO,lights_phong_pars_fragment:VO,lights_physical_fragment:HO,lights_physical_pars_fragment:zO,lights_fragment_begin:GO,lights_fragment_maps:jO,lights_fragment_end:WO,logdepthbuf_fragment:$O,logdepthbuf_pars_fragment:qO,logdepthbuf_pars_vertex:XO,logdepthbuf_vertex:YO,map_fragment:ZO,map_pars_fragment:JO,map_particle_fragment:KO,map_particle_pars_fragment:QO,metalnessmap_fragment:eF,metalnessmap_pars_fragment:tF,morphinstance_vertex:nF,morphcolor_vertex:iF,morphnormal_vertex:rF,morphtarget_pars_vertex:sF,morphtarget_vertex:oF,normal_fragment_begin:aF,normal_fragment_maps:cF,normal_pars_fragment:lF,normal_pars_vertex:uF,normal_vertex:dF,normalmap_pars_fragment:fF,clearcoat_normal_fragment_begin:hF,clearcoat_normal_fragment_maps:pF,clearcoat_pars_fragment:mF,iridescence_pars_fragment:gF,opaque_fragment:vF,packing:yF,premultiplied_alpha_fragment:_F,project_vertex:xF,dithering_fragment:EF,dithering_pars_fragment:MF,roughnessmap_fragment:bF,roughnessmap_pars_fragment:SF,shadowmap_pars_fragment:wF,shadowmap_pars_vertex:CF,shadowmap_vertex:TF,shadowmask_pars_fragment:DF,skinbase_vertex:AF,skinning_pars_vertex:IF,skinning_vertex:RF,skinnormal_vertex:NF,specularmap_fragment:PF,specularmap_pars_fragment:OF,tonemapping_fragment:FF,tonemapping_pars_fragment:LF,transmission_fragment:kF,transmission_pars_fragment:UF,uv_pars_fragment:BF,uv_pars_vertex:VF,uv_vertex:HF,worldpos_vertex:zF,background_vert:GF,background_frag:jF,backgroundCube_vert:WF,backgroundCube_frag:$F,cube_vert:qF,cube_frag:XF,depth_vert:YF,depth_frag:ZF,distanceRGBA_vert:JF,distanceRGBA_frag:KF,equirect_vert:QF,equirect_frag:eL,linedashed_vert:tL,linedashed_frag:nL,meshbasic_vert:iL,meshbasic_frag:rL,meshlambert_vert:sL,meshlambert_frag:oL,meshmatcap_vert:aL,meshmatcap_frag:cL,meshnormal_vert:lL,meshnormal_frag:uL,meshphong_vert:dL,meshphong_frag:fL,meshphysical_vert:hL,meshphysical_frag:pL,meshtoon_vert:mL,meshtoon_frag:gL,points_vert:vL,points_frag:yL,shadow_vert:_L,shadow_frag:xL,sprite_vert:EL,sprite_frag:ML},oe={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Zi={basic:{uniforms:hn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:hn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new ft(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:hn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:hn([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:hn([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new ft(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:hn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:hn([oe.points,oe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:hn([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:hn([oe.common,oe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:hn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:hn([oe.sprite,oe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:hn([oe.common,oe.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:hn([oe.lights,oe.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Zi.physical={uniforms:hn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var gp={r:0,b:0,g:0},ho=new ro,bL=new qt;function SL(n,e,t,i,r,s,o){let a=new ft(0),c=s===!0?0:1,l,u,d=null,f=0,h=null;function g(S){let E=S.isScene===!0?S.background:null;return E&&E.isTexture&&(E=(S.backgroundBlurriness>0?t:e).get(E)),E}function y(S){let E=!1,T=g(S);T===null?p(a,c):T&&T.isColor&&(p(T,1),E=!0);let D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,E){let T=g(E);T&&(T.isCubeTexture||T.mapping===jl)?(u===void 0&&(u=new Nn(new La(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:fo(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,I,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ho.copy(E.backgroundRotation),ho.x*=-1,ho.y*=-1,ho.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ho.y*=-1,ho.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(bL.makeRotationFromEuler(ho)),u.material.toneMapped=ct.getTransfer(T.colorSpace)!==vt,(d!==T||f!==T.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=T,f=T.version,h=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new Nn(new oo(2,2),new qn({name:"BackgroundMaterial",uniforms:fo(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ct.getTransfer(T.colorSpace)!==vt,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=T,f=T.version,h=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,E){S.getRGB(gp,a_(n)),i.buffers.color.setClear(gp.r,gp.g,gp.b,E,o)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),c=E,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:y,addToRenderList:m,dispose:C}}function wL(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(x,R,B,z,X){let j=!1,$=d(z,B,R);s!==$&&(s=$,l(s.object)),j=h(x,z,B,X),j&&g(x,z,B,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,E(x,R,B,z),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return n.createVertexArray()}function l(x){return n.bindVertexArray(x)}function u(x){return n.deleteVertexArray(x)}function d(x,R,B){let z=B.wireframe===!0,X=i[x.id];X===void 0&&(X={},i[x.id]=X);let j=X[R.id];j===void 0&&(j={},X[R.id]=j);let $=j[z];return $===void 0&&($=f(c()),j[z]=$),$}function f(x){let R=[],B=[],z=[];for(let X=0;X<t;X++)R[X]=0,B[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:B,attributeDivisors:z,object:x,attributes:{},index:null}}function h(x,R,B,z){let X=s.attributes,j=R.attributes,$=0,J=B.getAttributes();for(let V in J)if(J[V].location>=0){let fe=X[V],De=j[V];if(De===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(De=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(De=x.instanceColor)),fe===void 0||fe.attribute!==De||De&&fe.data!==De.data)return!0;$++}return s.attributesNum!==$||s.index!==z}function g(x,R,B,z){let X={},j=R.attributes,$=0,J=B.getAttributes();for(let V in J)if(J[V].location>=0){let fe=j[V];fe===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(fe=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(fe=x.instanceColor));let De={};De.attribute=fe,fe&&fe.data&&(De.data=fe.data),X[V]=De,$++}s.attributes=X,s.attributesNum=$,s.index=z}function y(){let x=s.newAttributes;for(let R=0,B=x.length;R<B;R++)x[R]=0}function m(x){p(x,0)}function p(x,R){let B=s.newAttributes,z=s.enabledAttributes,X=s.attributeDivisors;B[x]=1,z[x]===0&&(n.enableVertexAttribArray(x),z[x]=1),X[x]!==R&&(n.vertexAttribDivisor(x,R),X[x]=R)}function C(){let x=s.newAttributes,R=s.enabledAttributes;for(let B=0,z=R.length;B<z;B++)R[B]!==x[B]&&(n.disableVertexAttribArray(B),R[B]=0)}function S(x,R,B,z,X,j,$){$===!0?n.vertexAttribIPointer(x,R,B,X,j):n.vertexAttribPointer(x,R,B,z,X,j)}function E(x,R,B,z){y();let X=z.attributes,j=B.getAttributes(),$=R.defaultAttributeValues;for(let J in j){let V=j[J];if(V.location>=0){let ae=X[J];if(ae===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(ae=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(ae=x.instanceColor)),ae!==void 0){let fe=ae.normalized,De=ae.itemSize,et=e.get(ae);if(et===void 0)continue;let Et=et.buffer,wt=et.type,ht=et.bytesPerElement,W=wt===n.INT||wt===n.UNSIGNED_INT||ae.gpuType===Lh;if(ae.isInterleavedBufferAttribute){let K=ae.data,ge=K.stride,Le=ae.offset;if(K.isInstancedInterleavedBuffer){for(let Ce=0;Ce<V.locationSize;Ce++)p(V.location+Ce,K.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ce=0;Ce<V.locationSize;Ce++)m(V.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let Ce=0;Ce<V.locationSize;Ce++)S(V.location+Ce,De/V.locationSize,wt,fe,ge*ht,(Le+De/V.locationSize*Ce)*ht,W)}else{if(ae.isInstancedBufferAttribute){for(let K=0;K<V.locationSize;K++)p(V.location+K,ae.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let K=0;K<V.locationSize;K++)m(V.location+K);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let K=0;K<V.locationSize;K++)S(V.location+K,De/V.locationSize,wt,fe,De*ht,De/V.locationSize*K*ht,W)}}else if($!==void 0){let fe=$[J];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(V.location,fe);break;case 3:n.vertexAttrib3fv(V.location,fe);break;case 4:n.vertexAttrib4fv(V.location,fe);break;default:n.vertexAttrib1fv(V.location,fe)}}}}C()}function T(){F();for(let x in i){let R=i[x];for(let B in R){let z=R[B];for(let X in z)u(z[X].object),delete z[X];delete R[B]}delete i[x]}}function D(x){if(i[x.id]===void 0)return;let R=i[x.id];for(let B in R){let z=R[B];for(let X in z)u(z[X].object),delete z[X];delete R[B]}delete i[x.id]}function I(x){for(let R in i){let B=i[R];if(B[x.id]===void 0)continue;let z=B[x.id];for(let X in z)u(z[X].object),delete z[X];delete B[x.id]}}function F(){M(),o=!0,s!==r&&(s=r,l(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:F,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:D,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:m,disableUnusedAttributes:C}}function CL(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let y=0;y<d;y++)g+=u[y]*f[y];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function TL(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==li&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let F=I===Va&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Xi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Yi&&!F)}function c(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,D=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:C,maxVaryings:S,maxFragmentUniforms:E,vertexTextures:T,maxSamples:D}}function DL(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Gi,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{let C=s?0:i,S=C*4,E=p.clippingState||null;c.value=E,E=u(g,f,S,h);for(let T=0;T!==S;++T)E[T]=t[T];p.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=C}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=h+y*4,C=f.matrixWorldInverse;a.getNormalMatrix(C),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,E=h;S!==y;++S,E+=4)o.copy(d[S]).applyMatrix4(C,a),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function AL(n){let e=new WeakMap;function t(o,a){return a===Ph?o.mapping=co:a===Oh&&(o.mapping=lo),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ph||a===Oh)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new mh(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var ja=4,lw=[.125,.215,.35,.446,.526,.582],go=20,d_=new Ua,uw=new ft,f_=null,h_=0,p_=0,m_=!1,mo=(1+Math.sqrt(5))/2,Ga=1/mo,dw=[new k(-mo,Ga,0),new k(mo,Ga,0),new k(-Ga,0,mo),new k(Ga,0,mo),new k(0,mo,-Ga),new k(0,mo,Ga),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],IL=new k,_p=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=IL}=s;f_=this._renderer.getRenderTarget(),h_=this._renderer.getActiveCubeFace(),p_=this._renderer.getActiveMipmapLevel(),m_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pw(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hw(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(f_,h_,p_),this._renderer.xr.enabled=m_,e.scissorTest=!1,vp(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===co||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),f_=this._renderer.getRenderTarget(),h_=this._renderer.getActiveCubeFace(),p_=this._renderer.getActiveMipmapLevel(),m_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:Va,format:li,colorSpace:io,depthBuffer:!1},r=fw(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fw(e,t,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=RL(s)),this._blurMaterial=NL(s,e,t)}return r}_compileMaterial(e){let t=new Nn(this._lodPlanes[0],e);this._renderer.compile(t,d_)}_sceneToCubeUV(e,t,i,r,s){let c=new In(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(uw),d.toneMapping=wr,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null));let y=new Pl({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1}),m=new Nn(new La,y),p=!1,C=e.background;C?C.isColor&&(y.color.copy(C),e.background=null,p=!0):(y.color.copy(uw),p=!0);for(let S=0;S<6;S++){let E=S%3;E===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[S],s.y,s.z)):E===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[S]));let T=this._cubeSize;vp(r,E*T,S>2?T:0,T,T),d.setRenderTarget(r),p&&d.render(m,c),d.render(e,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=C}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===co||e.mapping===lo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pw()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hw());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Nn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;vp(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,d_)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=dw[(r-s-1)%dw.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Nn(this._lodPlanes[r],l),f=l.uniforms,h=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*go-1),y=s/g,m=isFinite(s)?1+Math.floor(u*y):go;m>go&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${go}`);let p=[],C=0;for(let I=0;I<go;++I){let F=I/y,M=Math.exp(-F*F/2);p.push(M),I===0?C+=M:I<m&&(C+=2*M)}for(let I=0;I<p.length;I++)p[I]=p[I]/C;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-i;let E=this._sizeLods[r],T=3*E*(r>S-ja?r-S+ja:0),D=4*(this._cubeSize-E);vp(t,T,D,3*E,2*E),c.setRenderTarget(t),c.render(d,d_)}};function RL(n){let e=[],t=[],i=[],r=n,s=n-ja+1+lw.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let c=1/a;o>n-ja?c=lw[o-n+ja-1]:o===0&&(c=0),i.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,y=3,m=2,p=1,C=new Float32Array(y*g*h),S=new Float32Array(m*g*h),E=new Float32Array(p*g*h);for(let D=0;D<h;D++){let I=D%3*2/3-1,F=D>2?0:-1,M=[I,F,0,I+2/3,F,0,I+2/3,F+1,0,I,F,0,I+2/3,F+1,0,I,F+1,0];C.set(M,y*g*D),S.set(f,m*g*D);let x=[D,D,D,D,D,D];E.set(x,p*g*D)}let T=new ls;T.setAttribute("position",new $n(C,y)),T.setAttribute("uv",new $n(S,m)),T.setAttribute("faceIndex",new $n(E,p)),e.push(T),r>ja&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function fw(n,e,t){let i=new Wi(n,e,t);return i.texture.mapping=jl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vp(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function NL(n,e,t){let i=new Float32Array(go),r=new k(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:go,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:w_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function hw(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:w_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function pw(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:w_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function w_(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function PL(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===Ph||c===Oh,u=c===co||c===lo;if(l||u){let d=e.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new _p(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let h=a.image;return l&&h&&h.height>0||u&&h&&r(h)?(t===null&&(t=new _p(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function OL(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Pa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function FL(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,g=d.attributes.position,y=0;if(h!==null){let C=h.array;y=h.version;for(let S=0,E=C.length;S<E;S+=3){let T=C[S+0],D=C[S+1],I=C[S+2];f.push(T,D,D,I,I,T)}}else if(g!==void 0){let C=g.array;y=g.version;for(let S=0,E=C.length/3-1;S<E;S+=3){let T=S+0,D=S+1,I=S+2;f.push(T,D,D,I,I,T)}}else return;let m=new(o_(f)?Fl:Ol)(f,1);m.version=y;let p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function LL(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,s,f*o,g),t.update(h,i,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,i,1)}function d(f,h,g,y){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,h[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,y,0,g);let p=0;for(let C=0;C<g;C++)p+=h[C]*y[C];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function kL(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function UL(n,e,t){let i=new WeakMap,r=new Ut;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let x=function(){F.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var h=x;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],C=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],E=0;g===!0&&(E=1),y===!0&&(E=2),m===!0&&(E=3);let T=a.attributes.position.count*E,D=1;T>e.maxTextureSize&&(D=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);let I=new Float32Array(T*D*4*d),F=new Rl(I,T,D,d);F.type=Yi,F.needsUpdate=!0;let M=E*4;for(let R=0;R<d;R++){let B=p[R],z=C[R],X=S[R],j=T*D*4*R;for(let $=0;$<B.count;$++){let J=$*M;g===!0&&(r.fromBufferAttribute(B,$),I[j+J+0]=r.x,I[j+J+1]=r.y,I[j+J+2]=r.z,I[j+J+3]=0),y===!0&&(r.fromBufferAttribute(z,$),I[j+J+4]=r.x,I[j+J+5]=r.y,I[j+J+6]=r.z,I[j+J+7]=0),m===!0&&(r.fromBufferAttribute(X,$),I[j+J+8]=r.x,I[j+J+9]=r.y,I[j+J+10]=r.z,I[j+J+11]=X.itemSize===4?r.w:1)}}f={count:d,texture:F,size:new lt(T,D)},i.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let y=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",y),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function BL(n,e,t,i){let r=new WeakMap;function s(c){let l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return d}function o(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}var Pw=new Tr,mw=new Hl(1,1),Ow=new Rl,Fw=new fh,Lw=new kl,gw=[],vw=[],yw=new Float32Array(16),_w=new Float32Array(9),xw=new Float32Array(4);function $a(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=gw[r];if(s===void 0&&(s=new Float32Array(r),gw[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ep(n,e){let t=vw[e];t===void 0&&(t=new Int32Array(e),vw[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function VL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function HL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),Yt(t,e)}}function zL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),Yt(t,e)}}function GL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),Yt(t,e)}}function jL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;xw.set(i),n.uniformMatrix2fv(this.addr,!1,xw),Yt(t,i)}}function WL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;_w.set(i),n.uniformMatrix3fv(this.addr,!1,_w),Yt(t,i)}}function $L(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,i))return;yw.set(i),n.uniformMatrix4fv(this.addr,!1,yw),Yt(t,i)}}function qL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function XL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),Yt(t,e)}}function YL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),Yt(t,e)}}function ZL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),Yt(t,e)}}function JL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function KL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),Yt(t,e)}}function QL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),Yt(t,e)}}function ek(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),Yt(t,e)}}function tk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(mw.compareFunction=r_,s=mw):s=Pw,t.setTexture2D(e||s,r)}function nk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Fw,r)}function ik(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Lw,r)}function rk(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ow,r)}function sk(n){switch(n){case 5126:return VL;case 35664:return HL;case 35665:return zL;case 35666:return GL;case 35674:return jL;case 35675:return WL;case 35676:return $L;case 5124:case 35670:return qL;case 35667:case 35671:return XL;case 35668:case 35672:return YL;case 35669:case 35673:return ZL;case 5125:return JL;case 36294:return KL;case 36295:return QL;case 36296:return ek;case 35678:case 36198:case 36298:case 36306:case 35682:return tk;case 35679:case 36299:case 36307:return nk;case 35680:case 36300:case 36308:case 36293:return ik;case 36289:case 36303:case 36311:case 36292:return rk}}function ok(n,e){n.uniform1fv(this.addr,e)}function ak(n,e){let t=$a(e,this.size,2);n.uniform2fv(this.addr,t)}function ck(n,e){let t=$a(e,this.size,3);n.uniform3fv(this.addr,t)}function lk(n,e){let t=$a(e,this.size,4);n.uniform4fv(this.addr,t)}function uk(n,e){let t=$a(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function dk(n,e){let t=$a(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fk(n,e){let t=$a(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function hk(n,e){n.uniform1iv(this.addr,e)}function pk(n,e){n.uniform2iv(this.addr,e)}function mk(n,e){n.uniform3iv(this.addr,e)}function gk(n,e){n.uniform4iv(this.addr,e)}function vk(n,e){n.uniform1uiv(this.addr,e)}function yk(n,e){n.uniform2uiv(this.addr,e)}function _k(n,e){n.uniform3uiv(this.addr,e)}function xk(n,e){n.uniform4uiv(this.addr,e)}function Ek(n,e,t){let i=this.cache,r=e.length,s=Ep(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Pw,s[o])}function Mk(n,e,t){let i=this.cache,r=e.length,s=Ep(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Fw,s[o])}function bk(n,e,t){let i=this.cache,r=e.length,s=Ep(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Lw,s[o])}function Sk(n,e,t){let i=this.cache,r=e.length,s=Ep(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),Yt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ow,s[o])}function wk(n){switch(n){case 5126:return ok;case 35664:return ak;case 35665:return ck;case 35666:return lk;case 35674:return uk;case 35675:return dk;case 35676:return fk;case 5124:case 35670:return hk;case 35667:case 35671:return pk;case 35668:case 35672:return mk;case 35669:case 35673:return gk;case 5125:return vk;case 36294:return yk;case 36295:return _k;case 36296:return xk;case 35678:case 36198:case 36298:case 36306:case 35682:return Ek;case 35679:case 36299:case 36307:return Mk;case 35680:case 36300:case 36308:case 36293:return bk;case 36289:case 36303:case 36311:case 36292:return Sk}}var v_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sk(t.type)}},y_=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wk(t.type)}},__=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},g_=/(\w+)(\])?(\[|\.)?/g;function Ew(n,e){n.seq.push(e),n.map[e.id]=e}function Ck(n,e,t){let i=n.name,r=i.length;for(g_.lastIndex=0;;){let s=g_.exec(i),o=g_.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ew(t,l===void 0?new v_(a,n,e):new y_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new __(a),Ew(t,d)),t=d}}}var Wa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Ck(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function Mw(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Tk=37297,Dk=0;function Ak(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var bw=new je;function Ik(n){ct._getMatrix(bw,ct.workingColorSpace,n);let e=`mat3( ${bw.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(n)){case Dl:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Sw(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Ak(n.getShaderSource(e),a)}else return s}function Rk(n,e){let t=Ik(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Nk(n,e){let t;switch(e){case VS:t="Linear";break;case HS:t="Reinhard";break;case zS:t="Cineon";break;case GS:t="ACESFilmic";break;case WS:t="AgX";break;case $S:t="Neutral";break;case jS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var yp=new k;function Pk(){ct.getLuminanceCoefficients(yp);let n=yp.x.toFixed(4),e=yp.y.toFixed(4),t=yp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ok(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jl).join(`
`)}function Fk(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Lk(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Jl(n){return n!==""}function ww(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cw(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var kk=/^[ \t]*#include +<([\w\d./]+)>/gm;function x_(n){return n.replace(kk,Bk)}var Uk=new Map;function Bk(n,e){let t=Ze[e];if(t===void 0){let i=Uk.get(e);if(i!==void 0)t=Ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return x_(t)}var Vk=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tw(n){return n.replace(Vk,Hk)}function Hk(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Dw(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function zk(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Wy?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===_S?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$i&&(e="SHADOWMAP_TYPE_VSM"),e}function Gk(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case co:case lo:e="ENVMAP_TYPE_CUBE";break;case jl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jk(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case lo:e="ENVMAP_MODE_REFRACTION";break}return e}function Wk(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Yy:e="ENVMAP_BLENDING_MULTIPLY";break;case US:e="ENVMAP_BLENDING_MIX";break;case BS:e="ENVMAP_BLENDING_ADD";break}return e}function $k(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function qk(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=zk(t),l=Gk(t),u=jk(t),d=Wk(t),f=$k(t),h=Ok(t),g=Fk(s),y=r.createProgram(),m,p,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jl).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jl).join(`
`),p.length>0&&(p+=`
`)):(m=[Dw(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jl).join(`
`),p=[Dw(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wr?"#define TONE_MAPPING":"",t.toneMapping!==wr?Ze.tonemapping_pars_fragment:"",t.toneMapping!==wr?Nk("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Rk("linearToOutputTexel",t.outputColorSpace),Pk(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jl).join(`
`)),o=x_(o),o=ww(o,t),o=Cw(o,t),a=x_(a),a=ww(a,t),a=Cw(a,t),o=Tw(o),a=Tw(a),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===s_?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===s_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=C+m+o,E=C+p+a,T=Mw(r,r.VERTEX_SHADER,S),D=Mw(r,r.FRAGMENT_SHADER,E);r.attachShader(y,T),r.attachShader(y,D),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function I(R){if(n.debug.checkShaderErrors){let B=r.getProgramInfoLog(y)||"",z=r.getShaderInfoLog(T)||"",X=r.getShaderInfoLog(D)||"",j=B.trim(),$=z.trim(),J=X.trim(),V=!0,ae=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,T,D);else{let fe=Sw(r,T,"vertex"),De=Sw(r,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+j+`
`+fe+`
`+De)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):($===""||J==="")&&(ae=!1);ae&&(R.diagnostics={runnable:V,programLog:j,vertexShader:{log:$,prefix:m},fragmentShader:{log:J,prefix:p}})}r.deleteShader(T),r.deleteShader(D),F=new Wa(r,y),M=Lk(r,y)}let F;this.getUniforms=function(){return F===void 0&&I(this),F};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(y,Tk)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dk++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=D,this}var Xk=0,E_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new M_(e),t.set(e,i)),i}},M_=class{constructor(e){this.id=Xk++,this.code=e,this.usedTimes=0}};function Yk(n,e,t,i,r,s,o){let a=new Nl,c=new E_,l=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures,h=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,x,R,B,z){let X=B.fog,j=z.geometry,$=M.isMeshStandardMaterial?B.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||$),V=J&&J.mapping===jl?J.image.height:null,ae=g[M.type];M.precision!==null&&(h=r.getMaxPrecision(M.precision),h!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));let fe=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,De=fe!==void 0?fe.length:0,et=0;j.morphAttributes.position!==void 0&&(et=1),j.morphAttributes.normal!==void 0&&(et=2),j.morphAttributes.color!==void 0&&(et=3);let Et,wt,ht,W;if(ae){let pt=Zi[ae];Et=pt.vertexShader,wt=pt.fragmentShader}else Et=M.vertexShader,wt=M.fragmentShader,c.update(M),ht=c.getVertexShaderID(M),W=c.getFragmentShaderID(M);let K=n.getRenderTarget(),ge=n.state.buffers.depth.getReversed(),Le=z.isInstancedMesh===!0,Ce=z.isBatchedMesh===!0,ot=!!M.map,on=!!M.matcap,w=!!J,Ct=!!M.aoMap,Ge=!!M.lightMap,Oe=!!M.bumpMap,xe=!!M.normalMap,Tt=!!M.displacementMap,Ee=!!M.emissiveMap,Xe=!!M.metalnessMap,Zt=!!M.roughnessMap,Bt=M.anisotropy>0,b=M.clearcoat>0,v=M.dispersion>0,O=M.iridescence>0,G=M.sheen>0,Z=M.transmission>0,H=Bt&&!!M.anisotropyMap,we=b&&!!M.clearcoatMap,ie=b&&!!M.clearcoatNormalMap,Me=b&&!!M.clearcoatRoughnessMap,be=O&&!!M.iridescenceMap,te=O&&!!M.iridescenceThicknessMap,ue=G&&!!M.sheenColorMap,Ne=G&&!!M.sheenRoughnessMap,Se=!!M.specularMap,ce=!!M.specularColorMap,We=!!M.specularIntensityMap,A=Z&&!!M.transmissionMap,ne=Z&&!!M.thicknessMap,se=!!M.gradientMap,me=!!M.alphaMap,Q=M.alphaTest>0,q=!!M.alphaHash,_e=!!M.extensions,Be=wr;M.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Be=n.toneMapping);let Mt={shaderID:ae,shaderType:M.type,shaderName:M.name,vertexShader:Et,fragmentShader:wt,defines:M.defines,customVertexShaderID:ht,customFragmentShaderID:W,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:Ce,batchingColor:Ce&&z._colorsTexture!==null,instancing:Le,instancingColor:Le&&z.instanceColor!==null,instancingMorph:Le&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:io,alphaToCoverage:!!M.alphaToCoverage,map:ot,matcap:on,envMap:w,envMapMode:w&&J.mapping,envMapCubeUVHeight:V,aoMap:Ct,lightMap:Ge,bumpMap:Oe,normalMap:xe,displacementMap:f&&Tt,emissiveMap:Ee,normalMapObjectSpace:xe&&M.normalMapType===JS,normalMapTangentSpace:xe&&M.normalMapType===ZS,metalnessMap:Xe,roughnessMap:Zt,anisotropy:Bt,anisotropyMap:H,clearcoat:b,clearcoatMap:we,clearcoatNormalMap:ie,clearcoatRoughnessMap:Me,dispersion:v,iridescence:O,iridescenceMap:be,iridescenceThicknessMap:te,sheen:G,sheenColorMap:ue,sheenRoughnessMap:Ne,specularMap:Se,specularColorMap:ce,specularIntensityMap:We,transmission:Z,transmissionMap:A,thicknessMap:ne,gradientMap:se,opaque:M.transparent===!1&&M.blending===to&&M.alphaToCoverage===!1,alphaMap:me,alphaTest:Q,alphaHash:q,combine:M.combine,mapUv:ot&&y(M.map.channel),aoMapUv:Ct&&y(M.aoMap.channel),lightMapUv:Ge&&y(M.lightMap.channel),bumpMapUv:Oe&&y(M.bumpMap.channel),normalMapUv:xe&&y(M.normalMap.channel),displacementMapUv:Tt&&y(M.displacementMap.channel),emissiveMapUv:Ee&&y(M.emissiveMap.channel),metalnessMapUv:Xe&&y(M.metalnessMap.channel),roughnessMapUv:Zt&&y(M.roughnessMap.channel),anisotropyMapUv:H&&y(M.anisotropyMap.channel),clearcoatMapUv:we&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:ie&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:te&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&y(M.sheenRoughnessMap.channel),specularMapUv:Se&&y(M.specularMap.channel),specularColorMapUv:ce&&y(M.specularColorMap.channel),specularIntensityMapUv:We&&y(M.specularIntensityMap.channel),transmissionMapUv:A&&y(M.transmissionMap.channel),thicknessMapUv:ne&&y(M.thicknessMap.channel),alphaMapUv:me&&y(M.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(xe||Bt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!j.attributes.uv&&(ot||me),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:z.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:et,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Be,decodeVideoTexture:ot&&M.map.isVideoTexture===!0&&ct.getTransfer(M.map.colorSpace)===vt,decodeVideoTextureEmissive:Ee&&M.emissiveMap.isVideoTexture===!0&&ct.getTransfer(M.emissiveMap.colorSpace)===vt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===qi,flipSided:M.side===bn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:_e&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&M.extensions.multiDraw===!0||Ce)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function p(M){let x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(let R in M.defines)x.push(R),x.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(C(x,M),S(x,M),x.push(n.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function C(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function S(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),x.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function E(M){let x=g[M.type],R;if(x){let B=Zi[x];R=cw.clone(B.uniforms)}else R=M.uniforms;return R}function T(M,x){let R;for(let B=0,z=u.length;B<z;B++){let X=u[B];if(X.cacheKey===x){R=X,++R.usedTimes;break}}return R===void 0&&(R=new qk(n,x,M,s),u.push(R)),R}function D(M){if(--M.usedTimes===0){let x=u.indexOf(M);u[x]=u[u.length-1],u.pop(),M.destroy()}}function I(M){c.remove(M)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:T,releaseProgram:D,releaseShaderCache:I,programs:u,dispose:F}}function Zk(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Jk(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Aw(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Iw(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,h,g,y,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:g,renderOrder:d.renderOrder,z:y,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=y,p.group=m),e++,p}function a(d,f,h,g,y,m){let p=o(d,f,h,g,y,m);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function c(d,f,h,g,y,m){let p=o(d,f,h,g,y,m);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,f){t.length>1&&t.sort(d||Jk),i.length>1&&i.sort(f||Aw),r.length>1&&r.sort(f||Aw)}function u(){for(let d=e,f=n.length;d<f;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function Kk(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Iw,n.set(i,[o])):r>=s.length?(o=new Iw,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Qk(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new ft};break;case"SpotLight":t={position:new k,direction:new k,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new ft,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":t={color:new ft,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function e2(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var t2=0;function n2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function i2(n){let e=new Qk,t=e2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new k);let r=new k,s=new qt,o=new qt;function a(l){let u=0,d=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let h=0,g=0,y=0,m=0,p=0,C=0,S=0,E=0,T=0,D=0,I=0;l.sort(n2);for(let M=0,x=l.length;M<x;M++){let R=l[M],B=R.color,z=R.intensity,X=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=B.r*z,d+=B.g*z,f+=B.b*z;else if(R.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(R.sh.coefficients[$],z);I++}else if(R.isDirectionalLight){let $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let J=R.shadow,V=t.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.directionalShadow[h]=V,i.directionalShadowMap[h]=j,i.directionalShadowMatrix[h]=R.shadow.matrix,C++}i.directional[h]=$,h++}else if(R.isSpotLight){let $=e.get(R);$.position.setFromMatrixPosition(R.matrixWorld),$.color.copy(B).multiplyScalar(z),$.distance=X,$.coneCos=Math.cos(R.angle),$.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),$.decay=R.decay,i.spot[y]=$;let J=R.shadow;if(R.map&&(i.spotLightMap[T]=R.map,T++,J.updateMatrices(R),R.castShadow&&D++),i.spotLightMatrix[y]=J.matrix,R.castShadow){let V=t.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.spotShadow[y]=V,i.spotShadowMap[y]=j,E++}y++}else if(R.isRectAreaLight){let $=e.get(R);$.color.copy(B).multiplyScalar(z),$.halfWidth.set(R.width*.5,0,0),$.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=$,m++}else if(R.isPointLight){let $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),$.distance=R.distance,$.decay=R.decay,R.castShadow){let J=R.shadow,V=t.get(R);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=R.shadow.matrix,S++}i.point[g]=$,g++}else if(R.isHemisphereLight){let $=e.get(R);$.skyColor.copy(R.color).multiplyScalar(z),$.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[p]=$,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let F=i.hash;(F.directionalLength!==h||F.pointLength!==g||F.spotLength!==y||F.rectAreaLength!==m||F.hemiLength!==p||F.numDirectionalShadows!==C||F.numPointShadows!==S||F.numSpotShadows!==E||F.numSpotMaps!==T||F.numLightProbes!==I)&&(i.directional.length=h,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=E+T-D,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=I,F.directionalLength=h,F.pointLength=g,F.spotLength=y,F.rectAreaLength=m,F.hemiLength=p,F.numDirectionalShadows=C,F.numPointShadows=S,F.numSpotShadows=E,F.numSpotMaps=T,F.numLightProbes=I,i.version=t2++)}function c(l,u){let d=0,f=0,h=0,g=0,y=0,m=u.matrixWorldInverse;for(let p=0,C=l.length;p<C;p++){let S=l[p];if(S.isDirectionalLight){let E=i.directional[d];E.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(S.isSpotLight){let E=i.spot[h];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),h++}else if(S.isRectAreaLight){let E=i.rectArea[g];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){let E=i.hemi[y];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(m),y++}}}return{setup:a,setupView:c,state:i}}function Rw(n){let e=new i2(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function r2(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Rw(n),e.set(r,[a])):s>=o.length?(a=new Rw(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var s2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,o2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function a2(n,e,t){let i=new Bl,r=new lt,s=new lt,o=new Ut,a=new gh({depthPacking:YS}),c=new vh,l={},u=t.maxTextureSize,d={[Er]:bn,[bn]:Er,[qi]:qi},f=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:s2,fragmentShader:o2}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new ls;g.setAttribute("position",new $n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Nn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wy;let p=this.type;this.render=function(D,I,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;let M=n.getRenderTarget(),x=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Sr),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let z=p!==$i&&this.type===$i,X=p===$i&&this.type!==$i;for(let j=0,$=D.length;j<$;j++){let J=D[j],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let ae=V.getFrameExtents();if(r.multiply(ae),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,V.mapSize.y=s.y)),V.map===null||z===!0||X===!0){let De=this.type!==$i?{minFilter:ci,magFilter:ci}:{};V.map!==null&&V.map.dispose(),V.map=new Wi(r.x,r.y,De),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();let fe=V.getViewportCount();for(let De=0;De<fe;De++){let et=V.getViewport(De);o.set(s.x*et.x,s.y*et.y,s.x*et.z,s.y*et.w),B.viewport(o),V.updateMatrices(J,De),i=V.getFrustum(),E(I,F,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===$i&&C(V,F),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,x,R)};function C(D,I){let F=e.update(y);f.defines.VSM_SAMPLES!==D.blurSamples&&(f.defines.VSM_SAMPLES=D.blurSamples,h.defines.VSM_SAMPLES=D.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Wi(r.x,r.y)),f.uniforms.shadow_pass.value=D.map.texture,f.uniforms.resolution.value=D.mapSize,f.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(I,null,F,f,y,null),h.uniforms.shadow_pass.value=D.mapPass.texture,h.uniforms.resolution.value=D.mapSize,h.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(I,null,F,h,y,null)}function S(D,I,F,M){let x=null,R=F.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(R!==void 0)x=R;else if(x=F.isPointLight===!0?c:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=x.uuid,z=I.uuid,X=l[B];X===void 0&&(X={},l[B]=X);let j=X[z];j===void 0&&(j=x.clone(),X[z]=j,I.addEventListener("dispose",T)),x=j}if(x.visible=I.visible,x.wireframe=I.wireframe,M===$i?x.side=I.shadowSide!==null?I.shadowSide:I.side:x.side=I.shadowSide!==null?I.shadowSide:d[I.side],x.alphaMap=I.alphaMap,x.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,x.map=I.map,x.clipShadows=I.clipShadows,x.clippingPlanes=I.clippingPlanes,x.clipIntersection=I.clipIntersection,x.displacementMap=I.displacementMap,x.displacementScale=I.displacementScale,x.displacementBias=I.displacementBias,x.wireframeLinewidth=I.wireframeLinewidth,x.linewidth=I.linewidth,F.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let B=n.properties.get(x);B.light=F}return x}function E(D,I,F,M,x){if(D.visible===!1)return;if(D.layers.test(I.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&x===$i)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,D.matrixWorld);let z=e.update(D),X=D.material;if(Array.isArray(X)){let j=z.groups;for(let $=0,J=j.length;$<J;$++){let V=j[$],ae=X[V.materialIndex];if(ae&&ae.visible){let fe=S(D,ae,M,x);D.onBeforeShadow(n,D,I,F,z,fe,V),n.renderBufferDirect(F,null,z,fe,D,V),D.onAfterShadow(n,D,I,F,z,fe,V)}}}else if(X.visible){let j=S(D,X,M,x);D.onBeforeShadow(n,D,I,F,z,j,null),n.renderBufferDirect(F,null,z,j,D,null),D.onAfterShadow(n,D,I,F,z,j,null)}}let B=D.children;for(let z=0,X=B.length;z<X;z++)E(B[z],I,F,M,x)}function T(D){D.target.removeEventListener("dispose",T);for(let F in l){let M=l[F],x=D.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}var c2={[Ch]:Th,[Dh]:Rh,[Ah]:Nh,[no]:Ih,[Th]:Ch,[Rh]:Dh,[Nh]:Ah,[Ih]:no};function l2(n,e){function t(){let A=!1,ne=new Ut,se=null,me=new Ut(0,0,0,0);return{setMask:function(Q){se!==Q&&!A&&(n.colorMask(Q,Q,Q,Q),se=Q)},setLocked:function(Q){A=Q},setClear:function(Q,q,_e,Be,Mt){Mt===!0&&(Q*=Be,q*=Be,_e*=Be),ne.set(Q,q,_e,Be),me.equals(ne)===!1&&(n.clearColor(Q,q,_e,Be),me.copy(ne))},reset:function(){A=!1,se=null,me.set(-1,0,0,0)}}}function i(){let A=!1,ne=!1,se=null,me=null,Q=null;return{setReversed:function(q){if(ne!==q){let _e=e.get("EXT_clip_control");q?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ne=q;let Be=Q;Q=null,this.setClear(Be)}},getReversed:function(){return ne},setTest:function(q){q?K(n.DEPTH_TEST):ge(n.DEPTH_TEST)},setMask:function(q){se!==q&&!A&&(n.depthMask(q),se=q)},setFunc:function(q){if(ne&&(q=c2[q]),me!==q){switch(q){case Ch:n.depthFunc(n.NEVER);break;case Th:n.depthFunc(n.ALWAYS);break;case Dh:n.depthFunc(n.LESS);break;case no:n.depthFunc(n.LEQUAL);break;case Ah:n.depthFunc(n.EQUAL);break;case Ih:n.depthFunc(n.GEQUAL);break;case Rh:n.depthFunc(n.GREATER);break;case Nh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=q}},setLocked:function(q){A=q},setClear:function(q){Q!==q&&(ne&&(q=1-q),n.clearDepth(q),Q=q)},reset:function(){A=!1,se=null,me=null,Q=null,ne=!1}}}function r(){let A=!1,ne=null,se=null,me=null,Q=null,q=null,_e=null,Be=null,Mt=null;return{setTest:function(pt){A||(pt?K(n.STENCIL_TEST):ge(n.STENCIL_TEST))},setMask:function(pt){ne!==pt&&!A&&(n.stencilMask(pt),ne=pt)},setFunc:function(pt,Ji,Ci){(se!==pt||me!==Ji||Q!==Ci)&&(n.stencilFunc(pt,Ji,Ci),se=pt,me=Ji,Q=Ci)},setOp:function(pt,Ji,Ci){(q!==pt||_e!==Ji||Be!==Ci)&&(n.stencilOp(pt,Ji,Ci),q=pt,_e=Ji,Be=Ci)},setLocked:function(pt){A=pt},setClear:function(pt){Mt!==pt&&(n.clearStencil(pt),Mt=pt)},reset:function(){A=!1,ne=null,se=null,me=null,Q=null,q=null,_e=null,Be=null,Mt=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],g=null,y=!1,m=null,p=null,C=null,S=null,E=null,T=null,D=null,I=new ft(0,0,0),F=0,M=!1,x=null,R=null,B=null,z=null,X=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,J=0,V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),$=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),$=J>=2);let ae=null,fe={},De=n.getParameter(n.SCISSOR_BOX),et=n.getParameter(n.VIEWPORT),Et=new Ut().fromArray(De),wt=new Ut().fromArray(et);function ht(A,ne,se,me){let Q=new Uint8Array(4),q=n.createTexture();n.bindTexture(A,q),n.texParameteri(A,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(A,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let _e=0;_e<se;_e++)A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY?n.texImage3D(ne,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Q):n.texImage2D(ne+_e,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Q);return q}let W={};W[n.TEXTURE_2D]=ht(n.TEXTURE_2D,n.TEXTURE_2D,1),W[n.TEXTURE_CUBE_MAP]=ht(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[n.TEXTURE_2D_ARRAY]=ht(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),W[n.TEXTURE_3D]=ht(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(n.DEPTH_TEST),o.setFunc(no),Oe(!1),xe(jy),K(n.CULL_FACE),Ct(Sr);function K(A){u[A]!==!0&&(n.enable(A),u[A]=!0)}function ge(A){u[A]!==!1&&(n.disable(A),u[A]=!1)}function Le(A,ne){return d[A]!==ne?(n.bindFramebuffer(A,ne),d[A]=ne,A===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ne),A===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ce(A,ne){let se=h,me=!1;if(A){se=f.get(ne),se===void 0&&(se=[],f.set(ne,se));let Q=A.textures;if(se.length!==Q.length||se[0]!==n.COLOR_ATTACHMENT0){for(let q=0,_e=Q.length;q<_e;q++)se[q]=n.COLOR_ATTACHMENT0+q;se.length=Q.length,me=!0}}else se[0]!==n.BACK&&(se[0]=n.BACK,me=!0);me&&n.drawBuffers(se)}function ot(A){return g!==A?(n.useProgram(A),g=A,!0):!1}let on={[as]:n.FUNC_ADD,[ES]:n.FUNC_SUBTRACT,[MS]:n.FUNC_REVERSE_SUBTRACT};on[bS]=n.MIN,on[SS]=n.MAX;let w={[wS]:n.ZERO,[CS]:n.ONE,[TS]:n.SRC_COLOR,[rh]:n.SRC_ALPHA,[PS]:n.SRC_ALPHA_SATURATE,[RS]:n.DST_COLOR,[AS]:n.DST_ALPHA,[DS]:n.ONE_MINUS_SRC_COLOR,[sh]:n.ONE_MINUS_SRC_ALPHA,[NS]:n.ONE_MINUS_DST_COLOR,[IS]:n.ONE_MINUS_DST_ALPHA,[OS]:n.CONSTANT_COLOR,[FS]:n.ONE_MINUS_CONSTANT_COLOR,[LS]:n.CONSTANT_ALPHA,[kS]:n.ONE_MINUS_CONSTANT_ALPHA};function Ct(A,ne,se,me,Q,q,_e,Be,Mt,pt){if(A===Sr){y===!0&&(ge(n.BLEND),y=!1);return}if(y===!1&&(K(n.BLEND),y=!0),A!==xS){if(A!==m||pt!==M){if((p!==as||E!==as)&&(n.blendEquation(n.FUNC_ADD),p=as,E=as),pt)switch(A){case to:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $y:n.blendFunc(n.ONE,n.ONE);break;case qy:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Xy:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case to:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $y:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case qy:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xy:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}C=null,S=null,T=null,D=null,I.set(0,0,0),F=0,m=A,M=pt}return}Q=Q||ne,q=q||se,_e=_e||me,(ne!==p||Q!==E)&&(n.blendEquationSeparate(on[ne],on[Q]),p=ne,E=Q),(se!==C||me!==S||q!==T||_e!==D)&&(n.blendFuncSeparate(w[se],w[me],w[q],w[_e]),C=se,S=me,T=q,D=_e),(Be.equals(I)===!1||Mt!==F)&&(n.blendColor(Be.r,Be.g,Be.b,Mt),I.copy(Be),F=Mt),m=A,M=!1}function Ge(A,ne){A.side===qi?ge(n.CULL_FACE):K(n.CULL_FACE);let se=A.side===bn;ne&&(se=!se),Oe(se),A.blending===to&&A.transparent===!1?Ct(Sr):Ct(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),o.setFunc(A.depthFunc),o.setTest(A.depthTest),o.setMask(A.depthWrite),s.setMask(A.colorWrite);let me=A.stencilWrite;a.setTest(me),me&&(a.setMask(A.stencilWriteMask),a.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),a.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),Ee(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):ge(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(A){x!==A&&(A?n.frontFace(n.CW):n.frontFace(n.CCW),x=A)}function xe(A){A!==vS?(K(n.CULL_FACE),A!==R&&(A===jy?n.cullFace(n.BACK):A===yS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ge(n.CULL_FACE),R=A}function Tt(A){A!==B&&($&&n.lineWidth(A),B=A)}function Ee(A,ne,se){A?(K(n.POLYGON_OFFSET_FILL),(z!==ne||X!==se)&&(n.polygonOffset(ne,se),z=ne,X=se)):ge(n.POLYGON_OFFSET_FILL)}function Xe(A){A?K(n.SCISSOR_TEST):ge(n.SCISSOR_TEST)}function Zt(A){A===void 0&&(A=n.TEXTURE0+j-1),ae!==A&&(n.activeTexture(A),ae=A)}function Bt(A,ne,se){se===void 0&&(ae===null?se=n.TEXTURE0+j-1:se=ae);let me=fe[se];me===void 0&&(me={type:void 0,texture:void 0},fe[se]=me),(me.type!==A||me.texture!==ne)&&(ae!==se&&(n.activeTexture(se),ae=se),n.bindTexture(A,ne||W[A]),me.type=A,me.texture=ne)}function b(){let A=fe[ae];A!==void 0&&A.type!==void 0&&(n.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function G(){try{n.texSubImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Z(){try{n.texSubImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function we(){try{n.compressedTexSubImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ie(){try{n.texStorage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Me(){try{n.texStorage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function be(){try{n.texImage2D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function te(){try{n.texImage3D(...arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ue(A){Et.equals(A)===!1&&(n.scissor(A.x,A.y,A.z,A.w),Et.copy(A))}function Ne(A){wt.equals(A)===!1&&(n.viewport(A.x,A.y,A.z,A.w),wt.copy(A))}function Se(A,ne){let se=l.get(ne);se===void 0&&(se=new WeakMap,l.set(ne,se));let me=se.get(A);me===void 0&&(me=n.getUniformBlockIndex(ne,A.name),se.set(A,me))}function ce(A,ne){let me=l.get(ne).get(A);c.get(ne)!==me&&(n.uniformBlockBinding(ne,me,A.__bindingPointIndex),c.set(ne,me))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ae=null,fe={},d={},f=new WeakMap,h=[],g=null,y=!1,m=null,p=null,C=null,S=null,E=null,T=null,D=null,I=new ft(0,0,0),F=0,M=!1,x=null,R=null,B=null,z=null,X=null,Et.set(0,0,n.canvas.width,n.canvas.height),wt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:K,disable:ge,bindFramebuffer:Le,drawBuffers:Ce,useProgram:ot,setBlending:Ct,setMaterial:Ge,setFlipSided:Oe,setCullFace:xe,setLineWidth:Tt,setPolygonOffset:Ee,setScissorTest:Xe,activeTexture:Zt,bindTexture:Bt,unbindTexture:b,compressedTexImage2D:v,compressedTexImage3D:O,texImage2D:be,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:ce,texStorage2D:ie,texStorage3D:Me,texSubImage2D:G,texSubImage3D:Z,compressedTexSubImage2D:H,compressedTexSubImage3D:we,scissor:ue,viewport:Ne,reset:We}}function u2(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new lt,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,v){return h?new OffscreenCanvas(b,v):Il("canvas")}function y(b,v,O){let G=1,Z=Bt(b);if((Z.width>O||Z.height>O)&&(G=O/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let H=Math.floor(G*Z.width),we=Math.floor(G*Z.height);d===void 0&&(d=g(H,we));let ie=v?g(H,we):d;return ie.width=H,ie.height=we,ie.getContext("2d").drawImage(b,0,0,H,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+H+"x"+we+")."),ie}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function C(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(b,v,O,G,Z=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let H=v;if(v===n.RED&&(O===n.FLOAT&&(H=n.R32F),O===n.HALF_FLOAT&&(H=n.R16F),O===n.UNSIGNED_BYTE&&(H=n.R8)),v===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.R8UI),O===n.UNSIGNED_SHORT&&(H=n.R16UI),O===n.UNSIGNED_INT&&(H=n.R32UI),O===n.BYTE&&(H=n.R8I),O===n.SHORT&&(H=n.R16I),O===n.INT&&(H=n.R32I)),v===n.RG&&(O===n.FLOAT&&(H=n.RG32F),O===n.HALF_FLOAT&&(H=n.RG16F),O===n.UNSIGNED_BYTE&&(H=n.RG8)),v===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RG8UI),O===n.UNSIGNED_SHORT&&(H=n.RG16UI),O===n.UNSIGNED_INT&&(H=n.RG32UI),O===n.BYTE&&(H=n.RG8I),O===n.SHORT&&(H=n.RG16I),O===n.INT&&(H=n.RG32I)),v===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGB8UI),O===n.UNSIGNED_SHORT&&(H=n.RGB16UI),O===n.UNSIGNED_INT&&(H=n.RGB32UI),O===n.BYTE&&(H=n.RGB8I),O===n.SHORT&&(H=n.RGB16I),O===n.INT&&(H=n.RGB32I)),v===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),O===n.UNSIGNED_INT&&(H=n.RGBA32UI),O===n.BYTE&&(H=n.RGBA8I),O===n.SHORT&&(H=n.RGBA16I),O===n.INT&&(H=n.RGBA32I)),v===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),v===n.RGBA){let we=Z?Dl:ct.getTransfer(G);O===n.FLOAT&&(H=n.RGBA32F),O===n.HALF_FLOAT&&(H=n.RGBA16F),O===n.UNSIGNED_BYTE&&(H=we===vt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function E(b,v){let O;return b?v===null||v===hs||v===Ha?O=n.DEPTH24_STENCIL8:v===Yi?O=n.DEPTH32F_STENCIL8:v===Ba&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===hs||v===Ha?O=n.DEPTH_COMPONENT24:v===Yi?O=n.DEPTH_COMPONENT32F:v===Ba&&(O=n.DEPTH_COMPONENT16),O}function T(b,v){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==ci&&b.minFilter!==Rn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function D(b){let v=b.target;v.removeEventListener("dispose",D),F(v),v.isVideoTexture&&u.delete(v)}function I(b){let v=b.target;v.removeEventListener("dispose",I),x(v)}function F(b){let v=i.get(b);if(v.__webglInit===void 0)return;let O=b.source,G=f.get(O);if(G){let Z=G[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&M(b),Object.keys(G).length===0&&f.delete(O)}i.remove(b)}function M(b){let v=i.get(b);n.deleteTexture(v.__webglTexture);let O=b.source,G=f.get(O);delete G[v.__cacheKey],o.memory.textures--}function x(b){let v=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let Z=0;Z<v.__webglFramebuffer[G].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[G][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)n.deleteFramebuffer(v.__webglFramebuffer[G]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let O=b.textures;for(let G=0,Z=O.length;G<Z;G++){let H=i.get(O[G]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),o.memory.textures--),i.remove(O[G])}i.remove(b)}let R=0;function B(){R=0}function z(){let b=R;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),R+=1,b}function X(b){let v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function j(b,v){let O=i.get(b);if(b.isVideoTexture&&Xe(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&O.__version!==b.version){let G=b.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(O,b,v);return}}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+v)}function $(b,v){let O=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){W(O,b,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+v)}function J(b,v){let O=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){W(O,b,v);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+v)}function V(b,v){let O=i.get(b);if(b.version>0&&O.__version!==b.version){K(O,b,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+v)}let ae={[oh]:n.REPEAT,[os]:n.CLAMP_TO_EDGE,[ah]:n.MIRRORED_REPEAT},fe={[ci]:n.NEAREST,[qS]:n.NEAREST_MIPMAP_NEAREST,[Wl]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[Fh]:n.LINEAR_MIPMAP_NEAREST,[fs]:n.LINEAR_MIPMAP_LINEAR},De={[KS]:n.NEVER,[rw]:n.ALWAYS,[QS]:n.LESS,[r_]:n.LEQUAL,[ew]:n.EQUAL,[iw]:n.GEQUAL,[tw]:n.GREATER,[nw]:n.NOTEQUAL};function et(b,v){if(v.type===Yi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Rn||v.magFilter===Fh||v.magFilter===Wl||v.magFilter===fs||v.minFilter===Rn||v.minFilter===Fh||v.minFilter===Wl||v.minFilter===fs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,ae[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ae[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ae[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,fe[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,fe[v.minFilter]),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,De[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===ci||v.minFilter!==Wl&&v.minFilter!==fs||v.type===Yi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Et(b,v){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",D));let G=v.source,Z=f.get(G);Z===void 0&&(Z={},f.set(G,Z));let H=X(v);if(H!==b.__cacheKey){Z[H]===void 0&&(Z[H]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Z[H].usedTimes++;let we=Z[b.__cacheKey];we!==void 0&&(Z[b.__cacheKey].usedTimes--,we.usedTimes===0&&M(v)),b.__cacheKey=H,b.__webglTexture=Z[H].texture}return O}function wt(b,v,O){return Math.floor(Math.floor(b/O)/v)}function ht(b,v,O,G){let H=b.updateRanges;if(H.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,O,G,v.data);else{H.sort((te,ue)=>te.start-ue.start);let we=0;for(let te=1;te<H.length;te++){let ue=H[we],Ne=H[te],Se=ue.start+ue.count,ce=wt(Ne.start,v.width,4),We=wt(ue.start,v.width,4);Ne.start<=Se+1&&ce===We&&wt(Ne.start+Ne.count-1,v.width,4)===ce?ue.count=Math.max(ue.count,Ne.start+Ne.count-ue.start):(++we,H[we]=Ne)}H.length=we+1;let ie=n.getParameter(n.UNPACK_ROW_LENGTH),Me=n.getParameter(n.UNPACK_SKIP_PIXELS),be=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let te=0,ue=H.length;te<ue;te++){let Ne=H[te],Se=Math.floor(Ne.start/4),ce=Math.ceil(Ne.count/4),We=Se%v.width,A=Math.floor(Se/v.width),ne=ce,se=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,We),n.pixelStorei(n.UNPACK_SKIP_ROWS,A),t.texSubImage2D(n.TEXTURE_2D,0,We,A,ne,se,O,G,v.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ie),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Me),n.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function W(b,v,O){let G=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=n.TEXTURE_3D);let Z=Et(b,v),H=v.source;t.bindTexture(G,b.__webglTexture,n.TEXTURE0+O);let we=i.get(H);if(H.version!==we.__version||Z===!0){t.activeTexture(n.TEXTURE0+O);let ie=ct.getPrimaries(ct.workingColorSpace),Me=v.colorSpace===Cr?null:ct.getPrimaries(v.colorSpace),be=v.colorSpace===Cr||ie===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let te=y(v.image,!1,r.maxTextureSize);te=Zt(v,te);let ue=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type),Se=S(v.internalFormat,ue,Ne,v.colorSpace,v.isVideoTexture);et(G,v);let ce,We=v.mipmaps,A=v.isVideoTexture!==!0,ne=we.__version===void 0||Z===!0,se=H.dataReady,me=T(v,te);if(v.isDepthTexture)Se=E(v.format===za,v.type),ne&&(A?t.texStorage2D(n.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Se,te.width,te.height,0,ue,Ne,null));else if(v.isDataTexture)if(We.length>0){A&&ne&&t.texStorage2D(n.TEXTURE_2D,me,Se,We[0].width,We[0].height);for(let Q=0,q=We.length;Q<q;Q++)ce=We[Q],A?se&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,ce.width,ce.height,ue,Ne,ce.data):t.texImage2D(n.TEXTURE_2D,Q,Se,ce.width,ce.height,0,ue,Ne,ce.data);v.generateMipmaps=!1}else A?(ne&&t.texStorage2D(n.TEXTURE_2D,me,Se,te.width,te.height),se&&ht(v,te,ue,Ne)):t.texImage2D(n.TEXTURE_2D,0,Se,te.width,te.height,0,ue,Ne,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){A&&ne&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Se,We[0].width,We[0].height,te.depth);for(let Q=0,q=We.length;Q<q;Q++)if(ce=We[Q],v.format!==li)if(ue!==null)if(A){if(se)if(v.layerUpdates.size>0){let _e=u_(ce.width,ce.height,v.format,v.type);for(let Be of v.layerUpdates){let Mt=ce.data.subarray(Be*_e/ce.data.BYTES_PER_ELEMENT,(Be+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,Be,ce.width,ce.height,1,ue,Mt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ce.width,ce.height,te.depth,ue,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,Se,ce.width,ce.height,te.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else A?se&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ce.width,ce.height,te.depth,ue,Ne,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Q,Se,ce.width,ce.height,te.depth,0,ue,Ne,ce.data)}else{A&&ne&&t.texStorage2D(n.TEXTURE_2D,me,Se,We[0].width,We[0].height);for(let Q=0,q=We.length;Q<q;Q++)ce=We[Q],v.format!==li?ue!==null?A?se&&t.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,ce.width,ce.height,ue,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,Q,Se,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):A?se&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,ce.width,ce.height,ue,Ne,ce.data):t.texImage2D(n.TEXTURE_2D,Q,Se,ce.width,ce.height,0,ue,Ne,ce.data)}else if(v.isDataArrayTexture)if(A){if(ne&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Se,te.width,te.height,te.depth),se)if(v.layerUpdates.size>0){let Q=u_(te.width,te.height,v.format,v.type);for(let q of v.layerUpdates){let _e=te.data.subarray(q*Q/te.data.BYTES_PER_ELEMENT,(q+1)*Q/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,q,te.width,te.height,1,ue,Ne,_e)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ue,Ne,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,ue,Ne,te.data);else if(v.isData3DTexture)A?(ne&&t.texStorage3D(n.TEXTURE_3D,me,Se,te.width,te.height,te.depth),se&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ue,Ne,te.data)):t.texImage3D(n.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,ue,Ne,te.data);else if(v.isFramebufferTexture){if(ne)if(A)t.texStorage2D(n.TEXTURE_2D,me,Se,te.width,te.height);else{let Q=te.width,q=te.height;for(let _e=0;_e<me;_e++)t.texImage2D(n.TEXTURE_2D,_e,Se,Q,q,0,ue,Ne,null),Q>>=1,q>>=1}}else if(We.length>0){if(A&&ne){let Q=Bt(We[0]);t.texStorage2D(n.TEXTURE_2D,me,Se,Q.width,Q.height)}for(let Q=0,q=We.length;Q<q;Q++)ce=We[Q],A?se&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,ue,Ne,ce):t.texImage2D(n.TEXTURE_2D,Q,Se,ue,Ne,ce);v.generateMipmaps=!1}else if(A){if(ne){let Q=Bt(te);t.texStorage2D(n.TEXTURE_2D,me,Se,Q.width,Q.height)}se&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Ne,te)}else t.texImage2D(n.TEXTURE_2D,0,Se,ue,Ne,te);m(v)&&p(G),we.__version=H.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function K(b,v,O){if(v.image.length!==6)return;let G=Et(b,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+O);let H=i.get(Z);if(Z.version!==H.__version||G===!0){t.activeTexture(n.TEXTURE0+O);let we=ct.getPrimaries(ct.workingColorSpace),ie=v.colorSpace===Cr?null:ct.getPrimaries(v.colorSpace),Me=v.colorSpace===Cr||we===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let be=v.isCompressedTexture||v.image[0].isCompressedTexture,te=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let q=0;q<6;q++)!be&&!te?ue[q]=y(v.image[q],!0,r.maxCubemapSize):ue[q]=te?v.image[q].image:v.image[q],ue[q]=Zt(v,ue[q]);let Ne=ue[0],Se=s.convert(v.format,v.colorSpace),ce=s.convert(v.type),We=S(v.internalFormat,Se,ce,v.colorSpace),A=v.isVideoTexture!==!0,ne=H.__version===void 0||G===!0,se=Z.dataReady,me=T(v,Ne);et(n.TEXTURE_CUBE_MAP,v);let Q;if(be){A&&ne&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,We,Ne.width,Ne.height);for(let q=0;q<6;q++){Q=ue[q].mipmaps;for(let _e=0;_e<Q.length;_e++){let Be=Q[_e];v.format!==li?Se!==null?A?se&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,0,0,Be.width,Be.height,Se,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,We,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):A?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,0,0,Be.width,Be.height,Se,ce,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e,We,Be.width,Be.height,0,Se,ce,Be.data)}}}else{if(Q=v.mipmaps,A&&ne){Q.length>0&&me++;let q=Bt(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,We,q.width,q.height)}for(let q=0;q<6;q++)if(te){A?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ue[q].width,ue[q].height,Se,ce,ue[q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,We,ue[q].width,ue[q].height,0,Se,ce,ue[q].data);for(let _e=0;_e<Q.length;_e++){let Mt=Q[_e].image[q].image;A?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,0,0,Mt.width,Mt.height,Se,ce,Mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,We,Mt.width,Mt.height,0,Se,ce,Mt.data)}}else{A?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Se,ce,ue[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,We,Se,ce,ue[q]);for(let _e=0;_e<Q.length;_e++){let Be=Q[_e];A?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,0,0,Se,ce,Be.image[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e+1,We,Se,ce,Be.image[q])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),H.__version=Z.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function ge(b,v,O,G,Z,H){let we=s.convert(O.format,O.colorSpace),ie=s.convert(O.type),Me=S(O.internalFormat,we,ie,O.colorSpace),be=i.get(v),te=i.get(O);if(te.__renderTarget=v,!be.__hasExternalTextures){let ue=Math.max(1,v.width>>H),Ne=Math.max(1,v.height>>H);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,H,Me,ue,Ne,v.depth,0,we,ie,null):t.texImage2D(Z,H,Me,ue,Ne,0,we,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Ee(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,Z,te.__webglTexture,0,Tt(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,Z,te.__webglTexture,H),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Le(b,v,O){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer){let G=v.depthTexture,Z=G&&G.isDepthTexture?G.type:null,H=E(v.stencilBuffer,Z),we=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=Tt(v);Ee(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,H,v.width,v.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,H,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,H,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,b)}else{let G=v.textures;for(let Z=0;Z<G.length;Z++){let H=G[Z],we=s.convert(H.format,H.colorSpace),ie=s.convert(H.type),Me=S(H.internalFormat,we,ie,H.colorSpace),be=Tt(v);O&&Ee(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,Me,v.width,v.height):Ee(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,Me,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Me,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=i.get(v.depthTexture);G.__renderTarget=v,(!G.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);let Z=G.__webglTexture,H=Tt(v);if(v.depthTexture.format===Na)Ee(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(v.depthTexture.format===za)Ee(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function ot(b){let v=i.get(b),O=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){let G=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){let Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=G}if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let G=b.texture.mipmaps;G&&G.length>0?Ce(v.__webglFramebuffer[0],b):Ce(v.__webglFramebuffer,b)}else if(O){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=n.createRenderbuffer(),Le(v.__webglDepthbuffer[G],b,!1);else{let Z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,H)}}else{let G=b.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Le(v.__webglDepthbuffer,b,!1);else{let Z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,H)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function on(b,v,O){let G=i.get(b);v!==void 0&&ge(G.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&ot(b)}function w(b){let v=b.texture,O=i.get(b),G=i.get(v);b.addEventListener("dispose",I);let Z=b.textures,H=b.isWebGLCubeRenderTarget===!0,we=Z.length>1;if(we||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=v.version,o.memory.textures++),H){O.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ie]=[];for(let Me=0;Me<v.mipmaps.length;Me++)O.__webglFramebuffer[ie][Me]=n.createFramebuffer()}else O.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ie=0;ie<v.mipmaps.length;ie++)O.__webglFramebuffer[ie]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(we)for(let ie=0,Me=Z.length;ie<Me;ie++){let be=i.get(Z[ie]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&Ee(b)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ie=0;ie<Z.length;ie++){let Me=Z[ie];O.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[ie]);let be=s.convert(Me.format,Me.colorSpace),te=s.convert(Me.type),ue=S(Me.internalFormat,be,te,Me.colorSpace,b.isXRRenderTarget===!0),Ne=Tt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,ue,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,O.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Le(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),et(n.TEXTURE_CUBE_MAP,v);for(let ie=0;ie<6;ie++)if(v.mipmaps&&v.mipmaps.length>0)for(let Me=0;Me<v.mipmaps.length;Me++)ge(O.__webglFramebuffer[ie][Me],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Me);else ge(O.__webglFramebuffer[ie],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let ie=0,Me=Z.length;ie<Me;ie++){let be=Z[ie],te=i.get(be),ue=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,te.__webglTexture),et(ue,be),ge(O.__webglFramebuffer,b,be,n.COLOR_ATTACHMENT0+ie,ue,0),m(be)&&p(ue)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,G.__webglTexture),et(ie,v),v.mipmaps&&v.mipmaps.length>0)for(let Me=0;Me<v.mipmaps.length;Me++)ge(O.__webglFramebuffer[Me],b,v,n.COLOR_ATTACHMENT0,ie,Me);else ge(O.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,ie,0);m(v)&&p(ie),t.unbindTexture()}b.depthBuffer&&ot(b)}function Ct(b){let v=b.textures;for(let O=0,G=v.length;O<G;O++){let Z=v[O];if(m(Z)){let H=C(b),we=i.get(Z).__webglTexture;t.bindTexture(H,we),p(H),t.unbindTexture()}}}let Ge=[],Oe=[];function xe(b){if(b.samples>0){if(Ee(b)===!1){let v=b.textures,O=b.width,G=b.height,Z=n.COLOR_BUFFER_BIT,H=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(b),ie=v.length>1;if(ie)for(let be=0;be<v.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);let Me=b.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let be=0;be<v.length;be++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[be]);let te=i.get(v[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,O,G,0,0,O,G,Z,n.NEAREST),c===!0&&(Ge.length=0,Oe.length=0,Ge.push(n.COLOR_ATTACHMENT0+be),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Ge.push(H),Oe.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let be=0;be<v.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,we.__webglColorRenderbuffer[be]);let te=i.get(v[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){let v=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Tt(b){return Math.min(r.maxSamples,b.samples)}function Ee(b){let v=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Xe(b){let v=o.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function Zt(b,v){let O=b.colorSpace,G=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==io&&O!==Cr&&(ct.getTransfer(O)===vt?(G!==li||Z!==Xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Bt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=$,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=on,this.setupRenderTarget=w,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ee}function d2(n,e){function t(i,r=Cr){let s,o=ct.getTransfer(r);if(i===Xi)return n.UNSIGNED_BYTE;if(i===kh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ky)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qy)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zy)return n.BYTE;if(i===Jy)return n.SHORT;if(i===Ba)return n.UNSIGNED_SHORT;if(i===Lh)return n.INT;if(i===hs)return n.UNSIGNED_INT;if(i===Yi)return n.FLOAT;if(i===Va)return n.HALF_FLOAT;if(i===e_)return n.ALPHA;if(i===t_)return n.RGB;if(i===li)return n.RGBA;if(i===Na)return n.DEPTH_COMPONENT;if(i===za)return n.DEPTH_STENCIL;if(i===n_)return n.RED;if(i===Bh)return n.RED_INTEGER;if(i===i_)return n.RG;if(i===Vh)return n.RG_INTEGER;if(i===Hh)return n.RGBA_INTEGER;if(i===$l||i===ql||i===Xl||i===Yl)if(o===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===$l)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ql)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===$l)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ql)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Xl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Yl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zh||i===Gh||i===jh||i===Wh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===zh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$h||i===qh||i===Xh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===$h||i===qh)return o===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Xh)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Yh||i===Zh||i===Jh||i===Kh||i===Qh||i===ep||i===tp||i===np||i===ip||i===rp||i===sp||i===op||i===ap||i===cp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Yh)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zh)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Jh)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kh)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qh)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ep)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tp)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===np)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ip)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===rp)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sp)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===op)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ap)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===cp)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lp||i===up||i===dp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===lp)return o===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===up)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fp||i===hp||i===pp||i===mp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===fp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===hp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pp)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ha?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var f2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,h2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,b_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new zl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new qn({vertexShader:f2,fragmentShader:h2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nn(new oo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},S_=class extends Mr{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,y=typeof XRWebGLBinding<"u",m=new b_,p={},C=t.getContextAttributes(),S=null,E=null,T=[],D=[],I=new lt,F=null,M=new In;M.viewport=new Ut;let x=new In;x.viewport=new Ut;let R=[M,x],B=new wh,z=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let K=T[W];return K===void 0&&(K=new ka,T[W]=K),K.getTargetRaySpace()},this.getControllerGrip=function(W){let K=T[W];return K===void 0&&(K=new ka,T[W]=K),K.getGripSpace()},this.getHand=function(W){let K=T[W];return K===void 0&&(K=new ka,T[W]=K),K.getHandSpace()};function j(W){let K=D.indexOf(W.inputSource);if(K===-1)return;let ge=T[K];ge!==void 0&&(ge.update(W.inputSource,W.frame,l||o),ge.dispatchEvent({type:W.type,data:W.inputSource}))}function $(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",J);for(let W=0;W<T.length;W++){let K=D[W];K!==null&&(D[W]=null,T[W].disconnect(K))}z=null,X=null,m.reset();for(let W in p)delete p[W];e.setRenderTarget(S),h=null,f=null,d=null,r=null,E=null,ht.stop(),i.isPresenting=!1,e.setPixelRatio(F),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=function(W){return Ki(this,null,function*(){if(r=W,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",$),r.addEventListener("inputsourceschange",J),C.xrCompatible!==!0&&(yield t.makeXRCompatible()),F=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Le=null,Ce=null;C.depth&&(Ce=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=C.stencil?za:Na,Le=C.stencil?Ha:hs);let ot={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(ot),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Wi(f.textureWidth,f.textureHeight,{format:li,type:Xi,depthTexture:new Hl(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let ge={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),E=new Wi(h.framebufferWidth,h.framebufferHeight,{format:li,type:Xi,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=yield r.requestReferenceSpace(a),ht.setContext(r),ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(W){for(let K=0;K<W.removed.length;K++){let ge=W.removed[K],Le=D.indexOf(ge);Le>=0&&(D[Le]=null,T[Le].disconnect(ge))}for(let K=0;K<W.added.length;K++){let ge=W.added[K],Le=D.indexOf(ge);if(Le===-1){for(let ot=0;ot<T.length;ot++)if(ot>=D.length){D.push(ge),Le=ot;break}else if(D[ot]===null){D[ot]=ge,Le=ot;break}if(Le===-1)break}let Ce=T[Le];Ce&&Ce.connect(ge)}}let V=new k,ae=new k;function fe(W,K,ge){V.setFromMatrixPosition(K.matrixWorld),ae.setFromMatrixPosition(ge.matrixWorld);let Le=V.distanceTo(ae),Ce=K.projectionMatrix.elements,ot=ge.projectionMatrix.elements,on=Ce[14]/(Ce[10]-1),w=Ce[14]/(Ce[10]+1),Ct=(Ce[9]+1)/Ce[5],Ge=(Ce[9]-1)/Ce[5],Oe=(Ce[8]-1)/Ce[0],xe=(ot[8]+1)/ot[0],Tt=on*Oe,Ee=on*xe,Xe=Le/(-Oe+xe),Zt=Xe*-Oe;if(K.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Zt),W.translateZ(Xe),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ce[10]===-1)W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let Bt=on+Xe,b=w+Xe,v=Tt-Zt,O=Ee+(Le-Zt),G=Ct*w/b*Bt,Z=Ge*w/b*Bt;W.projectionMatrix.makePerspective(v,O,G,Z,Bt,b),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function De(W,K){K===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(K.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let K=W.near,ge=W.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),B.near=x.near=M.near=K,B.far=x.far=M.far=ge,(z!==B.near||X!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),z=B.near,X=B.far),B.layers.mask=W.layers.mask|6,M.layers.mask=B.layers.mask&3,x.layers.mask=B.layers.mask&5;let Le=W.parent,Ce=B.cameras;De(B,Le);for(let ot=0;ot<Ce.length;ot++)De(Ce[ot],Le);Ce.length===2?fe(B,M,x):B.projectionMatrix.copy(M.projectionMatrix),et(W,B,Le)};function et(W,K,ge){ge===null?W.matrix.copy(K.matrixWorld):(W.matrix.copy(ge.matrixWorld),W.matrix.invert(),W.matrix.multiply(K.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=lh*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(W){c=W,f!==null&&(f.fixedFoveation=W),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=W)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(W){return p[W]};let Et=null;function wt(W,K){if(u=K.getViewerPose(l||o),g=K,u!==null){let ge=u.views;h!==null&&(e.setRenderTargetFramebuffer(E,h.framebuffer),e.setRenderTarget(E));let Le=!1;ge.length!==B.cameras.length&&(B.cameras.length=0,Le=!0);for(let w=0;w<ge.length;w++){let Ct=ge[w],Ge=null;if(h!==null)Ge=h.getViewport(Ct);else{let xe=d.getViewSubImage(f,Ct);Ge=xe.viewport,w===0&&(e.setRenderTargetTextures(E,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(E))}let Oe=R[w];Oe===void 0&&(Oe=new In,Oe.layers.enable(w),Oe.viewport=new Ut,R[w]=Oe),Oe.matrix.fromArray(Ct.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Ct.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),w===0&&(B.matrix.copy(Oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Le===!0&&B.cameras.push(Oe)}let Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let w=d.getDepthInformation(ge[0]);w&&w.isValid&&w.texture&&m.init(w,r.renderState)}if(Ce&&Ce.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let w=0;w<ge.length;w++){let Ct=ge[w].camera;if(Ct){let Ge=p[Ct];Ge||(Ge=new zl,p[Ct]=Ge);let Oe=d.getCameraImage(Ct);Ge.sourceTexture=Oe}}}}for(let ge=0;ge<T.length;ge++){let Le=D[ge],Ce=T[ge];Le!==null&&Ce!==void 0&&Ce.update(Le,K,l||o)}Et&&Et(W,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),g=null}let ht=new Nw;ht.setAnimationLoop(wt),this.setAnimationLoop=function(W){Et=W},this.dispose=function(){}}},po=new ro,p2=new qt;function m2(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,a_(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,C,S,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,E)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,C,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===bn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===bn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let C=e.get(p),S=C.envMap,E=C.envMapRotation;S&&(m.envMap.value=S,po.copy(E),po.x*=-1,po.y*=-1,po.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(po.y*=-1,po.z*=-1),m.envMapRotation.value.setFromMatrix4(p2.makeRotationFromEuler(po)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,C,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*C,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,C){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===bn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let C=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function g2(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(C,S){let E=S.program;i.uniformBlockBinding(C,E)}function l(C,S){let E=r[C.id];E===void 0&&(g(C),E=u(C),r[C.id]=E,C.addEventListener("dispose",m));let T=S.program;i.updateUBOMapping(C,T);let D=e.render.frame;s[C.id]!==D&&(f(C),s[C.id]=D)}function u(C){let S=d();C.__bindingPointIndex=S;let E=n.createBuffer(),T=C.__size,D=C.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,T,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,E),E}function d(){for(let C=0;C<a;C++)if(o.indexOf(C)===-1)return o.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(C){let S=r[C.id],E=C.uniforms,T=C.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let D=0,I=E.length;D<I;D++){let F=Array.isArray(E[D])?E[D]:[E[D]];for(let M=0,x=F.length;M<x;M++){let R=F[M];if(h(R,D,M,T)===!0){let B=R.__offset,z=Array.isArray(R.value)?R.value:[R.value],X=0;for(let j=0;j<z.length;j++){let $=z[j],J=y($);typeof $=="number"||typeof $=="boolean"?(R.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,B+X,R.__data)):$.isMatrix3?(R.__data[0]=$.elements[0],R.__data[1]=$.elements[1],R.__data[2]=$.elements[2],R.__data[3]=0,R.__data[4]=$.elements[3],R.__data[5]=$.elements[4],R.__data[6]=$.elements[5],R.__data[7]=0,R.__data[8]=$.elements[6],R.__data[9]=$.elements[7],R.__data[10]=$.elements[8],R.__data[11]=0):($.toArray(R.__data,X),X+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(C,S,E,T){let D=C.value,I=S+"_"+E;if(T[I]===void 0)return typeof D=="number"||typeof D=="boolean"?T[I]=D:T[I]=D.clone(),!0;{let F=T[I];if(typeof D=="number"||typeof D=="boolean"){if(F!==D)return T[I]=D,!0}else if(F.equals(D)===!1)return F.copy(D),!0}return!1}function g(C){let S=C.uniforms,E=0,T=16;for(let I=0,F=S.length;I<F;I++){let M=Array.isArray(S[I])?S[I]:[S[I]];for(let x=0,R=M.length;x<R;x++){let B=M[x],z=Array.isArray(B.value)?B.value:[B.value];for(let X=0,j=z.length;X<j;X++){let $=z[X],J=y($),V=E%T,ae=V%J.boundary,fe=V+ae;E+=ae,fe!==0&&T-fe<J.storage&&(E+=T-fe),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=J.storage}}}let D=E%T;return D>0&&(E+=T-D),C.__size=E,C.__cache={},this}function y(C){let S={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(S.boundary=4,S.storage=4):C.isVector2?(S.boundary=8,S.storage=8):C.isVector3||C.isColor?(S.boundary=16,S.storage=12):C.isVector4?(S.boundary=16,S.storage=16):C.isMatrix3?(S.boundary=48,S.storage=48):C.isMatrix4?(S.boundary=64,S.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),S}function m(C){let S=C.target;S.removeEventListener("dispose",m);let E=o.indexOf(S.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(let C in r)n.deleteBuffer(r[C]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}var xp=class{constructor(e={}){let{canvas:t=sw(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,p=null,C=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,T=!1;this._outputColorSpace=Wn;let D=0,I=0,F=null,M=-1,x=null,R=new Ut,B=new Ut,z=null,X=new ft(0),j=0,$=t.width,J=t.height,V=1,ae=null,fe=null,De=new Ut(0,0,$,J),et=new Ut(0,0,$,J),Et=!1,wt=new Bl,ht=!1,W=!1,K=new qt,ge=new k,Le=new Ut,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ot=!1;function on(){return F===null?V:1}let w=i;function Ct(_,N){return t.getContext(_,N)}try{let _={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",Q,!1),w===null){let N="webgl2";if(w=Ct(N,_),w===null)throw Ct(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let Ge,Oe,xe,Tt,Ee,Xe,Zt,Bt,b,v,O,G,Z,H,we,ie,Me,be,te,ue,Ne,Se,ce,We;function A(){Ge=new OL(w),Ge.init(),Se=new d2(w,Ge),Oe=new TL(w,Ge,e,Se),xe=new l2(w,Ge),Oe.reversedDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),Tt=new kL(w),Ee=new Zk,Xe=new u2(w,Ge,xe,Ee,Oe,Se,Tt),Zt=new AL(E),Bt=new PL(E),b=new GP(w),ce=new wL(w,b),v=new FL(w,b,Tt,ce),O=new BL(w,v,b,Tt),te=new UL(w,Oe,Xe),ie=new DL(Ee),G=new Yk(E,Zt,Bt,Ge,Oe,ce,ie),Z=new m2(E,Ee),H=new Kk,we=new r2(Ge),be=new SL(E,Zt,Bt,xe,O,h,c),Me=new a2(E,O,Oe),We=new g2(w,Tt,Oe,xe),ue=new CL(w,Ge,Tt),Ne=new LL(w,Ge,Tt),Tt.programs=G.programs,E.capabilities=Oe,E.extensions=Ge,E.properties=Ee,E.renderLists=H,E.shadowMap=Me,E.state=xe,E.info=Tt}A();let ne=new S_(E,w);this.xr=ne,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let _=Ge.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Ge.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(_){_!==void 0&&(V=_,this.setSize($,J,!1))},this.getSize=function(_){return _.set($,J)},this.setSize=function(_,N,L=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=_,J=N,t.width=Math.floor(_*V),t.height=Math.floor(N*V),L===!0&&(t.style.width=_+"px",t.style.height=N+"px"),this.setViewport(0,0,_,N)},this.getDrawingBufferSize=function(_){return _.set($*V,J*V).floor()},this.setDrawingBufferSize=function(_,N,L){$=_,J=N,V=L,t.width=Math.floor(_*L),t.height=Math.floor(N*L),this.setViewport(0,0,_,N)},this.getCurrentViewport=function(_){return _.copy(R)},this.getViewport=function(_){return _.copy(De)},this.setViewport=function(_,N,L,U){_.isVector4?De.set(_.x,_.y,_.z,_.w):De.set(_,N,L,U),xe.viewport(R.copy(De).multiplyScalar(V).round())},this.getScissor=function(_){return _.copy(et)},this.setScissor=function(_,N,L,U){_.isVector4?et.set(_.x,_.y,_.z,_.w):et.set(_,N,L,U),xe.scissor(B.copy(et).multiplyScalar(V).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(_){xe.setScissorTest(Et=_)},this.setOpaqueSort=function(_){ae=_},this.setTransparentSort=function(_){fe=_},this.getClearColor=function(_){return _.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(_=!0,N=!0,L=!0){let U=0;if(_){let P=!1;if(F!==null){let ee=F.texture.format;P=ee===Hh||ee===Vh||ee===Bh}if(P){let ee=F.texture.type,le=ee===Xi||ee===hs||ee===Ba||ee===Ha||ee===kh||ee===Uh,ve=be.getClearColor(),he=be.getClearAlpha(),Re=ve.r,Fe=ve.g,Ae=ve.b;le?(g[0]=Re,g[1]=Fe,g[2]=Ae,g[3]=he,w.clearBufferuiv(w.COLOR,0,g)):(y[0]=Re,y[1]=Fe,y[2]=Ae,y[3]=he,w.clearBufferiv(w.COLOR,0,y))}else U|=w.COLOR_BUFFER_BIT}N&&(U|=w.DEPTH_BUFFER_BIT),L&&(U|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),be.dispose(),H.dispose(),we.dispose(),Ee.dispose(),Zt.dispose(),Bt.dispose(),O.dispose(),ce.dispose(),We.dispose(),G.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",Ci),ne.removeEventListener("sessionend",N_),ps.stop()};function se(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let _=Tt.autoReset,N=Me.enabled,L=Me.autoUpdate,U=Me.needsUpdate,P=Me.type;A(),Tt.autoReset=_,Me.enabled=N,Me.autoUpdate=L,Me.needsUpdate=U,Me.type=P}function Q(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function q(_){let N=_.target;N.removeEventListener("dispose",q),_e(N)}function _e(_){Be(_),Ee.remove(_)}function Be(_){let N=Ee.get(_).programs;N!==void 0&&(N.forEach(function(L){G.releaseProgram(L)}),_.isShaderMaterial&&G.releaseShaderCache(_))}this.renderBufferDirect=function(_,N,L,U,P,ee){N===null&&(N=Ce);let le=P.isMesh&&P.matrixWorld.determinant()<0,ve=aC(_,N,L,U,P);xe.setMaterial(U,le);let he=L.index,Re=1;if(U.wireframe===!0){if(he=v.getWireframeAttribute(L),he===void 0)return;Re=2}let Fe=L.drawRange,Ae=L.attributes.position,nt=Fe.start*Re,yt=(Fe.start+Fe.count)*Re;ee!==null&&(nt=Math.max(nt,ee.start*Re),yt=Math.min(yt,(ee.start+ee.count)*Re)),he!==null?(nt=Math.max(nt,0),yt=Math.min(yt,he.count)):Ae!=null&&(nt=Math.max(nt,0),yt=Math.min(yt,Ae.count));let Nt=yt-nt;if(Nt<0||Nt===1/0)return;ce.setup(P,U,ve,L,he);let bt,_t=ue;if(he!==null&&(bt=b.get(he),_t=Ne,_t.setIndex(bt)),P.isMesh)U.wireframe===!0?(xe.setLineWidth(U.wireframeLinewidth*on()),_t.setMode(w.LINES)):_t.setMode(w.TRIANGLES);else if(P.isLine){let Ie=U.linewidth;Ie===void 0&&(Ie=1),xe.setLineWidth(Ie*on()),P.isLineSegments?_t.setMode(w.LINES):P.isLineLoop?_t.setMode(w.LINE_LOOP):_t.setMode(w.LINE_STRIP)}else P.isPoints?_t.setMode(w.POINTS):P.isSprite&&_t.setMode(w.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)Pa("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))_t.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{let Ie=P._multiDrawStarts,Dt=P._multiDrawCounts,ut=P._multiDrawCount,Pn=he?b.get(he).bytesPerElement:1,yo=Ee.get(U).currentProgram.getUniforms();for(let On=0;On<ut;On++)yo.setValue(w,"_gl_DrawID",On),_t.render(Ie[On]/Pn,Dt[On])}else if(P.isInstancedMesh)_t.renderInstances(nt,Nt,P.count);else if(L.isInstancedBufferGeometry){let Ie=L._maxInstanceCount!==void 0?L._maxInstanceCount:1/0,Dt=Math.min(L.instanceCount,Ie);_t.renderInstances(nt,Nt,Dt)}else _t.render(nt,Nt)};function Mt(_,N,L){_.transparent===!0&&_.side===qi&&_.forceSinglePass===!1?(_.side=bn,_.needsUpdate=!0,su(_,N,L),_.side=Er,_.needsUpdate=!0,su(_,N,L),_.side=qi):su(_,N,L)}this.compile=function(_,N,L=null){L===null&&(L=_),p=we.get(L),p.init(N),S.push(p),L.traverseVisible(function(P){P.isLight&&P.layers.test(N.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),_!==L&&_.traverseVisible(function(P){P.isLight&&P.layers.test(N.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),p.setupLights();let U=new Set;return _.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;let ee=P.material;if(ee)if(Array.isArray(ee))for(let le=0;le<ee.length;le++){let ve=ee[le];Mt(ve,L,P),U.add(ve)}else Mt(ee,L,P),U.add(ee)}),p=S.pop(),U},this.compileAsync=function(_,N,L=null){let U=this.compile(_,N,L);return new Promise(P=>{function ee(){if(U.forEach(function(le){Ee.get(le).currentProgram.isReady()&&U.delete(le)}),U.size===0){P(_);return}setTimeout(ee,10)}Ge.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let pt=null;function Ji(_){pt&&pt(_)}function Ci(){ps.stop()}function N_(){ps.start()}let ps=new Nw;ps.setAnimationLoop(Ji),typeof self<"u"&&ps.setContext(self),this.setAnimationLoop=function(_){pt=_,ne.setAnimationLoop(_),_===null?ps.stop():ps.start()},ne.addEventListener("sessionstart",Ci),ne.addEventListener("sessionend",N_),this.render=function(_,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(N),N=ne.getCamera()),_.isScene===!0&&_.onBeforeRender(E,_,N,F),p=we.get(_,S.length),p.init(N),S.push(p),K.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),wt.setFromProjectionMatrix(K,wi,N.reversedDepth),W=this.localClippingEnabled,ht=ie.init(this.clippingPlanes,W),m=H.get(_,C.length),m.init(),C.push(m),ne.enabled===!0&&ne.isPresenting===!0){let ee=E.xr.getDepthSensingMesh();ee!==null&&Op(ee,N,-1/0,E.sortObjects)}Op(_,N,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(ae,fe),ot=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,ot&&be.addToRenderList(m,_),this.info.render.frame++,ht===!0&&ie.beginShadows();let L=p.state.shadowsArray;Me.render(L,_,N),ht===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let U=m.opaque,P=m.transmissive;if(p.setupLights(),N.isArrayCamera){let ee=N.cameras;if(P.length>0)for(let le=0,ve=ee.length;le<ve;le++){let he=ee[le];O_(U,P,_,he)}ot&&be.render(_);for(let le=0,ve=ee.length;le<ve;le++){let he=ee[le];P_(m,_,he,he.viewport)}}else P.length>0&&O_(U,P,_,N),ot&&be.render(_),P_(m,_,N);F!==null&&I===0&&(Xe.updateMultisampleRenderTarget(F),Xe.updateRenderTargetMipmap(F)),_.isScene===!0&&_.onAfterRender(E,_,N),ce.resetDefaultState(),M=-1,x=null,S.pop(),S.length>0?(p=S[S.length-1],ht===!0&&ie.setGlobalState(E.clippingPlanes,p.state.camera)):p=null,C.pop(),C.length>0?m=C[C.length-1]:m=null};function Op(_,N,L,U){if(_.visible===!1)return;if(_.layers.test(N.layers)){if(_.isGroup)L=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(N);else if(_.isLight)p.pushLight(_),_.castShadow&&p.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||wt.intersectsSprite(_)){U&&Le.setFromMatrixPosition(_.matrixWorld).applyMatrix4(K);let le=O.update(_),ve=_.material;ve.visible&&m.push(_,le,ve,L,Le.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||wt.intersectsObject(_))){let le=O.update(_),ve=_.material;if(U&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),Le.copy(_.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Le.copy(le.boundingSphere.center)),Le.applyMatrix4(_.matrixWorld).applyMatrix4(K)),Array.isArray(ve)){let he=le.groups;for(let Re=0,Fe=he.length;Re<Fe;Re++){let Ae=he[Re],nt=ve[Ae.materialIndex];nt&&nt.visible&&m.push(_,le,nt,L,Le.z,Ae)}}else ve.visible&&m.push(_,le,ve,L,Le.z,null)}}let ee=_.children;for(let le=0,ve=ee.length;le<ve;le++)Op(ee[le],N,L,U)}function P_(_,N,L,U){let P=_.opaque,ee=_.transmissive,le=_.transparent;p.setupLightsView(L),ht===!0&&ie.setGlobalState(E.clippingPlanes,L),U&&xe.viewport(R.copy(U)),P.length>0&&ru(P,N,L),ee.length>0&&ru(ee,N,L),le.length>0&&ru(le,N,L),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function O_(_,N,L,U){if((L.isScene===!0?L.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[U.id]===void 0&&(p.state.transmissionRenderTarget[U.id]=new Wi(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Va:Xi,minFilter:fs,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace}));let ee=p.state.transmissionRenderTarget[U.id],le=U.viewport||R;ee.setSize(le.z*E.transmissionResolutionScale,le.w*E.transmissionResolutionScale);let ve=E.getRenderTarget(),he=E.getActiveCubeFace(),Re=E.getActiveMipmapLevel();E.setRenderTarget(ee),E.getClearColor(X),j=E.getClearAlpha(),j<1&&E.setClearColor(16777215,.5),E.clear(),ot&&be.render(L);let Fe=E.toneMapping;E.toneMapping=wr;let Ae=U.viewport;if(U.viewport!==void 0&&(U.viewport=void 0),p.setupLightsView(U),ht===!0&&ie.setGlobalState(E.clippingPlanes,U),ru(_,L,U),Xe.updateMultisampleRenderTarget(ee),Xe.updateRenderTargetMipmap(ee),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let yt=0,Nt=N.length;yt<Nt;yt++){let bt=N[yt],_t=bt.object,Ie=bt.geometry,Dt=bt.material,ut=bt.group;if(Dt.side===qi&&_t.layers.test(U.layers)){let Pn=Dt.side;Dt.side=bn,Dt.needsUpdate=!0,F_(_t,L,U,Ie,Dt,ut),Dt.side=Pn,Dt.needsUpdate=!0,nt=!0}}nt===!0&&(Xe.updateMultisampleRenderTarget(ee),Xe.updateRenderTargetMipmap(ee))}E.setRenderTarget(ve,he,Re),E.setClearColor(X,j),Ae!==void 0&&(U.viewport=Ae),E.toneMapping=Fe}function ru(_,N,L){let U=N.isScene===!0?N.overrideMaterial:null;for(let P=0,ee=_.length;P<ee;P++){let le=_[P],ve=le.object,he=le.geometry,Re=le.group,Fe=le.material;Fe.allowOverride===!0&&U!==null&&(Fe=U),ve.layers.test(L.layers)&&F_(ve,N,L,he,Fe,Re)}}function F_(_,N,L,U,P,ee){_.onBeforeRender(E,N,L,U,P,ee),_.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),P.onBeforeRender(E,N,L,U,_,ee),P.transparent===!0&&P.side===qi&&P.forceSinglePass===!1?(P.side=bn,P.needsUpdate=!0,E.renderBufferDirect(L,N,U,P,_,ee),P.side=Er,P.needsUpdate=!0,E.renderBufferDirect(L,N,U,P,_,ee),P.side=qi):E.renderBufferDirect(L,N,U,P,_,ee),_.onAfterRender(E,N,L,U,P,ee)}function su(_,N,L){N.isScene!==!0&&(N=Ce);let U=Ee.get(_),P=p.state.lights,ee=p.state.shadowsArray,le=P.state.version,ve=G.getParameters(_,P.state,ee,N,L),he=G.getProgramCacheKey(ve),Re=U.programs;U.environment=_.isMeshStandardMaterial?N.environment:null,U.fog=N.fog,U.envMap=(_.isMeshStandardMaterial?Bt:Zt).get(_.envMap||U.environment),U.envMapRotation=U.environment!==null&&_.envMap===null?N.environmentRotation:_.envMapRotation,Re===void 0&&(_.addEventListener("dispose",q),Re=new Map,U.programs=Re);let Fe=Re.get(he);if(Fe!==void 0){if(U.currentProgram===Fe&&U.lightsStateVersion===le)return k_(_,ve),Fe}else ve.uniforms=G.getUniforms(_),_.onBeforeCompile(ve,E),Fe=G.acquireProgram(ve,he),Re.set(he,Fe),U.uniforms=ve.uniforms;let Ae=U.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Ae.clippingPlanes=ie.uniform),k_(_,ve),U.needsLights=lC(_),U.lightsStateVersion=le,U.needsLights&&(Ae.ambientLightColor.value=P.state.ambient,Ae.lightProbe.value=P.state.probe,Ae.directionalLights.value=P.state.directional,Ae.directionalLightShadows.value=P.state.directionalShadow,Ae.spotLights.value=P.state.spot,Ae.spotLightShadows.value=P.state.spotShadow,Ae.rectAreaLights.value=P.state.rectArea,Ae.ltc_1.value=P.state.rectAreaLTC1,Ae.ltc_2.value=P.state.rectAreaLTC2,Ae.pointLights.value=P.state.point,Ae.pointLightShadows.value=P.state.pointShadow,Ae.hemisphereLights.value=P.state.hemi,Ae.directionalShadowMap.value=P.state.directionalShadowMap,Ae.directionalShadowMatrix.value=P.state.directionalShadowMatrix,Ae.spotShadowMap.value=P.state.spotShadowMap,Ae.spotLightMatrix.value=P.state.spotLightMatrix,Ae.spotLightMap.value=P.state.spotLightMap,Ae.pointShadowMap.value=P.state.pointShadowMap,Ae.pointShadowMatrix.value=P.state.pointShadowMatrix),U.currentProgram=Fe,U.uniformsList=null,Fe}function L_(_){if(_.uniformsList===null){let N=_.currentProgram.getUniforms();_.uniformsList=Wa.seqWithValue(N.seq,_.uniforms)}return _.uniformsList}function k_(_,N){let L=Ee.get(_);L.outputColorSpace=N.outputColorSpace,L.batching=N.batching,L.batchingColor=N.batchingColor,L.instancing=N.instancing,L.instancingColor=N.instancingColor,L.instancingMorph=N.instancingMorph,L.skinning=N.skinning,L.morphTargets=N.morphTargets,L.morphNormals=N.morphNormals,L.morphColors=N.morphColors,L.morphTargetsCount=N.morphTargetsCount,L.numClippingPlanes=N.numClippingPlanes,L.numIntersection=N.numClipIntersection,L.vertexAlphas=N.vertexAlphas,L.vertexTangents=N.vertexTangents,L.toneMapping=N.toneMapping}function aC(_,N,L,U,P){N.isScene!==!0&&(N=Ce),Xe.resetTextureUnits();let ee=N.fog,le=U.isMeshStandardMaterial?N.environment:null,ve=F===null?E.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:io,he=(U.isMeshStandardMaterial?Bt:Zt).get(U.envMap||le),Re=U.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,Fe=!!L.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Ae=!!L.morphAttributes.position,nt=!!L.morphAttributes.normal,yt=!!L.morphAttributes.color,Nt=wr;U.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Nt=E.toneMapping);let bt=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,_t=bt!==void 0?bt.length:0,Ie=Ee.get(U),Dt=p.state.lights;if(ht===!0&&(W===!0||_!==x)){let pn=_===x&&U.id===M;ie.setState(U,_,pn)}let ut=!1;U.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Dt.state.version||Ie.outputColorSpace!==ve||P.isBatchedMesh&&Ie.batching===!1||!P.isBatchedMesh&&Ie.batching===!0||P.isBatchedMesh&&Ie.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&Ie.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&Ie.instancing===!1||!P.isInstancedMesh&&Ie.instancing===!0||P.isSkinnedMesh&&Ie.skinning===!1||!P.isSkinnedMesh&&Ie.skinning===!0||P.isInstancedMesh&&Ie.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Ie.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&Ie.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&Ie.instancingMorph===!1&&P.morphTexture!==null||Ie.envMap!==he||U.fog===!0&&Ie.fog!==ee||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ie.numPlanes||Ie.numIntersection!==ie.numIntersection)||Ie.vertexAlphas!==Re||Ie.vertexTangents!==Fe||Ie.morphTargets!==Ae||Ie.morphNormals!==nt||Ie.morphColors!==yt||Ie.toneMapping!==Nt||Ie.morphTargetsCount!==_t)&&(ut=!0):(ut=!0,Ie.__version=U.version);let Pn=Ie.currentProgram;ut===!0&&(Pn=su(U,N,P));let yo=!1,On=!1,Qa=!1,At=Pn.getUniforms(),Yn=Ie.uniforms;if(xe.useProgram(Pn.program)&&(yo=!0,On=!0,Qa=!0),U.id!==M&&(M=U.id,On=!0),yo||x!==_){xe.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),At.setValue(w,"projectionMatrix",_.projectionMatrix),At.setValue(w,"viewMatrix",_.matrixWorldInverse);let Sn=At.map.cameraPosition;Sn!==void 0&&Sn.setValue(w,ge.setFromMatrixPosition(_.matrixWorld)),Oe.logarithmicDepthBuffer&&At.setValue(w,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&At.setValue(w,"isOrthographic",_.isOrthographicCamera===!0),x!==_&&(x=_,On=!0,Qa=!0)}if(P.isSkinnedMesh){At.setOptional(w,P,"bindMatrix"),At.setOptional(w,P,"bindMatrixInverse");let pn=P.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),At.setValue(w,"boneTexture",pn.boneTexture,Xe))}P.isBatchedMesh&&(At.setOptional(w,P,"batchingTexture"),At.setValue(w,"batchingTexture",P._matricesTexture,Xe),At.setOptional(w,P,"batchingIdTexture"),At.setValue(w,"batchingIdTexture",P._indirectTexture,Xe),At.setOptional(w,P,"batchingColorTexture"),P._colorsTexture!==null&&At.setValue(w,"batchingColorTexture",P._colorsTexture,Xe));let Zn=L.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&te.update(P,L,Pn),(On||Ie.receiveShadow!==P.receiveShadow)&&(Ie.receiveShadow=P.receiveShadow,At.setValue(w,"receiveShadow",P.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(Yn.envMap.value=he,Yn.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),U.isMeshStandardMaterial&&U.envMap===null&&N.environment!==null&&(Yn.envMapIntensity.value=N.environmentIntensity),On&&(At.setValue(w,"toneMappingExposure",E.toneMappingExposure),Ie.needsLights&&cC(Yn,Qa),ee&&U.fog===!0&&Z.refreshFogUniforms(Yn,ee),Z.refreshMaterialUniforms(Yn,U,V,J,p.state.transmissionRenderTarget[_.id]),Wa.upload(w,L_(Ie),Yn,Xe)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Wa.upload(w,L_(Ie),Yn,Xe),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&At.setValue(w,"center",P.center),At.setValue(w,"modelViewMatrix",P.modelViewMatrix),At.setValue(w,"normalMatrix",P.normalMatrix),At.setValue(w,"modelMatrix",P.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){let pn=U.uniformsGroups;for(let Sn=0,Fp=pn.length;Sn<Fp;Sn++){let ms=pn[Sn];We.update(ms,Pn),We.bind(ms,Pn)}}return Pn}function cC(_,N){_.ambientLightColor.needsUpdate=N,_.lightProbe.needsUpdate=N,_.directionalLights.needsUpdate=N,_.directionalLightShadows.needsUpdate=N,_.pointLights.needsUpdate=N,_.pointLightShadows.needsUpdate=N,_.spotLights.needsUpdate=N,_.spotLightShadows.needsUpdate=N,_.rectAreaLights.needsUpdate=N,_.hemisphereLights.needsUpdate=N}function lC(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(_,N,L){let U=Ee.get(_);U.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,U.__autoAllocateDepthBuffer===!1&&(U.__useRenderToTexture=!1),Ee.get(_.texture).__webglTexture=N,Ee.get(_.depthTexture).__webglTexture=U.__autoAllocateDepthBuffer?void 0:L,U.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,N){let L=Ee.get(_);L.__webglFramebuffer=N,L.__useDefaultFramebuffer=N===void 0};let uC=w.createFramebuffer();this.setRenderTarget=function(_,N=0,L=0){F=_,D=N,I=L;let U=!0,P=null,ee=!1,le=!1;if(_){let he=Ee.get(_);if(he.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(w.FRAMEBUFFER,null),U=!1;else if(he.__webglFramebuffer===void 0)Xe.setupRenderTarget(_);else if(he.__hasExternalTextures)Xe.rebindTextures(_,Ee.get(_.texture).__webglTexture,Ee.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Ae=_.depthTexture;if(he.__boundDepthTexture!==Ae){if(Ae!==null&&Ee.has(Ae)&&(_.width!==Ae.image.width||_.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(_)}}let Re=_.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(le=!0);let Fe=Ee.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Fe[N])?P=Fe[N][L]:P=Fe[N],ee=!0):_.samples>0&&Xe.useMultisampledRTT(_)===!1?P=Ee.get(_).__webglMultisampledFramebuffer:Array.isArray(Fe)?P=Fe[L]:P=Fe,R.copy(_.viewport),B.copy(_.scissor),z=_.scissorTest}else R.copy(De).multiplyScalar(V).floor(),B.copy(et).multiplyScalar(V).floor(),z=Et;if(L!==0&&(P=uC),xe.bindFramebuffer(w.FRAMEBUFFER,P)&&U&&xe.drawBuffers(_,P),xe.viewport(R),xe.scissor(B),xe.setScissorTest(z),ee){let he=Ee.get(_.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+N,he.__webglTexture,L)}else if(le){let he=N;for(let Re=0;Re<_.textures.length;Re++){let Fe=Ee.get(_.textures[Re]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Re,Fe.__webglTexture,L,he)}}else if(_!==null&&L!==0){let he=Ee.get(_.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,he.__webglTexture,L)}M=-1},this.readRenderTargetPixels=function(_,N,L,U,P,ee,le,ve=0){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=Ee.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&le!==void 0&&(he=he[le]),he){xe.bindFramebuffer(w.FRAMEBUFFER,he);try{let Re=_.textures[ve],Fe=Re.format,Ae=Re.type;if(!Oe.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=_.width-U&&L>=0&&L<=_.height-P&&(_.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ve),w.readPixels(N,L,U,P,Se.convert(Fe),Se.convert(Ae),ee))}finally{let Re=F!==null?Ee.get(F).__webglFramebuffer:null;xe.bindFramebuffer(w.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=function(_,N,L,U,P,ee,le,ve=0){return Ki(this,null,function*(){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=Ee.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&le!==void 0&&(he=he[le]),he)if(N>=0&&N<=_.width-U&&L>=0&&L<=_.height-P){xe.bindFramebuffer(w.FRAMEBUFFER,he);let Re=_.textures[ve],Fe=Re.format,Ae=Re.type;if(!Oe.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,nt),w.bufferData(w.PIXEL_PACK_BUFFER,ee.byteLength,w.STREAM_READ),_.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ve),w.readPixels(N,L,U,P,Se.convert(Fe),Se.convert(Ae),0);let yt=F!==null?Ee.get(F).__webglFramebuffer:null;xe.bindFramebuffer(w.FRAMEBUFFER,yt);let Nt=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),yield ow(w,Nt,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,nt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,ee),w.deleteBuffer(nt),w.deleteSync(Nt),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")})},this.copyFramebufferToTexture=function(_,N=null,L=0){let U=Math.pow(2,-L),P=Math.floor(_.image.width*U),ee=Math.floor(_.image.height*U),le=N!==null?N.x:0,ve=N!==null?N.y:0;Xe.setTexture2D(_,0),w.copyTexSubImage2D(w.TEXTURE_2D,L,0,0,le,ve,P,ee),xe.unbindTexture()};let dC=w.createFramebuffer(),fC=w.createFramebuffer();this.copyTextureToTexture=function(_,N,L=null,U=null,P=0,ee=null){ee===null&&(P!==0?(Pa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=P,P=0):ee=0);let le,ve,he,Re,Fe,Ae,nt,yt,Nt,bt=_.isCompressedTexture?_.mipmaps[ee]:_.image;if(L!==null)le=L.max.x-L.min.x,ve=L.max.y-L.min.y,he=L.isBox3?L.max.z-L.min.z:1,Re=L.min.x,Fe=L.min.y,Ae=L.isBox3?L.min.z:0;else{let Zn=Math.pow(2,-P);le=Math.floor(bt.width*Zn),ve=Math.floor(bt.height*Zn),_.isDataArrayTexture?he=bt.depth:_.isData3DTexture?he=Math.floor(bt.depth*Zn):he=1,Re=0,Fe=0,Ae=0}U!==null?(nt=U.x,yt=U.y,Nt=U.z):(nt=0,yt=0,Nt=0);let _t=Se.convert(N.format),Ie=Se.convert(N.type),Dt;N.isData3DTexture?(Xe.setTexture3D(N,0),Dt=w.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Xe.setTexture2DArray(N,0),Dt=w.TEXTURE_2D_ARRAY):(Xe.setTexture2D(N,0),Dt=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,N.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,N.unpackAlignment);let ut=w.getParameter(w.UNPACK_ROW_LENGTH),Pn=w.getParameter(w.UNPACK_IMAGE_HEIGHT),yo=w.getParameter(w.UNPACK_SKIP_PIXELS),On=w.getParameter(w.UNPACK_SKIP_ROWS),Qa=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,bt.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,bt.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Re),w.pixelStorei(w.UNPACK_SKIP_ROWS,Fe),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ae);let At=_.isDataArrayTexture||_.isData3DTexture,Yn=N.isDataArrayTexture||N.isData3DTexture;if(_.isDepthTexture){let Zn=Ee.get(_),pn=Ee.get(N),Sn=Ee.get(Zn.__renderTarget),Fp=Ee.get(pn.__renderTarget);xe.bindFramebuffer(w.READ_FRAMEBUFFER,Sn.__webglFramebuffer),xe.bindFramebuffer(w.DRAW_FRAMEBUFFER,Fp.__webglFramebuffer);for(let ms=0;ms<he;ms++)At&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ee.get(_).__webglTexture,P,Ae+ms),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ee.get(N).__webglTexture,ee,Nt+ms)),w.blitFramebuffer(Re,Fe,le,ve,nt,yt,le,ve,w.DEPTH_BUFFER_BIT,w.NEAREST);xe.bindFramebuffer(w.READ_FRAMEBUFFER,null),xe.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(P!==0||_.isRenderTargetTexture||Ee.has(_)){let Zn=Ee.get(_),pn=Ee.get(N);xe.bindFramebuffer(w.READ_FRAMEBUFFER,dC),xe.bindFramebuffer(w.DRAW_FRAMEBUFFER,fC);for(let Sn=0;Sn<he;Sn++)At?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Zn.__webglTexture,P,Ae+Sn):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Zn.__webglTexture,P),Yn?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,pn.__webglTexture,ee,Nt+Sn):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,pn.__webglTexture,ee),P!==0?w.blitFramebuffer(Re,Fe,le,ve,nt,yt,le,ve,w.COLOR_BUFFER_BIT,w.NEAREST):Yn?w.copyTexSubImage3D(Dt,ee,nt,yt,Nt+Sn,Re,Fe,le,ve):w.copyTexSubImage2D(Dt,ee,nt,yt,Re,Fe,le,ve);xe.bindFramebuffer(w.READ_FRAMEBUFFER,null),xe.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Yn?_.isDataTexture||_.isData3DTexture?w.texSubImage3D(Dt,ee,nt,yt,Nt,le,ve,he,_t,Ie,bt.data):N.isCompressedArrayTexture?w.compressedTexSubImage3D(Dt,ee,nt,yt,Nt,le,ve,he,_t,bt.data):w.texSubImage3D(Dt,ee,nt,yt,Nt,le,ve,he,_t,Ie,bt):_.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,ee,nt,yt,le,ve,_t,Ie,bt.data):_.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,ee,nt,yt,bt.width,bt.height,_t,bt.data):w.texSubImage2D(w.TEXTURE_2D,ee,nt,yt,le,ve,_t,Ie,bt);w.pixelStorei(w.UNPACK_ROW_LENGTH,ut),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Pn),w.pixelStorei(w.UNPACK_SKIP_PIXELS,yo),w.pixelStorei(w.UNPACK_SKIP_ROWS,On),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Qa),ee===0&&N.generateMipmaps&&w.generateMipmap(Dt),xe.unbindTexture()},this.initRenderTarget=function(_){Ee.get(_).__webglFramebuffer===void 0&&Xe.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?Xe.setTextureCube(_,0):_.isData3DTexture?Xe.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?Xe.setTexture2DArray(_,0):Xe.setTexture2D(_,0),xe.unbindTexture()},this.resetState=function(){D=0,I=0,F=null,xe.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}};var jw=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,i){this._renderer=t,this._elementRef=i}setProperty(t,i){this._renderer.setProperty(this._elementRef.nativeElement,t,i)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(i){return new(i||n)(He(Bs),He(gi))};static \u0275dir=Dn({type:n})}return n})(),y2=(()=>{class n extends jw{static \u0275fac=(()=>{let t;return function(r){return(t||(t=Xo(n)))(r||n)}})();static \u0275dir=Dn({type:n,features:[Vs]})}return n})(),Ww=new pe("");var _2={provide:Ww,useExisting:Ts(()=>Ya),multi:!0};function x2(){let n=oi()?oi().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}var E2=new pe(""),Ya=(()=>{class n extends jw{_compositionMode;_composing=!1;constructor(t,i,r){super(t,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!x2())}writeValue(t){let i=t??"";this.setProperty("value",i)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(i){return new(i||n)(He(Bs),He(gi),He(E2,8))};static \u0275dir=Dn({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&xn("input",function(o){return r._handleInput(o.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(o){return r._compositionEnd(o.target.value)})},standalone:!1,features:[Wd([_2]),Vs]})}return n})();var M2=new pe(""),b2=new pe("");function $w(n){return n!=null}function qw(n){return jr(n)?Ot(n):n}function Xw(n){let e={};return n.forEach(t=>{e=t!=null?re(re({},e),t):e}),Object.keys(e).length===0?null:e}function Yw(n,e){return e.map(t=>t(n))}function S2(n){return!n.validate}function Zw(n){return n.map(e=>S2(e)?e:t=>e.validate(t))}function w2(n){if(!n)return null;let e=n.filter($w);return e.length==0?null:function(t){return Xw(Yw(t,e))}}function Jw(n){return n!=null?w2(Zw(n)):null}function C2(n){if(!n)return null;let e=n.filter($w);return e.length==0?null:function(t){let i=Yw(t,e).map(qw);return tm(i).pipe(qe(Xw))}}function Kw(n){return n!=null?C2(Zw(n)):null}function kw(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function T2(n){return n._rawValidators}function D2(n){return n._rawAsyncValidators}function C_(n){return n?Array.isArray(n)?n:[n]:[]}function bp(n,e){return Array.isArray(n)?n.includes(e):n===e}function Uw(n,e){let t=C_(e);return C_(n).forEach(r=>{bp(t,r)||t.push(r)}),t}function Bw(n,e){return C_(e).filter(t=>!bp(n,t))}var Sp=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Jw(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Kw(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}},T_=class extends Sp{name;get formDirective(){return null}get path(){return null}},nu=class extends Sp{_parent=null;name=null;valueAccessor=null},D_=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},A2={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},TQ=Je(re({},A2),{"[class.ng-submitted]":"isSubmitted"}),Cp=(()=>{class n extends D_{constructor(t){super(t)}static \u0275fac=function(i){return new(i||n)(He(nu,2))};static \u0275dir=Dn({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&_i("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[Vs]})}return n})();var Kl="VALID",Mp="INVALID",qa="PENDING",Ql="DISABLED",vo=class{},wp=class extends vo{value;source;constructor(e,t){super(),this.value=e,this.source=t}},eu=class extends vo{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}},tu=class extends vo{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}},Xa=class extends vo{status;source;constructor(e,t){super(),this.status=e,this.source=t}};var A_=class extends vo{source;constructor(e){super(),this.source=e}};function I2(n){return(Tp(n)?n.validators:n)||null}function R2(n){return Array.isArray(n)?Jw(n):n||null}function N2(n,e){return(Tp(e)?e.asyncValidators:n)||null}function P2(n){return Array.isArray(n)?Kw(n):n||null}function Tp(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}var I_=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return sn(this.statusReactive)}set status(e){sn(()=>this.statusReactive.set(e))}_status=Wc(()=>this.statusReactive());statusReactive=si(void 0);get valid(){return this.status===Kl}get invalid(){return this.status===Mp}get pending(){return this.status==qa}get disabled(){return this.status===Ql}get enabled(){return this.status!==Ql}errors;get pristine(){return sn(this.pristineReactive)}set pristine(e){sn(()=>this.pristineReactive.set(e))}_pristine=Wc(()=>this.pristineReactive());pristineReactive=si(!0);get dirty(){return!this.pristine}get touched(){return sn(this.touchedReactive)}set touched(e){sn(()=>this.touchedReactive.set(e))}_touched=Wc(()=>this.touchedReactive());touchedReactive=si(!1);get untouched(){return!this.touched}_events=new St;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(Uw(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(Uw(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(Bw(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(Bw(e,this._rawAsyncValidators))}hasValidator(e){return bp(this._rawValidators,e)}hasAsyncValidator(e){return bp(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let i=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsTouched(Je(re({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new tu(!0,i))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:i})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,i),t&&e.emitEvent!==!1&&this._events.next(new tu(!1,i))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let i=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsDirty(Je(re({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new eu(!1,i))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e,i),t&&e.emitEvent!==!1&&this._events.next(new eu(!0,i))}markAsPending(e={}){this.status=qa;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Xa(this.status,t)),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.markAsPending(Je(re({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Ql,this.errors=null,this._forEachChild(r=>{r.disable(Je(re({},e),{onlySelf:!0}))}),this._updateValue();let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new wp(this.value,i)),this._events.next(new Xa(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Je(re({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Kl,this._forEachChild(i=>{i.enable(Je(re({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(Je(re({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e,t){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine({},t),this._parent._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Kl||this.status===qa)&&this._runAsyncValidator(i,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new wp(this.value,t)),this._events.next(new Xa(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(Je(re({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ql:Kl}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=qa,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let i=qw(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((i,r)=>i&&i._find(r),this)}getError(e,t){let i=t?this.get(t):this;return i&&i.errors?i.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,i){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||i)&&this._events.next(new Xa(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,i)}_initObservables(){this.valueChanges=new Wt,this.statusChanges=new Wt}_calculateStatus(){return this._allControlsDisabled()?Ql:this.errors?Mp:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(qa)?qa:this._anyControlsHaveStatus(Mp)?Mp:Kl}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,this._parent&&!e.onlySelf&&this._parent._updatePristine(e,t),r&&this._events.next(new eu(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new tu(this.touched,t)),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){Tp(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let t=this._parent&&this._parent.dirty;return!e&&!!t&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=R2(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=P2(this._rawAsyncValidators)}};var R_=new pe("",{providedIn:"root",factory:()=>Dp}),Dp="always";function O2(n,e){return[...e.path,n]}function F2(n,e,t=Dp){k2(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(n.disabled),U2(n,e),V2(n,e),B2(n,e),L2(n,e)}function Vw(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function L2(n,e){if(e.valueAccessor.setDisabledState){let t=i=>{e.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function k2(n,e){let t=T2(n);e.validator!==null?n.setValidators(kw(t,e.validator)):typeof t=="function"&&n.setValidators([t]);let i=D2(n);e.asyncValidator!==null?n.setAsyncValidators(kw(i,e.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();Vw(e._rawValidators,r),Vw(e._rawAsyncValidators,r)}function U2(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&Qw(n,e)})}function B2(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&Qw(n,e),n.updateOn!=="submit"&&n.markAsTouched()})}function Qw(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function V2(n,e){let t=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function H2(n,e){if(!n.hasOwnProperty("model"))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function z2(n){return Object.getPrototypeOf(n.constructor)===y2}function G2(n,e){if(!e)return null;Array.isArray(e);let t,i,r;return e.forEach(s=>{s.constructor===Ya?t=s:z2(s)?i=s:r=s}),r||i||t||null}function Hw(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function zw(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var j2=class extends I_{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,i){super(I2(t),N2(i,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Tp(t)&&(t.nonNullable||t.initialValueIsDefault)&&(zw(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new A_(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Hw(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Hw(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){zw(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var W2={provide:nu,useExisting:Ts(()=>iu)},Gw=Promise.resolve(),iu=(()=>{class n extends nu{_changeDetectorRef;callSetDisabledState;control=new j2;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new Wt;constructor(t,i,r,s,o,a){super(),this._changeDetectorRef=o,this.callSetDisabledState=a,this._parent=t,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=G2(this,s)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let i=t.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),H2(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){F2(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){Gw.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let i=t.isDisabled.currentValue,r=i!==0&&ta(i);Gw.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?O2(t,this._parent):[t]}static \u0275fac=function(i){return new(i||n)(He(T_,9),He(M2,10),He(b2,10),He(Ww,10),He(ea,8),He(R_,8))};static \u0275dir=Dn({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[Wd([W2]),Vs,Gr]})}return n})();var $2=new pe("");var eC=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=yi({type:n});static \u0275inj=Jn({})}return n})();var Ap=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:R_,useValue:t.callSetDisabledState??Dp}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=yi({type:n});static \u0275inj=Jn({imports:[eC]})}return n})(),tC=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:$2,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:R_,useValue:t.callSetDisabledState??Dp}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=yi({type:n});static \u0275inj=Jn({imports:[eC]})}return n})();var Za={api:"http://localhost:5000/api"};var Ja=class n{constructor(e){this.http=e}API_URL=Za.api;getSugestoes(e){return this.http.get(`${this.API_URL}/autocomplete?q=${e}`)}static \u0275fac=function(t){return new(t||n)(Te(Zr))};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})};var Ka=class n{constructor(e){this.http=e}API_URL=Za.api;buscar(e){return this.http.get(`${this.API_URL}/resultados?q=${e}`)}static \u0275fac=function(t){return new(t||n)(Te(Zr))};static \u0275prov=ye({token:n,factory:n.\u0275fac,providedIn:"root"})};var q2=["threeContainer"];function X2(n,e){if(n&1){let t=qr();at(0,"li",9),xn("click",function(){let r=ii(t).$implicit,s=$t(2);return ri(s.selecionarSugestao(r))}),Rt(1),rt()}if(n&2){let t=e.$implicit,i=e.index,r=$t(2);_i("selecionado",i===r.indiceSelecionado),it(),Xr(" ",t," ")}}function Y2(n,e){if(n&1&&(at(0,"ul",7),Bn(1,X2,2,3,"li",8),rt()),n&2){let t=$t();it(),It("ngForOf",t.sugestoes)}}var Ip=class n{constructor(e,t,i,r,s){this.autoComplete=e;this.buscaService=t;this.zone=i;this.router=r;this.location=s;this.consultaSubject.pipe(ac(250),cc()).subscribe(o=>this.carregarSugestoes(o))}consulta="";resultados=[];carregando=!1;sugestoes=[];indiceSelecionado=-1;consultaSubject=new St;onInput(e){this.consultaSubject.next(e)}carregarSugestoes(e){if(!e.trim()){this.sugestoes=[],this.indiceSelecionado=-1;return}this.autoComplete.getSugestoes(e).subscribe({next:t=>{this.sugestoes=t,this.indiceSelecionado=-1},error:t=>console.error("Erro no autocomplete:",t)})}selecionarSugestao(e){this.consulta=e,this.sugestoes=[],this.indiceSelecionado=-1,this.onBuscar()}onBuscar(){if(this.consulta.trim()){let e=this.consulta.trim().replace(/\s+/g,"+");this.router.navigate(["/resultados"],{queryParams:{q:e}}).then(()=>{let i=this.location.path().replace(/%2B/g,"+");this.location.replaceState(i)})}}onKeyDown(e){this.sugestoes.length!==0&&(e.key==="ArrowDown"?(this.indiceSelecionado=(this.indiceSelecionado+1)%this.sugestoes.length,e.preventDefault()):e.key==="ArrowUp"?(this.indiceSelecionado=(this.indiceSelecionado-1+this.sugestoes.length)%this.sugestoes.length,e.preventDefault()):e.key==="Enter"&&(this.indiceSelecionado>=0?(this.selecionarSugestao(this.sugestoes[this.indiceSelecionado]),e.preventDefault()):this.onBuscar()))}threeContainer;renderer;scene;camera;mesh;uniforms;ngAfterViewInit(){this.zone.runOutsideAngular(()=>this.initThree())}initThree(){this.scene=new Ul;let e=window.innerWidth,t=window.innerHeight;this.camera=new Ua(-e/2,e/2,t/2,-t/2,.1,10),this.camera.position.z=2,this.renderer=new xp({antialias:!0,alpha:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(window.devicePixelRatio),this.threeContainer.nativeElement.appendChild(this.renderer.domElement);let i=window.devicePixelRatio*2,r=document.createElement("canvas"),s=r.getContext("2d");r.width=1024*i,r.height=512*i,s.scale(i,i),s.fillStyle="rgba(255,255,255,0)",s.fillRect(0,0,r.width,r.height),s.shadowColor="rgba(0, 0, 0, 0.4)",s.shadowBlur=25,s.shadowOffsetX=8,s.shadowOffsetY=8,s.font="bold 100px Poppins, sans-serif",s.fillStyle="rgba(255, 80, 114, 1)",s.textAlign="center",s.textBaseline="middle",s.fillText("Bubble",1024/2,512/2);let o=new Vl(r);o.minFilter=Rn,o.magFilter=Rn,o.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),o.needsUpdate=!0;let a=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,c=`
      uniform float time;
      uniform vec2 mouse;
      uniform sampler2D tex;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float wave = sin(uv.y * 10.0 + time * 0.6) * 0.004;
        uv.x += wave;
        float dist = distance(uv, mouse);
        uv += 0.006 * vec2(
          sin(dist * 35.0 - time * 1.5),
          cos(dist * 35.0 - time * 1.5)
        );
        vec4 color = texture2D(tex, uv);
        float glow = smoothstep(0.0, 0.3, 1.0 - dist);
        vec3 light = mix(color.rgb, vec3(1.0, 0.85, 0.95), glow * 0.15);
        gl_FragColor = vec4(light, color.a);
        vec4 shadow = texture2D(tex, uv + vec2(0.003, -0.003)) * 0.4;
        gl_FragColor = vec4(mix(shadow.rgb, light, 0.9), color.a);
      }
    `;this.uniforms={time:{value:0},mouse:{value:new lt(.5,.5)},tex:{value:o}};let l=new qn({uniforms:this.uniforms,vertexShader:a,fragmentShader:c,transparent:!0}),u=new oo(1024,512);this.mesh=new Nn(u,l),this.scene.add(this.mesh),this.mesh.position.y=t*.21;let d=new lt(.5,.5),f=new lt(.5,.5),h=0,g=0,y=()=>{g+=(h-g)*.02,f.lerp(d,.05),this.uniforms.time.value=g,this.uniforms.mouse.value.copy(f),this.renderer.render(this.scene,this.camera),requestAnimationFrame(y)};y(),window.addEventListener("mousemove",m=>{d.set(m.clientX/window.innerWidth,1-m.clientY/window.innerHeight),h+=.1})}static \u0275fac=function(t){return new(t||n)(He(Ja),He(Ka),He(Lt),He(pr),He(ur))};static \u0275cmp=vi({type:n,selectors:[["app-busca"]],viewQuery:function(t,i){if(t&1&&pv(q2,7),t&2){let r;Gd(r=jd())&&(i.threeContainer=r.first)}},decls:7,vars:4,consts:[["threeContainer",""],[1,"busca"],[1,"three-container"],[1,"busca-container"],[1,"campo-busca-wrapper"],[1,"campo-busca",3,"ngModelChange","keydown","ngModel"],["class","lista-sugestoes",4,"ngIf"],[1,"lista-sugestoes"],["class","sugestao-item",3,"selecionado","click",4,"ngFor","ngForOf"],[1,"sugestao-item",3,"click"]],template:function(t,i){if(t&1){let r=qr();at(0,"div",1),$r(1,"div",2,0),at(3,"div",3)(4,"div",4)(5,"input",5),Qo("ngModelChange",function(o){return ii(r),jc(i.consulta,o)||(i.consulta=o),ri(o)}),xn("ngModelChange",function(o){return ii(r),ri(i.onInput(o))})("keydown",function(o){return ii(r),ri(i.onKeyDown(o))}),rt(),Bn(6,Y2,2,1,"ul",6),rt()()()}t&2&&(it(4),_i("aberta",i.sugestoes.length>0),it(),Ko("ngModel",i.consulta),it(),It("ngIf",i.sugestoes.length>0))},dependencies:[Ui,na,Hs,Ap,Ya,Cp,iu],styles:[".busca[_ngcontent-%COMP%]{position:relative;width:100%;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}.three-container[_ngcontent-%COMP%]{position:absolute;inset:0;overflow:hidden}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}.busca-container[_ngcontent-%COMP%]{position:relative;z-index:10;height:100vh;width:100%;display:flex;flex-direction:column;margin-top:40%;align-items:center;justify-content:flex-start;overflow:visible}.campo-busca-wrapper[_ngcontent-%COMP%]{position:relative;width:50%;background:#fff;border-radius:25px;box-shadow:0 4px 10px #00000040;transition:box-shadow .2s,border-radius .2s,outline .2s;overflow:hidden}.campo-busca-wrapper[_ngcontent-%COMP%]:focus-within{outline:2px solid #ff4081;box-shadow:0 0 8px #ff408166}.campo-busca[_ngcontent-%COMP%]{width:100%;padding:15px 20px;border:none;font-family:Poppins,sans-serif;font-weight:400;background:#fff;outline:none;border-radius:50px;transition:border-radius .2s ease}.campo-busca-wrapper.aberta[_ngcontent-%COMP%]   .campo-busca[_ngcontent-%COMP%]{border-radius:10px 10px 0 0}.lista-sugestoes[_ngcontent-%COMP%]{position:static;width:100%;background:#fff;border-top:1px solid #e0e0e0;border-radius:0 0 25px 25px;list-style:none;padding:0;margin:0;z-index:1}.sugestao-item[_ngcontent-%COMP%]{padding:12px 20px;cursor:pointer;font-family:Poppins,sans-serif;transition:background .15s ease}.sugestao-item[_ngcontent-%COMP%]:hover{background:#f5f5f5}.sugestao-item.selecionado[_ngcontent-%COMP%]{background:#ffe5ef}"]})};var Z2=n=>["/documento",n];function J2(n,e){if(n&1){let t=qr();at(0,"li",13),xn("click",function(){let r=ii(t).$implicit,s=$t(2);return ri(s.selecionarSugestao(r))}),Rt(1),rt()}if(n&2){let t=e.$implicit,i=e.index,r=$t(2);_i("selecionado",i===r.indiceSelecionado),it(),Xr(" ",t," ")}}function K2(n,e){if(n&1&&(at(0,"ul",11),Bn(1,J2,2,3,"li",12),rt()),n&2){let t=$t();it(),It("ngForOf",t.sugestoes)}}function Q2(n,e){n&1&&(at(0,"div"),Rt(1,"\u{1F50D} Buscando resultados..."),rt())}function eU(n,e){if(n&1&&(at(0,"div"),Rt(1),rt()),n&2){let t=$t();it(),Li(t.erro)}}function tU(n,e){if(n&1&&(at(0,"li",15)(1,"a",16),Rt(2),rt(),at(3,"p",17),Rt(4),rt()()),n&2){let t=e.$implicit;it(),It("routerLink",mv(3,Z2,t.id)),it(),Li(t.titulo),it(2),Li(t.trecho)}}function nU(n,e){if(n&1&&(at(0,"ul"),Bn(1,tU,5,5,"li",14),rt()),n&2){let t=$t();it(),It("ngForOf",t.resultadosPaginados)}}function iU(n,e){if(n&1){let t=qr();at(0,"button",21),xn("click",function(){let r=ii(t).$implicit,s=$t(2);return ri(s.irParaPagina(r))}),Rt(1),rt()}if(n&2){let t=e.$implicit,i=$t(2);_i("ativa",t===i.paginaAtual),it(),Xr(" ",t," ")}}function rU(n,e){n&1&&(at(0,"span"),Rt(1,"..."),rt())}function sU(n,e){if(n&1){let t=qr();at(0,"div",18)(1,"button",19),xn("click",function(){ii(t);let r=$t();return ri(r.paginaAnterior())}),Rt(2,"\u2190"),rt(),Bn(3,iU,2,3,"button",20)(4,rU,2,0,"span",9),at(5,"button",19),xn("click",function(){ii(t);let r=$t();return ri(r.proximaPagina())}),Rt(6,"\u2192"),rt()()}if(n&2){let t=$t();it(),It("disabled",t.paginaAtual===1),it(2),It("ngForOf",t.paginasVisiveis),it(),It("ngIf",t.paginasVisiveis[t.paginasVisiveis.length-1]<t.totalPaginas),it(),It("disabled",t.paginaAtual===t.totalPaginas)}}function oU(n,e){n&1&&(at(0,"div"),Rt(1," Nenhum resultado encontrado. "),rt())}var Rp=class n{constructor(e,t,i,r){this.route=e;this.router=t;this.getService=i;this.autoComplete=r;this.consultaSubject.pipe(ac(250),cc()).subscribe(s=>this.carregarSugestoes(s))}termo="";consulta="";resultados=[];resultadosPaginados=[];carregando=!1;erro="";paginaAtual=1;itensPorPagina=9;totalPaginas=1;paginasVisiveis=[];sugestoes=[];indiceSelecionado=-1;consultaSubject=new St;ngOnInit(){this.route.queryParams.subscribe(e=>{this.termo=(e.q||"").replace(/\+/g," "),this.consulta=this.termo,this.termo.trim()&&this.buscarResultados()})}onInput(e){this.consultaSubject.next(e)}carregarSugestoes(e){if(!e.trim()){this.sugestoes=[],this.indiceSelecionado=-1;return}this.autoComplete.getSugestoes(e).subscribe({next:t=>{this.sugestoes=t,this.indiceSelecionado=-1},error:t=>console.error("Erro no autocomplete:",t)})}selecionarSugestao(e){this.consulta=e,this.sugestoes=[],this.indiceSelecionado=-1,this.onBuscar()}onKeyDown(e){this.sugestoes.length!==0&&(e.key==="ArrowDown"?(this.indiceSelecionado=(this.indiceSelecionado+1)%this.sugestoes.length,e.preventDefault()):e.key==="ArrowUp"?(this.indiceSelecionado=(this.indiceSelecionado-1+this.sugestoes.length)%this.sugestoes.length,e.preventDefault()):e.key==="Enter"&&(this.indiceSelecionado>=0?(this.selecionarSugestao(this.sugestoes[this.indiceSelecionado]),e.preventDefault()):this.onBuscar()))}onBuscar(){if(this.sugestoes=[],this.indiceSelecionado=-1,this.consulta.trim()){let e=this.consulta.trim().replace(/\s+/g,"+");this.router.navigate(["/resultados"],{queryParams:{q:e}})}}buscarResultados(){this.carregando=!0,this.erro="",this.resultados=[],this.getService.buscar(this.termo).subscribe({next:e=>{this.resultados=e,this.totalPaginas=Math.ceil(this.resultados.length/this.itensPorPagina),this.paginaAtual=1,this.atualizarPagina(),this.carregando=!1},error:e=>{console.error("Erro na busca:",e),this.erro="Ocorreu um erro ao buscar resultados.",this.carregando=!1}})}atualizarPagina(){let e=(this.paginaAtual-1)*this.itensPorPagina,t=e+this.itensPorPagina;this.resultadosPaginados=this.resultados.slice(e,t),this.atualizarPaginasVisiveis()}irParaPagina(e){e>=1&&e<=this.totalPaginas&&(this.paginaAtual=e,this.atualizarPagina(),this.scrollToTop())}proximaPagina(){this.paginaAtual<this.totalPaginas&&(this.paginaAtual++,this.atualizarPagina(),this.scrollToTop())}paginaAnterior(){this.paginaAtual>1&&(this.paginaAtual--,this.atualizarPagina(),this.scrollToTop())}atualizarPaginasVisiveis(){let e=this.totalPaginas,t=this.paginaAtual,i=6,r=Math.max(1,t-Math.floor(i/2)),s=r+i-1;s>e&&(s=e,r=Math.max(1,s-i+1)),this.paginasVisiveis=Array.from({length:s-r+1},(o,a)=>a+r)}scrollToTop(){let e=document.querySelector(".results");e&&e.scrollTo({top:0,behavior:"smooth"})}static \u0275fac=function(t){return new(t||n)(He(zn),He(pr),He(Ka),He(Ja))};static \u0275cmp=vi({type:n,selectors:[["app-resultado"]],decls:18,vars:9,consts:[[1,"resultados"],[1,"busca"],["routerLink","/",1,"titulo-bubble"],[1,"b","girando"],[1,"b","pulando"],[1,"campo-busca-wrapper"],["placeholder","Digite sua busca...",1,"campo-busca",3,"ngModelChange","keydown","keyup.enter","ngModel"],["class","lista-sugestoes",4,"ngIf"],[1,"results"],[4,"ngIf"],["class","paginacao",4,"ngIf"],[1,"lista-sugestoes"],["class","sugestao-item",3,"selecionado","click",4,"ngFor","ngForOf"],[1,"sugestao-item",3,"click"],["class","resultado-item",4,"ngFor","ngForOf"],[1,"resultado-item"],["target","_self",1,"title",3,"routerLink"],[1,"trecho"],[1,"paginacao"],[3,"click","disabled"],[3,"ativa","click",4,"ngFor","ngForOf"],[3,"click"]],template:function(t,i){t&1&&(at(0,"div",0)(1,"div",1)(2,"h3",2),Rt(3," Bu"),at(4,"span",3),Rt(5,"b"),rt(),at(6,"span",4),Rt(7,"b"),rt(),Rt(8,"le "),rt(),at(9,"div",5)(10,"input",6),Qo("ngModelChange",function(s){return jc(i.consulta,s)||(i.consulta=s),s}),xn("ngModelChange",function(s){return i.onInput(s)})("keydown",function(s){return i.onKeyDown(s)})("keyup.enter",function(){return i.onBuscar()}),rt(),Bn(11,K2,2,1,"ul",7),rt()(),at(12,"div",8),Bn(13,Q2,2,0,"div",9)(14,eU,2,1,"div",9)(15,nU,2,1,"ul",9)(16,sU,7,4,"div",10)(17,oU,2,0,"div",9),rt()()),t&2&&(it(9),_i("aberta",i.sugestoes.length>0),it(),Ko("ngModel",i.consulta),it(),It("ngIf",i.sugestoes.length>0),it(2),It("ngIf",i.carregando),it(),It("ngIf",i.erro),it(),It("ngIf",!i.carregando&&i.resultadosPaginados.length>0),it(),It("ngIf",!i.carregando&&i.totalPaginas>1),it(),It("ngIf",!i.carregando&&i.resultados.length===0&&!i.erro))},dependencies:[Ui,na,Hs,tC,Ya,Cp,Ap,iu,Uf],styles:[".resultados[_ngcontent-%COMP%]{max-height:100vh;overflow-y:auto;overflow-x:hidden;scroll-behavior:smooth}h3[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;font-weight:400;font-style:normal;color:#ff5072;font-size:3rem;text-shadow:1px 4px 4px rgba(0,0,0,.5);overflow:visible;pointer-events:auto}h3.titulo-bubble[_ngcontent-%COMP%]{cursor:pointer!important}.b[_ngcontent-%COMP%]{display:inline-block}@keyframes _ngcontent-%COMP%_girar{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.girando[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_girar 3s linear infinite}.busca[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%;max-height:200px;position:fixed;top:0;left:0;padding:25px;border-bottom:1px solid black;background-color:#ffd9df;z-index:100}.results[_ngcontent-%COMP%]{margin-top:90px;padding:24px;width:50%}.title[_ngcontent-%COMP%]{display:block;color:#00f;font-size:20px;margin-top:20px;margin-bottom:10px}.title[_ngcontent-%COMP%]:hover{text-decoration:underline}.trecho[_ngcontent-%COMP%]{display:block;font-size:15px;margin-bottom:30px}.paginacao[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:3px}.paginacao[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#ff5072;border:none;border-radius:2px;box-shadow:2px 2px 8px #00000080;cursor:pointer}.campo-busca-wrapper[_ngcontent-%COMP%]{position:relative;width:50%;margin-left:20px}.campo-busca[_ngcontent-%COMP%]{width:100%;padding:12px 20px;border:none;outline:none;border-radius:25px;background:#fff;font-family:Poppins,sans-serif;font-size:1rem;box-shadow:1px 4px 4px #0000004d;transition:border-radius .2s ease}.campo-busca-wrapper.aberta[_ngcontent-%COMP%]   .campo-busca[_ngcontent-%COMP%]{border-radius:25px 25px 0 0}.lista-sugestoes[_ngcontent-%COMP%]{position:absolute;top:100%;left:0;width:100%;background:#fff;border-radius:0 0 25px 25px;box-shadow:1px 6px 8px #0000004d;border-top:1px solid #eee;list-style:none;margin:0;padding:0;z-index:999}.sugestao-item[_ngcontent-%COMP%]{padding:10px 16px;cursor:pointer;font-family:Poppins,sans-serif}.sugestao-item[_ngcontent-%COMP%]:hover, .sugestao-item.selecionado[_ngcontent-%COMP%]{background:#ffe5ef}"]})};function aU(n,e){n&1&&(at(0,"div"),Rt(1,"Carregando documento..."),rt())}function cU(n,e){if(n&1&&(at(0,"div"),Rt(1),rt()),n&2){let t=$t();it(),Li(t.erro)}}function lU(n,e){if(n&1&&(at(0,"div",3)(1,"h3"),Rt(2),rt(),at(3,"div",4),Rt(4),rt()()),n&2){let t=$t();it(2),Li(t.titulo),it(2),Li(t.conteudo)}}var Np=class n{constructor(e,t){this.route=e;this.http=t}docId="";conteudo="";titulo="";carregando=!0;erro="";ngOnInit(){this.route.paramMap.subscribe(e=>{this.docId=e.get("id")||"",this.buscarDocumento()})}buscarDocumento(){this.carregando=!0,this.http.get(`${Za.api}/documento/${this.docId}`).subscribe({next:e=>{this.titulo=e.titulo,this.conteudo=e.conteudo,this.carregando=!1},error:e=>{console.error(e),this.erro="N\xE3o foi poss\xEDvel carregar o documento.",this.carregando=!1}})}static \u0275fac=function(t){return new(t||n)(He(zn),He(Zr))};static \u0275cmp=vi({type:n,selectors:[["app-pagina"]],decls:4,vars:3,consts:[[1,"documento"],[4,"ngIf"],["class","cont",4,"ngIf"],[1,"cont"],[1,"conteudo"]],template:function(t,i){t&1&&(at(0,"div",0),Bn(1,aU,2,0,"div",1)(2,cU,2,1,"div",1)(3,lU,5,2,"div",2),rt()),t&2&&(it(),It("ngIf",i.carregando),it(),It("ngIf",i.erro),it(),It("ngIf",!i.carregando&&i.conteudo))},dependencies:[Ui,Hs],styles:[".documento[_ngcontent-%COMP%]{max-height:100vh;overflow-y:auto;overflow-x:hidden;scroll-behavior:smooth;width:100%;display:flex;flex-direction:column;align-items:center;padding-top:50px}.cont[_ngcontent-%COMP%]{width:50%}h3[_ngcontent-%COMP%]{font-size:80px;margin-bottom:20px;color:#ff4500}.conteudo[_ngcontent-%COMP%]{line-height:2;margin-bottom:80px}.conteudo[_ngcontent-%COMP%]:first-letter{font-size:7rem;font-weight:700;float:left;line-height:1;padding-right:8px;padding-top:4px;font-family:Poppins,serif;color:#ff5072}"]})};var sC=[{path:"",component:Ip},{path:"resultados",component:Rp},{path:"documento/:id",component:Np}];var oC={providers:[Km(),yv({eventCoalescing:!0}),dy(sC,fy()),Vv()]};var Pp=class n{title=si("bubble");static \u0275fac=function(t){return new(t||n)};static \u0275cmp=vi({type:n,selectors:[["app-root"]],decls:2,vars:0,template:function(t,i){t&1&&(at(0,"main"),$r(1,"router-outlet"),rt())},dependencies:[_l,Ui],encapsulation:2})};kv(Pp,oC).catch(n=>console.error(n));
