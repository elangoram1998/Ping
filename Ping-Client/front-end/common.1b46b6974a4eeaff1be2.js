(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"/Tzi":function(t,c,i){"use strict";i.d(c,"a",function(){return f});var a=i("quSY"),e=i("8Y7J"),n=i("5U9e"),s=i("iInd"),l=i("SVse"),o=i("PDjf"),r=i("Dxy4"),b=i("Tj54");function u(t,c){if(1&t){const t=e.Sb();e.Rb(0,"mat-card"),e.Rb(1,"mat-card-header"),e.Nb(2,"img",2),e.Rb(3,"mat-card-title"),e.vc(4),e.Qb(),e.Rb(5,"mat-card-subtitle"),e.vc(6,"Calling you..."),e.Qb(),e.Nb(7,"span",3),e.Rb(8,"button",4),e.Yb("click",function(){e.kc(t);const i=c.$implicit;return e.ac(2).answerCall(i._id)}),e.Rb(9,"mat-icon"),e.vc(10,"phone"),e.Qb(),e.Qb(),e.Rb(11,"button",5),e.Yb("click",function(){e.kc(t);const i=c.$implicit;return e.ac(2).cutCall(i._id)}),e.Rb(12,"mat-icon"),e.vc(13,"call_end"),e.Qb(),e.Qb(),e.Qb(),e.Qb()}if(2&t){const t=c.$implicit;e.Ab(2),e.gc("src",t.avatar,e.mc),e.Ab(2),e.wc(t.username)}}function h(t,c){if(1&t&&(e.Rb(0,"div"),e.tc(1,u,14,2,"mat-card",1),e.Qb()),2&t){const t=e.ac();e.Ab(1),e.gc("ngForOf",t.callers)}}let f=(()=>{class t{constructor(t,c){this.socketService=t,this.router=c,this.callSubscription=new a.a,this.cancelSubscription=new a.a,this.notification=!0,this.callers=[]}ngOnInit(){this.callSubscription=this.socketService.gettingCall().subscribe(t=>{this.notification=!0,this.callers.push(t),this.timeout=setTimeout(()=>{this.notification=!1,this.cutCall(t._id)},3e4)}),this.cancelSubscription=this.socketService.hideNotification().subscribe(t=>{clearTimeout(this.timeout),this.cancelCall(t._id)})}answerCall(t){clearTimeout(this.timeout),this.router.navigate(["ping/videoOraudioCall"],{queryParams:{contactID:t,action:"callAnswered"}})}cancellAllCalls(t){this.callers.forEach(c=>{console.log("caller: "+c),c._id!==t&&this.cutCall(c._id)})}cutCall(t){clearTimeout(this.timeout),this.socketService.cutCall(t),this.cancelCall(t)}cancelCall(t){const c=this.callers.findIndex(c=>c._id===t);-1!=c&&this.callers.splice(c,1)}ngOnDestroy(){this.callSubscription.unsubscribe(),this.cancelSubscription.unsubscribe()}}return t.\u0275fac=function(c){return new(c||t)(e.Mb(n.a),e.Mb(s.b))},t.\u0275cmp=e.Gb({type:t,selectors:[["app-call-notification"]],decls:1,vars:1,consts:[[4,"ngIf"],[4,"ngFor","ngForOf"],["mat-card-avatar","","alt","Profile",3,"src"],[1,"spacer"],["mat-fab","",2,"background-color","#5DF443","color","white",3,"click"],["color","warn","mat-fab","",3,"click"]],template:function(t,c){1&t&&e.tc(0,h,2,1,"div",0),2&t&&e.gc("ngIf",c.notification)},directives:[l.l,l.k,o.a,o.c,o.b,o.f,o.e,r.a,b.a],styles:[".spacer[_ngcontent-%COMP%]{flex:1 1 auto}.flex-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap}"]}),t})()},o9Mv:function(t,c,i){"use strict";i.d(c,"a",function(){return r});var a=i("7bNT"),e=i("bOdf"),n=i("lJxs"),s=i("6CTO"),l=i("8Y7J"),o=i("nr5L");let r=(()=>{class t{constructor(t,c){this.actions$=t,this.homeService=c,this.loadContacts$=Object(a.c)(()=>this.actions$.pipe(Object(a.d)(s.c),Object(e.a)(t=>this.homeService.loadAllContacts()),Object(n.a)(t=>Object(s.a)({contacts:t}))))}}return t.\u0275fac=function(c){return new(c||t)(l.Vb(a.a),l.Vb(o.a))},t.\u0275prov=l.Ib({token:t,factory:t.\u0275fac}),t})()}}]);