export enum NavItemKey {
  Home = 1,
  Timeline = 2,
  Events = 3,
  Figures = 4,
  Dynasties = 5,
}

export const navItems: Record<NavItemKey, { label: string; href: string }> = {
  [NavItemKey.Home]: { label: '首页', href: '/' },
  [NavItemKey.Timeline]: { label: '历史脉络', href: '/timeline' },
  [NavItemKey.Events]: { label: '重大事件', href: '/events' },
  [NavItemKey.Figures]: { label: '人物', href: '/figures' },
  [NavItemKey.Dynasties]: { label: '朝代', href: '/dynasties' },
}

export const mainNavOrder: NavItemKey[] = [
  NavItemKey.Home,
  NavItemKey.Timeline,
  NavItemKey.Events,
  NavItemKey.Figures,
  NavItemKey.Dynasties,
]

export enum HotKeyword {
  Tang = 1,
  SongPoem = 2,
  LiBai = 3,
  ThreeKingdoms = 4,
}

export const hotKeywords: Record<HotKeyword, { label: string; href: string }> = {
  [HotKeyword.Tang]: { label: '唐朝', href: '/dynasties/tang' },
  [HotKeyword.SongPoem]: { label: '宋词', href: '/topics/song-poetry' },
  [HotKeyword.LiBai]: { label: '李白', href: '/figures/li-bai' },
  [HotKeyword.ThreeKingdoms]: { label: '三国演义', href: '/topics/three-kingdoms' },
}

export enum CategoryKey {
  Origin = 1,
  Law = 2,
  Culture = 3,
  Technology = 4,
  Poetry = 5,
  Geography = 6,
}

export const categories: Record<
  CategoryKey,
  { label: string; icon: string; href: string }
> = {
  [CategoryKey.Origin]: { label: '华夏文明起源', icon: 'history_edu', href: '/topics/origin' },
  [CategoryKey.Law]: { label: '法制与治理', icon: 'gavel', href: '/topics/law' },
  [CategoryKey.Culture]: { label: '礼乐文化', icon: 'temple_buddhist', href: '/topics/culture' },
  [CategoryKey.Technology]: { label: '技术与发明', icon: 'emoji_objects', href: '/topics/technology' },
  [CategoryKey.Poetry]: { label: '诗词歌赋', icon: 'menu_book', href: '/topics/poetry' },
  [CategoryKey.Geography]: { label: '疆域与地理', icon: 'map', href: '/topics/geography' },
}

