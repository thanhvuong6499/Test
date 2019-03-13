import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/the-loai-van-ban/the-loai-van-ban.reducer'

test('attempt retrieving a single theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.theLoaiVanBan).toBe(null)
})

test('attempt retrieving a list of theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.theLoaiVanBans).toBe(null)
})

test('attempt updating a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.theLoaiVanBan).toEqual({id: 1})
})

test('success retrieving a list of theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.theLoaiVanBans).toEqual([{id: 1}, {id: 2}])
})

test('success updating a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.theLoaiVanBan).toEqual({id: 1})
})
test('success searching a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.theLoaiVanBans).toEqual({id: 1})
})
test('success deleting a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.theLoaiVanBan).toEqual(null)
})

test('failure retrieving a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.theLoaiVanBan).toEqual(null)
})

test('failure retrieving a list of theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.theLoaiVanBans).toEqual(null)
})

test('failure updating a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.theLoaiVanBan).toEqual(INITIAL_STATE.theLoaiVanBan)
})
test('failure searching a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.theLoaiVanBans).toEqual(null)
})
test('failure deleting a theLoaiVanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.theLoaiVanBanDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.theLoaiVanBan).toEqual(INITIAL_STATE.theLoaiVanBan)
})
