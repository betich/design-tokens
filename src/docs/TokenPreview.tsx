import type { ReactNode } from 'react'

/**
 * Small presentational helpers for the MDX documentation.
 *
 * These read the live custom properties from the generated stylesheets rather
 * than restating values, so the docs cannot fall out of date with the build.
 */

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="gap-sm py-sm grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
      {children}
    </div>
  )
}

export function Swatch({ token, name }: { token: string; name?: string }) {
  return (
    <div className="gap-xs flex items-center">
      <div
        className="border-line-subtle size-10 shrink-0 rounded-md border"
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0">
        <div className="text-label-sm leading-label-sm text-content-primary truncate">
          {name ?? token.replace(/^--color-/, '')}
        </div>
        <code className="text-content-muted block truncate text-[11px]">
          {token}
        </code>
      </div>
    </div>
  )
}

export function Row({
  token,
  children,
}: {
  token: string
  children: ReactNode
}) {
  return (
    <div className="border-line-subtle gap-md py-xs flex items-baseline border-b last:border-b-0">
      <code className="text-content-muted w-64 shrink-0 text-[11px]">
        {token}
      </code>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export function SpacingBar({ token }: { token: string }) {
  return (
    <div className="gap-xs flex items-center">
      <div
        className="bg-surface-accent h-3 rounded-sm"
        style={{ width: `var(${token})`, minWidth: '1px' }}
      />
      <code className="text-content-muted text-[11px]">{token}</code>
    </div>
  )
}
