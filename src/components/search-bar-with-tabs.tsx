import { SearchBar } from '@components/search-bar'
import { Button } from '@components/ui/button'

export const SearchBarWithTabs = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <Button
          className="h-[22px] rounded-xl p-4 text-[10px] font-bold"
          variant="secondary"
        >
          Dus
        </Button>
        <Button
          className="h-[22px] rounded-xl p-4 text-[10px] font-bold text-white"
          variant="ghost"
        >
          Întors
        </Button>
      </div>

      <SearchBar />
    </div>
  )
}
