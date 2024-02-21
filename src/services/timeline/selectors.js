export function getItems(state) {
  return state.items
}

export function getCurrentPage(state) {
  return state.page
}

export function getTotalPages(state) {
  return state.total
}

export function getFilterValue(state, name) {
  return state.filters[name]
}

export const hasMore = (state) => state.page < state.total
export const isPending = (state) => state.isPending
export const hasError = (state) => state.hasError
