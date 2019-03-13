import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/co-quan-ban-hanh/co-quan-ban-hanh.reducer'

test('attempt retrieving a single coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.coQuanBanHanh).toBe(null)
})

test('attempt retrieving a list of coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.coQuanBanHanhs).toBe(null)
})

test('attempt updating a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.coQuanBanHanh).toEqual({id: 1})
})

test('success retrieving a list of coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.coQuanBanHanhs).toEqual([{id: 1}, {id: 2}])
})

test('success updating a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.coQuanBanHanh).toEqual({id: 1})
})
test('success searching a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.coQuanBanHanhs).toEqual({id: 1})
})
test('success deleting a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.coQuanBanHanh).toEqual(null)
})

test('failure retrieving a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.coQuanBanHanh).toEqual(null)
})

test('failure retrieving a list of coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.coQuanBanHanhs).toEqual(null)
})

test('failure updating a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.coQuanBanHanh).toEqual(INITIAL_STATE.coQuanBanHanh)
})
test('failure searching a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.coQuanBanHanhs).toEqual(null)
})
test('failure deleting a coQuanBanHanh', () => {
  const state = reducer(INITIAL_STATE, Actions.coQuanBanHanhDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.coQuanBanHanh).toEqual(INITIAL_STATE.coQuanBanHanh)
})
