
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