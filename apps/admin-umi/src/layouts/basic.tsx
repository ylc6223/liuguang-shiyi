import React from 'react'

// 布局枚举（数字常量）
export enum LayoutKind {
    Sidebar = 1,
    SidebarMixed = 2,
}

type BasicLayoutProps = {
    layout?: LayoutKind
    headerVisible?: boolean
    sidebarEnable?: boolean
    sidebarCollapse?: boolean
    sidebarWidth?: number
    sideCollapseWidth?: number
    sidebarExtraVisible?: boolean
    sidebarExtraWidth?: number
    tabbarEnable?: boolean
    footerEnable?: boolean
    zIndex?: number
    onToggleSidebar?: () => void
    onSideMouseLeave?: () => void
    onUpdateSidebarCollapse?: (v: boolean) => void
    // 插槽（以 React 节点形式承载）
    logo?: React.ReactNode
    header?: React.ReactNode
    menu?: React.ReactNode
    mixedMenu?: React.ReactNode
    sideExtra?: React.ReactNode
    sideExtraTitle?: React.ReactNode
    tabbar?: React.ReactNode
    content?: React.ReactNode
    contentOverlay?: React.ReactNode
    footer?: React.ReactNode
    extra?: React.ReactNode
}

export default function Basic(props: BasicLayoutProps) {
    return (<div></div>)
}
