import { Team } from 'mockApi/models/mirageTypes'
import { getUserTeamId } from 'utils/getUserTeamId'

describe('EventsList', () => {
  const teams: Team[] = [
    {
      id: '4',
      name: 'SmartSoft',
      users: [
        {
          id: '32',
          firstName: 'Ben',
          lastName: 'Ten',
          email: '',
          confirmed: true,
          occupation: '',
          teams: [],
          userColor: '#000000',
          language: 'pl',
          photo: null,
          role: '',
          availablePto: 20,
          requests: [],
          isOnHoliday: false,
        },
      ],
    },
  ]

  it('should return team Id when correct team user is provided', () => {
    const teamId = getUserTeamId('Ben Ten', teams)
    expect(teamId).toBe(4)
  })
})
