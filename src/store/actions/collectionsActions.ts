import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
  ADD_COLLECTION_REQUEST,
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_FAILURE,
} from "../const";

export const fetchCollectionsRequest = () => ({
  type: FETCH_COLLECTIONS_REQUEST,
});

export const fetchCollectionsSuccess = (collections: any[]) => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

export const fetchCollectionsFailure = (error: string) => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

export const addCollectionRequest = (formData: FormData) => ({
  type: ADD_COLLECTION_REQUEST,
  payload: formData,
});

export const addCollectionSuccess = (collection: any) => ({
  type: ADD_COLLECTION_SUCCESS,
  payload: collection,
});

export const addCollectionFailure = (error: string) => ({
  type: ADD_COLLECTION_FAILURE,
  payload: error,
});
