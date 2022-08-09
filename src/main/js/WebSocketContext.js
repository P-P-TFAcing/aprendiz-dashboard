/**
 * updated
 */
export default class WebSocketContext {
    
    sendMessage(messageType, messageData) {
        let message =  { };
        if(messageData) {
            message = messageData;
        }        
        message.messageType = messageType;
        if(message.messageType !== 'PING') {
            console.log('send message',messageType, message);
        }
        this.webSocket.send(JSON.stringify(message));
    }

    pingPeriodic() {
        this.sendMessage('PING');
    }

    processMessage(message) {
        if(message.messageType !== 'PING') {
            console.log('received message', message.messageType, message);
        }
        let scenes = this.sceneManager.getScenes();
        for (let i = 0; i < scenes.length; i++) {
            let scene = scenes[i];
            let sceneKey = scene.sceneKey;            
            if (this.sceneManager.isActive(sceneKey)) {                
                if (scene.GLOBAL_MESSAGE_HANDLERS) {
                    let messageHandler = scene.GLOBAL_MESSAGE_HANDLERS[message.messageType];
                    if (messageHandler) {                        
                        messageHandler.call(scene, message);
                    }
                }
                if (scene.MESSAGE_HANDLERS) {
                    let messageHandler = scene.MESSAGE_HANDLERS[message.messageType];
                    if (messageHandler) {                        
                        messageHandler.call(scene, message);
                    }
                }
            }
        }
    }

    constructor(sceneManager, onopenCallback) {
        this.sceneManager = sceneManager;
        this.onopenCallback = onopenCallback;
        this.handlerMap = {};
        console.log('created new host web socket context');
        var wsClientURL = window.location.origin;
        wsClientURL += '/websocket/v1';
        if (wsClientURL.startsWith('http://')) {
            wsClientURL = 'ws://' + wsClientURL.substring(7);
        }
        if (wsClientURL.startsWith('https://')) {
            wsClientURL = 'wss://' + wsClientURL.substring(8);
        }
        console.log('host WebSocketContext client URL:' + wsClientURL);
        this.webSocket = new WebSocket(wsClientURL);
        this.webSocket.onopen = function () {
            if (onopenCallback) {
                onopenCallback();
            }
        }.bind(this);

        this.webSocket.onclose = function (event) {
            console.log('websocket closed');
        };
        this.webSocket.onerror = function (event) {
            console.log('websocket error');
        };

        this.webSocket.onmessage = function (event) {
            if (event.data) {
                if (event.data.startsWith('unsupported')) {
                    console.error(event.data);
                } else {
                    let response = JSON.parse(event.data);
                    if (response.messageType) {
                        // new style message                            
                        this.processMessage(response);
                    } else if (response.op && response.data) {
                        // compatibility mode (deprecated)
                        let opCode = response.op;
                        let eventData = response.data;
                        console.log('received host WS msg', opCode, eventData);
                        for (const [key, value] of Object.entries(this.handlerMap)) {
                            if (key === opCode) {
                                let handlerContext = value;                                
                                let scene = handlerContext.scene;
                                let sceneKey = scene.sceneKey;
                                if (this.sceneManager.isActive(sceneKey)) {
                                    console.log('dispatch message opCode ' + opCode + ' to running scene ' + sceneKey);
                                    let handler = handlerContext.handler;
                                    handler(eventData);
                                }
                            }
                        }
                    } else {
                        console.error('receieved unrecognized message', event.data);
                    }
                }
            }
        }.bind(this);
        setInterval(this.pingPeriodic.bind(this), 30000);
    }

}


