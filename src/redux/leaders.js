import { actions } from 'react-redux-form';
import * as ActionTypes from './ActionTypes';

export const  Leaders = (state = {isLoading: true,
                errMess: null, leaders:[]}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_Leaders:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionTypes.Leaders_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.Leaders_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};