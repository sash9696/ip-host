// /**
//  * Get the user IP throught the webkitRTCPeerConnection
//  * @param onNewIP {Function} listener function to expose the IP locally
//  * @return undefined
//  */
//  function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
//     //compatibility for firefox and chrome
//     var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
//     var pc = new myPeerConnection({
//         iceServers: []
//     }),
//     noop = function() {},
//     localIPs = {},
//     ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
//     key;

//     function iterateIP(ip) {
//         if (!localIPs[ip]) onNewIP(ip);
//         localIPs[ip] = true;
//     }

//      //create a bogus data channel
//     pc.createDataChannel("");

//     // create offer and set local description
//     pc.createOffer().then(function(sdp) {
//         sdp.sdp.split('\n').forEach(function(line) {
//             if (line.indexOf('candidate') < 0) return;
//             line.match(ipRegex).forEach(iterateIP);
//         });
        
//         pc.setLocalDescription(sdp, noop, noop);
//     }).catch(function(reason) {
//         // An error occurred, so handle the failure to connect
//     });

//     //listen for candidate events
//     pc.onicecandidate = function(ice) {
//         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
//         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
//     };
// }

// // Usage



// console.log(getUserIP(function(ip){
//     alert("Got IP! :" + ip)
// }))
async function getNetworkIP() {
    let found = false;
    let resolve;
    const promise = new Promise((res) => {
    resolve = res;
    });
    const pc = new RTCPeerConnection({ iceServers: [] });
    
    pc.addEventListener("icecandidate", (e) => {
    if (!e.candidate || found) return;
    resolve(e.candidate.address);
    found = true;
    });
    
    pc.createDataChannel("");
    pc.createOffer().then((desc) => pc.setLocalDescription(desc));
    
    return promise;
    }
getNetworkIP().then(a=>console.log(a))    