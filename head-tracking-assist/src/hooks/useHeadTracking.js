import { useEffect, useRef } from 'react';
// import { FaceMesh } from '@mediapipe/face_mesh';
// import { Camera } from '@mediapipe/camera_utils';
const FaceMesh = class {};
const Camera = class {};

export const useHeadTracking = (videoRef, updateTracking) => {
    // Refs to valid state without restart
    const trackingRef = useRef({
        faceMesh: null,
        camera: null,
        isInitialized: false,
        smoothedYaw: 0,
        smoothedPitch: 0
    });

    useEffect(() => {
        let isMounted = true;
        let retryCount = 0;

        const tryInitialize = () => {
            if (!isMounted) return;

            // 1. Check if Video Element exists and is ready
            if (!videoRef.current) {
                if (retryCount < 20) { // Retry for 10 seconds
                    console.log(`Waiting for video element... (${retryCount})`);
                    retryCount++;
                    setTimeout(tryInitialize, 500);
                } else {
                    if (updateTracking) updateTracking({ headStatus: "Error: Camera Not Found", isTracking: false });
                }
                return;
            }

            console.log("🚀 STARTING HEAD TRACKING SERVICE...");
            if (updateTracking) updateTracking({ headStatus: "Initializing Model...", isTracking: false });

            const initializeFaceMesh = async () => {
                try {
                    const faceMesh = new FaceMesh({
                        locateFile: (file) => {
                            return `/mediapipe/${file}`;
                        }
                    });

                    faceMesh.setOptions({
                        maxNumFaces: 1,
                        refineLandmarks: true,
                        minDetectionConfidence: 0.5,
                        minTrackingConfidence: 0.5
                    });

                    faceMesh.onResults((results) => {
                        if (!isMounted) return;

                        if (!trackingRef.current.isInitialized) {
                            console.log("✅ FACEMESH INITIALIZED SUCCESSFULLY");
                            trackingRef.current.isInitialized = true;
                        }

                        onResults(results, updateTracking);
                    });

                    trackingRef.current.faceMesh = faceMesh;

                    // Initialize Camera Utils
                    console.log("📷 Connecting Camera...");
                    const camera = new Camera(videoRef.current, {
                        onFrame: async () => {
                            if (trackingRef.current.faceMesh) {
                                await trackingRef.current.faceMesh.send({ image: videoRef.current });
                            }
                        },
                        width: 640,
                        height: 480
                    });

                    trackingRef.current.camera = camera;
                    await camera.start();
                    console.log("📷 Camera Started");

                } catch (error) {
                    console.error("❌ CRITICAL ERROR IN HEAD TRACKING:", error);
                    if (updateTracking) updateTracking({ headStatus: `Error: ${error.message}`, isTracking: false });
                }
            };

            initializeFaceMesh();
        };

        // Start initialization process
        tryInitialize();

        return () => {
            console.log("🛑 STOPPING HEAD TRACKING SERVICE...");
            isMounted = false;
            if (trackingRef.current.camera) trackingRef.current.camera.stop();
            if (trackingRef.current.faceMesh) trackingRef.current.faceMesh.close();
            trackingRef.current.isInitialized = false;
        };
    }, [videoRef]);

    // Helper: Logic for Head Pose Calculation with Smoothing and Deadzone
    const onResults = (results, callback) => {
        if (!callback) return;

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            const nose = landmarks[1];
            const leftEar = landmarks[234];
            const rightEar = landmarks[454];
            const chin = landmarks[152];
            const forehead = landmarks[10];

            // CONFIGURATION
            const SMOOTHING_FACTOR = 0.25; // Lower = smoother but slower
            const DEADZONE = 0.08; // Ignore movements smaller than this
            const SENSITIVITY = 25; // Amplification

            // YAW (Horizontal)
            const midPointX = (leftEar.x + rightEar.x) / 2;
            let rawYaw = (nose.x - midPointX) * SENSITIVITY;

            // PITCH (Vertical) - Adjusted baseline to fix "not going down" issue
            // We use a slight offset because nose is naturally higher than midpoint for the model
            const midPointY = ((forehead.y + chin.y) / 2) - 0.02; 
            let rawPitch = (nose.y - midPointY) * SENSITIVITY;

            // Apply Deadzone (Prevent jitter from normal movements)
            if (Math.abs(rawYaw) < DEADZONE) rawYaw = 0;
            if (Math.abs(rawPitch) < DEADZONE) rawPitch = 0;

            // Apply EMA Smoothing
            trackingRef.current.smoothedYaw = 
                (rawYaw * SMOOTHING_FACTOR) + (trackingRef.current.smoothedYaw * (1 - SMOOTHING_FACTOR));
            
            trackingRef.current.smoothedPitch = 
                (rawPitch * SMOOTHING_FACTOR) + (trackingRef.current.smoothedPitch * (1 - SMOOTHING_FACTOR));

            // --- GESTURE DETECTION (Mouth Click) ---
            const upperLip = landmarks[13];
            const lowerLip = landmarks[14];
            const faceHeight = Math.abs(chin.y - forehead.y);
            const lipDistance = Math.abs(lowerLip.y - upperLip.y) / faceHeight;

            let gesture = null;
            if (lipDistance > 0.06) { 
                gesture = "Mouth Open";
            }

            // Status Logic (Use raw values for discrete status checks)
            let status = "Facing Screen";
            let attention = 100;
            const STATUS_THRESHOLD = 1.0;

            if (rawYaw > STATUS_THRESHOLD) { status = "Looking Left"; attention = 20; }
            else if (rawYaw < -STATUS_THRESHOLD) { status = "Looking Right"; attention = 20; }
            else if (rawPitch > STATUS_THRESHOLD) { status = "Looking Down"; attention = 40; }
            else if (rawPitch < -STATUS_THRESHOLD) { status = "Looking Up"; attention = 40; }

            if (gesture) status = gesture;

            callback({
                headStatus: status,
                attentionScore: attention,
                isTracking: true,
                yaw: trackingRef.current.smoothedYaw * 0.1, 
                pitch: trackingRef.current.smoothedPitch * 0.1,
                gesture: gesture,
                results: results
            });
        } else {
            callback({
                headStatus: "Face Not Detected",
                attentionScore: 0,
                isTracking: true,
                yaw: 0,
                pitch: 0,
                results: null
            });
        }
    };
};
