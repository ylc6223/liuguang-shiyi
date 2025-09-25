import React from 'react'
import { useLocation, useNavigate } from '@umijs/max'

enum AuthState {
  Unknown = 1,
  Guest = 2,
  Authed = 3,
}

export default function AuthWrapper(props: { children: React.ReactNode }) {
  const nav = useNavigate()
  const loc = useLocation()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const state: AuthState = token ? AuthState.Authed : AuthState.Guest

  React.useEffect(() => {
    if (state === AuthState.Guest && loc.pathname !== '/login') {
      nav('/login', { replace: true })
    }
    if (state === AuthState.Authed && loc.pathname === '/login') {
      nav('/dashboard', { replace: true })
    }
  }, [state, loc.pathname])

  if (state === AuthState.Guest && loc.pathname !== '/login') {
    return null
  }
  if (state === AuthState.Authed && loc.pathname === '/login') {
    return null
  }
  return <>{props.children}</>
}
