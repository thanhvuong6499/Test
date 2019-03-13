import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/tai-lieu/tai-lieu.reducer'

test('attempt retrieving a single taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.taiLieu).toBe(null)
})

test('attempt retrieving a list of taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.taiLieus).toBe(null)
})

test('attempt updating a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.taiLieu).toEqual({id: 1})
})

test('success retrieving a list of taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.taiLieus).toEqual([{id: 1}, {id: 2}])
})

test('success updating a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.taiLieu).toEqual({id: 1})
})
test('success searching a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.taiLieus).toEqual({id: 1})
})
test('success deleting a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.taiLieu).toEqual(null)
})

test('failure retrieving a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.taiLieu).toEqual(null)
})

test('failure retrieving a list of taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.taiLieus).toEqual(null)
})

test('failure updating a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.taiLieu).toEqual(INITIAL_STATE.taiLieu)
})
test('failure searching a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.taiLieus).toEqual(null)
})
test('failure deleting a taiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.taiLieuDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.taiLieu).toEqual(INITIAL_STATE.taiLieu)
})
