interface AuthorAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function AuthorAvatar({ name, size = 32, className = "" }: AuthorAvatarProps) {
  const url = `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(name)}&size=${size}&backgroundColor=1a1a2e`;

  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className={`rounded-full bg-secondary ${className}`}
    />
  );
}
