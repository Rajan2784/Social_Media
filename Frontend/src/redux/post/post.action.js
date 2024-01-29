import axios from "axios";
import { API_BASE_URL, api } from "../../config/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";
const jwtToken = localStorage.getItem("jwt");

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/post`, postData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("created post", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};
export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log("Fetched posts data:", data);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error fetching posts:", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
  }
};

export const getUserPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
    console.log("get user post", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/posts/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("like post", data);
  } catch (error) {
    console.log(error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};

// Create Comment

export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/comments/post/${reqData.postId}`,
      reqData.data,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
};
