import * as actionTypes from './actions';

const initialState = {
    own: 0,
    results: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD:
           return [
               ...state,
               {
                   ownn: true
               }
           ]
        case actionTypes.REMOVE: 
        return [
            ...state,
            {
                own: false
            }
        ]
        }
        return state;
    }

export default reducer;