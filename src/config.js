export default {
  api: {
    host: {
      dev: 'https://ethlim.com',
      prod: 'https://ethlim.com'
    },
    endpoints: {
      auth: {
        login: '/api/api-token-auth/'
      },
      analytics: {
        table: '/api/table/:type',
        values: '/api/projects/:id/:type',
        sources: '/api/campaigns/:id/sources',
        history: '/api/phrases/:id/bids_history',
        updateAd: '/api/notice/:id/change_state',
        excludeSource: '/api/campaigns/:id/exclude_source',
        includeSource: '/api/campaigns/:id/include_source',
        changeBidSingle: '/api/phrases/:id/change_bid',
        changeBidMultiple: '/api/phrases/change_multi_bids'
      },
      navigation: {
        trafficSources: '/api/traffic_sources',
        platforms: '/api/platforms',
        projects: '/api/projects'
      },
      timeline: {
        list: '/api/logs'
      }
    }
  }
}