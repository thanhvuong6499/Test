import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/giao-vien/giao-vien.reducer'

test('attempt retrieving a single giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.giaoVien).toBe(null)
})

test('attempt retrieving a list of giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.giaoViens).toBe(null)
})

test('attempt updating a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.giaoVien).toEqual({id: 1})
})

test('success retrieving a list of giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.giaoViens).toEqual([{id: 1}, {id: 2}])
})

test('success updating a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.giaoVien).toEqual({id: 1})
})
test('success searching a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.giaoViens).toEqual({id: 1})
})
test('success deleting a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.giaoVien).toEqual(null)
})

test('failure retrieving a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.giaoVien).toEqual(null)
})

test('failure retrieving a list of giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.giaoViens).toEqual(null)
})

test('failure updating a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.giaoVien).toEqual(INITIAL_STATE.giaoVien)
})
test('failure searching a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.giaoViens).toEqual(null)
})
test('failure deleting a giaoVien', () => {
  const state = reducer(INITIAL_STATE, Actions.giaoVienDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.giaoVien).toEqual(INITIAL_STATE.giaoVien)
})
