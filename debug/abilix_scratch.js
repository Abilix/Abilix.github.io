(function(ext) {

	var Packet = {

		createNew : function(p_buffer, p_length){

			var l_NewObject = {};

			var littleendian = false;

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
				l_NewObject.setInt8pos(4, 0x01);	//C
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

/*******************************************************************************************************************/
/*                                                                                                                 */
/*******************************************************************************************************************/

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

/*******************************************************************************************************************/
/*                                                                                                                 */
/*******************************************************************************************************************/

	var _callbacks = {};

	var moterPortLabels = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
    };

    var moterNewPortLabels = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "A+D": 4,
        "B+C": 5,
    };

    var moterTypeLabels = {
        "LittleMotor": 0,
        "BigMotor": 1
    };

    var moterRunModeLabels = {
        "Angle": 0,
        "Loops": 1,
        "Time": 2,
    };

    // 
    var directionLabels = {
    	"RotateForward" 	: 0,
    	"RotateBackward" 	: 1,
    	//阿拉伯语
    	"استدر  الى الامام"		: 0,
    	"استدر الى الوراء"		: 1,
    	//希伯拉语
    	"הסתובב קדימה"	: 0,
    	"הסתובב אחורה"	: 1,
    };

    var speakerLabels = {
		"Hello"		: 0,
		"Bye"		: 1,
		"Oppose"	: 2,
		"Welcome" 	: 3,
		"Lookafter" : 4,

		"Angry" 		: 0,
		"Arrogant" 		: 1,
		"Cry" 			: 2,
		"Excited" 		: 3,
		"Frightened" 	: 4,
		"Aggrieved" 	: 5,
		"Happy" 		: 6,
		"Lovely" 		: 7,
		"Laugh" 		: 8,
		"Sad" 			: 9,
		"Mad" 			: 10,
		"Cheeky" 		: 11,

		"Shivering" : 0,
		"Cute" 		: 1,
		"Approval"	: 2,
		"Hug" 		: 3,
		"Yawn" 		: 4,
		"Go" 		: 5,
		"Sleep" 	: 6,
		"Relax" 	: 7,
		"Sneak" 	: 8,

		"Cow" 		: 0,
		"Tiger" 	: 1,
		"Dolphin" 	: 2,
		"Cricket" 	: 3,
		"Duckuse" 	: 4,
		"Gnat" 		: 5,

		"1" : 0,
		"2" : 1,
		"3" : 2,
		"4" : 3,
		"5" : 4,
		"6" : 5,
		"7" : 6,
		"8" : 7,
		//阿拉伯语
		"مرحبا" 			: 0,
		"مع السلامه" 		: 1,
		"اسف" 				: 2,
		"اهلا\" وسهلا\"" 	: 3,
		"انتبه الى" 		: 4,

		"غضب" 		: 0,
		"متغطرس" 	: 1,
		"بكاء" 		: 2,
		"منفعل" 	: 3,
		"خائف" 		: 4,
		"يضايق" 	: 5,
		"سعيد" 		: 6,
		"ممتاز" 	: 7,
		"يضحك" 		: 8,
		"حزين" 		: 9,
		"غاضب " 	: 10,
		"وقح" 		: 11,

		"يرجف" 		: 0,
		"ظريف" 		: 1,
		"مأيد" 		: 2,
		"عناق" 		: 3,
		"تثاءب" 	: 4,
		"تحرك" 		: 5,
		"نائم" 		: 6,
		"استرخاء" 	: 7,
		"تسلل" 		: 8,

		"بقرة" 	: 0,
		"نمر" 	: 1,
		"دلفين" : 2,
		"صرصور" : 3,
		"بط" 	: 4,
		"بعوض" 	: 5,

		//希伯拉语
		"שלום" 		: 0,
		"ביי" 		: 1,
		"אופס !" 	: 2,
		"ברוך הבא" 	: 3,
		"תדאג ל" 	: 4,

		"כועס" 	: 0,
		"שחצן" 	: 1,
		"בוכה" 	: 2,
		"נרגש" 	: 3,
		"מפחד" 	: 4,
		"מציק" 	: 5,
		"שמח" 	: 6,
		"יופי" 	: 7,
		"צוחק" 	: 8,
		"עצוב" 	: 9,
		"עצבני" 	: 10,
		"חצוף" 	: 11,

		"רועד" 		: 0,
		"חמוד" 		: 1,
		"מסכים" 		: 2,
		"חיבוק" 		: 3,
		"פהוק" 		: 4,
		"זוז" 		: 5,
		"יושן" 		: 6,
		"להרגע" 		: 7,
		"להתגנב" 	: 8,

		"פרה" 		: 0, 
		"נמר" 		: 1,
		"דולפין" 		: 2,
		"גוק" 		: 3,
		"ברווז" 		: 4,
		"יַתוּש" 	: 5,
	};
	var ledColorLabels = {
		"Red" 	: 0,
		"Green" : 1,
		"Blue" 	: 2,

		//阿拉伯语
		"أحمر" : 0,
		"أخضر" : 1,
		"أزرق" : 2,

		//希伯拉语
		"אדום" 	: 0,
		"ירוק" 	: 1,
		"כחול" 	: 2,
	};
	var deviceLabels = {
		"Motor" 	: 0,
		"Speaker" 	: 1,
		"LED" 		: 2,
		"Display" 	: 3,

		//阿拉伯语
		"محرك" 		: 0,
		"المتحدث" 	: 1,
		//"LED" 	: 2,
		"شاشة" 		: 3,
		//希伯拉语
		"מנוע" 	: 0,
		"רמקול" 	: 1,
		//"LED" : 2,
		"מסך" 	: 3,
	};
	var portLabels = {
		"Automatic" : 0,
		"1" : 1,
		"2" : 2,
		"3" : 3,
		"4" : 4,
		"5" : 5,
		"6" : 6,
		"7" : 7,
		//阿拉伯语
		"اوتوماتي" 	: 0,
		//希伯拉语
		"אוטומטי" 	: 0,
	};
	var colorLabels = {
		"Red" 		: 0,
		"Yellow" 	: 1,
		"Green" 	: 2,
		"Blue" 		: 3,
		"White" 	: 4,

		//阿拉伯语
		"احمر" : 0,
		"اصفر" : 1,
		"أخضر" : 2,
		"أزرق" : 3,
		"ابيض" : 4,
		//希伯拉语
		"אדום" 	: 0,
		"צהוב" 	: 1,
		"ירוק" 	: 2,
		"כחול" 	: 3,
		"לבן" 	: 4,
	};
	var gyroDirectionLables = {	
		"TiltDown" 	: 0,
		"TiltBack" 	: 1,
		"TurnLeft" 	: 2,
		"TurnRight" : 3,

		//阿拉伯语
		"الى تحت" 		: 0,
		"الى فوق" 		: 1,
		"الى اليسار" 	: 2,
		"الى اليمين" 	: 3,
		//希伯拉语
		"כלפי מטה" 	: 0,
		"כלפי מעלה" 	: 1,
		"לצד שמאל" 	: 2,
		"לצד ימין" 	: 3,
	};

/*******************************************************************************************************************/
/*                                                                                                                 */
/*******************************************************************************************************************/

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
		var l_dataview = new DataView(p_buffer);

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

    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x01);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(moterPortLabels[port]);
    	l_packet.setInt32(directionLabels[direction]);
    	l_packet.setInt32(speed);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);

    	console.log("openMotor end " + direction + " " + directionLabels[direction]);

    };

    ext.closedloopMotor = function(type, port, speed){

    	console.log("closedloopMotor " + type + " " + port  +" " + speed);
    	console.log("closedloopMotor " + moterTypeLabels[type] + " " + moterNewPortLabels[port]  +" " + speed);

    	var l_packet = Packet.createNew(null, 16);

    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x17);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(moterTypeLabels[type]);
    	l_packet.setInt32(moterNewPortLabels[port]);
    	l_packet.setInt32(speed);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);

    };

    function wait(d){

    	var t = Date.now();  
  
    	while(Date.now - t <= d);  
    }

    function CloseDevice(deviceId){

		console.log("CloseDevice "+ deviceId );
    	var l_packet = Packet.createNew(null, 8);
    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x05);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32( deviceId );

    	l_packet.resetCheck();

    	scratchCommand(l_packet);
	}

    ext.closedloopMotorMode = function(type, port, speed, runMode, value){

    	console.log("closedloopMotorMode " + type + " " + port  +" " + speed + " " + runMode + " " +value);
    	console.log("closedloopMotorMode " + moterTypeLabels[type] + " " + moterNewPortLabels[port]  +" " + speed + " " + moterRunModeLabels[runMode] + " " +value);

    	var l_packet = Packet.createNew(null, 24);

    	l_packet.setMasterCmd(0x0A);
    	l_packet.setSubCmd(0x18);

    	l_packet.setInt32(genNextID());
    	l_packet.setInt32(moterTypeLabels[type]);
    	l_packet.setInt32(moterNewPortLabels[port]);
    	
    	l_packet.setInt32(speed);

    	var l_run_mode = moterRunModeLabels[runMode];
    	l_packet.setInt32(l_run_mode);
    	l_packet.setInt32(value);

    	l_packet.resetCheck();

    	scratchCommand(l_packet);

    	if (l_run_mode == 2) {
    		wait(value);
    		CloseDevice(value);
    	}

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

    	console.log("openSpeakerHi " + param + " " + speakerLabels[param]);

    	openSpeaker(0, speakerLabels[param]);

    };
    ext.openSpeakerExpression = function(param){
    	console.log("openSpeakerExpression " + param + " " + speakerLabels[param]);
    	
    	openSpeaker(1, speakerLabels[param]);
    };
    ext.openSpeakerAction = function(param){

    	console.log("openSpeakerAction "+ param + " " + speakerLabels[param]);

    	openSpeaker(2, speakerLabels[param]);
    };
	ext.openSpeakerAnimal = function(param){

		console.log("openSpeakerAnimal "+ param + " " + speakerLabels[param]);
    	openSpeaker(3, speakerLabels[param]);
	};
	ext.openSpeakerPiano = function(param){
		console.log("openSpeakerPiano "+ param + " " + speakerLabels[param]);
    	openSpeaker(4, speakerLabels[param]);
	};
	ext.openSpeakerRecord = function(param){
		console.log("openSpeakerRecord "+ param + " " + speakerLabels[param]);
    	openSpeaker(5, speakerLabels[param]);
	};
	ext.openLED = function(color){

		console.log("openLED "+ color + " " + ledColorLabels[color]);
    	
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

		console.log("CloseDevice "+ deviceId + " " + deviceLabels[deviceId]);
    	
    	CloseDevice(deviceLabels[deviceId]);
	};

	ext.getUltrasonicForObstacles = function(portId, p_callback){

		console.log("getUltrasonicForObstacles " + portId + " " + portLabels[portId]);

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

		console.log("getColorValue "  + p_color + " " + colorLabels[p_color]);
    	
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

		console.log("getGyroscopeValue " + dircetion + " " + gyroDirectionLables[dircetion] );
    	
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

	function getSearchLanguage(){

		var paramString = window.location.search.replace(/^\?|\/$/g, '');
	  	var vars = paramString.split("&");
	  	var lang = "";
	  	for (var i=0; i<vars.length; i++) {
	    	var pair = vars[i].split('=');
	    	if (pair.length > 1 && pair[0]=='lang')
	      		lang = pair[1];
	  	}

	  	return lang;
	}

	function getLanguage(){

	  	var lang = getSearchLanguage();

	  	console.log("getLanguage 1: " + lang);

	  	if (lang.length === 0) {
	  		lang = navigator.browserLanguage ? navigator.browserLanguage : navigator.language; 
	  	}

	  	console.log("getLanguage 2: " + lang);
	  	
	  	if (lang.length === 0) {
	  		lang = "en";
	  	}

	  	var l_array = lang.split("-");

	  	if (l_array.length > 1) {

	  		lang = l_array[0];
	  	}
	  	
	  	console.log("getLanguage 3: " + lang);

	  	return lang.toLowerCase();
	  	
	}

/*******************************************************************************************************************/
/*                                                                                                                 */
/*******************************************************************************************************************/
	  
	var blocks = {
        en: [
	        	[" ", "Start Motor %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "RotateForward" , "30"],
	        	[" ", "Closed-loop run Motor %m.motorType port %m.motorNewPort speed %d.motorSpeed ","closedloopMotor", "LittleMotor","A", "30"],
	        	[" ", "Closed-loop run Motor %m.motorType port %m.motorNewPort speed %d.motorSpeed mode %m.motorRunMode value %d.motorValue ","closedloopMotorMode", "LittleMotor","A", "30", "Angle", "50"],
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
				["R", "Color Port %m.senorParam Recognize%m.senorParam1","getColorValue","Automatic","Red"],
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
		zh: [
				[" ", "Start Motor %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "RotateForward" , "30"],
				[" ", "Closed-loop run Motor %m.motorType port %m.motorNewPort speed %d.motorSpeed ","closedloopMotor", "LittleMotor","A", "30"],
	        	[" ", "Closed-loop run Motor %m.motorType port %m.motorNewPort speed %d.motorSpeed mode %m.motorRunMode value %d.motorValue ","closedloopMotorMode", "LittleMotor","A", "30", "Angle", "50"],
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
				["R", "Color Port %m.senorParam Recognize%m.senorParam1","getColorValue","Automatic","Red"],
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
			//阿拉伯语
			ar: [
				//[" ", "Start Motor %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "RotateForward" , "30"],
				[" ", "شغل المحرك %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "استدر  الى الامام" , "30"],

				//[" ", "Speaker Hi %m.speakerParam1_0 ","openSpeakerHi", "Hello"],
				[" ", "قل %m.speakerParam1_0 ","openSpeakerHi", "مرحبا"],

				//[" ", "Speaker Expression %m.speakerParam1_1 ","openSpeakerExpression", "Angry"],
				[" ", "أظهر إحساس %m.speakerParam1_1 ","openSpeakerExpression", "غضب"],

				//[" ", "Speaker Action %m.speakerParam1_2 ","openSpeakerAction", "Shivering"],
				[" ", "اظهر ردة فعل %m.speakerParam1_2 ","openSpeakerAction", "يرجف"],

				//[" ", "Speaker Animal %m.speakerParam1_3 ","openSpeakerAnimal", "Cow"],
				[" ", "صوت الحيوان %m.speakerParam1_3 ","openSpeakerAnimal", "بقرة"],

				//[" ", "Speaker Piano %m.speakerParam1_4 ","openSpeakerPiano", "1"],
				[" ", "عزف نغمات البيانو %m.speakerParam1_4 ","openSpeakerPiano", "1"],

				//[" ", "Speaker Record %m.speakerParam1_5 ","openSpeakerRecord", "1"],
				[" ", "تسجيل %m.speakerParam1_5 ","openSpeakerRecord", "1"],


				//[" ", "Start LED %m.ledParam","openLED", "Red"],
				[" ", "تشغيل LED %m.ledParam","openLED", "أحمر"],

				//[" ", "Display Character %s","DisplayString", ""],
				[" ", "عرض على الشاشة %s","DisplayString", ""],

				//[" ", "Display Photo %m.displayParam1_1","DisplayPhoto", "1"],
				[" ", "عرض الصورة %m.displayParam1_1","DisplayPhoto", "1"],

				//[" ", "Close %m.closeParam","CloseDevice", "Motor"],
				[" ", "توقف %m.closeParam","CloseDevice", "محرك"],

				["-"],

				//["R", "Ultrasonic Port %m.senorParam Obstacles Detected","getUltrasonicForObstacles","Automatic"],
				["R", "دخول - مجس الاستشعار عن بعد %m.senorParam تحديد العقبات","getUltrasonicForObstacles","اوتوماتي"],

				//["R", "Ultrasonic Port %m.senorParam Detect Distance","getUltrasonicForDistance","Automatic"],
				["R", "دخول - مجس الاستشعار عن بعد %m.senorParam كشف البعد","getUltrasonicForDistance","اوتوماتي"],

				//["R", "Touch Port %m.senorParam Touch an Object","getTouchSomething","Automatic"],
				["R", "دخول -  مجس الاستشعار التي تعمل باللمس %m.senorParam كشف الملمس","getTouchSomething","اوتوماتي"],

				//["R", "Color Port %m.senorParam Recognize%m.senorParam1","getColorValue","Automatic"],
				["R", "دخول - مجس اللون %m.senorParam التعرف على الألوان%m.senorParam1","getColorValue","اوتوماتي","احمر"],

				//["R", "Grayscale Port %m.senorParam Detection Value","getGrayscaleValue","Automatic"],
				["R", "مجس استشعار مقياس الرمادية %m.senorParam تحديد قيمة ","getGrayscaleValue","اوتوماتي"],

				//[" ", "Camera Port CAM Photo %m.displayParam1_1","takePhoto","1"],
				[" ", "تصوير عن طريق إدخال الكاميرا %m.displayParam1_1","takePhoto","1"],

				["-"],

				//[" ", "Clock Reset","clockReset"],
				[" ", "صفر  الساعة","clockReset"],

				//["R", "System Time","getSystemTimeValue"],
				["R", "ساعة النظام","getSystemTimeValue"],

				//[" ", "Calibrate Compass","calibrateCompass"],
				[" ", "تعير البوصلة","calibrateCompass"],

				//["R", "Compass Detection Angle","getCompassValue"],
				["R", "كشف زاوية البوصلة","getCompassValue"],

				//["R", "Detected by Gyroscope %m.getGyroParam1","getGyroscopeValue","TiltDown"],
				["R", "كشف الميل %m.getGyroParam1","getGyroscopeValue","الى تحت"],

				//[" ", "Recording %m.speakerParam1_5 %d.tapeParam1 Second","microphoneRecode","1","1"]
				[" ", "تسجيل الصوت %m.speakerParam1_5 %d.tapeParam1 ثانية","microphoneRecode","1","1"]
			],
			//希伯拉语
			he: [
				//[" ", "Start Motor %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "RotateForward" , "30"],
				[" ", "הפעל מנוע %m.motorPort %m.motorDirection %d.motorSpeed ","openMotor", "A", "הסתובב קדימה" , "30"],

				//[" ", "Speaker Hi %m.speakerParam1_0 ","openSpeakerHi", "Hello"],
				[" ", "אמור %m.speakerParam1_0 ","openSpeakerHi", "שלום"],

				//[" ", "Speaker Expression %m.speakerParam1_1 ","openSpeakerExpression", "Angry"],
				[" ", "הבע רגש %m.speakerParam1_1 ","openSpeakerExpression", "غضب"],

				//[" ", "Speaker Action %m.speakerParam1_2 ","openSpeakerAction", "Shivering"],
				[" ", "הבע פעולה %m.speakerParam1_2 ","openSpeakerAction", "רועד"],

				//[" ", "Speaker Animal %m.speakerParam1_3 ","openSpeakerAnimal", "Cow"],
				[" ", "צליל חיות %m.speakerParam1_3 ","openSpeakerAnimal", "פרה"],

				//[" ", "Speaker Piano %m.speakerParam1_4 ","openSpeakerPiano", "1"],
				[" ", "נגן פסנטר %m.speakerParam1_4 ","openSpeakerPiano", "1"],

				//[" ", "Speaker Record %m.speakerParam1_5 ","openSpeakerRecord", "1"],
				[" ", "הקלט %m.speakerParam1_5 ","openSpeakerRecord", "1"],


				//[" ", "Start LED %m.ledParam","openLED", "Red"],
				[" ", "הפעל LED %m.ledParam","openLED", "אדום"],

				//[" ", "Display Character %s","DisplayString", ""],
				[" ", "הצג על המסך %s","DisplayString", ""],

				//[" ", "Display Photo %m.displayParam1_1","DisplayPhoto", "1"],
				[" ", "הצג תמונה %m.displayParam1_1","DisplayPhoto", "1"],

				//[" ", "Close %m.closeParam","CloseDevice", "Motor"],
				[" ", "הפסק %m.closeParam","CloseDevice", "מנוע"],

				["-"],

				//["R", "Ultrasonic Port %m.senorParam Obstacles Detected","getUltrasonicForObstacles","Automatic"],
				["R", "כניסה - חיישן מרחק %m.senorParam זהה מכשולים","getUltrasonicForObstacles","אוטומטי"],

				//["R", "Ultrasonic Port %m.senorParam Detect Distance","getUltrasonicForDistance","Automatic"],
				["R", "כניסה - חיישן מרחק %m.senorParam זיהוי מרחק","getUltrasonicForDistance","אוטומטי"],

				//["R", "Touch Port %m.senorParam Touch an Object","getTouchSomething","Automatic"],
				["R", "כניסה - חיישן מגע %m.senorParam זיהוי מגע","getTouchSomething","אוטומטי"],

				//["R", "Color Port %m.senorParam Recognize%m.senorParam1","getColorValue","Automatic"],
				["R", "כניסה - חיישן צבע %m.senorParam זיהוי צבע %m.senorParam1","getColorValue","אוטומטי","אדום"],

				//["R", "Grayscale Port %m.senorParam Detection Value","getGrayscaleValue","Automatic"],
				["R", "חיישן סקאלה אפורה %m.senorParam זיהוי ערך ","getGrayscaleValue","אוטומטי"],

				//[" ", "Camera Port CAM Photo %m.displayParam1_1","takePhoto","1"],
				[" ", "צילום דרך כניסת מצלמה %m.displayParam1_1","takePhoto","1"],

				["-"],

				//[" ", "Clock Reset","clockReset"],
				[" ", "אפס שעון","clockReset"],

				//["R", "System Time","getSystemTimeValue"],
				["R", "שעון מערכת","getSystemTimeValue"],

				//[" ", "Calibrate Compass","calibrateCompass"],
				[" ", "כיול מצפן","calibrateCompass"],

				//["R", "Compass Detection Angle","getCompassValue"],
				["R", "זיהוי זווית מצפן","getCompassValue"],

				//["R", "Detected by Gyroscope %m.getGyroParam1","getGyroscopeValue","TiltDown"],
				["R", "זהה הטייה %m.getGyroParam1","getGyroscopeValue","כלפי מטה"],

				//[" ", "Recording %m.speakerParam1_5 %d.tapeParam1 Second","microphoneRecode","1","1"]
				[" ", "הקלט %m.speakerParam1_5 %d.tapeParam1 שניה","microphoneRecode","1","1"]
			]					
		};


    var menus = {
    	en:{
			motorPort:["A","B","C","D"],
			motorDirection:["RotateForward","RotateBackward"],
			motorSpeed:["30","50","70"],
			motorType:["LittleMotor","BigMotor"],
			motorNewPort:["A","B","C","D","A+D","B+C"],
			motorRunMode:["Angle","Loops","Time"],
			motorValue:["25","50","75", "100"],
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
		zh:{
			motorPort:["A","B","C","D"],
			motorDirection:["RotateForward","RotateBackward"],
			motorSpeed:["30","50","70"],
			motorType:["LittleMotor","BigMotor"],
			motorNewPort:["A","B","C","D","A+D","B+C"],
			motorRunMode:["Angle","Loops","Time"],
			motorValue:["25","50","75", "100"],
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
		//阿拉伯语
		ar:{
			motorPort:["A","B","C","D"],

			//motorDirection:["RotateForward","RotateBackward"],
			motorDirection:["استدر  الى الامام","استدر الى الوراء"],

			motorSpeed:["30","50","70"],

			//speakerParam1_0:["Hello","Bye","Oppose","Welcome","Lookafter"],
			speakerParam1_0:["مرحبا","مع السلامه","اسف","اهلا\" وسهلا\"","انتبه الى"],

			//speakerParam1_1:["Angry","Arrogant","Cry","Excited","Frightened","Aggrieved","Happy","Lovely","Laugh","Sad","Mad","Cheeky"],
			speakerParam1_1:["غضب","متغطرس","بكاء","منفعل","خائف","يضايق","سعيد","ممتاز","يضحك","حزين","غاضب ","وقح"],

			//speakerParam1_2:["Shivering","Cute","Approval","Hug","Yawn","Go","Sleep","Relax","Sneak"],
			speakerParam1_2:["يرجف","ظريف","مأيد","عناق","تثاءب","تحرك","نائم","استرخاء","تسلل"],

			//speakerParam1_3:["Cow","Tiger","Dolphin","Cricket","Duckuse","Gnat"],
			speakerParam1_3:["بقرة","نمر","دلفين","صرصور","بط","بعوض"],

			speakerParam1_4:["1","2","3","4","5","6","7","8"],
			speakerParam1_5:[1,2,3,4,5,6,7,8,9,10],

			//ledParam:["Red","Green","Blue"],
			ledParam:["أحمر","أخضر","أزرق"],

			displayParam1_1:[1,2,3,4,5,6,7,8,9,10],

			//closeParam:["Motor","Speaker","LED","Display"],
			closeParam:["محرك","المتحدث","LED","شاشة"],

			//senorParam:["Automatic","1","2","3","4","5","6","7"],
			senorParam:["اوتوماتي","1","2","3","4","5","6","7"],

			//senorParam1:["Red","Yellow","Green","Blue","White"],
			senorParam1:["احمر","اصفر","أخضر","أزرق","ابيض"],

			//getGyroParam1:["TiltDown","TiltBack","TurnLeft","TurnRight"],
			getGyroParam1:["الى تحت","الى فوق","الى اليسار","الى اليمين"],

			tapeParam1:["1","3","5","7"]
		},
		//希伯拉语
		he:{
			motorPort:["A","B","C","D"],

			//motorDirection:["RotateForward","RotateBackward"],
			motorDirection:["הסתובב קדימה","הסתובב אחורה"],

			motorSpeed:["30","50","70"],

			//speakerParam1_0:["Hello","Bye","Oppose","Welcome","Lookafter"],
			speakerParam1_0:["שלום","ביי","אופס !","ברוך הבא","תדאג ל"],

			//speakerParam1_1:["Angry","Arrogant","Cry","Excited","Frightened","Aggrieved","Happy","Lovely","Laugh","Sad","Mad","Cheeky"],
			speakerParam1_1:["כועס","שחצן","בוכה","נרגש","מפחד","מציק","שמח","יופי","צוחק","עצוב","עצבני","חצוף"],

			//speakerParam1_2:["Shivering","Cute","Approval","Hug","Yawn","Go","Sleep","Relax","Sneak"],
			speakerParam1_2:["רועד","חמוד","מסכים","חיבוק","פהוק","זוז","יושן","להרגע","להתגנב"],

			//speakerParam1_3:["Cow","Tiger","Dolphin","Cricket","Duckuse","Gnat"],
			speakerParam1_3:["פרה","נמר","דולפין","גוק","ברווז","יַתוּש"],

			speakerParam1_4:["1","2","3","4","5","6","7","8"],
			speakerParam1_5:[1,2,3,4,5,6,7,8,9,10],

			//ledParam:["Red","Green","Blue"],
			ledParam:["אדום","ירוק","כחול"],

			displayParam1_1:[1,2,3,4,5,6,7,8,9,10],

			//closeParam:["Motor","Speaker","LED","Display"],
			closeParam:["מנוע","רמקול","LED","מסך"],

			//senorParam:["Automatic","1","2","3","4","5","6","7"],
			senorParam:["אוטומטי","1","2","3","4","5","6","7"],

			//senorParam1:["Red","Yellow","Green","Blue","White"],
			senorParam1:["אדום","צהוב","ירוק","כחול","לבן"],

			//getGyroParam1:["TiltDown","TiltBack","TurnLeft","TurnRight"],
			getGyroParam1:["כלפי מטה","כלפי מעלה","לצד שמאל","לצד ימין"],

			tapeParam1:["1","3","5","7"]
		}
    };
	var hid_info = {type: 'hid', vendor: 0x0416, product: 0xffff};

	var lang = getLanguage();

	if ( !(lang in menus) ) {
		
		lang = "en";
	}

  	var descriptor = {

		blocks : blocks[lang],
		menus : menus[lang],
		url : 'http://Abilix.github.io/abilix_scratch.js'
	};

	ScratchExtensions.register('Abilix', descriptor, ext);

})({});
