import { SEARCH_RESULT, LOADING, SEARCH_RESULT_CLICKED, SEARCH_RESULT_GAME_SCORE, SEARCH_RESULT_HEAD, SEARCH_RESULT_NAME_HEAD } from '../actions/SearchActions.js'

const initialState = {
item: [],
items: [],
filter: [],
clicked: {
    platforms:[],
    videos: [{ "id": 0, "video_id": 0 }],
},
gamescore: {
    games:[],
    playersCountOnMain:[],
    playersCountOnBonus:[],
    playersCountOnCompl:[],
    totalAvgScore: null,
},
loading: true,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SEARCH_RESULT:
            return {
                ...state,
                item: action.payload,
            }
        case SEARCH_RESULT_CLICKED:
            return {
                ...state,
                clicked: action.payload
            }
        case SEARCH_RESULT_GAME_SCORE:
            return {
                ...state,
                gamescore: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
    // DESSA TVÅ SKA SPARA I SAMMA STATE
        case SEARCH_RESULT_HEAD:
            return {
                ...state,
                items: action.payload,
                filter: action.payload,
            }
        case SEARCH_RESULT_NAME_HEAD:
            return {
                ...state,
                filter: action.payload
            }
    // ---------------------------------
        default:
            return state;
    }
}
