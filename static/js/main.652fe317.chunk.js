(this.webpackJsonpexcel2pic=this.webpackJsonpexcel2pic||[]).push([[0],{31:function(e,t){},47:function(e,t,a){},53:function(e,t){},54:function(e,t){},93:function(e,t,a){},96:function(e,t,a){"use strict";a.r(t);var n=a(5),c=a(0),i=a.n(c),l=a(11),s=a.n(l),o=(a(47),a(19)),r=a(20),d=a(22),h=a(21),g=a(29),j=a.n(g),b=a(101),x=a(102),u=a(104),v=a(103),m=(a(55),a(39)),p=a.n(m),O={},f=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).initStage=function(){var e=n.props,t=e.canvasWidth,a=e.canvasHeight,c=new p.a.Stage({x:0,y:0,container:"container",width:t,height:a});n.setState({stage:c})},n.state=O,n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.initStage()}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.canvasHeight,a=e.canvasWidth;return Object(n.jsx)("div",{className:"container",id:"container",style:{width:a,height:t},children:"123"})}}]),a}(i.a.Component),y=(a(93),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onImportExcel=function(e){for(var t=new FileReader,a=0;a<e.length;a++)t.name=e[a].name;t.onload=function(e){try{var t=[".xlsx",".xls"],a=e.target.name,c=a.substring(a.lastIndexOf("."));if(-1===t.indexOf(c))throw new Error("\u6a94\u6848\u985e\u578b\u932f\u8aa4\uff0c\u53ea\u53ef\u63a5\u53d7\uff1a"+t.toString()+"\u6a94\u6848\u540d\u7a31");var i=e.target.result,l=j.a.read(i,{type:"binary"}),s=[];for(var o in l.Sheets)l.Sheets.hasOwnProperty(o)&&(s=s.concat(j.a.utils.sheet_to_json(l.Sheets[o])));if(0===s.length)throw new Error("excel\u6c92\u6709\u4efb\u4f55\u8cc7\u6599");n.setState({excelHint:!1}),n.getExcelTitle(s)}catch(r){return void alert(r)}},t.readAsBinaryString(e[0])},n.getExcelTitle=function(e){var t=[];for(var a in e[0])t.push(a);console.log(t),n.setState({excelData:e,excelTitleData:t})},n.handleImageChange=function(e){var t=new FileReader,a=e.target.files[0];t.onloadend=function(){var e=new window.Image;e.onload=function(){n.setState({bgImgHint:!1}),console.log("loading")},e.src=t.result,n.setState({bgImg:t.result})},t.readAsDataURL(a)},n.changeRatio=function(){var e=document.getElementById("bgRatio").value;"small"===e?n.setState({ratio:2}):"middle"===e?n.setState({ratio:1.8}):"big"===e&&n.setState({ratio:1.6})},n.download=function(){var e=n.state.stage,t=document.createElement("a"),a=new MouseEvent("click");t.download="test.jpg",t.href=e.toDataURL(),t.dispatchEvent(a)},n.updatePreviewImg=function(){var e=n.state,t=e.bgImg,a=e.excelData;t||a?t?a||(alert("\u8acb\u4e0a\u50b3excel\u6a94\u6848"),n.setState({excelHint:!0})):(alert("\u8acb\u4e0a\u50b3\u80cc\u666f\u5716"),n.setState({bgImgHint:!0})):(alert("\u8acb\u4e0a\u50b3\u80cc\u666f\u5716&excel\u6a94\u6848"),n.setState({excelHint:!0,bgImgHint:!0}))},n.state={ratio:2,canvasWidth:800,canvasHeight:600,bgImg:null,excelData:null,excelTitleData:null,excelHint:!1,bgImgHint:!1},n}return Object(r.a)(a,[{key:"render",value:function(){var e=this.state,t=e.canvasWidth,a=e.canvasHeight,c=e.excelHint,i=e.bgImgHint,l=e.ratio;return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("div",{className:"topBlock",children:Object(n.jsx)("div",{className:"topText",children:"excel2picture demo"})}),Object(n.jsx)("div",{className:"cotentBlock",children:Object(n.jsxs)("div",{className:"uploadBlock",children:[Object(n.jsxs)("div",{className:"uploadBgBlock",id:"uploadBgBlock",children:[Object(n.jsxs)("div",{style:{width:"80%",marginTop:"20px",fontFamily:"sans-serif"},children:[Object(n.jsxs)(b.a,{defaultActiveKey:"0",children:[Object(n.jsxs)(x.a,{children:[Object(n.jsx)(b.a.Toggle,{as:x.a.Header,style:{fontWeight:"bold",color:"#0066CC"},eventKey:"0",children:"step 1 : \u9078\u64c7\u9810\u89bd\u5716\u7247\u5927\u5c0f"}),Object(n.jsx)(b.a.Collapse,{eventKey:"0",children:Object(n.jsx)(x.a.Body,{children:Object(n.jsxs)("select",{id:"bgRatio",onChange:this.changeRatio,children:["\u3000        ",Object(n.jsx)("option",{value:"small",children:"small"}),"\u3000        ",Object(n.jsx)("option",{value:"middle",children:"middle"}),Object(n.jsx)("option",{value:"big",children:"big"})]})})})]}),Object(n.jsxs)(x.a,{children:[Object(n.jsx)(b.a.Toggle,{as:x.a.Header,style:{fontWeight:"bold",color:c?"red":"#0066CC"},eventKey:"1",children:"step 2 : \u4e0a\u50b3excel\u6a94\u6848"}),Object(n.jsx)(b.a.Collapse,{eventKey:"1",children:Object(n.jsx)(x.a.Body,{children:Object(n.jsx)(v.a,{accept:".xlsx, .xls",onChange:this.onImportExcel,children:Object(n.jsx)("button",{className:"btn btn-primary",children:"\u4e0a\u50b3excel\u8cc7\u6599"})})})})]}),Object(n.jsxs)(x.a,{children:[Object(n.jsx)(b.a.Toggle,{as:x.a.Header,style:{fontWeight:"bold",color:i?"red":"#0066CC"},eventKey:"2",children:"step 3 : \u4e0a\u50b3\u80cc\u666f\u5716\u7247"}),Object(n.jsx)(b.a.Collapse,{eventKey:"2",children:Object(n.jsx)(x.a.Body,{children:Object(n.jsxs)("label",{className:"btn btn-primary",style:{marginBottom:"0"},children:["\u4e0a\u50b3\u80cc\u666f\u5716\u7247",Object(n.jsx)("input",{type:"file",style:{display:"none"},onChange:this.handleImageChange,accept:"image/*"})]})})})]})]}),Object(n.jsx)(u.a,{variant:"info",style:{width:"100%",marginTop:"10px"},onClick:this.updatePreviewImg,children:"\u7522\u751f\u9810\u89bd\u7d50\u679c"})," "]}),Object(n.jsx)(f,{canvasWidth:t/l,canvasHeight:a/l})]}),Object(n.jsx)("div",{className:"generateImageBlock",children:"\u8acb\u5148\u9078\u64c7\u8cc7\u6599\u53ca\u5716\u7247\uff0c\u4e26\u9810\u89bd\u7d50\u679c"})]})})]})}}]),a}(i.a.Component));s.a.render(Object(n.jsx)(y,{}),document.getElementById("root"))}},[[96,1,2]]]);
//# sourceMappingURL=main.652fe317.chunk.js.map