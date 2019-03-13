import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia.reducer'

test('attempt retrieving a single tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.tieuChiDanhGia).toBe(null)
})

test('attempt retrieving a list of tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.tieuChiDanhGias).toBe(null)
})

test('attempt updating a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.tieuChiDanhGia).toEqual({id: 1})
})

test('success retrieving a list of tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.tieuChiDanhGias).toEqual([{id: 1}, {id: 2}])
})

test('success updating a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.tieuChiDanhGia).toEqual({id: 1})
})
test('success searching a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.tieuChiDanhGias).toEqual({id: 1})
})
test('success deleting a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.tieuChiDanhGia).toEqual(null)
})

test('failure retrieving a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.tieuChiDanhGia).toEqual(null)
})

test('failure retrieving a list of tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.tieuChiDanhGias).toEqual(null)
})

test('failure updating a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.tieuChiDanhGia).toEqual(INITIAL_STATE.tieuChiDanhGia)
})
test('failure searching a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.tieuChiDanhGias).toEqual(null)
})
test('failure deleting a tieuChiDanhGia', () => {
  const state = reducer(INITIAL_STATE, Actions.tieuChiDanhGiaDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.tieuChiDanhGia).toEqual(INITIAL_STATE.tieuChiDanhGia)
})
