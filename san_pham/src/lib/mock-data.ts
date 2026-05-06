export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  gradient: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  images: string[];
  categoryId: string;
  currentPrice: number;
  startPrice: number;
  minBidIncrement: number;
  bidCount: number;
  startTime: string;
  endTime: string;
  seller: User;
  status: 'active' | 'upcoming' | 'ended';
  featured: boolean;
  hotDeal: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  vipTier: 'none' | 'dong' | 'bac' | 'vang';
  totalAuctions: number;
  rating: number;
  walletAddress: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidder: User;
  amount: number;
  timestamp: string;
}

export interface VipTier {
  id: 'dong' | 'bac' | 'vang';
  name: string;
  nameVi: string;
  icon: string;
  color: string;
  gradient: string;
  glowColor: string;
  priceMonthly: number;
  priceYearly: number;
  maxBidAmount: number;
  maxAuctions: number;
  benefits: string[];
  powerMultiplier: number;
}

export const categories: Category[] = [
  {
    id: 'gia-dung',
    name: 'Đồ Gia Dụng',
    icon: '🏠',
    description: 'Thiết bị, đồ dùng gia đình chất lượng cao',
    count: 156,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'game',
    name: 'Vật Phẩm Game',
    icon: '🎮',
    description: 'Skin, item, tài khoản game hiếm',
    count: 243,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'thoi-trang',
    name: 'Thời Trang',
    icon: '👗',
    description: 'Quần áo, phụ kiện thời trang cao cấp',
    count: 189,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'do-co',
    name: 'Đồ Cổ',
    icon: '🏺',
    description: 'Cổ vật, đồ sưu tầm giá trị',
    count: 87,
    gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  },
  {
    id: 'khac',
    name: 'Khác',
    icon: '📦',
    description: 'Các tài sản đa dạng khác',
    count: 124,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
];

const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Nguyễn Văn An',
    avatar: '',
    vipTier: 'vang',
    totalAuctions: 45,
    rating: 4.9,
    walletAddress: '0x1a2b...3c4d',
  },
  {
    id: 'u2',
    name: 'Trần Thị Mai',
    avatar: '',
    vipTier: 'bac',
    totalAuctions: 23,
    rating: 4.7,
    walletAddress: '0x5e6f...7g8h',
  },
  {
    id: 'u3',
    name: 'Lê Hoàng Nam',
    avatar: '',
    vipTier: 'dong',
    totalAuctions: 12,
    rating: 4.5,
    walletAddress: '0x9i0j...1k2l',
  },
  {
    id: 'u4',
    name: 'Phạm Quốc Bảo',
    avatar: '',
    vipTier: 'none',
    totalAuctions: 5,
    rating: 4.2,
    walletAddress: '0x3m4n...5o6p',
  },
  {
    id: 'u5',
    name: 'Hoàng Minh Tuấn',
    avatar: '',
    vipTier: 'vang',
    totalAuctions: 67,
    rating: 4.95,
    walletAddress: '0x7q8r...9s0t',
  },
];

// Create dates relative to now
const now = new Date();
const hoursFromNow = (h: number) => new Date(now.getTime() + h * 3600000).toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();

