(this.webpackJsonpballoons=this.webpackJsonpballoons||[]).push([[0],{12:function(t,n,e){},13:function(t,n,e){},15:function(t,n,e){"use strict";e.r(n);var o,i=e(1),a=e.n(i),r=e(7),c=e.n(r),s=(e(12),e(4));e(13);!function(t){t[t.START_MODELING=0]="START_MODELING",t[t.PAUSE_MODELING=1]="PAUSE_MODELING",t[t.STOP_MODELING=2]="STOP_MODELING",t[t.CHANGE_INITIAL_CONDITIONS=3]="CHANGE_INITIAL_CONDITIONS"}(o||(o={}));var u=function(t,n){return{type:t,payload:n}},h=e(2),l=e(3),f=e(5),b=function t(n,e){Object(l.a)(this,t),this.x=void 0,this.y=void 0,this.x=n,this.y=e},y=.02,d=function(){function t(n,e){Object(l.a)(this,t),this._rate=2500,this._KD=65,this.startPoint=void 0,this.endPoint=void 0,this.defaultLength=void 0,this.normal=void 0,this.startPoint=n,this.endPoint=e,this.defaultLength=this.getLength(),this.normal=this.getNormalVector()}return Object(f.a)(t,[{key:"getLength",value:function(){return Math.sqrt(Math.pow(this.startPoint.x-this.endPoint.x,2)+Math.pow(this.startPoint.y-this.endPoint.y,2))}},{key:"getSpringForce",value:function(){var t=this.startPoint.getVelocity(),n=this.endPoint.getVelocity(),e=(new b(t.x-n.x,t.y-n.y),this.getLength()),o=(e-this.defaultLength)*this._rate;return new b((this.startPoint.x-this.endPoint.x)/e*o,(this.startPoint.y-this.endPoint.y)/e*o)}},{key:"getNormalVector",value:function(){var t=this.getLength();return new b(-(this.startPoint.y-this.endPoint.y)/t,(this.startPoint.x-this.endPoint.x)/t)}}]),t}(),g=function(){function t(n,e,o){Object(l.a)(this,t),this.x=void 0,this.y=void 0,this.velocity=void 0,this.force=void 0,this.spring=void 0,this.x=n,this.y=e,this.velocity=o||new b(0,0),this.force=new b(0,0),console.debug("point created")}return Object(f.a)(t,[{key:"attachSpring",value:function(t){this.spring=new d(this,t)}},{key:"setVelocity",value:function(t){this.velocity=t}},{key:"getVelocity",value:function(){return this.velocity}},{key:"getForce",value:function(){return this.force}},{key:"setForce",value:function(t){this.force=t}}]),t}(),v=function t(n,e){Object(l.a)(this,t),this.startPoint=void 0,this.endPoint=void 0,this.startPoint=n,this.endPoint=e},O=function(t,n){t.forEach((function(t){return t.setForce(new b(0,0))}));t.map((function(t){return t.spring}));var e=0;return t.forEach((function(t){var n=t.spring,e=n.getSpringForce(),o=(n.getLength(),n.startPoint.getForce()),i=n.endPoint.getForce();n.startPoint.setForce(new b(o.x-e.x,o.y-e.y)),n.endPoint.setForce(new b(i.x+e.x,i.y+e.y))})),t.forEach((function(t){var n=t.spring,o=n.getLength();n.normal=n.getNormalVector(),e+=.5*Math.abs(n.startPoint.x-n.endPoint.x)*Math.abs(n.normal.x)*o})),t.forEach((function(t){var o=t.spring,i=(o.getSpringForce(),o.getLength()),a=o.startPoint.getForce(),r=o.endPoint.getForce(),c=i*n/e;o.startPoint.setForce(new b(a.x+o.normal.x*c,a.y+o.normal.y*c)),o.endPoint.setForce(new b(r.x+o.normal.x*c,r.y+o.normal.y*c))})),t.forEach((function(t){var n=t.getForce();t.setForce(new b(n.x-function(t){var n=Math.pow(10,-10);return 24*Math.pow(1,6)*n*(-2*Math.pow(1,6)+Math.pow(t,6))/Math.pow(t,13)}(Math.abs(t.x-100)),n.y))})),t},p=e(0),x=0,P=0,j=Object(i.createContext)(null),I=function(t){var n=t.children,e=Object(i.useState)({balloonCenter:"close",pointsCount:20,balloonRadius:50}),a=Object(s.a)(e,2),r=a[0],c=a[1],u=Object(i.useState)(),l=Object(s.a)(u,2),f=l[0],d=l[1],I=Object(i.useState)({points:[],walls:[],pressure:0,TFS:0}),w=Object(s.a)(I,2),N=w[0],S=w[1];Object(i.useEffect)((function(){E()}),[r]);var E=function(){var t=[new v(new g(100,600),new g(100,100))],n=new g(350,350);switch(r.balloonCenter){case"far":n=new g(500,350);break;case"close":n=new g(100+r.balloonRadius+10,350)}for(var e=[],o=0;o<r.pointsCount;o++)e.push(new g(n.x+r.balloonRadius*Math.cos(2*o*Math.PI/r.pointsCount),n.y+r.balloonRadius*Math.sin(2*o*Math.PI/r.pointsCount),new b(-1,0))),o>=1&&(e[o-1].attachSpring(e[o]),o===r.pointsCount-1&&e[o].attachSpring(e[0]));e=O(e,N.pressure),S(Object(h.a)(Object(h.a)({},N),{},{walls:t,points:e}))},C=function(){f&&clearInterval(f)};return Object(p.jsx)(j.Provider,{value:[N,r,function(t){switch(console.debug("action ".concat(t.type)),t.type){case o.START_MODELING:d(setInterval((function(){x<150&&(x+=1.5);var t=function(t){console.debug(t);var n=[],e=t.points;e=e.map((function(t){var e=t.getVelocity(),o=t.getForce();return t.x+=e.x*y+o.x/1*.5*y*y,t.y+=e.y*y+o.y/1*.5*y*y,console.debug("x=".concat(t.x," y=").concat(t.y)),n.push(new b(e.x+o.x/1*.5*y,e.y+o.y/1*.5*y)),t})),e=O(e,t.pressure);for(var o=0;o<e.length;o++){var i=e[o].getForce();e[o].setVelocity(new b(n[o].x+.5*i.x/1*y,n[o].y+.5*i.y/1*y))}var a=e[0].getVelocity();return console.debug("velocity x = ".concat(a.x,", y=").concat(a.y)),e}(Object(h.a)(Object(h.a)({},N),{},{pressure:x}));P+=y,S(Object(h.a)(Object(h.a)({},N),{},{points:t,TFS:P}))}),y));break;case o.PAUSE_MODELING:C();break;case o.STOP_MODELING:C(),E();break;case o.CHANGE_INITIAL_CONDITIONS:C();var n=Object(h.a)(Object(h.a)({},r),t.payload);(e=n).balloonRadius<25||e.balloonRadius>100||e.pointsCount<5||e.pointsCount>50||c(n)}var e}],children:n})},w=700,N=700;var S=function(){var t=Object(i.useContext)(j),n=Object(s.a)(t,3),e=n[0],a=n[1],r=n[2],c=Object(i.useRef)(null),h=function(t){return function(){return t(c.current.getContext("2d"))}},l=h((function(t){e.points.forEach((function(n){t.beginPath(),t.moveTo(n.x,n.y),t.arc(n.x,n.y,5,0,2*Math.PI,!1),t.fillStyle="green",t.fill(),t.strokeStyle="blue";var e=n.spring;t.moveTo(e.startPoint.x,e.startPoint.y),t.lineTo(e.endPoint.x,e.endPoint.y),t.stroke(),t.closePath()}))})),f=h((function(t){e.walls.forEach((function(n){t.beginPath(),t.strokeStyle="black",t.moveTo(n.startPoint.x,n.startPoint.y),t.lineTo(n.endPoint.x,n.endPoint.y),t.stroke(),t.closePath()}))})),b=h((function(t){t.clearRect(0,0,w,N)}));return Object(i.useEffect)((function(){b(),l(),f()}),[e]),Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("canvas",{ref:c,width:w,height:N}),Object(p.jsx)("button",{onClick:function(){return r(u(o.START_MODELING))},children:"Start"}),Object(p.jsx)("button",{onClick:function(){return r(u(o.PAUSE_MODELING))},children:"Pause"}),Object(p.jsx)("button",{onClick:function(){return r(u(o.STOP_MODELING))},children:"Stop"}),Object(p.jsx)("input",{type:"number",value:a.pointsCount,min:5,max:50,onChange:function(t){r(u(o.CHANGE_INITIAL_CONDITIONS,{pointsCount:t.target.value})),console.debug(t.target.value)}}),Object(p.jsx)("input",{type:"number",value:a.balloonRadius,min:25,max:100,onChange:function(t){r(u(o.CHANGE_INITIAL_CONDITIONS,{balloonRadius:parseInt(t.target.value)}))}})]})};c.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(I,{children:Object(p.jsx)(S,{})})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.2c766025.chunk.js.map