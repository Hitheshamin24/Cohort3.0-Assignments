import { useApi } from "../api/useApi"
import { useURLContext } from "../context/urlContext"

export const useUrlHook = () => {
    const { setUrls, setInputValue } = useURLContext()
    const api = useApi()
    const getAllURLs = async () => {
        let url = await api.get("/url")
        return url.data.urls
    }

    const createUrl = async (value) => {
        let url = await api.post("/url", { url: value })
        setUrls((previous) => [...previous, url.data.url])
        setInputValue("")
    }

    const deleteUrl = async (id) => {
        await api.delete(`/url/${id}`)
        setUrls((previous) => previous.filter((p) => p._id !== id))


    }
    return { getAllURLs, createUrl, deleteUrl }

}