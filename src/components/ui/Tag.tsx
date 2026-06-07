interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'amber' | 'teal';
  className?: string;
}

export default function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const variants = {
    default: 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-[#888888]',
    amber: 'bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.2)] text-[#f59e0b]',
    teal: 'bg-[rgba(45,212,191,0.08)] border-[rgba(45,212,191,0.2)] text-[#2dd4bf]',
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded font-mono text-xs border tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
