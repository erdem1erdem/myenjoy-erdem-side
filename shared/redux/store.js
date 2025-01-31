import { configureStore } from "@reduxjs/toolkit";
import { liveTv, series, portals, movies, other, category, hasChannelList, currentChannel, 
	channelsByCategory,filteredchannels, channelUrl, channelIndex, liveTvMediasState,
	moviesByCategory, seriesByCategory, favoriteChannels, lockedChannels, recentlyWatchChannels,
	favoriteMovies, recentlyViewedMovies,
	favoriteSeries, recentlyViewedSeries} from './action'
const store = configureStore({
	reducer: {
		liveTv,
		series,
		portals,
		movies,
		other, 
		category,
		hasChannelList,
		currentChannel,
		channelsByCategory,
		channelUrl,
		channelIndex,
		liveTvMediasState,
		moviesByCategory,
		seriesByCategory,
		filteredchannels,
		favoriteChannels,
		lockedChannels,
		recentlyWatchChannels,
		favoriteMovies,
		recentlyViewedMovies,
		favoriteSeries,
		recentlyViewedSeries
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store