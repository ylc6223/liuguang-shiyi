export enum EraKey {
  PreQin = 1,
  Han = 2,
  Tang = 3,
  Song = 4,
  Ming = 5,
  Qing = 6,
}

export const eras: Record<
  EraKey,
  { label: string; period: string; href: string }
> = {
  [EraKey.PreQin]: { label: '先秦', period: '上古–前221', href: '/timeline/pre-qin' },
  [EraKey.Han]: { label: '汉', period: '前202–220', href: '/timeline/han' },
  [EraKey.Tang]: { label: '唐', period: '618–907', href: '/timeline/tang' },
  [EraKey.Song]: { label: '宋', period: '960–1279', href: '/timeline/song' },
  [EraKey.Ming]: { label: '明', period: '1368–1644', href: '/timeline/ming' },
  [EraKey.Qing]: { label: '清', period: '1636–1912', href: '/timeline/qing' },
}

export const erasOrder: EraKey[] = [
  EraKey.PreQin,
  EraKey.Han,
  EraKey.Tang,
  EraKey.Song,
  EraKey.Ming,
  EraKey.Qing,
]

export enum EditorsPickKey {
  ShijiArts = 1,
  SongAesthetics = 2,
  SilkRoad = 3,
  HundredSchools = 4,
}

export const editorsPicks: Record<
  EditorsPickKey,
  { title: string; desc: string; href: string }
> = {
  [EditorsPickKey.ShijiArts]: {
    title: '史记中的人物列传艺术',
    desc: '从叙事到书写形态，体味经典的深刻与张力',
    href: '/articles/shiji-arts',
  },
  [EditorsPickKey.SongAesthetics]: {
    title: '宋朝美学：极简与雅致',
    desc: '意境与秩序的统一，审美与制度的互映',
    href: '/topics/song-aesthetics',
  },
  [EditorsPickKey.SilkRoad]: {
    title: '丝绸之路与文明交流',
    desc: '穿越万里，追寻经贸背后的文化互鉴',
    href: '/topics/silk-road',
  },
  [EditorsPickKey.HundredSchools]: {
    title: '诸子百家思想流变',
    desc: '思想的交锋与融合，奠定文化根基',
    href: '/topics/hundred-schools',
  },
}

export const editorsPicksOrder: EditorsPickKey[] = [
  EditorsPickKey.ShijiArts,
  EditorsPickKey.SongAesthetics,
  EditorsPickKey.SilkRoad,
  EditorsPickKey.HundredSchools,
]

// 首页「历史长河」严格还原 code.html 的六项
export enum RiverEraKey {
  Xia = 1,
  Shang = 2,
  Zhou = 3,
  Qin = 4,
  Han = 5,
  Jin = 6,
}

export const riverEras: Record<
  RiverEraKey,
  { label: string; period: string; href: string }
> = {
  [RiverEraKey.Xia]: { label: '夏', period: '约前2070-前1600', href: '/timeline/xia' },
  [RiverEraKey.Shang]: { label: '商', period: '约前1600-前1046', href: '/timeline/shang' },
  [RiverEraKey.Zhou]: { label: '周', period: '前1046-前256', href: '/timeline/zhou' },
  [RiverEraKey.Qin]: { label: '秦', period: '前221-前207', href: '/timeline/qin' },
  [RiverEraKey.Han]: { label: '汉', period: '前202-公元220', href: '/timeline/han' },
  [RiverEraKey.Jin]: { label: '晋', period: '266-420', href: '/timeline/jin' },
}

export const riverErasOrder: RiverEraKey[] = [
  RiverEraKey.Xia,
  RiverEraKey.Shang,
  RiverEraKey.Zhou,
  RiverEraKey.Qin,
  RiverEraKey.Han,
  RiverEraKey.Jin,
]

// 首页「编辑精选」严格还原 code.html 的三项（含图片）
export enum HomeEditorsPickKey {
  SilkRoad = 1,
  GrandCanal = 2,
  ZenAndGongbi = 3,
}

export const homeEditorsPicks: Record<
  HomeEditorsPickKey,
  { title: string; desc: string; href: string; image: string; imageAlt: string }
> = {
  [HomeEditorsPickKey.SilkRoad]: {
    title: '丝绸之路',
    desc: '连接东西方的古老商道，不仅仅是贸易，更是文化的交融之路。',
    href: '/topics/silk-road',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhYDM5Iddl2dsgFO42r1P6WrVrFUNbHQrSBE_C-6jOJyc_PW1l1CQp9buye0LKf1p-TPnVHs2THvyUEd-pVEDY4kHvw8l4OPNsSeh3_fXVYXrXt59pc2sAwaEEDCaxBdhZZBxwDpAOv1cVSQ3OczwQ33IFiloZWxaYOhLfKMxDhCBm783YARdGf2A5VIKGefnLTzxBh82N5V53ASsFs7ELbxCQZe5ISOtNvoMV80r1YpBVC2w9KH8GqEfr9LQ2xmv4grgsJynThfrf',
    imageAlt: '丝绸之路',
  },
  [HomeEditorsPickKey.GrandCanal]: {
    title: '京杭大运河',
    desc: '世界上最长的人工河，见证了中国古代水利工程的卓越成就。',
    href: '/topics/grand-canal',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXl0d818I0G1zroXWXZ9aKSi9X5oy-BpTE7EQ_aNDzfhE_2D44FFRtlRuOdwvssykD6aq4w1OkLW9wgLgYJwiwV-1EUNzRcAaSItLfkRoU1eFMbXyqtMlLDhpFAXiAh8FCXsjkWyjUw_Aer9GG7TuVHlpilI5QD_qEW799RfxAaPk2V7BLi-4cdlXTJsF202CyWmNotr6LTQkomGo8OQyFWN__pu-RVMmq3OR6EA01cT3mDZIJqAY2T4J7_TKWCXQNJ9VaJrh7j9yR',
    imageAlt: '京杭大运河',
  },
  [HomeEditorsPickKey.ZenAndGongbi]: {
    title: '禅与工笔画',
    desc: '东方哲思与艺术的完美融合，探寻静谧与写意间的微妙平衡。',
    href: '/topics/zen-and-gongbi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFmPcIdo2cQ99ZkZO9Tanpmih6ISDiRFaJ5jW37Mj20rj1qulvwNmEUzdgJ5p78fxzZavC9slWw1ShbNyj6422kel5zUaqguMy4L4oHtWd2OksmWssmarTCnG51U5FKdUtQtiDjNAA0zyQaB_9Cqfym6fNDIjYtAyYabc91XKl_BK9D21yq9608fNn2Ql2pWPd_ApQlms8pT0-UV4HKHWGfgRX7Bag4dUCYt3j7O_qZBUjsw1q6K12_SNQ7xdeCIuNUVfsQVCZAZaz',
    imageAlt: '禅与工笔画',
  },
}

export const homeEditorsPicksOrder: HomeEditorsPickKey[] = [
  HomeEditorsPickKey.SilkRoad,
  HomeEditorsPickKey.GrandCanal,
  HomeEditorsPickKey.ZenAndGongbi,
]
