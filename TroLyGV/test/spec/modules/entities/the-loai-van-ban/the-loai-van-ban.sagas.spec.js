import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTheLoaiVanBan, getTheLoaiVanBans, updateTheLoaiVanBan, deleteTheLoaiVanBan, searchTheLoaiVanBans } from '../../../../../app/modules/entities/the-loai-van-ban/the-loai-van-ban.sagas'
import TheLoaiVanBanActions from '../../../../../app/modules/entities/the-loai-van-ban/the-loai-van-ban.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTheLoaiVanBan(1)
  const step = stepper(getTheLoaiVanBan(FixtureAPI, { theLoaiVanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTheLoaiVanBan(FixtureAPI, { theLoaiVanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTheLoaiVanBans()
  const step = stepper(getTheLoaiVanBans(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTheLoaiVanBans(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTheLoaiVanBan({id: 1})
  const step = stepper(updateTheLoaiVanBan(FixtureAPI, { theLoaiVanBan: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTheLoaiVanBan(FixtureAPI, { theLoaiVanBan: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchTheLoaiVanBans()
  const step = stepper(searchTheLoaiVanBans(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchTheLoaiVanBans(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteTheLoaiVanBan({id: 1})
  const step = stepper(deleteTheLoaiVanBan(FixtureAPI, { theLoaiVanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTheLoaiVanBan(FixtureAPI, { theLoaiVanBanId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TheLoaiVanBanActions.theLoaiVanBanDeleteFailure()))
})
