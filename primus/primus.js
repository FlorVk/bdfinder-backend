const Primus = require("primus");
const chatController = require("../controllers/chatController");

let primus;

let go = (server) => {
    primus = new Primus(server, {});
    primus.on('connection', (spark) => {
        console.log('Primus connected');

        spark.on('data', (package) => {
            const reason = package.reason;
            switch (reason) {
                case "syncChatRequest":
                  syncChatHistory(spark);
                  break;
                case "sendMessage":
                  sendMessageResponse(spark, package.data);
                  break;
                default:
                  console.log("message reason not found : ", reason);
                  break;
              } 
        })
    })
}

const syncChatHistory = async (spark) => {
    const messageHistory = await chatController.getAllMessagesFromDbForPrimus();
    switch (messageHistory.status) {
      case "success":
        messageHistory.result.sort((data) => data.timestamp);
        spark.write({
          data: messageHistory.result,
          reason: "syncChatResponse",
        });
        break;
      case "error":
        console.log("error", error);
        break;
    }
  };
  
  const sendMessageResponse = (spark, message) => {
    console.log("message", message);
    chatController.addMessageToDBFromPrimus(message);
    primus.write({ data: message, reason: "sendMessageResponse" });
  };

module.exports.go = go;