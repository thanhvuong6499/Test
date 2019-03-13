import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/the-loai-tai-lieu/the-loai-tai-lieu.reducer'

test('attempt retrieving a single theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.theLoaiTaiLieu).toBe(null)
})

test('attempt retrieving a list of theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.theLoaiTaiLieus).toBe(null)
})

test('attempt updating a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.theLoaiTaiLieu).toEqual({id: 1})
})

test('success retrieving a list of theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.theLoaiTaiLieus).toEqual([{id: 1}, {id: 2}])
})

test('success updating a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.theLoaiTaiLieu).toEqual({id: 1})
})
test('success searching a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.theLoaiTaiLieus).toEqual({id: 1})
})
test('success deleting a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.theLoaiTaiLieu).toEqual(null)
})

test('failure retrieving a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.theLoaiTaiLieu).toEqual(null)
})

test('failure retrieving a list of theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.theLoaiTaiLieus).toEqual(null)
})

test('failure updating a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.theLoaiTaiLieu).toEqual(INITIAL_STATE.theLoaiTaiLieu)
})
test('failure searching a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.theLoaiTaiLieus).toEqual(null)
})
test('failure deleting a theLoaiTaiLieu', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiTaiLieuDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.theLoaiTaiLieu).toEqual(INITIAL_STATE.theLoaiTaiLieu)
})
