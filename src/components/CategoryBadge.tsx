const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Thành Phố Hôm Nay': { bg: '#0057B8', text: '#FFFFFF' },
  'Thành Phố': { bg: '#0057B8', text: '#FFFFFF' },
  '168 Phường-Xã': { bg: '#7C3AED', text: '#FFFFFF' },
  'Đời Sống': { bg: '#059669', text: '#FFFFFF' },
  'Góc Nhìn': { bg: '#0891B2', text: '#FFFFFF' },
  'Giải Trí': { bg: '#D97706', text: '#FFFFFF' },
  'Radio': { bg: '#1D4ED8', text: '#FFFFFF' },
  'default': { bg: '#0057B8', text: '#FFFFFF' },
};

export default function CategoryBadge({ category, className = '' }: { category: string; className?: string }) {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  return (
    <span
      className={`radio-badge ${className}`}
      style={{
        background: color.bg,
        color: color.text,
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        display: 'inline-block',
      }}
    >
      {category}
    </span>
  );
}