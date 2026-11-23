import { useState, useEffect } from "react";
import { getItems, deleteItem, addItem, updateItem } from "../api/api";

export function useItems(resource, params, pageSize) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        const loadItems = async () => {
            try {
                setIsLoading(true);
                const pagingParams = pageSize ? { _page: page, _limit: pageSize } : {};
                const loadedItems = await getItems(resource, { ...JSON.parse(paramsKey), ...pagingParams });
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
    }, [resource, paramsKey, page, pageSize]);

    const loadMore = () => setPage((previous) => previous + 1);

    const addNewItem = async (data) => {
        try {
            const newItem = await addItem(resource, data);
            setItems((previous) => [...previous, newItem]);
            setError('');
        } catch (addError) {
            setError(addError.message);
        }
    };

    const updateExistingItem = async (id, data) => {
        try {
            const updatedItem = await updateItem(resource, id, data);
            setItems((previous) => previous.map((item) => (item.id === id ? updatedItem : item)));
            setError('');
        } catch (updateError) {
            setError(updateError.message);
        }
    };

    const removeItem = async (id) => {
        try {
            await deleteItem(resource, id);
            setItems((previous) => previous.filter((item) => item.id !== id));
            setError('');
        } catch (deleteError) {
            setError(deleteError.message);
        }
    };

    return { removeItem, updateExistingItem, addNewItem, loadMore, hasMore, error, isLoading, items };
}