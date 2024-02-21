import * as columns from 'services/columns/selectors'
import * as params from 'services/params/selectors'
import * as auth from 'services/auth/selectors'
import * as timeline from 'services/timeline/selectors'
import * as navigation from 'services/navigation/selectors'
import * as analytics from 'services/analytics/selectors'

// Columns selectors
export const getActiveColumns = (state) => columns.getActiveColumns(state.columns)
export const isAdjustmentColumns = (state) => columns.isAdjustmentColumns(state.columns)

// Params selectors
export const getAllParams = (state) => params.getAllParams(state.params)
export const getAdjustmentParams = (state) => params.getAdjustmentParams(state.params)

// Auth selectors
export const getAuthToken = (state) => auth.getAuthToken(state.auth)
export const getAuthStatus = (state) => auth.getAuthStatus(state.auth)

// Timeline selectors
export const getTimelineItems = (state) => timeline.getItems(state.timeline)
export const getTimelinePage = (state) => timeline.getCurrentPage(state.timeline)
export const getTimelineTotal = (state) => timeline.getTotalPages(state.timeline)
export const timelineHasMore = (state) => timeline.hasMore(state.timeline)
export const timelineHasError = (state) => timeline.hasError(state.timeline)
export const timelineIsPending = (state) => timeline.isPending(state.timeline)
export const getTimelineFilter = (state, name) => timeline.getFilterValue(state.timeline, name)

// Navigation selectors
export const getNavPosition = (state) => navigation.getNavPosition(state.navigation)
export const getTrafficSources = (state) => navigation.getTrafficSources(state.navigation)
export const getPlatforms = (state) => navigation.getPlatforms(state.navigation)
export const getProjects = (state) => navigation.getProjects(state.navigation)
export const getSelectedTrafficSource = (state) => navigation.getSelectedTrafficSource(state.navigation)
export const getSelectedPlatform = (state) => navigation.getSelectedPlatform(state.navigation)
export const getSelectedProject = (state) => navigation.getSelectedProject(state.navigation)
export const getProjectStatus = (state) => navigation.getProjectStatus(state.navigation)

// Analytics selectors
export const getTableRows = (state) => analytics.getTableRows(state.analytics)
export const getRowData = (state, id) => analytics.getRowData(state.analytics, id)
export const getCurrentTableStatus = (state) => analytics.getCurrentTableStatus(state.analytics)
export const getAnalyticsFilter = (state, filter) => analytics.getFilterValue(state.analytics, filter)
export const getTabsList = (state) => analytics.getTabsList(state.analytics)
export const getCurrentTab = (state) => analytics.getCurrentTab(state.analytics)
export const getTableStatus = (state, table) => analytics.getTableStatus(state.analytics, table)
export const getSelectedCampaigns = (state) => analytics.getSelectedCampaigns(state.analytics)
export const getSelectedRegions = (state) => analytics.getSelectedRegions(state.analytics)
export const getSelectedPhrases = (state) => analytics.getSelectedPhrases(state.analytics)
export const getSelectedGroups = (state) => analytics.getSelectedGroups(state.analytics)
export const getSelectedAds = (state) => analytics.getSelectedAds(state.analytics)
export const getSelectedCampaignsIds = (state) => analytics.getSelectedCampaignsIds(state.analytics)
export const getSelectedRegionsIds = (state) => analytics.getSelectedRegionsIds(state.analytics)
export const getSelectedPhrasesIds = (state) => analytics.getSelectedPhrasesIds(state.analytics)
export const getSelectedGroupsIds = (state) => analytics.getSelectedGroupsIds(state.analytics)
export const getSelectedAdsIds = (state) => analytics.getSelectedAdsIds(state.analytics)
export const getTableSorting = (state) => analytics.getTableSorting(state.analytics)
export const getMultiFilters = (state) => analytics.getMultiFilters(state.analytics)
export const getFiltersList = (state) => analytics.getFiltersList(state.analytics)
export const getFiltersQuery = (state) => analytics.getFiltersQuery(state.analytics)
export const getNextPage = (state, table) => analytics.getNextPage(state.analytics, table)
export const canLoadRows = (state) => analytics.canLoadRows(state.analytics)
export const getAnalyticsPopups = (state) => analytics.getAnalyticsPopups(state.analytics)
export const getPopupData = (state, popup) => analytics.getPopupData(state.analytics, popup)
export const getSearchPhrase = (state) => analytics.getSearchPhrase(state.analytics)
export const getSearchType = (state) => analytics.getSearchType(state.analytics)
export const getSearchQuery = (state, table) => analytics.getSearchQuery(state.analytics, table)
export const getCurrentError = (state) => analytics.getCurrentError(state.analytics)
export const getSourcesItem = (state, id) => analytics.getSourcesItem(state.analytics, id)
