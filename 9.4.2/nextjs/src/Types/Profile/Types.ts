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
  isAdmin: boolean
}

export interface IProfile {
  user: IUserProfile
  teamName: string
  teamMembers: ITeamMember[]
  currentUserIsAdmin: boolean
}
