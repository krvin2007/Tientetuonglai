export function formatSUI(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M SUI`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K SUI`;
  }
  return `${amount.toLocaleString('vi-VN')} SUI`;
}

export function formatTimeLeft(endTime: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isUrgent: boolean;
  label: string;
} {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const total = Math.max(0, end - now);

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  const isUrgent = total < 3600000; // < 1 hour

  let label = '';
  if (total === 0) {
    label = 'Đã kết thúc';
  } else if (days > 0) {
    label = `${days} ngày ${hours}h`;
  } else if (hours > 0) {
    label = `${hours}h ${minutes}m`;
  } else {
    label = `${minutes}m ${seconds}s`;
  }

  return { days, hours, minutes, seconds, total, isUrgent, label };
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  return `${days} ngày trước`;
}

export function shortenAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getVipBadgeColor(tier: string): string {
  switch (tier) {
    case 'vang': return '#ffd700';
    case 'bac': return '#c0c0c0';
    case 'dong': return '#cd7f32';
    default: return 'transparent';
  }
}

export function getVipLabel(tier: string): string {
  switch (tier) {
    case 'vang': return 'VIP Vàng 🥇';
    case 'bac': return 'VIP Bạc 🥈';
    case 'dong': return 'VIP Đồng 🥉';
    default: return '';
  }
}

export function getCategoryEmoji(categoryId: string): string {
  switch (categoryId) {
    case 'gia-dung': return '🏠';
    case 'game': return '🎮';
    case 'thoi-trang': return '👗';
    case 'do-co': return '🏺';
    case 'khac': return '📦';
    default: return '📦';
  }
}
