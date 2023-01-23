export interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressStyles = {
    width: `${progress}%`
  }

  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        aria-label="Progresso de hábitos completados neste dia"
        aria-valuenow={75}
        role="progressbar"
        className="h-full rounded-xl bg-violet-600 w-3/4 transition-all duration-500"
        style={progressStyles}
      />
    </div>
  )
}