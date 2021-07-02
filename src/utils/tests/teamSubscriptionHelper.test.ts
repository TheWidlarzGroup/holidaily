import {
  parseTeams,
  filterNotSubmittedTeams,
  checkTeamsAvailableToSubscribe,
  filterSearchedItems,
} from 'screens/editProfile/helpers/teamSubscriptionHelper'

test('parse incoming teams to have additional isSelected prop', () => {
  const tested = [{ teamName: 'Akademia', id: 0 }]
  const expected = [{ teamName: 'Akademia', id: 0, isSelected: false }]
  expect(parseTeams(tested)).toEqual(expected)
})

test('returns array of teams that are not submitted by user', () => {
  const testedTeams = [
    { teamName: 'Akademia', id: 0 },
    { teamName: 'Devs', id: 1 },
  ]
  const filterTeams = [{ teamName: 'Akademia', id: 0, isSelected: false }]
  const expected = [{ teamName: 'Devs', id: 1, isSelected: false }]
  expect(filterNotSubmittedTeams(testedTeams, filterTeams)).toEqual(expected)
})

test('returns array of teams that are available to subscribe', () => {
  const testedTeams = [
    { teamName: 'Akademia', id: 0, isSelected: false },
    { teamName: 'Devs', id: 1, isSelected: false },
  ]
  const filterTeams = [{ teamName: 'Akademia', id: 0, isSelected: false }]
  const expected = [{ teamName: 'Devs', id: 1, isSelected: false }]
  expect(checkTeamsAvailableToSubscribe(testedTeams, filterTeams)).toEqual(expected)
})

test('returns array of teams which name includes given search phrase', () => {
  const testedTeams = [
    { teamName: 'Akademia', id: 0, isSelected: false },
    { teamName: 'Devs', id: 1, isSelected: false },
  ]
  const searchPhrase = 'dev'
  const expected = [{ teamName: 'Devs', id: 1, isSelected: false }]
  expect(filterSearchedItems(testedTeams, searchPhrase)).toEqual(expected)
})
