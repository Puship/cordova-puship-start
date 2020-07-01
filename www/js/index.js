/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var push = null;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		
		push = PushNotification.init({
			android: {
			},
			browser: {
				pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});
		
		push.on('registration', (data) => {
			Puship.EnableLog(true);
			Puship.EnableHtmlLog(true);
			Puship.Register(data.registrationId,'9BszdZyLiEw2oNP'); //replace 9BszdZyLiEw2oNP with your puship app code
		});

		push.on('notification', (data) => {
			alert(JSON.stringify(data));
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
		});

		push.on('error', (e) => {
			alert(e.message);
		});
		
		
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		document.getElementById("getLastPush").addEventListener("click", this.getPush);
		document.getElementById("getPushByCurrentPosition").addEventListener("click", this.getPushByCurrentPosition);
		document.getElementById("getPushByLibra").addEventListener("click", this.getPushByLibra);
		document.getElementById("getPushByDevice").addEventListener("click", this.getPushByDevice);
		document.getElementById("addLibraFilter").addEventListener("click", this.addLibraFilter);
		document.getElementById("addVirgoFilter").addEventListener("click", this.addVirgoFilter);
		document.getElementById("removeFilter").addEventListener("click", this.removeFilter);
		document.getElementById("clearFilters").addEventListener("click", this.clearFilters);
		document.getElementById("getFilters").addEventListener("click", this.getFilters);
		document.getElementById("registerCurrentPosition").addEventListener("click", this.registerCurrentPosition);
		document.getElementById("watchPosition").addEventListener("click", this.watchPosition);
		document.getElementById("unregister").addEventListener("click", this.unregister);
		document.getElementById("sendPushToDevices").addEventListener("click", this.sendPushToDevices);
		
    },
	getPush: function(){
		
		Puship.GetPushMessages(
			{
			//limit: 10, //max limit is 50 default is 20
			//offset: 100,
			successCallback: function (regresult){
				console.log("GetPushMessages done");
				if (regresult.length>0)
				{
					alert("Message 1 of " + regresult.length + ": "+regresult[0].Message);
				}else{
					alert("No message found");
				}
			},
			failCallback: function (regresult){
				console.log("error during GetPushMessages: "+ JSON.stringify(regresult));
				alert("error during GetPushMessages: "+ JSON.stringify(regresult));
			}
		});
	},
	getPushByCurrentPosition: function(){
		
		Puship.GetPushMessages({
			//limit: 10, //max limit is 50 default is 20
			//offset: 100,
			byCurrentPosition: true,
			successCallback: function (regresult){
				console.log("GetPushMessages done");
				
				if (regresult.length>0)
				{
					alert("Message 1 of "+regresult.length+": "+regresult[0].Message);
				}else{
					alert("No message found");
				}
			},
			failCallback: function (regresult){
				console.log("error during GetPushMessages by Pos: "+ JSON.stringify(regresult));
				alert("error during GetPushMessages by Pos: "+ JSON.stringify(regresult));
			}
		});
	},
	getPushByLibra: function(){
		Puship.GetPushMessages(
			{
			//limit: 10, //max limit is 50 default is 20
			//offset: 100,
			tag: "Libra",
			successCallback: function (regresult){
				console.log("GetPushMessages done");
				
				if (regresult.length>0)
				{
					alert("Message 1 of "+regresult.length+": "+regresult[0].Message);
				}else{
					alert("No message found");
				}
			},
			failCallback: function (regresult){
				console.log("error during GetPushMessages: "+ JSON.stringify(regresult));
				alert("error during GetPushMessages: "+ JSON.stringify(regresult));
			}
		});
	},
	getPushByDevice: function(){
		Puship.GetPushMessagesByDevice(
			{
			//limit: 10, //max limit is 50 default is 20
			//offset: 100,
			successCallback: function (regresult){
				console.log("GetPushMessagesByDevice done");
				
				if (regresult.length>0)
				{
					alert("Message 1 of "+regresult.length+": "+regresult[0].Message);
				}else{
					alert("No message found");
				}
			},
			failCallback: function (regresult){
				console.log("error during GetPushMessagesByDevice: "+ JSON.stringify(regresult));
				alert("error during GetPushMessagesByDevice: "+ JSON.stringify(regresult));
			}
		});
	},
	addLibraFilter: function(){
		console.log("addLibraFilter");
		Puship.AddTagFilter("Libra",
		{
			successCallback: function (regresult){
				console.log("Libra filter added");
				alert("Libra filter added");
			},
			failCallback: function (regresult){
				console.log("error during addLibraFilter: "+ JSON.stringify(regresult));
				alert("error during addLibraFilter: "+ JSON.stringify(regresult));
			}
		});
	},
	addVirgoFilter: function(){
		console.log("addVirgoFilter");
		Puship.AddTagFilter("Virgo",
		{
			successCallback: function (regresult){
				console.log("Virgo filter added");
				alert("Virgo filter added");
			},
			failCallback: function (regresult){
				console.log("error during addVirgoFilter: "+ JSON.stringify(regresult));
				alert("error during addVirgoFilter: "+ JSON.stringify(regresult));
			}
		});
	},
	removeFilter: function(){
		console.log("removeFilter");
		Puship.RemoveTagFilter("Libra",
		{
			successCallback: function (regresult){
				console.log("Libra filter removed");
				alert("Libra filter removed");
			},
			failCallback: function (regresult){
				console.log("error during removeFilter: "+ JSON.stringify(regresult));
				alert("error during removeFilter: "+ JSON.stringify(regresult));
			}
		});
	},
	clearFilters: function(){
		console.log("removeFilter");
		Puship.CleanTagFilter(
		{
			successCallback: function (regresult){
				console.log("clearFilters done");
				alert("clearFilters done");
			},
			failCallback: function (regresult){
				console.log("error during clearFilters: "+ JSON.stringify(regresult));
				alert("error during clearFilters: "+ JSON.stringify(regresult));
			}
		});
	},
	getFilters: function(){
		Puship.GetTagFilters(
			{
			successCallback: function (regresult){
				console.log("GetTagFilters done");
				
				if (regresult.length>0)
				{
					alert("Filter 1 of "+regresult.length+": "+regresult[0]);
				}else{
					alert("No filter found");
				}
			},
			failCallback: function (regresult){
				console.log("error during GetTagFilters: "+ JSON.stringify(regresult));
				alert("error during GetTagFilters: "+ JSON.stringify(regresult));
			}
		});
	},
	registerCurrentPosition: function(){
		Puship.RegisterCurrentPosition(
		{ 
			minimumAccuracy: 100, 
			callMinutes: 5,
			enableHighAccuracy: true,
			successCallback: function (regresult){
				console.log("RegisterCurrentPosition done");
				alert("RegisterCurrentPosition done");
			},
			failCallback: function (regresult){
				console.log("error during RegisterCurrentPosition: "+ JSON.stringify(regresult));
				alert("error during RegisterCurrentPosition: "+ JSON.stringify(regresult));
			}
		});
	},
	watchPosition: function(){
		var watchButton = document.getElementById("watchPosition");

		
		if (Puship.WatchIsActive())
		{
			Puship.StopWatchPosition();
			watchButton.innerHTML= "Activate watch";
		} 
		else 
		{
			Puship.ActivateWatchPosition({callMinutes: 1});
			watchButton.innerHTML= "Stop watch";
		}
	},
	unregister: function(){
		push.unregister(
			() => {
				Puship.UnregisterFromPuship();
				console.log('success');
			},
			() => {
				console.log('error');
			}
		);
	},
	sendPushToDevices: function(){
		Puship.SendPushByDevice('Hello from Puship!',[Puship.DeviceId()],
			{
			successCallback: function (regresult){
				alert("Message sent");
			},
			failCallback: function (regresult){
				alert("Message send error: "+ regresult);
			}
		});
	}
	
};

app.initialize();