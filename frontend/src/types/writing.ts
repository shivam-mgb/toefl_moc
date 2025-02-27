export interface TaskConfig {
  title: string;
  prompt: string;
}

export interface WritingReadingPhaseProps {
  passageTitle: string;
  passageText: string;
  timeRemaining: number;
}

export interface ListeningAreaProps {
  audioUrl: string;
  timeRemaining: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onAudioEnd: () => void;
}