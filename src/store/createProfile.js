import actionCreator from '../utils/actionCreator';

const createProfileConstants = actionCreator.defineAction('createProfile');

const SET_SELECTED_OVERLAY = createProfileConstants.defineAction('SET_SELECTED_OVERLAY');
const UPLOAD_IMAGE_SUCCEED = createProfileConstants.defineAction('UPLOAD_IMAGE_SUCCEED');
const CROPPED_IMAGE = createProfileConstants.defineAction('CROPPED_IMAGE');
const CLEAR_STATE = createProfileConstants.defineAction('CLEAR_STATE');

const initialState = {
  currentStep: 1,
  selectedOverlayImg: '',
  image: null,
};

export default (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case SET_SELECTED_OVERLAY: {
      return {
        ...state,
        selectedOverlayImg: action.selectedOverlayImg,
      };
    }
    case UPLOAD_IMAGE_SUCCEED: {
      return {
        ...state,
        currentStep: 2,
        image: action.originalImage,
      };
    }
    case CROPPED_IMAGE: {
      return {
        ...state,
        currentStep: 3,
        image: action.croppedImage,
      };
    }
    case CLEAR_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export const actions = {
  setSelectedOverlay: imgPath => ({
    type: SET_SELECTED_OVERLAY,
    selectedOverlayImg: imgPath,
  }),
  onUploadImageSucceed: imageDataURL => ({
    type: UPLOAD_IMAGE_SUCCEED,
    originalImage: imageDataURL,
  }),
  onConfirmCropped: imgCanvas => ({
    type: CROPPED_IMAGE,
    croppedImage: imgCanvas,
  }),
  clearState: () => ({
    type: CLEAR_STATE,
  }),
};
