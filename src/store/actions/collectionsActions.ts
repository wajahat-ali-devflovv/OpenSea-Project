import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
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
