(function(ext) {

	var Packet = {

		createNew : function(p_buffer, p_length){

			var l_NewObject = {};

			var littleendian = true;

			l_NewObject.getMasterCmd = function(){

				return l_NewObject.getInt8pos(5);
			};

			l_NewObject.setMasterCmd = function(p_MasterCmd){
				l_NewObject.setInt8pos(5, p_MasterCmd);
			};

			l_NewObject.getSubCmd = function(){

				return l_NewObject.getInt8pos(6);
			};

			l_NewObject.setSubCmd = function(p_SubCmd){
				l_NewObject.setInt8pos(6, p_SubCmd);
			};

			l_NewObject.getDataLength = function(){

				return l_NewObject.getInt16pos(2);
			};

			l_NewObject.setDataLength = function(p_length){
				l_NewObject.setInt16pos(2, p_length);
			};

			l_NewObject.getType = function(){

				return l_NewObject.getInt8pos(4);
			};

			l_NewObject.setType = function(p_type){
				l_NewObject.setInt8pos(4, p_type);
			};

			l_NewObject.getCheck = function(){
				var l_dataLength = l_NewObject.getDataLength();
				return l_NewObject.getInt8pos(l_dataLength + 3);
			};

			l_NewObject.setCheck = function(p_check){
				var l_dataLength = l_NewObject.getDataLength();
				l_NewObject.setInt8pos(l_dataLength + 3, p_check);
			};

			l_NewObject.resetCheck = function(){

				var l_Count = new Uint8Array(1);
          		var l_dataView = new DataView(l_NewObject._buffer);

          		var l_length = l_NewObject.getDataLength() + 4 -1;

          		for (var i = 0; i < l_length; i++) {
             		l_Count[0] = l_dataView.getUint8(i) + l_Count[0];
          		}

          		l_NewObject.setCheck(l_Count[0]);
				
			};

			l_NewObject.getInt8pos = function(position){

				var dataView = new DataView(l_NewObject._buffer, position);
				
				return dataView.getInt8(0, littleendian);
			};

			l_NewObject.getInt8 = function(){

				var l_value = l_NewObject.getInt8pos(l_NewObject.offset);
				l_NewObject.offset += 1;
				return l_value;
			};

			l_NewObject.setInt8pos = function(position, value){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				dataView.setInt8(0, value, littleendian);
			};
			l_NewObject.setInt8 = function(value){
				l_NewObject.setInt8pos(l_NewObject.offset, value);
				l_NewObject.offset += 1;
			};

			l_NewObject.getInt16pos = function(position){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				return dataView.getInt16(0, littleendian);
			};
			l_NewObject.getInt16 = function(){
				var l_value = l_NewObject.getInt16pos(l_NewObject.offset);
				l_NewObject.offset += 2;
				return l_value;
			};

			l_NewObject.setInt16pos = function(position, value){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				dataView.setInt16(0, value, littleendian);
			};
			l_NewObject.setInt16 = function(value){
				l_NewObject.setInt16pos(l_NewObject.offset, value);
				l_NewObject.offset += 2;
			};
			l_NewObject.getInt32pos = function(position){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				return dataView.getInt32(0, littleendian);
			};
			l_NewObject.getInt32 = function(){
				var l_value = l_NewObject.getInt32pos(l_NewObject.offset);
				l_NewObject.offset += 4;
				return l_value;
			};

			l_NewObject.setInt32pos = function(position, value){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				dataView.setInt32(0, value, littleendian);
			};
			l_NewObject.setInt32 = function(value){
				l_NewObject.setInt32pos(l_NewObject.offset, value);
				l_NewObject.offset += 4;
			};
			l_NewObject.getInt64pos = function(position){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				return dataView.getInt64(0, littleendian);
			};
			l_NewObject.getInt64 = function(){
				var l_value = l_NewObject.getInt64pos(l_NewObject.offset);
				l_NewObject.offset += 8;
				return l_value;
			};

			l_NewObject.setInt64pos = function(position, value){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				dataView.setInt64(0, value, littleendian);
			};
			l_NewObject.setInt64 = function(value){
				l_NewObject.setInt64pos(l_NewObject.offset, value);
				l_NewObject.offset += 8;
			};

			l_NewObject.getFloat32pos = function(position){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				return dataView.getFloat32(0, littleendian);
			};
			l_NewObject.getFloat32 = function(){
				var l_value = l_NewObject.getFloat32pos(l_NewObject.offset);
				l_NewObject.offset += 4;
				return l_value;
			};

			l_NewObject.setFloat32pos = function (position, value){
				var dataView = new DataView(l_NewObject._buffer, position);
				
				dataView.setFloat32(0, value, littleendian);
			};
			l_NewObject.setFloat32 = function (value){
				l_NewObject.setFloat32pos(l_NewObject.offset, value);
				l_NewObject.offset += 4;
			};

			l_NewObject.getStringpos = function(position, length){

        		var l_str = "";

       	 		var dataView = new DataView(l_NewObject._buffer, position);

        		for (var i = 0; i < length; i++) {
          			l_str += String.fromCharCode( dataView.getUint8(i));
        		}
        
        		return l_str;
      		};

			l_NewObject.getString = function(length){

				var l_value = l_NewObject.getStringpos(l_NewObject.offset, length);
				l_NewObject.offset += length;
				return l_value;
			};

			l_NewObject.setStringpos = function(position, value){

        		var dataView = new DataView(l_NewObject._buffer, position);

        		for (var i = 0; i < value.length; i++) {
          			dataView.setInt8(i, value.charCodeAt(i) );
        		}
      		};

			l_NewObject.setString = function(value){

				l_NewObject.setStringpos(l_NewObject.offset, value);
				l_NewObject.offset += value.length;
			};

			l_NewObject.print = function(){

          		var l_str = "Packet:( " + l_NewObject._buffer.byteLength + " ) \r\n";

          		var l_dataView = new DataView(l_NewObject._buffer);

          		for (var i = 0; i < l_NewObject._buffer.byteLength; i++) {
               		l_str += " " + l_dataView.getInt8(i);
               		if (((i + 1) % 16) === 0) {
                  		l_str += "\r\n";
               		}
          		}

          		return l_str;
      		};

			console.log("l_NewObject _buffer ");

			l_NewObject._buffer = null;

			if (p_buffer === null) {

				l_NewObject._buffer = new ArrayBuffer(p_length + 12);
				l_NewObject.setInt8pos(0, 0xAA);
				l_NewObject.setInt8pos(1, 0x55);
				l_NewObject.setInt16pos(2, p_length + 8);
				l_NewObject.setInt8pos(4, 0x02);	//M
				l_NewObject.setInt16pos(5, 0x0);	//数据包命令ID
				l_NewObject.setInt32pos(7, 0x0); //保留数据

			} else {

				l_NewObject._buffer = p_buffer;
			}
			
			l_NewObject.offset = 11; //定位到 数据位

			console.log("return l_NewObject ");

			return l_NewObject;
		}
	};

	function AppProxy(){

		self = this;

		var m_TimeoutHandle = null;
		var m_callback = null;
		var m_port = null;
		var m_KeeperCount = 0;

		self.isConnected = false;

		function isNull(p_object){
            return typeof(p_object) === "undefined" || p_object === null;
        }

		self.setCallback = function(p_callback){
			m_callback = p_callback;
		};

		function Request(p_name)
		{
     		new RegExp("(^|&)"+p_name+"=([^&]*)").exec(window.location.search.substr(1));
     		return RegExp.$2;
		}

		var AppID = Request("id");

		function onMessage(p_Msg){

			if (p_Msg.event === "KEEPER__") {

				self.isConnected = true;

				m_KeeperCount--;

				if (m_KeeperCount < 0) {
					m_KeeperCount = 0;
				}

			} else {

				if (m_callback !== null) {
						m_callback(p_Msg);
					}
			}
		}

		function connect(){

			self.isConnected = false;

			m_port = chrome.runtime.connect(AppID, {name:"abilix_scratch"});

			console.log("port " + m_port.name);

			setListener();

			m_TimeoutHandle = setInterval(KeeperTimeoutHandle, 500);
			m_KeeperCount = 0;
		}

  		function onDisconnect(){

      		console.log(" onDisconnect ");
      		self.stop();
      		connect();
  		}

  		function setListener(){

  			m_port.onMessage.addListener(onMessage);
  			m_port.onDisconnect.addListener(onDisconnect);

  			console.log(" set port Listener success " + m_port.name);
  		}

		self.start = function(){

			connect();
		};

		self.postMessage = function(p_Message){
			m_port.postMessage(p_Message);
		};

		function KeeperTimeoutHandle(){

			self.postMessage({event: "KEEPER__"});

			console.log(" KeeperTimeoutHandle ");

			m_KeeperCount++;

			if (m_KeeperCount > 10) {
				m_port.disconnect();
				self.stop();

				connect();
			}

		}

		self.stop = function(){

			if (!isNull(m_TimeoutHandle)) {
				window.clearInterval(m_TimeoutHandle);
              	m_TimeoutHandle = null;
			}
		};

	}

	var _callbacks = {};

	var moterPortLabels = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
    };

    // 
    var directionLabels = {
    	"RotateForward" : 0,
    	"RotateBackward" : 1
    };

    var speakerLabels = {
		"Hello": 0,
		"Bye": 1,
		"Oppose": 2,
		"Welcome" : 3,
		"Lookafter" : 4,
		"Angry" : 0,
		"Arrogant" : 1,
		"Cry" : 2,
		"Excited" : 3,
		"Frightened" : 4,
		"Aggrieved" : 5,
		"Happy" : 6,
		"Lovely" : 7,
		"Laugh" : 8,
		"Sad" : 9,
		"Mad" : 10,
		"Cheeky" : 11,
		"Shivering" : 0,
		"Cute" : 1,
		"Approval": 2,
		"Hug" : 3,
		"Yawn" : 4,
		"Go" : 5,
		"Sleep" : 6,
		"Relax" : 7,
		"Sneak" : 8,
		"Cow" : 0,
		"Tiger" : 1,
		"Dolphin" : 2,
		"Cricket" : 3,
		"Duckuse" : 4,
		"Gnat" : 5,
		"1" : 0,
		"2" : 1,
		"3" : 2,
		"4" : 3,
		"5" : 4,
		"6" : 5,
		"7" : 6,
		"8" : 7
	};
	var ledColorLabels = {
		"Red" : 0,
		"Green" : 1,
		"Blue" : 2
	};
	var deviceLabels = {
		"Motor" : 0,
		"Speaker" : 1,
		"LED" : 2,
		"Display" : 3
	};
	var portLabels = {
		"Automatic" : 0,
		"1" : 1,
		"2" : 2,
		"3" : 3,
		"4" : 4,
		"5" : 5,
		"6" : 6,
		"7" : 7
	};
	var colorLabels = {
		"Red" : 0,
		"Yellow" : 1,
		"Green" : 2,
		"Blue" : 3,
		"White" : 4
	};
	var gyroDirectionLables = {	
		"TiltDown" : 0,
		"TiltBack" : 1,
		"TurnLeft" : 2,
		"TurnRight" : 3
	};

	function onMessage(p_Msg){

		if (p_Msg.event == "CALLBACK__") {
			_callbacks["callback_" + p_Msg.sessionId](p_Msg.value);
		}
	}

  	var l_appProxy = new AppProxy();

  	l_appProxy.setCallback(onMessage);
  	l_appProxy.start();

	function postMessage(p_Message){

		l_appProxy.postMessage(p_Message);

	}

	function ArrayBufferToArray(p_buffer){
		var l_array = [];
		DataView l_dataview = new DataView(p_buffer);

		for (var i = 0; i < p_buffer.byteLength; i++) {
			l_array[i] = l_dataview.getUint8(i);
		}

		return l_array;
	}

	function scratchCommand(p_packet, p_SessionId, p_callback){

		if (p_SessionId !== null && p_callback !== null) {
			_callbacks["callback_"+p_SessionId] = p_callback;
		}
		
		postMessage({event: "COMMAND__", data: ArrayBufferToArray( p_packet._buffer)});

		console.log("scratchCommand end" );
	}

	ext._getStatus = function() {

        return l_appProxy.isConnected ?{status: 2, msg: 'Ready'}:{status: 1, msg: 'Not Ready'};
    };
	ext._deviceConnected = function(dev) {
	    
	    console.log("_deviceConnected");
	    
	    
	};
	ext._deviceRemoved = function(dev) {
	    console.log("_deviceRemoved");
	    
	};
	ext._shutdown = function() {
	    console.log("_shutdown");
	    
	};
	
    ext.sessionId = 0;

    //************* Abilix Blocks ***************//
    function genNextID(){
		ext.sessionId++;
		return ext.sessionId;
	}

    ext.resetAll = function(){

    	console.log(" scratch resetAll");

    };
    // 
    ext.openMotor = function(port,direction,speed){

    	console.log("openMotor " + port + " " + direction +" " + speed);

    	var l_packet = Packet.createNew(null, 16);

    	console.log("openMotor createNew end ");

    	try{
    		l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x01);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(moterPortLabels[port]);
    	l_packet.setInt32(directionLabels[direction]);
    	l_packet.setInt32(speed);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);

    	}
    	catch(e){

    		console.log("exception: " + e.message + " " + e.description);

    	}

    	

    	console.log("openMotor end ");

    };

    function openSpeaker(p_type, p_param){

    	var l_packet = Packet.createNew(null, 12);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x02);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(p_type);
    	l_packet.setInt32(p_param);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
    }

    ext.openSpeakerHi = function(param){

    	console.log("openSpeakerHi");

    	openSpeaker(0, speakerLabels[param]);

    };
    ext.openSpeakerExpression = function(param){
    	console.log("openSpeakerExpression");
    	
    	openSpeaker(1, speakerLabels[param]);
    };
    ext.openSpeakerAction = function(param){

    	console.log("openSpeakerAction");

    	openSpeaker(2, speakerLabels[param]);
    };
	ext.openSpeakerAnimal = function(param){

		console.log("openSpeakerAnimal");
    	openSpeaker(3, speakerLabels[param]);
	};
	ext.openSpeakerPiano = function(param){
		console.log("openSpeakerPiano");
    	openSpeaker(4, speakerLabels[param]);
	};
	ext.openSpeakerRecord = function(param){
		console.log("openSpeakerRecord");
    	openSpeaker(5, speakerLabels[param]);
	};
	ext.openLED = function(color){

		console.log("openLED");
    	
    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x03);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(ledColorLabels[color]);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);

	};

	ext.DisplayString = function(strMsg){

		console.log("DisplayString");
    	var l_packet = Packet.createNew(null, 8 + strMsg.length);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x04);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(0);
    	l_packet.setString(strMsg);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};

	ext.DisplayPhoto = function(photoId){

		console.log("DisplayPhoto");
    	var l_packet = Packet.createNew(null, 12);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x04);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(1);
    	l_packet.setString(photoId);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};
	ext.CloseDevice = function(deviceId){

		console.log("CloseDevice");
    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x05);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32( deviceLabels[deviceId] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};

	ext.getUltrasonicForObstacles = function(portId, p_callback){

		console.log("getUltrasonicForObstacles");

    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x06);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet, l_sessionId, p_callback);
	};

	ext.getUltrasonicForDistance = function(portId, p_callback){

		console.log("getUltrasonicForDistance");
    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x07);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet, l_sessionId, p_callback);
	};

	ext.getTouchSomething = function(portId, p_callback){

		console.log("getTouchSomething");

    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x08);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet, l_sessionId, p_callback);
	};
	ext.getColorValue = function(portId, p_color, p_callback){

		console.log("getColorValue");
    	
    	var l_packet = Packet.createNew(null, 12);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x09);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );
    	l_packet.setInt32(colorLabels[p_color] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet, l_sessionId, p_callback);
	};
	ext.getGrayscaleValue = function(portId, p_callback){

		console.log("getGrayscaleValue");

    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x0A);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet, l_sessionId, p_callback);
	};
	ext.takePhoto = function(portId){

		console.log("takePhoto");
    	
    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x0B);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};
	ext.clockReset = function(){

		console.log("clockReset");
    	
    	var l_packet = Packet.createNew(null, 4);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x0C);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
		
	};
	ext.getSystemTimeValue = function(p_callback){

		console.log("getSystemTimeValue");
    	
    	var l_packet = Packet.createNew(null, 4);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x0D);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
		
	};
	ext.calibrateCompass = function(){

		console.log("calibrateCompass");
    	
    	var l_packet = Packet.createNew(null, 4);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x0E);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
		
	};
	ext.getCompassValue = function(p_callback){

		console.log("getCompassValue");
    	
    	var l_packet = Packet.createNew(null, 4);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x0F);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};
	ext.getGyroscopeValue = function(dircetion, p_callback){

		console.log("getGyroscopeValue");
    	
    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x10);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(gyroDirectionLables[dircetion] );

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};

	ext.microphoneRecode = function(portId, time){

		console.log("microphoneRecode");
    	
    	var l_packet = Packet.createNew(null, 12);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x11);

    	var l_sessionId = genNextID();
    	l_packet.setInt32(l_sessionId);
    	l_packet.setInt32(portLabels[portId] );
    	l_packet.setInt32(time);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	};

	  // Check for GET param 'lang'
	  var paramString = window.location.search.replace(/^\?|\/$/g, '');
	  var vars = paramString.split("&");
	  var lang = 'en';
	  for (var i=0; i<vars.length; i++) {
	    var pair = vars[i].split('=');
	    if (pair.length > 1 && pair[0]=='lang')
	      lang = pair[1];
	  }

	var blocks = {
        en: [
	        	[" ", "Start Motor %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "RotateForward" , "30"],
				[" ", "Speaker Hi %m.speakerParam1_0 ","openSpeakerHi", "Hello"],
				[" ", "Speaker Expression %m.speakerParam1_1 ","openSpeakerExpression", "Angry"],
				[" ", "Speaker Action %m.speakerParam1_2 ","openSpeakerAction", "Shivering"],
				[" ", "Speaker Animal %m.speakerParam1_3 ","openSpeakerAnimal", "Cow"],
				[" ", "Speaker Piano %m.speakerParam1_4 ","openSpeakerPiano", "1"],
				[" ", "Speaker Record %m.speakerParam1_5 ","openSpeakerRecord", "1"],
				[" ", "Start LED %m.ledParam","openLED", "Red"],
				[" ", "Display Character %s","DisplayString", ""],
				[" ", "Display Photo %m.displayParam1_1","DisplayPhoto", "1"],
				[" ", "Close %m.closeParam","CloseDevice", "Motor"],

				["-"],

				["R", "Ultrasonic Port %m.senorParam Obstacles Detected","getUltrasonicForObstacles","Automatic"],
				["R", "Ultrasonic Port %m.senorParam Detect Distance","getUltrasonicForDistance","Automatic"],
				["R", "Touch Port %m.senorParam Touch an Object","getTouchSomething","Automatic"],
				["R", "Color Port %m.senorParam Recognize%m.senorParam1","getColorValue","Automatic"],
				["R", "Grayscale Port %m.senorParam Detection Value","getGrayscaleValue","Automatic"],
				[" ", "Camera Port CAM Photo %m.displayParam1_1","takePhoto","1"],

				["-"],

				[" ", "Clock Reset","clockReset"],
				["R", "System Time","getSystemTimeValue"],
				[" ", "Calibrate Compass","calibrateCompass"],
				["R", "Compass Detection Angle","getCompassValue"],
				["R", "Detected by Gyroscope %m.getGyroParam1","getGyroscopeValue","TiltDown"],
				[" ", "Recording %m.speakerParam1_5 %d.tapeParam1 Second","microphoneRecode","1","1"]

			],
		'zh-cn': [
				[" ", "Start Motor %m.motorPort %m.motorDirection %d.motorSpeed ","runMotor", "A", "RotateForward" , "30"],
				[" ", "Speaker Hi %m.speakerParam1_0 ","openSpeakerHi", "Hello"],
				[" ", "Speaker Expression %m.speakerParam1_1 ","openSpeakerExpression", "Angry"],
				[" ", "Speaker Action %m.speakerParam1_2 ","openSpeakerAction", "Shivering"],
				[" ", "Speaker Animal %m.speakerParam1_3 ","openSpeakerAnimal", "Cow"],
				[" ", "Speaker Piano %m.speakerParam1_4 ","openSpeakerPiano", "1"],
				[" ", "Speaker Record %m.speakerParam1_5 ","openSpeakerRecord", "1"],
				[" ", "Start LED %m.ledParam","openLED", "Red"],
				[" ", "Display Character %s","DisplayString", ""],
				[" ", "Display Photo %m.displayParam1_1","DisplayPhoto", "1"],
				[" ", "Close %m.closeParam","DisplayPhoto", "Motor"],

				["-"],

				["R", "Ultrasonic Port %m.senorParam Obstacles Detected","getUltrasonicForObstacles","Automatic"],
				["R", "Ultrasonic Port %m.senorParam Detect Distance","getUltrasonicForDistance","Automatic"],
				["R", "Touch Port %m.senorParam Touch an Object","getTouchSomething","Automatic"],
				["R", "Color Port %m.senorParam Recognize%m.senorParam1","getColorValue","Automatic"],
				["R", "Grayscale Port %m.senorParam Detection Value","getGrayscaleValue","Automatic"],
				[" ", "Camera Port CAM Photo %m.displayParam1_1","takePhoto","1"],

				["-"],

				[" ", "Clock Reset","clockReset"],
				["R", "System Time","getSystemTimeValue"],
				[" ", "Calibrate Compass","calibrateCompass"],
				["R", "Compass Detection Angle","getCompassValue"],
				["R", "Detected by Gyroscope %m.getGyroParam1","getGyroscopeValue","TiltDown"],
				[" ", "Recording %m.speakerParam1_5 %d.tapeParam1 Second","microphoneRecode","1","1"]
			]		
		};


    var menus = {
    	en:{
			motorPort:["A","B","C","D"],
			motorDirection:["RotateForward","RotateBackward"],
			motorSpeed:["30","50","70"],
			speakerParam1_0:["Hello","Bye","Oppose","Welcome","Lookafter"],
			speakerParam1_1:["Angry","Arrogant","Cry","Excited","Frightened","Aggrieved","Happy","Lovely","Laugh","Sad","Mad","Cheeky"],
			speakerParam1_2:["Shivering","Cute","Approval","Hug","Yawn","Go","Sleep","Relax","Sneak"],
			speakerParam1_3:["Cow","Tiger","Dolphin","Cricket","Duckuse","Gnat"],
			speakerParam1_4:["1","2","3","4","5","6","7","8"],
			speakerParam1_5:[1,2,3,4,5,6,7,8,9,10],
			ledParam:["Red","Green","Blue"],
			displayParam1_1:[1,2,3,4,5,6,7,8,9,10],
			closeParam:["Motor","Speaker","LED","Display"],
			senorParam:["Automatic","1","2","3","4","5","6","7"],
			senorParam1:["Red","Yellow","Green","Blue","White"],
			getGyroParam1:["TiltDown","TiltBack","TurnLeft","TurnRight"],
			tapeParam1:["1","3","5","7"]
		},
		'zh-cn':{
			motorPort:["A","B","C","D"],
			motorDirection:["RotateForward","RotateBackward"],
			motorSpeed:["30","50","70"],
			speakerParam1_0:["Hello","Bye","Oppose","Welcome","Lookafter"],
			speakerParam1_1:["Angry","Arrogant","Cry","Excited","Frightened","Aggrieved","Happy","Lovely","Laugh","Sad","Mad","Cheeky"],
			speakerParam1_2:["Shivering","Cute","Approval","Hug","Yawn","Go","Sleep","Relax","Sneak"],
			speakerParam1_3:["Cow","Tiger","Dolphin","Cricket","Duckuse","Gnat"],
			speakerParam1_4:["1","2","3","4","5","6","7","8"],
			speakerParam1_5:[1,2,3,4,5,6,7,8,9,10],
			ledParam:["Red","Green","Blue"],
			displayParam1_1:[1,2,3,4,5,6,7,8,9,10],
			closeParam:["Motor","Speaker","LED","Display"],
			senorParam:["Automatic","1","2","3","4","5","6","7"],
			senorParam1:["Red","Yellow","Green","Blue","White"],
			getGyroParam1:["TiltDown","TiltBack","TurnLeft","TurnRight"],
			tapeParam1:["1","3","5","7"]
		}
    };
	var hid_info = {type: 'hid', vendor: 0x0416, product: 0xffff};

  var descriptor = {
		blocks : blocks[lang],
		menus : menus[lang],
		url : 'http://Abilix.github.io/abilix_scratch.js'
	};

	ScratchExtensions.register('Abilix', descriptor, ext);
})({});
