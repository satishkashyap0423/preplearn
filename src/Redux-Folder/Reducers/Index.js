import {combineReducers} from 'redux';
import Noteurl from './Noteurl';
import Profiledetails from './Profiledetails';
import RelatedFreeTopicList from './RelatedFreeTopicList';
import RelatedTopicList from './RelatedTopicList';
import SelectUserBatch from './SelectUserBatch';
import VideoAllDetail from './VideoAllDetail';
const allReducers = combineReducers({
    Profiledetails : Profiledetails,
    RelatedTopicList:RelatedTopicList,
    VideoAllDetail:VideoAllDetail,
    RelatedFreeTopicList:RelatedFreeTopicList,
    SelectUserBatch:SelectUserBatch,
    Noteurl:Noteurl
})

export default allReducers;