export const auctions: Auction[] = [
  {
    id: 'a1',
    title: 'Máy Pha Cà Phê DeLonghi Magnifica',
    description: 'Máy pha cà phê tự động cao cấp, nhập khẩu từ Ý. Tình trạng mới 99%, đầy đủ phụ kiện.',
    images: ['/images/coffee-machine.jpg'],
    categoryId: 'gia-dung',
    currentPrice: 45.5,
    startPrice: 20,
    minBidIncrement: 0.5,
    bidCount: 34,
    startTime: hoursAgo(48),
    endTime: hoursFromNow(2.5),
    seller: mockUsers[0],
    status: 'active',
    featured: true,
    hotDeal: true,
  },
  {
    id: 'a2',
    title: 'Skin Dragon Lore AWP - CS2',
    description: 'Factory New Dragon Lore AWP skin. Một trong những skin hiếm nhất CS2.',
    images: ['/images/dragon-lore.jpg'],
    categoryId: 'game',
    currentPrice: 1250,
    startPrice: 500,
    minBidIncrement: 10,
    bidCount: 89,
    startTime: hoursAgo(72),
    endTime: hoursFromNow(5),
    seller: mockUsers[4],
    status: 'active',
    featured: true,
    hotDeal: true,
  },
  {
    id: 'a3',
    title: 'Túi Hermès Birkin 25 Togo',
    description: 'Túi Hermès Birkin 25 da Togo màu Gold, khóa Palladium. Fullbox, receipt đầy đủ.',
    images: ['/images/hermes.jpg'],
    categoryId: 'thoi-trang',
    currentPrice: 8500,
    startPrice: 5000,
    minBidIncrement: 100,
    bidCount: 56,
    startTime: hoursAgo(96),
    endTime: hoursFromNow(12),
    seller: mockUsers[1],
    status: 'active',
    featured: true,
    hotDeal: false,
  },
  {
    id: 'a4',
    title: 'Bình Gốm Sứ Triều Lê - Thế Kỷ XV',
    description: 'Bình gốm sứ hoa văn rồng phượng, niên đại thế kỷ XV triều Lê. Có giấy chứng nhận.',
    images: ['/images/antique-vase.jpg'],
    categoryId: 'do-co',
    currentPrice: 15000,
    startPrice: 8000,
    minBidIncrement: 500,
    bidCount: 23,
    startTime: hoursAgo(120),
    endTime: hoursFromNow(24),
    seller: mockUsers[0],
    status: 'active',
    featured: true,
    hotDeal: false,
  },
  {
    id: 'a5',
    title: 'Robot Hút Bụi iRobot Roomba j9+',
    description: 'Robot hút bụi thông minh thế hệ mới nhất, tự động đổ rác, mapping 3D.',
    images: ['/images/roomba.jpg'],
    categoryId: 'gia-dung',
    currentPrice: 32,
    startPrice: 15,
    minBidIncrement: 0.5,
    bidCount: 18,
    startTime: hoursAgo(24),
    endTime: hoursFromNow(36),
    seller: mockUsers[2],
    status: 'active',
    featured: false,
    hotDeal: false,
  },
  {
    id: 'a6',
    title: 'Tài Khoản Genshin Impact AR60 - C6 Raiden',
    description: 'Tài khoản Genshin Impact AR60, có C6 Raiden Shogun, C6 Hu Tao, 50+ characters.',
    images: ['/images/genshin.jpg'],
    categoryId: 'game',
    currentPrice: 180,
    startPrice: 80,
    minBidIncrement: 5,
    bidCount: 42,
    startTime: hoursAgo(36),
    endTime: hoursFromNow(8),
    seller: mockUsers[3],
    status: 'active',
    featured: false,
    hotDeal: true,
  },
  {
    id: 'a7',
    title: 'Đồng Hồ Rolex Submariner Date 41mm',
    description: 'Rolex Submariner Date 126610LN, fullbox, warranty card 2024. Tình trạng like new.',
    images: ['/images/rolex.jpg'],
    categoryId: 'thoi-trang',
    currentPrice: 5200,
    startPrice: 3000,
    minBidIncrement: 50,
    bidCount: 67,
    startTime: hoursAgo(168),
    endTime: hoursFromNow(1),
    seller: mockUsers[4],
    status: 'active',
    featured: true,
    hotDeal: true,
  },
  {
    id: 'a8',
    title: 'Tranh Sơn Mài "Hồ Gươm" - Nguyễn Gia Trí',
    description: 'Tranh sơn mài nghệ thuật, tác phẩm của họa sĩ nổi tiếng. Kích thước 60x90cm.',
    images: ['/images/painting.jpg'],
    categoryId: 'do-co',
    currentPrice: 3500,
    startPrice: 1500,
    minBidIncrement: 100,
    bidCount: 31,
    startTime: hoursAgo(200),
    endTime: hoursFromNow(48),
    seller: mockUsers[1],
    status: 'active',
    featured: false,
    hotDeal: false,
  },
  {
    id: 'a9',
    title: 'Bộ Sưu Tập Tem Cổ Việt Nam 1954-1975',
    description: 'Bộ sưu tập 200+ mẫu tem quý hiếm thời kỳ 1954-1975. Bảo quản hoàn hảo.',
    images: ['/images/stamps.jpg'],
    categoryId: 'do-co',
    currentPrice: 780,
    startPrice: 300,
    minBidIncrement: 20,
    bidCount: 15,
    startTime: hoursAgo(48),
    endTime: hoursFromNow(72),
    seller: mockUsers[2],
    status: 'active',
    featured: false,
    hotDeal: false,
  },
  {
    id: 'a10',
    title: 'Máy Lọc Không Khí Dyson Purifier Big Quiet',
    description: 'Máy lọc không khí Dyson thế hệ mới nhất, phòng đến 100m².',
    images: ['/images/dyson.jpg'],
    categoryId: 'gia-dung',
    currentPrice: 55,
    startPrice: 30,
    minBidIncrement: 1,
    bidCount: 22,
    startTime: hoursAgo(12),
    endTime: hoursFromNow(60),
    seller: mockUsers[0],
    status: 'active',
    featured: false,
    hotDeal: false,
  },
  {
    id: 'a11',
    title: 'Valorant Account - Radiant + Full Skin Collection',
    description: 'Tài khoản Valorant hạng Radiant, đầy đủ skin collection bao gồm Champions Bundle.',
    images: ['/images/valorant.jpg'],
    categoryId: 'game',
    currentPrice: 320,
    startPrice: 150,
    minBidIncrement: 10,
    bidCount: 38,
    startTime: hoursAgo(60),
    endTime: hoursFromNow(16),
    seller: mockUsers[4],
    status: 'active',
    featured: false,
    hotDeal: false,
  },
  {
    id: 'a12',
    title: 'Áo Khoác Louis Vuitton Monogram Denim',
    description: 'Áo khoác LV chính hãng, size L, mới 100% chưa sử dụng. Fullbox receipt.',
    images: ['/images/lv-jacket.jpg'],
    categoryId: 'thoi-trang',
    currentPrice: 1800,
    startPrice: 1000,
    minBidIncrement: 50,
    bidCount: 29,
    startTime: hoursAgo(80),
    endTime: hoursFromNow(20),
    seller: mockUsers[1],
    status: 'active',
    featured: false,
    hotDeal: false,
  },
];

