import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/cau-tra-loi/cau-tra-loi.reducer'

test('attempt retrieving a single cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.cauTraLoi).toBe(null)
})

test('attempt retrieving a list of cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.cauTraLois).toBe(null)
})

test('attempt updating a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.cauTraLoi).toEqual({id: 1})
})

test('success retrieving a list of cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.cauTraLois).toEqual([{id: 1}, {id: 2}])
})

test('success updating a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.cauTraLoi).toEqual({id: 1})
})
test('success searching a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.cauTraLois).toEqual({id: 1})
})
test('success deleting a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.cauTraLoi).toEqual(null)
})

test('failure retrieving a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.cauTraLoi).toEqual(null)
})

test('failure retrieving a list of cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.cauTraLois).toEqual(null)
})

test('failure updating a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.cauTraLoi).toEqual(INITIAL_STATE.cauTraLoi)
})
test('failure searching a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.cauTraLois).toEqual(null)
})
test('failure deleting a cauTraLoi', () => {
  const state = reducer(INITIAL_STATE, Actions.cauTraLoiDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.cauTraLoi).toEqual(INITIAL_STATE.cauTraLoi)
})
