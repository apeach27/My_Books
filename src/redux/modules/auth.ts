import { stringify } from "querystring";
import { act } from "react-dom/test-utils";
import { createActions, handleAction, handleActions } from "redux-actions";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: Error | null;

}

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
};

const prefix = 'my-books/auth';

export const { pending, success, fail } = createActions(
    'PENDING',
    'SUCCESS',
    'FAIL',
    { prefix }
);

const reducer = handleActions<AuthState, string>({
        PENDING: (state) => ({
            ...state,
            loding: true,
            error: null,
        }),
        SUCCESS: (state, action) => ({
            ...state,
            token: action.payload,
            loding: false,
            error: null,
        }),
        FAIL: (state, action: any) => ({
            ...state,
            loding: false,
            error: action.payload,
        }),
},
    initialState,
    { prefix }
);
    export default reducer
