import {userState} from "../atoms/user"
import {selector} from "recoil"

export const isUserLoadingState = selector({
    key:'userLoadingState',
    get: ({get}) => {
        const state = get(userState);
        return state.isLoading
    }
})