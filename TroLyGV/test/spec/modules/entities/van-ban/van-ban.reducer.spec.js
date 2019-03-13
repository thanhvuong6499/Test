import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/van-ban/van-ban.reducer'

test('attempt retrieving a single vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.vanBan).toBe(null)
})

test('attempt retrieving a list of vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.vanBans).toBe(null)
})

test('attempt updating a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.vanBan).toEqual({id: 1})
})

test('success retrieving a list of vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.vanBans).toEqual([{id: 1}, {id: 2}])
})

test('success updating a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.vanBan).toEqual({id: 1})
})
test('success searching a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.vanBans).toEqual({id: 1})
})
test('success deleting a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.vanBan).toEqual(null)
})

test('failure retrieving a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.vanBan).toEqual(null)
})

test('failure retrieving a list of vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.vanBans).toEqual(null)
})

test('failure updating a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.vanBan).toEqual(INITIAL_STATE.vanBan)
})
test('failure searching a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.vanBans).toEqual(null)
})
test('failure deleting a vanBan', () => {
  const state = reducer(INITIAL_STATE, Actions.vanBanDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.vanBan).toEqual(INITIAL_STATE.vanBan)
})
