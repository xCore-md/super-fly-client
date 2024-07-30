export function FlightsSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="custom-shadow grid h-44 w-full animate-pulse grid-cols-5 gap-4 rounded-lg border-b bg-gray-200 p-4 "
        >
          <div className="col-span-1 h-full rounded-lg bg-gray-300"></div>
          <div className="col-span-3 h-full rounded-lg bg-gray-300"></div>
          <div className="col-span-1 h-full rounded-lg bg-gray-300"></div>
        </div>
      ))}
    </div>
  )
}
