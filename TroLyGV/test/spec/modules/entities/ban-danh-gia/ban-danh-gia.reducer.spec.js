import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/ban-danh-gia/ban-danh-gia.reducer'

test('attempt retrieving a single banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.banDanhGia).toBe(null)
})

test('attempt retrieving a list of banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.banDanhGias).toBe(null)
})

test('attempt updating a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.banDanhGia).toEqual({id: 1})
})

test('success retrieving a list of banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.banDanhGias).toEqual([{id: 1}, {id: 2}])
})

test('success updating a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.banDanhGia).toEqual({id: 1})
})
test('success searching a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.banDanhGias).toEqual({id: 1})
})
test('success deleting a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.banDanhGia).toEqual(null)
})

test('failure retrieving a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.banDanhGia).toEqual(null)
})

test('failure retrieving a list of banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.banDanhGias).toEqual(null)
})

test('failure updating a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.banDanhGia).toEqual(INITIAL_STATE.banDanhGia)
})
test('failure searching a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.banDanhGias).toEqual(null)
})
test('failure deleting a banDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.banDanhGiaDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.banDanhGia).toEqual(INITIAL_STATE.banDanhGia)
})
