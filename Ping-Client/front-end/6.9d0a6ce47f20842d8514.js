(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"2yxt":function(t,e,s){"use strict";s.r(e),s.d(e,"ChatModule",function(){return q});var a=s("SVse"),o=s("s7LF"),c=s("tqRt"),i=s("4blL"),n=s("XC/3"),r=s("EzoW"),h=s("8Y7J"),l=s("iInd"),g=s("5U9e"),d=s("EApP"),u=s("/Tzi"),b=s("l0rg"),m=s("Dxy4"),p=s("ZFy/"),f=s("Tj54"),v=s("xgIS"),M=s("lJxs"),I=s("Kj3r"),O=s("6CTO"),C=s("QmAz"),R=s("IheW"),S=s("JIr8"),D=s("AytR"),j=s("+kE0");let y=(()=>{class t{constructor(t){this.http=t}loadMyMessages(t){let e=(new R.d).set("roomID",t);return this.http.get(D.a.loadMyMessages,{params:e}).pipe(Object(S.a)(j.a))}updateMessageHeight(t,e){let s=(new R.d).set("roomID",t||"");return this.http.post(D.a.updateMessageHeight,{message:e},{params:s}).pipe(Object(S.a)(j.a))}updateMessageState(t,e,s){let a=(new R.d).set("roomID",t).set("contactID",s);return this.http.patch(D.a.updateMessageState,{messages:e},{params:a}).pipe(Object(S.a)(j.a))}updateScrollHeight(t,e,s){let a=(new R.d).set("roomID",t);return this.http.patch(D.a.updateScrollHeight,{currectSclHeight:e,totalScrollHeight:s},{params:a}).pipe(Object(S.a)(j.a))}}return t.\u0275fac=function(e){return new(e||t)(h.Vb(R.b))},t.\u0275prov=h.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const w=["chatContainer"],H=["item"];function Q(t,e){if(1&t&&(h.Rb(0,"div",6),h.Rb(1,"p",7),h.vc(2),h.Qb(),h.Rb(3,"p",8),h.Rb(4,"small"),h.vc(5),h.bc(6,"date"),h.Qb(),h.Qb(),h.Qb()),2&t){const t=h.ac().$implicit;h.Ab(2),h.xc(" ",t.message," "),h.Ab(3),h.wc(h.dc(6,2,t.createdAt,"h:mm a"))}}function x(t,e){1&t&&(h.Rb(0,"small"),h.Rb(1,"mat-icon",13),h.vc(2,"done_all"),h.Qb(),h.Qb())}function k(t,e){1&t&&(h.Rb(0,"mat-icon"),h.vc(1,"done_all"),h.Qb())}function _(t,e){if(1&t&&(h.Rb(0,"div",9),h.Rb(1,"p",10),h.vc(2),h.Qb(),h.Rb(3,"p",8),h.Rb(4,"small"),h.vc(5),h.bc(6,"date"),h.Qb(),h.tc(7,x,3,0,"small",11),h.tc(8,k,2,0,"ng-template",null,12,h.uc),h.Qb(),h.Qb()),2&t){const t=h.ic(9),e=h.ac().$implicit;h.Ab(2),h.xc(" ",e.message," "),h.Ab(3),h.wc(h.dc(6,4,e.createdAt,"h:mm a")),h.Ab(2),h.gc("ngIf","read"===e.state)("ngIfElse",t)}}function A(t,e){if(1&t&&(h.Rb(0,"div",null,3),h.tc(2,Q,7,5,"div",4),h.tc(3,_,10,7,"ng-template",null,5,h.uc),h.Qb()),2&t){const t=e.$implicit,s=h.ic(4),a=h.ac();h.Ab(2),h.gc("ngIf",t.owner_id._id!==a.account._id)("ngIfElse",s)}}let E=(()=>{class t{constructor(t,e){this.store=t,this.messageService=e,this.messagesCount=0,this.currentScrollHeight=0,this.updatedMessages=[]}ngOnChanges(){this.updatedContact=Object.assign({},this.contact),this.currentScrollHeight=this.chatRoom.currectSclHeight}ngOnInit(){this.updatedMessages=Object.assign(this.updatedMessages,this.messages),this.messagesCount=this.updatedMessages.length,this.updatedContact=Object.assign({},this.contact),this.currentScrollHeight=this.chatRoom.currectSclHeight,this.load()}load(){this.accountSubcription$=this.store.pipe(Object(c.t)(i.b)).subscribe(t=>{this.account=t})}ngAfterViewInit(){this.itemElement.changes.subscribe(t=>{if(this.messagesCount<this.messages.length){this.updatedMessages=Object.assign(this.updatedMessages,this.messages),this.messagesCount=this.updatedMessages.length,console.log("size of messages: "+this.itemElement.length);let t=this.chatContainer.nativeElement.children,e=t.length;console.log("children size: "+this.chatContainer.nativeElement.children.length);let s=0;e>1?(s=t[e-1].offsetTop-64+(t[e-1].clientHeight+10),console.log("message height: "+s),this.updatedMessages[e-1]=Object.assign({},this.updatedMessages[e-1]),this.updatedMessages[e-1].messageHeight=s):1==e&&e>0&&(s=t[0].clientHeight+10,console.log("message height: "+s),this.updatedMessages[0]=Object.assign({},this.updatedMessages[0]),this.updatedMessages[0].messageHeight=s),this.updateMessageHeight(),this.updateMessageCount(),this.chatContainer.nativeElement.scrollHeight<=610&&(this.currentScrollHeight=this.updatedMessages[e-1].messageHeight,this.updateScrollHeight(this.currentScrollHeight,this.chatContainer.nativeElement.scrollHeight),this.markAsRead())}}),Object(v.a)(this.chatContainer.nativeElement,"scroll").pipe(Object(M.a)(t=>t.target),Object(I.a)(300)).subscribe(t=>{console.log("scroll event"),console.log(t.scrollTop),console.log(this.currentScrollHeight),t.scrollTop+610>this.currentScrollHeight&&(console.log("start the scoll event"),this.currentScrollHeight=t.scrollTop+610,this.markAsRead(),this.updateScrollHeight(this.currentScrollHeight,this.chatContainer.nativeElement.scrollHeight))})}updateMessageHeight(){this.chatRoom.messages=Object.assign([],this.updatedMessages);const t={id:this.roomID,changes:this.chatRoom};this.store.dispatch(Object(C.e)({update:t}))}updateMessageState(){let t=Object.assign({},this.chatRoom);t.messages=Object.assign([],this.updatedMessages);const e={id:this.roomID,changes:t};this.store.dispatch(Object(C.d)({update:e}))}updateScrollHeight(t,e){this.chatRoom=Object.assign({},this.chatRoom),this.chatRoom.currectSclHeight=t,this.chatRoom.totalScrollHeight=e;const s={id:this.roomID,changes:this.chatRoom};this.store.dispatch(Object(C.f)({update:s}))}updateMessageCount(){this.updatedContact.totalMessageCount++;const t={id:this.roomID,changes:this.updatedContact};this.store.dispatch(Object(O.d)({update:t}))}updateReadMessageCount(t){this.updatedContact=Object.assign({},this.updatedContact),this.updatedContact.readMessageCount=t;const e={id:this.roomID,changes:this.updatedContact};this.store.dispatch(Object(O.e)({update:e}))}markAsRead(){var t;let e=[];const s=(null===(t=this.contact)||void 0===t?void 0:t.readMessageCount)||0;console.log("start count: "+s);let a=0;for(var o=s;o<this.messagesCount&&this.updatedMessages[o].messageHeight<=this.currentScrollHeight+15;o++)this.updatedMessages[o].owner_id._id!==this.account._id&&(console.log("inside contact message"),e.push(this.updatedMessages[o]),a=o);if(e.length>0){for(e=[],console.log("update state"),o=s;o<=a;o++)this.updatedMessages[o]=Object.assign({},this.updatedMessages[o]),console.log("inside state change for loop"),this.updatedMessages[o].state="read",e.push(this.updatedMessages[o]);this.messageService.updateMessageState(this.roomID,e,this.contactID).subscribe(console.log),this.updateMessageState(),this.updateReadMessageCount(this.updatedMessages[a].messageCount)}}ngOnDestroy(){this.accountSubcription$.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(h.Mb(c.h),h.Mb(y))},t.\u0275cmp=h.Gb({type:t,selectors:[["app-messages"]],viewQuery:function(t,e){if(1&t&&(h.yc(w,!0),h.yc(H,!0)),2&t){let t;h.hc(t=h.Zb())&&(e.chatContainer=t.first),h.hc(t=h.Zb())&&(e.itemElement=t)}},inputs:{roomID:"roomID",contactID:"contactID",messages:"messages",contact:"contact",chatRoom:"chatRoom"},features:[h.yb],decls:3,vars:1,consts:[[1,"scroll-container"],["chatContainer",""],[4,"ngFor","ngForOf"],["item",""],["class","friend-message",4,"ngIf","ngIfElse"],["myMessage",""],[1,"friend-message"],[1,"letters"],[1,"msg-time"],[1,"my-message"],[1,"letters","test"],[4,"ngIf","ngIfElse"],["other_content",""],["color","primary"]],template:function(t,e){1&t&&(h.Rb(0,"div",0,1),h.tc(2,A,5,2,"div",2),h.Qb()),2&t&&(h.Ab(2),h.gc("ngForOf",e.messages))},directives:[a.k,a.l,f.a],pipes:[a.e],styles:[".scroll-container[_ngcontent-%COMP%]{height:610px;width:100%;overflow-y:scroll;background-color:#fff}p.letters[_ngcontent-%COMP%]{word-wrap:break-word}.friend-message[_ngcontent-%COMP%]{background-color:#f8f8f8;padding:5px;border-radius:15px;text-align:left;margin:5px 150px 5px 5px;border-bottom-left-radius:0}.my-message[_ngcontent-%COMP%]{background-color:#2cf6c9;padding:5px;border-radius:15px;text-align:right;border-bottom-right-radius:0;margin:5px 5px 5px 150px}.msg-time[_ngcontent-%COMP%]{text-align:right;margin-bottom:0;color:grey}"]}),t})();var P=s("Q2Ze");let F=(()=>{class t{constructor(t,e,s,a,c,i){this.route=t,this.router=e,this.store=s,this.fb=a,this.socketService=c,this.toastr=i,this.roomID="",this.contactID="",this.messages=[],this.messageForm=this.fb.group({message:["",o.l.required]})}ngOnInit(){this.route.queryParams.subscribe(t=>{this.roomID=t.roomID,this.contactID=t.contactID}),this.load()}load(){this.accountSubscription=this.store.pipe(Object(c.t)(i.b)).subscribe(t=>{this.account=t}),this.contactSubscription=this.store.pipe(Object(c.t)(n.c,{roomID:this.roomID})).subscribe(t=>{this.contact=t}),this.chatRoomSubscription=this.store.pipe(Object(c.t)(r.b,{roomID:this.roomID})).subscribe(t=>{this.myChatRoom=Object.assign({},t)}),this.messagesSubscription=this.store.pipe(Object(c.t)(r.c,{roomID:this.roomID})).subscribe(t=>{this.messages=t||[]})}sendMessage(){var t;this.socketService.sendMessage(null===(t=this.Message)||void 0===t?void 0:t.value,this.roomID,this.contactID,this.account._id),this.messageForm.valid&&setTimeout(()=>this.formGroupDirective.resetForm(),0)}mediaCall(){this.socketService.checkOnline(this.contactID).subscribe(t=>{var e;t?this.socketService.checkIsOnCall(this.contactID).subscribe(t=>{var e;t?this.toastr.info("Please try again later",(null===(e=this.contact)||void 0===e?void 0:e.contactID.username)+" is currently speaking with someone else"):this.router.navigate(["ping/videoOraudioCall"],{queryParams:{contactID:this.contactID,action:"call"}})}):this.toastr.info("you cannot call a person, who is not in online. please call again later",(null===(e=this.contact)||void 0===e?void 0:e.contactID.username)+" is not in online")})}get Message(){return this.messageForm.get("message")}ngOnDestroy(){this.accountSubscription.unsubscribe(),this.contactSubscription.unsubscribe(),this.messagesSubscription.unsubscribe(),this.chatRoomSubscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(h.Mb(l.a),h.Mb(l.b),h.Mb(c.h),h.Mb(o.b),h.Mb(g.a),h.Mb(d.b))},t.\u0275cmp=h.Gb({type:t,selectors:[["app-chat"]],viewQuery:function(t,e){if(1&t&&h.yc(o.d,!0),2&t){let t;h.hc(t=h.Zb())&&(e.formGroupDirective=t.first)}},decls:27,vars:9,consts:[[1,"page-layout"],[1,"row"],[1,"col-sm-4","dummy"],[1,"col-sm-4"],["width","65","height","65",1,"mt-3",3,"src"],[1,"mb-2"],[1,"spacer"],["matTooltip","video call","type","button","mat-icon-button","",3,"click"],["mat-icon-button","","aria-label","Example icon-button with a menu"],[3,"roomID","contactID","messages","chatRoom","contact"],[1,"mt-2"],[3,"formGroup","ngSubmit"],[1,"col-10","mt-2"],["formControlName","message","type","text","placeholder","Type message..",1,"message-box"],[1,"col-2"],["type","submit","mat-fab","","matSuffix","",2,"background-color","#2CF6C9","color","white",3,"disabled"]],template:function(t,e){1&t&&(h.Rb(0,"div",0),h.Rb(1,"div",1),h.Nb(2,"div",2),h.Rb(3,"div",3),h.Nb(4,"app-call-notification"),h.Rb(5,"mat-toolbar"),h.Nb(6,"img",4),h.Rb(7,"span",5),h.vc(8),h.Qb(),h.Nb(9,"span",6),h.Rb(10,"button",7),h.Yb("click",function(){return e.mediaCall()}),h.Rb(11,"mat-icon"),h.vc(12,"video_call"),h.Qb(),h.Qb(),h.Rb(13,"button",8),h.Rb(14,"mat-icon"),h.vc(15,"more_vert"),h.Qb(),h.Qb(),h.Qb(),h.Nb(16,"app-messages",9),h.Rb(17,"div",10),h.Rb(18,"form",11),h.Yb("ngSubmit",function(){return e.sendMessage()}),h.Rb(19,"div",1),h.Rb(20,"div",12),h.Nb(21,"input",13),h.Qb(),h.Rb(22,"div",14),h.Rb(23,"button",15),h.Rb(24,"mat-icon"),h.vc(25,"send"),h.Qb(),h.Qb(),h.Qb(),h.Qb(),h.Qb(),h.Qb(),h.Qb(),h.Nb(26,"div",2),h.Qb(),h.Qb()),2&t&&(h.Ab(6),h.gc("src",null==e.contact||null==e.contact.contactID?null:e.contact.contactID.avatar,h.mc),h.Ab(2),h.wc(null==e.contact||null==e.contact.contactID?null:e.contact.contactID.username),h.Ab(8),h.gc("roomID",e.roomID)("contactID",e.contactID)("messages",e.messages)("chatRoom",e.myChatRoom)("contact",e.contact),h.Ab(2),h.gc("formGroup",e.messageForm),h.Ab(5),h.gc("disabled",e.messageForm.invalid))},directives:[u.a,b.a,m.a,p.a,f.a,E,o.m,o.h,o.d,o.a,o.g,o.c,P.h],styles:[".page-layout[_ngcontent-%COMP%]{overflow-y:hidden}.row[_ngcontent-%COMP%]{height:100%}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.message-box[_ngcontent-%COMP%]{padding:12px;background:#fff;border-radius:30px;outline:none;border:#fff;width:100%}.full-width[_ngcontent-%COMP%]{width:100%}.chat-window[_ngcontent-%COMP%]{background-color:#fff;height:680px}"]}),t})();var $=s("JjUP"),T=s("7bNT"),N=s("bOdf");let J=(()=>{class t{constructor(t,e){this.actions$=t,this.messageService=e,this.loadMessages$=Object(T.c)(()=>this.actions$.pipe(Object(T.d)(C.c),Object(N.a)(t=>this.messageService.loadMyMessages(t.roomID)),Object(M.a)(t=>Object(C.a)({messageCollection:Object.assign(Object.assign({},t),{areMessagesLoaded:!0})})))),this.updateHeight$=Object(T.c)(()=>this.actions$.pipe(Object(T.d)(C.e),Object(N.a)(t=>{var e;const s=(null===(e=t.update.changes.messages)||void 0===e?void 0:e.length)||0;return this.messageService.updateMessageHeight(t.update.changes.roomID||"",(t.update.changes.messages||[])[s-1])})),{dispatch:!1}),this.updateScrollHeight$=Object(T.c)(()=>this.actions$.pipe(Object(T.d)(C.f),Object(N.a)(t=>this.messageService.updateScrollHeight(t.update.changes.roomID||"",t.update.changes.currectSclHeight||0,t.update.changes.totalScrollHeight||0))),{dispatch:!1})}}return t.\u0275fac=function(e){return new(e||t)(h.Vb(T.a),h.Vb(y))},t.\u0275prov=h.Ib({token:t,factory:t.\u0275fac}),t})();var G=s("hctd"),z=s("o9Mv"),V=s("PCNd");const Z=[{path:"",component:F}];let q=(()=>{class t{}return t.\u0275mod=h.Kb({type:t}),t.\u0275inj=h.Jb({factory:function(e){return new(e||t)},imports:[[a.c,o.j,G.a,V.a,l.c.forChild(Z),c.j.forFeature($.b,$.a,{metaReducers:$.c}),T.b.forFeature([J,z.a])],l.c]}),t})()}}]);