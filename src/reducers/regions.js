const initialState = {
    region: 'UK',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_REGION':
            return {
                ...state,
                region: action.payload,
            };
        case 'REMOVE_POST':
            return {
                ...state,
            };
        default:
            return state;
    }
};