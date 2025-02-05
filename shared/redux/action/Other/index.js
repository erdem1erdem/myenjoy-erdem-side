import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {domainUrl} from '../../../';

export const getHiddenCategories = createAsyncThunk(
  'getHiddenCategories',
  async (object, {dispatch, getState}) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(object),
    };
    fetch(domainUrl + '/getHiddenCategories', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.success) {
          dispatch(
            hiddenCategoriesResponse({
              data: result?.data,
              mediaType: object?.mediaType,
            }),
          );
        } else throw result?.message;
      })
      .catch(error => {
        dispatch(hiddentCategoriesClear(object?.mediaType));
        console.error(error);
      });
  },
);
export const getFavorites = createAsyncThunk('getFavorites',
  async (object, {dispatch, getState}) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(object)
    };
    fetch(domainUrl + '/getFavourite', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.success) {
          dispatch(
            favoritesResponse({
              data: result?.data,
              mediaType: object?.mediaType,
            }),
          );
        } else throw result?.message;
      })
      .catch(error => {
        dispatch(favoritesClear(object?.mediaType));
        console.error(error);
      });
  },
);
export const getLockedChannels = createAsyncThunk(
  'getLockedChannels',
  async (object, {dispatch, getState}) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(object),
    };
    fetch(domainUrl + '/getLockChannels', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("lockedChannelsResponse",result?.data)
        if (result?.success) dispatch(lockedChannelsResponse(result?.data));
        else throw result?.message;
      })
      .catch(error => {
        dispatch(lockedChannelsClear());
        console.error(error);
      });
  },
);

export const saveSettings = createAsyncThunk(
  'saveSettings',
  async (object, {dispatch, getState}) => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(object),
    };
    fetch(domainUrl + '/saveSetting', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.success) {
          dispatch(saveSettingsResponse(result?.data));
        } else throw result?.message;
      })
      .catch(error => {
        dispatch(saveSettingsClear());
        console.error(error);
      });
  },
);

export const getSettings = createAsyncThunk(
  'getSettings',
  async (object, {dispatch, getState}) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const payload = {macAddress: object}
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
    };
    fetch(domainUrl + '/getSetting', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.success) {
          dispatch(settingsResponse(result?.data));
        } else throw result?.message;
      })
      .catch(error => {
        dispatch(settingsClear());
        // console.error("errors:"+error)
      });
  },
);

const OtherSlice = createSlice({
  name: 'Other',
  initialState: {
    hiddenMoviesCategories: [],
    hiddenSeriesCategories: [],
    hiddenChannelsCategories: [],
    favoriteChannels: [],
    moviesFavorite: [],
    seriesFavorite: [],
    lockedChannels: [],
    settings: null,
    currentList: 1, // 1 mean categories list, 2 mean tv channels list

    categoryNodes: {
      firstCategoryNode: null,
      lastCategoryNode: null,
    },
    media: {
      id: null,
      name: null,
    },
    isFavorite: false,
  },
  reducers: {
    hiddenCategoriesResponse: (state, action) => {
      let mediaType = action?.payload?.mediaType;
      let data = action?.payload?.data;
      if (mediaType === 2) state.hiddenMoviesCategories = data;
      else if (mediaType === 3) state.hiddenSeriesCategories = data;
      else state.hiddenChannelsCategories = data;
    },
    hiddentCategoriesClear: (state, action) => {
      if (action?.payload?.mediaType === 2) state.hiddenMoviesCategories = [];
      else state.hiddenSeriesCategories = [];
    },
    favoritesResponse: (state, action) => {
      let mediaType = action?.payload?.mediaType;
      let data = action?.payload?.data;
      if (mediaType === 1) state.favoriteChannels = data;
      else if (mediaType === 2) state.moviesFavorite = data;
      else state.seriesFavorite = data;
    },
    favoritesClear: (state, action) => {
      if (action?.payload?.mediaType === 1) state.favoriteChannels = [];
      if (action?.payload?.mediaType === 2) state.moviesFavorite = [];
      else state.seriesFavorite = [];
    },
    lockedChannelsResponse: (state, action) => {
      state.lockedChannels = action?.payload;
    },
    lockedChannelsClear: state => {
      state.seriesFavorite = [];
    },
    settingsResponse: (state, action) => {
      state.settings = action?.payload;
    },
    settingsClear: state => {
      state.settings = null;
    },
    saveSettingsResponse: (state, action) => {},
    saveSettingsClear: state => {
      state.settings = null;
    },
    setCurrentList: (state, action) => {
      state.currentList = action?.payload;
    },
    setCategoryNodes: (state, action) => {
      state.categoryNodes = {...state?.categoryNodes, ...action?.payload};
    },
    setMedia: (state, action) => {
      state.media = action?.payload;
    },
    setIsFavorite: (state, action) => {
      state.isFavorite = action?.payload;
    },
  },
});
export const {
  hiddenCategoriesResponse,
  hiddentCategoriesClear,
  favoritesResponse,
  favoritesClear,
  lockedChannelsResponse,
  lockedChannelsClear,
  setCategoryNodes,
  settingsResponse,
  settingsClear,
  saveSettingsClear,
  saveSettingsResponse,
  setCurrentList,
  setIsFavorite,
  setMedia,
} = OtherSlice.actions;
export default OtherSlice.reducer;
