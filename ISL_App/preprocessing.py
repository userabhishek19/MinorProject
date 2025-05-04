import cv2
import numpy as np
import mediapipe as mp

# Initialize MediaPipe Hands with a maximum of 2 hands for ISL
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2)

def process_frame(frame):
    """
    Processes the input frame to detect and crop the region containing both hands.
    Returns a normalized 128x128x3 image or None if no hands are detected.
    """
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        h, w, _ = frame.shape
        x_coords = []
        y_coords = []

        # Collect all landmark coordinates from both hands
        for hand_landmarks in results.multi_hand_landmarks:
            for lm in hand_landmarks.landmark:
                x_coords.append(lm.x)
                y_coords.append(lm.y)

        if x_coords and y_coords:
            x_min = int(min(x_coords) * w) - 20
            x_max = int(max(x_coords) * w) + 20
            y_min = int(min(y_coords) * h) - 20
            y_max = int(max(y_coords) * h) + 20

            # Ensure coordinates are within frame boundaries
            x_min = max(0, x_min)
            y_min = max(0, y_min)
            x_max = min(w, x_max)
            y_max = min(h, y_max)

            cropped = frame[y_min:y_max, x_min:x_max]
            if cropped.size == 0:
                return None

            # Resize and normalize the cropped image
            resized = cv2.resize(cropped, (128, 128))
            normalized = resized / 255.0
            return np.array(normalized, dtype=np.float32)
    return None
