sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("mas.masterdetail.controller.V3", {
		save: function () {
			var o1 = this.getView().byId("i1").getValue();
			var o2 = this.getView().byId("i2").getValue();
			var o3 = this.getView().byId("i3").getValue();
		
			var ob={
				title:o1,
				street:o2,
				salary:o3
				
			};
			var ar=[];
			var omodel=this.getView().getModel("jsnModel");
			for(var i=0;i<omodel.oData.z1.length;i++){
				ar.push(omodel.oData.z1[i]);
				
			}
			ar.push(ob);
			omodel.setProperty("/z1", ar);
			ar=omodel.getProperty("/z1", ar);
			
		}

	});

});