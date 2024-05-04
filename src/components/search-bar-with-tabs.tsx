import { SearchBar } from '@components/search-bar'
import { Button } from '@components/ui/button'

export const SearchBarWithTabs = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <Button
          className="font-semibold rounded-xl p-4 h-[22px]"
          variant="secondary"
        >
          Dus
        </Button>
        <Button
          className="font-semibold rounded-xl p-4 h-[22px] text-white"
          variant="ghost"
        >
          Întors
        </Button>
      </div>

      <SearchBar />
    </div>
  )
}
