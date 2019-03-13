import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/the-loai-tieu-chi/the-loai-tieu-chi.reducer'

test('attempt retrieving a single theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.theLoaiTieuChi).toBe(null)
})

test('attempt retrieving a list of theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.theLoaiTieuChis).toBe(null)
})

test('attempt updating a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.theLoaiTieuChi).toEqual({id: 1})
})

test('success retrieving a list of theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.theLoaiTieuChis).toEqual([{id: 1}, {id: 2}])
})

test('success updating a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.theLoaiTieuChi).toEqual({id: 1})
})
test('success searching a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.theLoaiTieuChis).toEqual({id: 1})
})
test('success deleting a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.theLoaiTieuChi).toEqual(null)
})

test('failure retrieving a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.theLoaiTieuChi).toEqual(null)
})

test('failure retrieving a list of theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.theLoaiTieuChis).toEqual(null)
})

test('failure updating a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.theLoaiTieuChi).toEqual(INITIAL_STATE.theLoaiTieuChi)
})
test('failure searching a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.theLoaiTieuChis).toEqual(null)
})
test('failure deleting a theLoaiTieuChi', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTieuChiDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.theLoaiTieuChi).toEqual(INITIAL_STATE.theLoaiTieuChi)
})
