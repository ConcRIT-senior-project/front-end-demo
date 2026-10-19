export default function PriorityTag({ priority }: { priority: string }) {
  return (
    <span className={`text-xs font-mono font-medium ${priority === 'Rush' ? 'text-[#940700]' : 'text-slate-400'}`}>
      {priority}
    </span>
  )
}