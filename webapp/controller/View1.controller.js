sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	// "sap/ui/demo/nav/controller/BaseController"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("mas.masterdetail.controller.View1", {
		onInit: function () {

			this.getView().setModel(new JSONModel(), "omodel"); //?
			// this.getView().getModel("omodel").setProperty("/", a1);
			this.getView().getModel("omodel").setProperty("/Editable", false); //?
			// 	var ob=this.getParameters().listItem.getBindingContext("jsnModel").getObject(),
			// omodel=this.getView().getModel("jsnModel");
			// omodel.setProperty("/Form", ob);
		},

		onSearch: function (event) {
			var olist = this.getView().byId("l1"),
				arr = [],
				bind, filter;
			filter = new Filter("title", FilterOperator.Contains, event.getSource().getValue());//if u want another property add 2 line filter and push
			arr.push(filter);
			bind = olist.getBinding("items");//bind will store all list items
			bind.filter(arr);//filter the bind

		},

		onItemPress: function (oevent) {

			var ob = oevent.getParameters().listItem.getBindingContext("jsnModel").getObject(),
				omodel = this.getView().getModel("jsnModel");
			omodel.setProperty("/Form", ob);
		},

		onEdit: function () {
			this.getView().getModel("omodel").setProperty("/Editable", true);
			this.getView().byId("btn2").setVisible(true);
			this.getView().byId("btn1").setVisible(false);
		},
		Update: function () {
			var firstItem = this.getView().getModel("jsnModel").getProperty("/z1")[2];
			// this.getView().byId("list1").setSelectedItem(firstItem,true);
			var jmodel = this.getView().getModel("jsnModel");
			jmodel.setProperty("/Form", firstItem);
		},
		save: function () {
			this.getView().byId("btn2").setVisible(false);
			this.getView().byId("btn1").setVisible(true);
			this.getView().getModel("omodel").setProperty("/Editable", false);

			// var oView = this.getView();
			var oDialog = this.createId("fragment");
			// create dialog lazily
			if (!this._oDialog) {
				// create dialog via fragment factory
				this._oDialog = sap.ui.xmlfragment(oDialog, "mas.masterdetail.Fragment.fragment", this);
				this.oView.addDependent(this._oDialog);
			}

			this._oDialog.open();

		},
		onPress: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteView2");
		},
		onListItemPressed: function (oEvent) {
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("employee", {
				employeeId: oCtx.getProperty("EmployeeID")
			});
		},
		onCloseDialog: function () {
			this._oDialog.close();
		},

		addepm: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("r");
		}

		// onAfterRendering:function(){
		// 	var ren=this.getView().getModel("jsnModel").getItems()[0];
		// 	this.getView().getModel("jsnModel").setSelectedItem(ren,true);

		// }
	});
});