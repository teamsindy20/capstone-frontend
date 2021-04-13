/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
}

export type Mutation = {
  __typename?: 'Mutation'
  /** 이메일과 1번 해싱한 비밀번호를 전송하면 인증 토큰을 반환한다. */
  login?: Maybe<Scalars['String']>
  /** HTTP Header나 쿠키에 인증 토큰 정보를 넣어서 요청하면 로그아웃 성공 여부를 반환한다. */
  logout: Scalars['Boolean']
  createUserTable: Scalars['Boolean']
}

export type MutationLoginArgs = {
  email: Scalars['String']
  passwordHash: Scalars['String']
}

export type Artist = {
  __typename?: 'Artist'
  id: Scalars['ID']
  name: Scalars['String']
}

export enum CrawlingSource {
  Youtube = 'YOUTUBE',
  Melon = 'MELON',
  Icezam = 'ICEZAM',
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  writingDate: Scalars['String']
  content: Scalars['String']
  userName: Scalars['String']
  source: CrawlingSource
  likeCount?: Maybe<Scalars['Int']>
}

export type Music = {
  __typename?: 'Music'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  title: Scalars['String']
  artists: Array<Scalars['String']>
  searchCount: Scalars['Int']
  albumImage?: Maybe<Scalars['String']>
  albumColor?: Maybe<Scalars['String']>
  artistImage?: Maybe<Scalars['String']>
  genres?: Maybe<Array<Scalars['String']>>
  lyrics?: Maybe<Array<Scalars['String']>>
  melonLink?: Maybe<Scalars['String']>
  shazamId?: Maybe<Scalars['Int']>
  youtubeLink?: Maybe<Scalars['String']>
  youtubeImage?: Maybe<Scalars['String']>
  /** 이 노래를 부른 가수의 다른 노래를 검색 횟수 순으로 반환한다. # 페이지네이션 필요 */
  artistOtherMusics?: Maybe<Array<Music>>
  /** 이 노래에 해당하는 댓글 목록을 반환한다. # 페이지네이션 필요 */
  comments?: Maybe<Array<Comment>>
  /** 이 노래가 포함된 재생 목록을 반환한다. # 페이지네이션 필요 */
  includedPlaylists?: Maybe<Array<Playlist>>
  /** 이 노래와 비슷한 노래 목록을 반환한다. # 페이지네이션 필요 */
  similarMusics?: Maybe<Array<Music>>
}

export type Playlist = {
  __typename?: 'Playlist'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  name: Scalars['String']
  musics?: Maybe<Array<Music>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  email: Scalars['String']
  token: Scalars['String']
  name: Scalars['String']
  age: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  /** 사용자 목록을 반환한다. (관리자 전용) */
  users?: Maybe<Array<User>>
  /** 내 정보를 반환한다. 해당 권한이 없으면 오류가 발생한다. */
  me?: Maybe<User>
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']
  passwordHash: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'login'>

export type UsersQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type UsersQuery = { __typename?: 'Query' } & {
  users?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id'>>>
}

export const LoginDocument = gql`
  mutation Login($email: String!, $passwordHash: String!) {
    login(email: $email, passwordHash: $passwordHash)
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      passwordHash: // value for 'passwordHash'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const UsersDocument = gql`
  query Users($id: ID!) {
    users {
      id
    }
  }
`

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions)
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions)
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>
