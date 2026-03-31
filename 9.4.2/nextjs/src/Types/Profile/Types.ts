export interface IUserProfile {
  id: number
  name: string
  surname: string
  userName: string
  emailAddress: string
}

export interface ITeamMember {
  id: number
  name: string
  surname: string
  userName: string
  emailAddress: string
  joinedAt: string
}

export interface IProfile {
  user: IUserProfile
  teamName: string
  teamMembers: ITeamMember[]
}
