import { useEffect, useRef } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

export const useHeadTracking = (videoRef, updateTracking) => {
    // Refs to valid state without restart
    const trackingRef = useRef({
        faceMesh: null,
        camera: null,
        isInitialized: false,
        smoothedYaw: 0,
        smoothedPitch: 0,
        baselineYaw: 0,
        baselinePitch: 0
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

                    // Initialize Custom Frame Loop (More robust than Camera Utils in Vite)
                    console.log("📷 Starting Custom Frame Capture Loop...");
                    trackingRef.current.frameLoopActive = true;
                    
                    let lastVideoTime = -1;
                    const processFrame = async () => {
                        if (!trackingRef.current.frameLoopActive || !isMounted) return;
                        
                        // Proceed only if video element is ready and has valid dimensions
                        if (videoRef.current && videoRef.current.readyState >= 2 && videoRef.current.videoWidth > 0) {
                            if (videoRef.current.currentTime !== lastVideoTime) {
                                lastVideoTime = videoRef.current.currentTime;
                                if (trackingRef.current.faceMesh) {
                                    try {
                                        await trackingRef.current.faceMesh.send({ image: videoRef.current });
                                    } catch (err) {
                                        console.warn("FaceMesh frame skip...", err);
                                    }
                                }
                            }
                        }
                        
                        // Queue next frame
                        requestAnimationFrame(processFrame);
                    };

                    trackingRef.current.camera = { 
                        stop: () => { trackingRef.current.frameLoopActive = false; }
                    };
                    
                    // Start loop slightly delayed to ensure video stream is flowing
                    setTimeout(() => requestAnimationFrame(processFrame), 600);
                    console.log("📷 Camera Stream Processing Started");

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

            // CONFIGURATION - Optimized for Smoothness and Accuracy
            const BASE_SMOOTHING = 0.12; // High base smoothing to eliminate jitter
            const DEADZONE = 0.04; // Very small deadzone for subtle detection
            const SENSITIVITY = 35; // Higher sensitivity to catch precise head tilts

            // YAW & PITCH (Scale-Invariant Logarithmic Ratios)
            // Using logarithmic ratio of distances makes tracking 100% symmetric and immune to camera distance!
            
            // Horizontal geometry
            const distToLeftEar = Math.max(0.001, nose.x - leftEar.x); 
            const distToRightEar = Math.max(0.001, rightEar.x - nose.x);
            let absoluteYaw = Math.log(distToLeftEar / distToRightEar) * SENSITIVITY; 

            // Vertical geometry
            const distToForehead = Math.max(0.001, nose.y - forehead.y);
            const distToChin = Math.max(0.001, chin.y - nose.y);
            // Reverse sign so UP is negative, DOWN is positive (matches our status logic)
            let absolutePitch = -Math.log(distToChin / distToForehead) * SENSITIVITY; 

            // --- ADAPTIVE AUTO-CENTERING (Leaky Integrator) ---
            // Slowly drag the baseline towards the current absolute position
            // But only if the user isn't making an extreme movement (looking away)
            const isLookingAway = Math.abs(absoluteYaw - trackingRef.current.baselineYaw) > 1.2 || 
                                  Math.abs(absolutePitch - trackingRef.current.baselinePitch) > 1.2;
            
            // If they are relatively stable, slowly update the "Neutral" center point
            const LEAK_RATE = isLookingAway ? 0.0 : 0.01; 
            
            trackingRef.current.baselineYaw = (absoluteYaw * LEAK_RATE) + (trackingRef.current.baselineYaw * (1 - LEAK_RATE));
            trackingRef.current.baselinePitch = (absolutePitch * LEAK_RATE) + (trackingRef.current.baselinePitch * (1 - LEAK_RATE));

            // Calculate relative offset from the adaptive baseline
            let rawYaw = absoluteYaw - trackingRef.current.baselineYaw;
            let rawPitch = absolutePitch - trackingRef.current.baselinePitch;

            // Apply Deadzone (Prevent micro-jitter when holding still)
            if (Math.abs(rawYaw) < DEADZONE) rawYaw = 0;
            if (Math.abs(rawPitch) < DEADZONE) rawPitch = 0;

            // Dynamic Smoothing (Fast response on large moves, smooth on small moves)
            const yawDiff = Math.abs(rawYaw - trackingRef.current.smoothedYaw);
            const pitchDiff = Math.abs(rawPitch - trackingRef.current.smoothedPitch);
            
            const dynamicYawAlpha = Math.min(BASE_SMOOTHING + (yawDiff * 0.15), 0.8);
            const dynamicPitchAlpha = Math.min(BASE_SMOOTHING + (pitchDiff * 0.15), 0.8);

            // Apply Adaptive EMA Tracking
            trackingRef.current.smoothedYaw = 
                (rawYaw * dynamicYawAlpha) + (trackingRef.current.smoothedYaw * (1 - dynamicYawAlpha));
            
            trackingRef.current.smoothedPitch = 
                (rawPitch * dynamicPitchAlpha) + (trackingRef.current.smoothedPitch * (1 - dynamicPitchAlpha));

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
