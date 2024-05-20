import { SearchBar } from '@components/search-bar'
import { Button } from '@components/ui/button'

export const SearchBarWithTabs = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <Button
          className="h-[22px] rounded-xl p-4 text-sm font-semibold max-[1024px]:text-xs"
          variant="secondary"
        >
          Dus
        </Button>
        <Button
          className="h-[22px] rounded-xl p-4 text-sm font-semibold text-white max-[1024px]:text-xs"
          variant="ghost"
        >
          Întors
        </Button>
      </div>

      <SearchBar />
    </div>
  )
}
