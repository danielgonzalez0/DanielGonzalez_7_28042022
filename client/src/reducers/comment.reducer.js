import {
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS,
} from '../actions/comment.actions';

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    case EDIT_COMMENT:
      return state.map((comment) => {
        if (comment.id_comment === action.payload.commentId) {
          return {
            ...comment,
            comment_content: action.payload.content,
          };
        } else {
          return comment;
        }
      });

    case DELETE_COMMENT:
      return state.filter(
        (comment) => comment.id_comment !== action.payload.commentId
      );

    default:
      return state;
  }
}