export const mockBids: Bid[] = [
  { id: 'b1', auctionId: 'a1', bidder: mockUsers[1], amount: 45.5, timestamp: hoursAgo(0.5) },
  { id: 'b2', auctionId: 'a1', bidder: mockUsers[3], amount: 45, timestamp: hoursAgo(1) },
  { id: 'b3', auctionId: 'a1', bidder: mockUsers[2], amount: 44, timestamp: hoursAgo(2) },
  { id: 'b4', auctionId: 'a1', bidder: mockUsers[1], amount: 42.5, timestamp: hoursAgo(3) },
  { id: 'b5', auctionId: 'a1', bidder: mockUsers[4], amount: 40, timestamp: hoursAgo(5) },
  { id: 'b6', auctionId: 'a2', bidder: mockUsers[0], amount: 1250, timestamp: hoursAgo(0.2) },
  { id: 'b7', auctionId: 'a2', bidder: mockUsers[2], amount: 1200, timestamp: hoursAgo(1) },
  { id: 'b8', auctionId: 'a2', bidder: mockUsers[3], amount: 1150, timestamp: hoursAgo(2) },
  { id: 'b9', auctionId: 'a7', bidder: mockUsers[1], amount: 5200, timestamp: hoursAgo(0.1) },
  { id: 'b10', auctionId: 'a7', bidder: mockUsers[0], amount: 5100, timestamp: hoursAgo(0.5) },
];

export const vipTiers: VipTier[] = [
  {
    id: 'dong',
    name: 'Bronze',
    nameVi: 'Đồng',
    icon: '🥉',
    color: '#cd7f32',
    gradient: 'linear-gradient(135deg, #cd7f32 0%, #8B4513 100%)',
    glowColor: 'rgba(205, 127, 50, 0.4)',
    priceMonthly: 10,
    priceYearly: 100,
    maxBidAmount: 1000,
    maxAuctions: 10,
    benefits: [
      'Giới hạn đấu giá tối đa 1,000 SUI',
      'Tạo tối đa 10 phiên đấu giá/tháng',
      'Hỗ trợ cơ bản qua email',
      'Badge VIP Đồng trên profile',
      'Giảm 5% phí giao dịch',
    ],
    powerMultiplier: 2,
  },
  {
    id: 'bac',
    name: 'Silver',
    nameVi: 'Bạc',
    icon: '🥈',
    color: '#c0c0c0',
    gradient: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
    glowColor: 'rgba(192, 192, 192, 0.4)',
    priceMonthly: 30,
    priceYearly: 300,
    maxBidAmount: 5000,
    maxAuctions: 30,
    benefits: [
      'Giới hạn đấu giá tối đa 5,000 SUI',
      'Tạo tối đa 30 phiên đấu giá/tháng',
      'Hỗ trợ ưu tiên 24/7',
      'Badge VIP Bạc trên profile',
      'Giảm 10% phí giao dịch',
      'Truy cập đấu giá VIP-only',
      'Thông báo realtime khi có bid mới',
    ],
    powerMultiplier: 5,
  },
  {
    id: 'vang',
    name: 'Gold',
    nameVi: 'Vàng',
    icon: '🥇',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    priceMonthly: 100,
    priceYearly: 1000,
    maxBidAmount: 999999,
    maxAuctions: 999,
    benefits: [
      'Không giới hạn mức đấu giá',
      'Không giới hạn số phiên đấu giá',
      'Hỗ trợ VIP chuyên biệt',
      'Badge VIP Vàng trên profile',
      'Giảm 20% phí giao dịch',
      'Truy cập tất cả đấu giá exclusive',
      'Thông báo realtime + SMS',
      'Ưu tiên hiển thị sản phẩm',
      'Công suất đấu giá tối đa',
    ],
    powerMultiplier: 10,
  },
];

export const platformStats = {
  totalAuctions: 1247,
  activeAuctions: 156,
  totalUsers: 8934,
  totalVolumeSUI: 2450000,
  totalBids: 45678,
};
