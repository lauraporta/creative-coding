#%%
import matplotlib.pyplot as plt
import numpy as np
import sounddevice as sd
from scipy.signal import find_peaks

from derotation.derotate_by_line import derotate_an_image_array_line_by_line
from derotation.simulate.line_scanning_microscope import Rotator

# Make a simple image, a square in a black background
image = np.ones((300, 300))

sample_rate = 44100  # Samples per second
chunk_duration = 0.1  # Duration of each audio chunk in seconds
chunk_size = int(sample_rate * chunk_duration)

time_axis = np.linspace(0, chunk_duration, chunk_size)

# Create a stack of images (one per real-time update)
image_stack = np.array([image])  # Single frame for live updates

# Placeholder for live FFT analysis
pseudo_angles = np.zeros(image.shape[0])
current_frequencies = []
current_amplitudes = []
fft_frequencies = np.array([])
fft_magnitudes = np.array([])
waveform = np.zeros(chunk_size)

# Frequency range humans perceive best
min_human_freq = 500  # Hz
max_human_freq = 4000  # Hz

# Create figure and axes for real-time display
fig = plt.figure(figsize=(20, 12))
gs = fig.add_gridspec(2, 2, height_ratios=[2, 1])
ax_img = fig.add_subplot(gs[0, 0])
ax_fft = fig.add_subplot(gs[0, 1])
ax_wave = fig.add_subplot(gs[1, :])  # Full-width waveform plot

fig.suptitle("Real-time Audio Processing: FFT, Rotation, and Waveform Visualization", color='white', fontsize=16)
fig.patch.set_facecolor('black')

ax_img.axis("off")
ax_img.set_facecolor('black')
ax_img.set_title("Rotated and Derotated Image", color='white')

ax_fft.set_facecolor('black')
ax_fft.set_xlabel("Frequency (Hz)", color='white')
ax_fft.set_ylabel("Amplitude", color='white')
ax_fft.set_title("Real-time FFT Analysis", color='white')
ax_fft.tick_params(axis='both', colors='white')

ax_wave.set_facecolor('black')
ax_wave.set_xlabel("Time (s)", color='white')
ax_wave.set_ylabel("Amplitude (scaled)", color='white')
ax_wave.set_title("Dominant Frequency Waveform", color='white')
ax_wave.tick_params(axis='both', colors='white')

# Add a text annotation for angle and sound details
text_annotation = ax_img.text(0.05, 0.95, '', color='white', transform=ax_img.transAxes, fontsize=12, va='top')

# Function to process audio chunks and update angles
def process_audio_chunk(indata):
    global pseudo_angles, current_frequencies, current_amplitudes, fft_frequencies, fft_magnitudes, waveform
    # Perform FFT on the audio chunk
    fft_result = np.fft.rfft(indata[:, 0])
    full_fft_frequencies = np.fft.rfftfreq(len(indata), d=1/sample_rate)
    full_fft_magnitudes = np.abs(fft_result)
    
    # Filter frequencies within human perception range
    valid_indices = (full_fft_frequencies >= min_human_freq) & (full_fft_frequencies <= max_human_freq)
    fft_frequencies = full_fft_frequencies[valid_indices]
    fft_magnitudes = full_fft_magnitudes[valid_indices]
    
    # Ensure equal lengths after filtering
    if len(fft_frequencies) != len(fft_magnitudes):
        return  # Skip this frame to avoid errors
    
    # Find multiple dominant frequencies
    peaks, _ = find_peaks(fft_magnitudes, height=np.max(fft_magnitudes) * 0.2)
    
    # Select up to 5 dominant frequencies
    sorted_peaks = sorted(peaks, key=lambda p: fft_magnitudes[p], reverse=True)[:1]
    dominant_frequencies = fft_frequencies[sorted_peaks]
    amplitudes = fft_magnitudes[sorted_peaks]

    current_frequencies = dominant_frequencies
    current_amplitudes = amplitudes

    # Generate waveform from dominant frequencies
    waveform = np.sum([
        amp * np.sin(2 * np.pi * freq * time_axis)
        for freq, amp in zip(dominant_frequencies, amplitudes)
    ], axis=0) if len(dominant_frequencies) > 0 else np.zeros(chunk_size)
    
    # Normalize waveform amplitude
    if np.max(np.abs(waveform)) > 0:
        waveform /= np.max(np.abs(waveform))
    
    # Combine multiple frequencies with random phase shifts to create a complex wave for angles
    pseudo_angles = np.sum([
        360 * amp * np.sin(2 * np.pi * freq * np.linspace(0, 1, image.shape[0]) + np.random.uniform(0, 2 * np.pi))
        for freq, amp in zip(dominant_frequencies, amplitudes)
    ], axis=0)

    pseudo_angles = pseudo_angles * 359 / max_human_freq

# Callback function for the audio stream
def audio_callback(indata, frames, time, status):
    if status:
        print(status)
    process_audio_chunk(indata)

# Function to display updated frames in real-time
def update_display():
    while True:
        # Apply rotation based on live angles
        # rotator = Rotator(pseudo_angles, image_stack)
        # rotated_image_stack = rotator.rotate_by_line()

        # Derotate to revert to the original image
        rotated_image_stack_derotated = derotate_an_image_array_line_by_line(
            image_stack, 
            pseudo_angles
        )

        # Update image display
        ax_img.clear()
        ax_img.axis("off")
        ax_img.imshow(rotated_image_stack_derotated[0], cmap="gray")
        
        # Update FFT plot
        ax_fft.clear()
        ax_fft.set_xlabel("Frequency (Hz)", color='white')
        ax_fft.set_ylabel("Amplitude", color='white')
        ax_fft.set_title("Real-time FFT Analysis", color='white')
        ax_fft.tick_params(axis='both', colors='white')
        ax_fft.plot(fft_frequencies, fft_magnitudes, color='white', alpha=0.7)
        ax_fft.scatter(current_frequencies, current_amplitudes, color='red', marker='o', label='Dominant Frequencies')
        ax_fft.legend()
        ax_fft.set_ylim(0, 100)
        
        # Update waveform plot
        ax_wave.clear()
        ax_wave.set_xlabel("Time (s)", color='white')
        ax_wave.set_ylabel("Amplitude (scaled)", color='white')
        ax_wave.set_title("Dominant Frequency Waveform", color='white')
        ax_wave.tick_params(axis='both', colors='white')
        ax_wave.plot(time_axis, waveform, color='cyan')
        ax_wave.set_ylim(-1, 1)
        
        plt.pause(0.01)

# Start audio stream and display in real-time
try:
    # Start the audio stream
    stream = sd.InputStream(callback=audio_callback, channels=1, samplerate=sample_rate, blocksize=chunk_size)
    stream.start()

    # Start the display update loop
    update_display()

except KeyboardInterrupt:
    print("Interrupted by user")
finally:
    stream.stop()
    stream.close()

# %%
