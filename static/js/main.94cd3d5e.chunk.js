(this["webpackJsonpchegg-app"]=this["webpackJsonpchegg-app"]||[]).push([[0],{15:function(e,t,s){},18:function(e,t,s){},19:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),i=s(10),a=s.n(i),r=(s(15),s(2)),o=s(3),l=s(8),u=s.n(l),d=s(0),j=function(e){var t=e.formData,s=e.url,n=e.selectedRepo,c=e.setSelectedRepo,i=e.setIssues,a=t.apiKey,r=function(e){var t=e.split("/");return t[t.length-1]}(s),o=function(e){var t=e.split("/");return t[t.length-2]}(s),l=s===n?"repository-item selected":"repository-item";return Object(d.jsx)("div",{className:l,onClick:function(){!function(e){c(s);var t=e.owner,n=e.repo;fetch("/api/git/issues?repo=".concat(n,"&owner=").concat(t,"&apiKey=").concat(a)).then((function(e){if(e.ok)return e.json();throw new Error("Not able to load issues for selected repository")})).then((function(e){var t=e.data;i(t)})).catch((function(e){console.error(e)}))}({owner:o,repo:r})},children:r})},f=function(e){var t=e.formData,s=e.repositories,n=e.setIssues,c=e.selectedRepo,i=e.setSelectedRepo;return void 0===s?null:(null===s||void 0===s?void 0:s.length)>0?null===s||void 0===s?void 0:s.map((function(e){return Object(d.jsx)(j,Object(o.a)(Object(o.a)({},e),{},{formData:t,setIssues:n,selectedRepo:c,setSelectedRepo:i}),e.id)})):Object(d.jsx)("div",{children:"No repositories found"})},b=s(9),h=function(e){var t,s=e.issue,n=e.issues,c=e.setIssues,i=e.index,a=s.title,r=s.user,o=s.created_at,l=s.updated_at,j=r.avatar_url,f=(t=o,u()(t).format("DD/MM/YYYY")),h=function(e){return u()(e).fromNow()}(l);return Object(d.jsxs)("div",{className:"issue-item",onClick:function(){},children:[Object(d.jsxs)("div",{className:"left",children:[Object(d.jsx)("div",{children:Object(d.jsx)("img",{className:"avatar",src:j,alt:"avatar"})}),Object(d.jsxs)("div",{className:"dates",children:["Created: ",f]}),Object(d.jsxs)("div",{className:"dates",children:["Last Updated: ",h]})]}),Object(d.jsxs)("div",{className:"right",children:[Object(d.jsx)("span",{className:"title",children:a}),Object(d.jsxs)("span",{className:"btn-container",children:[Object(d.jsx)("button",{onClick:function(){var e=Object(b.a)(n),t=0===i?i:i-1;e.splice(i,1),e.splice(t,0,s),c(e)},children:"\u25b2"}),Object(d.jsx)("button",{onClick:function(){var e=Object(b.a)(n),t=i===e.length-1?i:i+1;e.splice(i,1),e.splice(t,0,s),c(e)},children:"\u25bc"})]})]})]})},O=function(e){var t=e.issues,s=e.setIssues;return t?t.length>0?t.map((function(e,n){var c=e.id;return Object(d.jsx)(h,{className:"issues-container",index:n,issue:e,issues:t,setIssues:s},c)})):Object(d.jsx)("div",{children:"No issues found for this repository"}):null},p=s.p+"static/media/spinner.c7d9f081.gif",v=function(){return Object(d.jsx)("div",{className:"spinner",children:Object(d.jsx)("img",{src:p,width:"100px",alt:"spinner icon"})})},m=s(6),x=function(e){var t=e.message;return t?Object(d.jsx)("div",{className:"error-msg",children:t.toString()}):null},g=function(e){var t=e.error,s=e.formData,n=e.setFormData,c=e.handleSubmit,i=void 0===c?function(){}:c,a=e.handleClear,r=void 0===a?function(){}:a,l=s.apiKey;return Object(d.jsxs)("div",{className:"form-container",children:[Object(d.jsxs)("form",{children:[Object(d.jsx)("label",{children:"Enter Github API Key"}),Object(d.jsx)("div",{children:Object(d.jsx)("input",{type:"text",value:l,onChange:function(e){return function(e,t){n(Object(o.a)(Object(o.a)({},s),{},Object(m.a)({},t,e.target.value)))}(e,"apiKey")}})})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{onClick:i,children:"Submit"}),Object(d.jsx)("button",{onClick:r,children:"Clear"})]}),Object(d.jsx)(x,{message:t})]})},S=(s(18),{apiKey:""}),N="alberthuynh91",w=function(e){var t=new URLSearchParams(window.location.search),s=Object.fromEntries(t.entries()).username,c=Object(n.useState)(e.formData||S),i=Object(r.a)(c,2),a=i[0],o=i[1],l=Object(n.useState)(e.repositories),u=Object(r.a)(l,2),j=u[0],b=u[1],h=Object(n.useState)(""),p=Object(r.a)(h,2),m=p[0],x=p[1],w=Object(n.useState)(e.issues||void 0),y=Object(r.a)(w,2),I=y[0],C=y[1],D=Object(n.useState)(void 0),k=Object(r.a)(D,2),R=k[0],E=k[1],K=Object(n.useState)(!1),F=Object(r.a)(K,2),P=F[0],J=F[1],L=Object(n.useState)(s||N),Y=Object(r.a)(L,2),A=Y[0],M=Y[1],T=function(e){""!==e&&void 0!==e&&(J(!0),fetch("/api/git?apiKey=".concat(e,"&username=").concat(A)).then((function(e){if(e.ok)return e.json();throw new Error("Oops! Try a different API key!")})).then((function(e){var t=e.data;E(void 0),b(t)})).catch((function(e){E(e),_()})).finally((function(){J(!1)})))},_=function(){b(void 0),x({}),C(void 0),localStorage.removeItem("cachedState")};return Object(n.useEffect)((function(){var e=window.localStorage.getItem("cachedState");if("undefined"!==e&&null!==e){var t=JSON.parse(e);t.userName===A&&(o(t.formData),b(t.repositories),x(t.selectedRepo),C(t.issues),M(t.userName))}}),[]),Object(n.useEffect)((function(){var e={formData:a,repositories:j,selectedRepo:m,issues:I,userName:A};void 0!==I&&window.localStorage.setItem("cachedState",JSON.stringify(e))}),[I]),Object(n.useEffect)((function(){T()}),[]),Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(g,{formData:a,setFormData:o,handleSubmit:function(){var e=a.apiKey;T(e)},handleClear:function(){o(S),b(void 0),x({}),C(void 0),E(void 0),J(!1),M(N),localStorage.removeItem("cachedState")},error:R}),P?Object(d.jsx)(v,{}):Object(d.jsx)("div",{className:"content-container",children:Object(d.jsxs)("div",{className:"content-row",children:[Object(d.jsx)("div",{className:"content-left",children:Object(d.jsx)(f,{formData:a,repositories:j,setIssues:C,selectedRepo:m,setSelectedRepo:x})}),Object(d.jsx)("div",{className:"content-right",children:Object(d.jsx)(O,{issues:I,setIssues:C})})]})})]})},y=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,20)).then((function(t){var s=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;s(e),n(e),c(e),i(e),a(e)}))};a.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(w,{})}),document.getElementById("root")),y()}},[[19,1,2]]]);
//# sourceMappingURL=main.94cd3d5e.chunk.js.map