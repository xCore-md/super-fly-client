import { usePathname } from 'next/navigation'

export function useIsAdminPanel(): boolean {
  const pathname: string | null = usePathname()
  return Boolean(pathname?.startsWith('/admin'))
}
