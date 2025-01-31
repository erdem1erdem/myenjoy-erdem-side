import {
     getLiveTvCategoriesChannels,
     liveTvChannelsClear,


     getLiveTvCategories,
     liveTvCategoriesClear,
     getCategoriesM3u, 
     getChannelURL, 
     getFilteredChannel
     
} from './action/Livetv'
import { 
     getSeriesCategoriesSeries,
     seriesCategoriesClear,
     seriesClear,
     getSeriesDetails, 
     seriesDetailClear,
     getSeriesURL, 
     seriesUrlClear,
     getSeriesURLErrorClear,
     getSeriesMediasState,
     seriesMediasStateResponse,
     seriesMediasStateClear,
     seriesMediasStateByCategoryResponse,
     getFilteredSeries
} from './action/Series'
import {
     getPortals, 
     resetDevice,
     pingServer,
     savePortalId, 
     setMacAddress,
     setCurrentMedia
} from './action/Portals'
import {
     getMovieCategoriesMovies,
     movieCategoriesClear,
     moviesClear,

     getMovieDetail, 
     movieDetailClear,
     getMovieState, 
     getMovieURL, 
     movieUrlClear,
  
     setMovieResume,
     getMovieMediasState,
     movieMediasStateResponse,
     movieMediasStateClear,
     movieMediasStateByCategoryResponse,
     getFilteredData
} from './action/Movies'
import {
     getHiddenCategories,
     hiddenCategoriesResponse,
     hiddentCategoriesClear,
     getFavorites,
     favoritesResponse,
     favoritesClear,
     getLockedChannels,
     lockedChannelsClear,
     setCategoryNodes,
     getSettings,
     saveSettings,
     setCurrentList,
     lockedChannelsResponse,
     setIsFavorite,
     setMedia
} from "./action/Other"
import { setCategory, setCategoryClear } from './action/Other/category'
import { setHasChannelList } from './action/Other/hasChannelList'
import { setCurrentChannel, clearCurrentChannel } from './action/Livetv/currentChannel'
import { getChannelsByCategory, channelsByCategoryClear } from './action/Livetv/channelsByCategory'
import { filteredChannelsResponse, filteredChannelsClear, getFilteredChannels } from './action/Livetv/filteredChannels'
import { setChannelUrl } from './action/Livetv/channelUrl'
import { channelIndexClear, setChannelIndex } from './action/Livetv/channelIndex'
import { getLiveTvMediasState, liveTvMediasStateResponse } from './action/Livetv/liveTvMediasState'
import { getMoviesByCategory, moviesByCategoryClear } from './action/Movies/moviesByCategory'
import { getSeriesByCategory, seriesByCategoryClear } from './action/Series/seriesByCategory'

// favoriteChannels list
import { getFavoriteChannels, clearFavoriteChannels} from './action/Livetv/favoriteChannels'
// lockedChannels list
import { getLockedChannelsList, clearLockedChannelsList  } from './action/Livetv/lockedChannels'
// recentlyWatchChannels list
import { getRecentlyWatchChannelsList, clearRecentlyWatchChannelsList } from './action/Livetv/recentlyWatchChannels'
// favoriteMovies list 
import {getFavoriteMovies, clearFavoriteMovies} from "./action/Movies/favoriteMovies"
// recentlyViewedMovies list
import { getRecentlyViewedMovies, clearRecentlyViewedMovies} from "./action/Movies/recentlyViewedMovies"
//favoriteSeries list
import {getFavoriteSeries, clearFavoriteSeries} from "./action/Series/favoriteSeries"
//recentlyViewedSeries list
import {getRecentlyViewedSeries, clearRecentlyViewedSeries} from "./action/Series/recentlyViewedSeries"
export const actionsApi = {
     getLiveTvCategoriesChannels,
     liveTvChannelsClear,

     getLiveTvCategories,
     liveTvCategoriesClear,
     //portal
     getPortals,
     resetDevice,
     pingServer,
     savePortalId,
     setMacAddress,
     setCurrentMedia,
     //movies 
     getMovieCategoriesMovies,
     movieCategoriesClear,
     moviesClear,

     getMovieDetail,
     movieDetailClear,
     getMovieURL,
     movieUrlClear,
     setMovieResume,
     getMovieState,
     getMovieMediasState,
     movieMediasStateClear,
     movieMediasStateResponse,
     movieMediasStateByCategoryResponse,
     getFilteredData,
     //channels
     getChannelURL,
     getCategoriesM3u,
     getFilteredChannel,

     // Series
     getSeriesCategoriesSeries,
     seriesCategoriesClear,
     seriesClear,

     getSeriesDetails,
     seriesDetailClear,
     getSeriesURL,
     seriesUrlClear,

     getSeriesURLErrorClear,
     getSeriesMediasState,
     seriesMediasStateResponse,
     seriesMediasStateClear,
     seriesMediasStateByCategoryResponse,
     getFilteredSeries,
     //other
     getHiddenCategories,
     hiddenCategoriesResponse,
     hiddentCategoriesClear,
     getFavorites,
     favoritesClear,
     favoritesResponse,
     getLockedChannels,
     lockedChannelsClear,
     setCategoryNodes,
     getSettings,
     saveSettings,
     setCurrentList,
     lockedChannelsResponse,
     setIsFavorite,
     setMedia,
     //small states
     setCategory,
     setCategoryClear,
     setHasChannelList,
     setCurrentChannel, 
     clearCurrentChannel,
     getChannelsByCategory,
     channelsByCategoryClear,
     setChannelUrl,
     setChannelIndex,
     channelIndexClear,
     getLiveTvMediasState,
     liveTvMediasStateResponse,
     getMoviesByCategory, 
     moviesByCategoryClear,
     getSeriesByCategory, 
     seriesByCategoryClear,
     getFilteredChannels, 
     filteredChannelsClear,
     // favoriteChannels list
     getFavoriteChannels,
     clearFavoriteChannels,
     //lockedChannelsList
     getLockedChannelsList,
     clearLockedChannelsList,
     // recentlyWatchChannels list
     getRecentlyWatchChannelsList,
     clearRecentlyWatchChannelsList,
     //favoriteMovies list
     getFavoriteMovies, 
     clearFavoriteMovies,
     //recentlyViewedMovies list
     getRecentlyViewedMovies, 
     clearRecentlyViewedMovies,
     //favoriteSeries list 
     getFavoriteSeries, 
     clearFavoriteSeries,
     //recentlyViewedSeries list
     getRecentlyViewedSeries, 
     clearRecentlyViewedSeries
}
