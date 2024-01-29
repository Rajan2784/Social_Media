import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHATS_FAILURE,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
} from "./message.actionType";
import { API_BASE_URL } from "../../config/api";
import axios from "axios";
const jwt = localStorage.getItem("jwt");

export const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/messages/chat/${reqData.message.chatId}`, reqData.message, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    reqData.sendMessageToServer(data);
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAILURE,
      payload: error,
    });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/chats`, chat, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type":"application/json"
      },
    });
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAILURE,
      payload: error,
    });
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/chats`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CHATS_FAILURE,
      payload: error,
    });
  }
};
