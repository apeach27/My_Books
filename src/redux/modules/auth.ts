import { push } from "connected-react-router";
import { Action, createActions, handleActions } from "redux-actions"
import { call, put, takeEvery } from "redux-saga/effects";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { AuthState, LoginReqType } from "../../types";


// state 구상
const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
};

// 모듈에서 prefix 설정
const prefix = 'my-books/auth';

export const { pending, success, fail } = createActions(
    'PENDING',
    'SUCCESS',
    'FAIL',
    { prefix }
);

// reducer 만들기
// headleActions 제네릭 추가
// 제네릭 : 함수나 클래스를 선언할 때 타입을 고정하지 않고, 사용할 때 명시해 타입을 유연하게 사용할 수 있게 하는 타입.
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

// saga
export const {login, logout} = createActions("LOGIN", "LOGOUT", { prefix });

function* loginSaga(action: Action<LoginReqType>) {
// 비동기 로직
try{
    yield put(pending());
    // login api를 쳐서 그 안에 있는 데이터를 꺼내 토큰으로 받아와야 한다.
    // 인라인으로 직접 쓰게 되면 api의 로직이 같이 들어오기 때문에 api로직을 분리 해야된다.
    const token: string = yield call(UserService.login, action.payload);

    TokenService.set(token);

    // localstorage
    yield put(success(token));
    yield put(push("/"));

    // login이 정상적으로 되면 Sign in 페이지에서 리스트 페이지로 이동 시켜야함 => push처리! 

    } catch(error: any) {
        yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
    }
}

function* logoutSaga() {

}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}

