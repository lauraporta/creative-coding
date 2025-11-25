"""
Script to read and plot EDF file from Emotiv BCI
"""
import numpy as np
import matplotlib.pyplot as plt
import pyedflib

# Read the EDF file
edf_file = 'data/EmotivBCI-BPM_EPOCX_357120_2025.10.05T17.46.53+02.00.edf'

# Open the file
f = pyedflib.EdfReader(edf_file)

print(f.__dict__)

# Get basic information
n_channels = f.signals_in_file
print(f.signals_in_file)
sample_frequencies = f.getSampleFrequencies()
channel_labels = f.getSignalLabels()

print(f"Number of channels: {n_channels}")
print(f"Sample frequency: {sample_frequencies[0]} Hz")
print(f"\nChannel labels:")
for i, label in enumerate(channel_labels[:20]):  # Print first 20 channels
    print(f"  {i}: {label}")

# Read EEG channels (common Emotiv electrodes)
eeg_channels = ['AF3', 'F7', 'F3', 'FC5', 'T7', 'P7', 'O1', 'O2', 
                'P8', 'T8', 'FC6', 'F4', 'F8', 'AF4']

# Find indices of EEG channels
eeg_indices = []
for label in eeg_channels:
    if label in channel_labels:
        eeg_indices.append(channel_labels.index(label))

# Read all data from EEG channels
sampling_rate = sample_frequencies[0] if len(sample_frequencies) > 0 else 128

# Read all signals
all_signals = []
for ch_idx in eeg_indices:
    signal = f.readSignal(ch_idx)
    all_signals.append(signal)

# Close the file
f.close()

# Rolling window parameters
window_size = 5000  # timepoints
step_size = 100  # datapoints per update
fps = 50  # frames per second (updates per second)
delay = .1 / fps  # delay between updates in seconds


# Create figure with overlapping plots: Power spectra (background), EEG traces (foreground)
import matplotlib.gridspec as gridspec
fig = plt.figure(figsize=(16, 10))

#  figure background color black
fig.patch.set_facecolor('black')

# Create grid for EEG traces
gs = gridspec.GridSpec(len(eeg_indices), 1)

# EEG trace axes
axes = [fig.add_subplot(gs[i, 0]) for i in range(len(eeg_indices))]

# Power spectra axis - overlays all EEG traces (created first so it's behind)
ax_psd = fig.add_axes([0.1, 0.1, 0.8, 0.8], zorder=0, facecolor='none')

# Initialize EEG trace plots
lines = []
for idx, ch_idx in enumerate(eeg_indices):
    line, = axes[idx].plot([], [], linewidth=1, color='white', alpha=0.7)
    lines.append(line)
    axes[idx].set_ylabel(f'{channel_labels[ch_idx]}', rotation=0, ha='right', va='center', fontsize=10, color='white')
    axes[idx].grid(False)
    axes[idx].set_xticks([])
    axes[idx].set_yticks([])
    axes[idx].set_xlabel("")
    axes[idx].set_frame_on(False)
    axes[idx].patch.set_alpha(0)  # Make background transparent
    axes[idx].set_zorder(1)  # Put EEG traces in front
    signal_min = np.min(all_signals[idx])
    signal_max = np.max(all_signals[idx])
    margin = (signal_max - signal_min) * 0.1
    axes[idx].set_ylim(signal_min - margin, signal_max + margin)

axes[-1].set_xlabel("")

psd_lines = []
for idx in range(len(eeg_indices)):
    l, = ax_psd.plot([], [], label=channel_labels[eeg_indices[idx]], alpha=0.5)
    psd_lines.append(l)
avg_psd_line, = ax_psd.plot([], [], color='k', linewidth=2, label='Average')
ax_psd.set_yscale('log')  # Log scale for power
#  fix axis min max
ax_psd.set_ylim(1e-2, 1e6)
ax_psd.set_frame_on(False)  # Remove axis box
ax_psd.set_xticks([])
ax_psd.set_yticks([])
ax_psd.set_xlabel("")
ax_psd.set_ylabel("")
ax_psd.set_title("")
ax_psd.legend([],[],fontsize=8)  # Remove legend
ax_psd.patch.set_alpha(0)  # Make background transparent

plt.tight_layout()
plt.ion()
plt.show()

# Rolling window display
max_samples = min(len(s) for s in all_signals)
current_pos = 0

print(f"\nDisplaying rolling window: {window_size} timepoints, moving {step_size} points every {delay:.3f}s")
print(f"Total samples: {max_samples}")
print("Press Ctrl+C to stop...")

try:
    while True:
        if current_pos + window_size > max_samples:
            current_pos = 0  # Restart from beginning
        # Update each channel (EEG traces)
        x_data = np.arange(current_pos, current_pos + window_size)
        window_signals = []
        for idx, line in enumerate(lines):
            y_data = all_signals[idx][current_pos:current_pos + window_size]
            line.set_data(x_data, y_data)
            axes[idx].set_xlim(current_pos, current_pos + window_size)
            window_signals.append(y_data)
        # Power spectra (right subplot)
        ax_psd.clear()
        psds = []
        freqs = None
        for idx, y_data in enumerate(window_signals):
            # Compute power spectrum
            f, Pxx = np.fft.rfftfreq(window_size, 1/sampling_rate), np.abs(np.fft.rfft(y_data))**2
            ax_psd.plot(f, Pxx, label=channel_labels[eeg_indices[idx]], alpha=0.5)
            psds.append(Pxx)
            if freqs is None:
                freqs = f
        # # Average power spectrum
        # avg_psd = np.mean(psds, axis=0)
        # ax_psd.plot(freqs, avg_psd, color='k', linewidth=2, label='Average')
        ax_psd.set_yscale('log')  # Log scale for power
        ax_psd.set_frame_on(False)  # Remove axis box
        ax_psd.set_xticks([])
        ax_psd.set_yticks([])
        ax_psd.set_xlabel("")
        ax_psd.set_ylabel("")
        ax_psd.set_title("")
        ax_psd.legend([],[],fontsize=8)
        ax_psd.set_xlim(0, sampling_rate/2)
        # Update title with current position
        fig.suptitle(f'Emotiv BCI EEG Data - Samples {current_pos} to {current_pos + window_size}', fontsize=16)
        plt.draw()
        plt.pause(delay)
        current_pos += step_size

        #  kill the process also when the window is closed
        fig.canvas.mpl_connect('close_event', lambda event: exit(0))    

except KeyboardInterrupt:
    print("\n\nStopped by user.")
    plt.ioff()
