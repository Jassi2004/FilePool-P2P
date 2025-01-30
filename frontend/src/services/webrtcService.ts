// src/services/webrtcService.ts
export class WebRTCService {
    private localPeerConnection: RTCPeerConnection;
    private remotePeerConnection: RTCPeerConnection;
    private dataChannel: RTCDataChannel;

    constructor() {
        this.localPeerConnection = new RTCPeerConnection();
        this.remotePeerConnection = new RTCPeerConnection();

        // Set up the data channel
        this.dataChannel = this.localPeerConnection.createDataChannel("fileTransfer");

        // Set up event handlers for the data channel
        this.dataChannel.onopen = () => {
            console.log("Data channel is open!");
        };

        this.dataChannel.onmessage = (event) => {
            this.handleMessage(event.data);
        };

        this.localPeerConnection.ondatachannel = (event) => {
            const receiveChannel = event.channel;
            receiveChannel.onmessage = (event) => {
                this.handleMessage(event.data);
            };
        };

        // Handle ICE candidates
        this.localPeerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                // Send candidate to the remote peer
                this.sendCandidate(event.candidate);
            }
        };

        this.remotePeerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                // Send candidate to the local peer
                this.sendCandidate(event.candidate);
            }
        };

        // Handle track events
        this.remotePeerConnection.ontrack = (event) => {
            this.handleRemoteStream(event.streams[0]);
        };
    }

    async connectToLender(lenderId: string) {
        try {
            // Create an offer and set local description
            const offer = await this.localPeerConnection.createOffer();
            await this.localPeerConnection.setLocalDescription(offer);

            // Send offer to the lender (you need to implement your signaling logic)
            this.sendOffer(lenderId, offer);
        } catch (error) {
            console.error("Error connecting to lender:", error);
        }
    }

    sendOffer(lenderId: string, offer: RTCSessionDescriptionInit) {
        // Implement your signaling logic to send the offer to the lender
        console.log("Sending offer to lender:", lenderId, offer);
    }

    sendCandidate(candidate: RTCIceCandidateInit) {
        // Implement your signaling logic to send the candidate to the remote peer
        console.log("Sending candidate:", candidate);
    }

    handleRemoteStream(stream: MediaStream) {
        // Handle the remote stream (e.g., attach it to a video element)
        console.log("Received remote stream:", stream);
    }

    // Function to handle incoming messages from the data channel
    handleMessage(data: any) {
        // Here you can implement logic to handle different types of messages
        console.log("Received data:", data);
    }

    // Function to send a file over the data channel
    sendFile(file: File) {
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = reader.result as ArrayBuffer;
            this.dataChannel.send(buffer);
            console.log("File sent:", file.name);
        };
        reader.readAsArrayBuffer(file);
    }

    // Implement your signaling logic to receive offers and candidates
    receiveOffer(offer: RTCSessionDescriptionInit) {
        this.remotePeerConnection.setRemoteDescription(offer);
        this.remotePeerConnection.createAnswer().then(answer => {
            this.remotePeerConnection.setLocalDescription(answer);
            // Send answer back to the offerer
        });
    }

    receiveCandidate(candidate: RTCIceCandidateInit) {
        this.remotePeerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
}
