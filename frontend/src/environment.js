let IS_PROD = true;
const server = IS_PROD ? 
    "https://gptbackend-343y.onrender.com" :
    "http://localhost:8080"


export default server;