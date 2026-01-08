import{r as y,g as O,a as g}from"./vendor-CRB3T2We.js";function j(n,a){for(var u=0;u<a.length;u++){const t=a[u];if(typeof t!="string"&&!Array.isArray(t)){for(const o in t)if(o!=="default"&&!(o in n)){const i=Object.getOwnPropertyDescriptor(t,o);i&&Object.defineProperty(n,o,i.get?i:{enumerable:!0,get:()=>t[o]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var _={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function b(){if(d)return s;d=1;var n=y(),a=Symbol.for("react.element"),u=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function l(f,e,m){var r,p={},c=null,R=null;m!==void 0&&(c=""+m),e.key!==void 0&&(c=""+e.key),e.ref!==void 0&&(R=e.ref);for(r in e)t.call(e,r)&&!i.hasOwnProperty(r)&&(p[r]=e[r]);if(f&&f.defaultProps)for(r in e=f.defaultProps,e)p[r]===void 0&&(p[r]=e[r]);return{$$typeof:a,type:f,key:c,ref:R,props:p,_owner:o.current}}return s.Fragment=u,s.jsx=l,s.jsxs=l,s}var x;function E(){return x||(x=1,_.exports=b()),_.exports}var S=E(),v=y();const q=O(v),h=j({__proto__:null,default:q},[v]);g();export{h as R,S as j,v as r};
//# sourceMappingURL=ui-CvUxRg_v.js.map
