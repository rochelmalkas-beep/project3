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
    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        const loadItems = async () => {
            const pagingParams = pageSize ? { _page: page, _limit: pageSize } : {};
            const queryParams = { ...JSON.parse(paramsKey), ...pagingParams };

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

    const addNewItem = async (data) => {
        try {
            const newItem = await addItem(resource, data);
            cache.invalidate(resource);
            setItems((previous) => [...previous, newItem]);
            setError('');
        } catch (addError) {
            setError(addError.message);
        }
    };

    const updateExistingItem = async (id, data) => {
        try {
            const updatedItem = await updateItem(resource, id, data);
            cache.invalidate(resource);
            setItems((previous) => previous.map((item) => (item.id === id ? updatedItem : item)));
            setError('');
        } catch (updateError) {
            setError(updateError.message);
        }
    };

    const removeItem = async (id) => {
        try {
            await deleteItem(resource, id);
            cache.invalidate(resource);
            setItems((previous) => previous.filter((item) => item.id !== id));
            setError('');
        } catch (deleteError) {
            setError(deleteError.message);
        }
    };

    return { removeItem, updateExistingItem, addNewItem, loadMore, hasMore, error, isLoading, items };
}
