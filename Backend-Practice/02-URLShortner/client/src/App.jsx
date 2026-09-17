import { useURLContext } from "./context/urlContext"
import { useUrlHook } from "./hooks/useUrlHook"
import { useEffect } from "react"

const App = () => {
  const { inputValue, setInputValue, setUrls, urls } = useURLContext()
  const { getAllURLs, createUrl, deleteUrl } = useUrlHook()
  console.log(urls)
  useEffect(() => {
    (async () => {

      let url = await getAllURLs()
      setUrls(url)
    })();

  }, [])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">

      {/* URL Input */}
      <div className="flex w-full max-w-xl gap-2">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Enter your URL"
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        />

        <button
          onClick={() => createUrl(inputValue)}
          className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Short URL
        </button>
      </div>

      {/* URL List */}
      <div className="mt-8 w-full max-w-xl space-y-3">
        {urls.map((url) => {
          return (
            <div
              key={url._id}
              className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">

                {/* URL Details */}
                <div className="min-w-0">
                  <a
                    href={`http://localhost:3000/${url.shortCode}`}
                    target="_blank"

                    className="font-medium text-blue-600 hover:underline"
                  >
                    {url.shortCode}
                  </a>
                  <p>clicks {url.click}</p>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    {url.originalUrl}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100">
                    Copy
                  </button>

                  <button onClick={() => deleteUrl(url._id)} className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
                    Delete
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App