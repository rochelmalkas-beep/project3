import { useState, useEffect } from "react";
import { getItems, deleteItem, addItem, updateItem } from "../api/api";
import { useData } from "./useData";

export function useItems(resource, params, pageSize) {
    const { cache } = useData();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    // paramsKey משמש רק ב-useEffect — אובייקט היה מפעיל את האפקט בכל רינדור
    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        const loadItems = async () => {
            const pagingParams = pageSize ? { _page: page, _limit: pageSize } : {};
            const queryParams = { ...params, ...pagingParams };

            if (page === 1) {
                const cached = cache.get(resource, queryParams);
                if (cached) {
                    setItems(cached);
                    setHasMore(pageSize ? cached.length === pageSize : false);
                    setIsLoading(false);
                    setError('');
                    return;
                }
            }

            try {
                setIsLoading(true);
                const loadedItems = await getItems(resource, queryParams);
                if (page === 1) {
                    cache.set(resource, queryParams, loadedItems);
                }
                setItems((previous) => (page === 1 ? loadedItems : [...previous, ...loadedItems]));
                setHasMore(pageSize ? loadedItems.length === pageSize : false);
                setError('');
            } catch (loadError) {
                setError(loadError.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadItems();
    }, [resource, paramsKey, page, pageSize, cache]);

    const loadMore = () => setPage((previous) => previous + 1);

    // מבצע פעולה בשרת, מבטל את המטמון, ומעדכן את הרשימה המקומית
    const runItemAction = async (request, updateList) => {
        try {
            const result = await request();
            cache.invalidate(resource);
            setItems((previous) => updateList(previous, result));
            setError('');
        } catch (actionError) {
            setError(actionError.message);
        }
    };

    const addNewItem = (data) =>
        runItemAction(
            () => addItem(resource, data),
            (previous, newItem) => [...previous, newItem],
        );

    const updateExistingItem = (id, data) =>
        runItemAction(
            () => updateItem(resource, id, data),
            (previous, updatedItem) => previous.map((item) => (item.id === id ? updatedItem : item)),
        );

    const removeItem = (id) =>
        runItemAction(
            () => deleteItem(resource, id),
            (previous) => previous.filter((item) => item.id !== id),
        );

    return { removeItem, updateExistingItem, addNewItem, loadMore, hasMore, error, isLoading, items };
}
