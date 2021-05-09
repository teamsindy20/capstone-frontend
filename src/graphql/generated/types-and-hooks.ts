/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any
}

export type Menu = {
  __typename?: 'Menu'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  price: Scalars['Int']
  deliciousReviewCount: Scalars['Int']
  deliciousReviewRatio: Scalars['Int']
  fineReviewCount: Scalars['Int']
  fineReviewRatio: Scalars['Int']
  positiveReviewCount: Scalars['Int']
  positiveReviewRatio: Scalars['Int']
  badReviewCount: Scalars['Int']
  badReviewRatio: Scalars['Int']
  totalReviewCount: Scalars['Int']
  newOrderCount: Scalars['Int']
  newOrderRatio: Scalars['Int']
  reorderCount: Scalars['Int']
  reorderRatio: Scalars['Int']
  totalOrderCount: Scalars['Int']
  newCustomerCount: Scalars['Int']
  newCustomerRatio: Scalars['Int']
  regularCustomerCount: Scalars['Int']
  regularCustomerRatio: Scalars['Int']
  totalCustomerCount: Scalars['Int']
  favoriteCount: Scalars['Int']
  clickCount: Scalars['Int']
  storePostCount: Scalars['Int']
  isDiscounted: Scalars['Boolean']
  canBePicked: Scalars['Boolean']
  canBeReserved: Scalars['Boolean']
  categoryId: Scalars['ID']
  storeId: Scalars['ID']
  /** nullable */
  imageUrls?: Maybe<Array<Scalars['URL']>>
  themeId?: Maybe<Scalars['ID']>
  /** 해당 메뉴의 카테고리를 반환한다. */
  category: Scalars['String']
  /** 로그인 상태일 때 요청하면 사용자가 해당 메뉴를 찜한 여부를 반환한다. */
  favorite: Scalars['Boolean']
  /** 해당 메뉴가 속한 매장 정보를 반환한다. */
  store: Store
  /** 해당 메뉴가 가진 해시태그 목록을 반환한다. */
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
  /** 해당 메뉴가 속한 테마를 반환한다. */
  theme?: Maybe<Scalars['String']>
}

export type MenuCreationInput = {
  storeId: Scalars['ID']
  name: Scalars['String']
  price: Scalars['Int']
  category: Scalars['String']
  /** nullable */
  imageUrls?: Maybe<Array<Scalars['URL']>>
  hashtags?: Maybe<Array<Scalars['String']>>
  options?: Maybe<Array<MenuOptionInput>>
}

export type MenuModificationInput = {
  storeId: Scalars['ID']
  name?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Int']>
  category?: Maybe<Scalars['String']>
  /**
   * 기존 이미지 주소 목록을 입력한 목록으로 대체한다.
   * 기존 목록을 유지하고 싶으면 기존 목록도 입력값에 포함시켜야 한다.
   */
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /**
   * 기존 해시태그 목록을 입력한 목록으로 대체한다.
   * 기존 목록을 유지하고 싶으면 기존 목록도 입력값에 포함시켜야 한다.
   */
  hashtags?: Maybe<Array<Scalars['String']>>
  /**
   * 기존 메뉴 옵션 목록을 입력한 목록으로 대체한다.
   * 기존 목록을 유지하고 싶으면 기존 목록도 입력값에 포함시켜야 한다.
   */
  options?: Maybe<Array<MenuOptionInput>>
}

export type MenuOptionInput = {
  name: Scalars['String']
  price: Scalars['Int']
  isNecessary: Scalars['Boolean']
  category?: Maybe<Scalars['String']>
}

export type MenuOptionSelectionInput = {
  menuOptionId: Scalars['ID']
  text?: Maybe<Scalars['String']>
}

export type MenuSelectionInput = {
  count: Scalars['Int']
  menuOptionIds?: Maybe<Array<MenuOptionSelectionInput>>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** 자신이 소유하고 있는 매장에 새로운 메뉴를 생성합니다. */
  createMenu: Scalars['ID']
  searchMenuCategory?: Maybe<Array<Scalars['String']>>
  modifyMenu: Scalars['ID']
  /**
   * 해당 메뉴를 찜하거나 이미 찜한 메뉴를 해제한다.
   *
   * `true`: 찜 성공, `false`: 찜 해제
   */
  pickMenu: Scalars['Boolean']
  createOrder: Scalars['ID']
  /** 주문 상태 변경에 대한 적절한 권한이 있으면 주문 상태를 업데이트한다. */
  updateOrderStatus: Scalars['ID']
  createPost: Scalars['ID']
  createReview: Scalars['ID']
  createStore: Scalars['ID']
  /**
   * 해당 매장을 찜하거나 이미 찜한 매장을 헤제한다.
   *
   * True: 찜 성공, False: 찜 해제
   */
  pickStore: Scalars['Boolean']
  /** 회원가입에 필요한 정보를 주면 성공했을 때 인증 토큰을 반환한다. */
  register: Scalars['JWT']
  /** 회원탈퇴 시 사용자 정보가 모두 초기화된다. */
  unregister: Scalars['Boolean']
  /** 이메일과 1번 해싱한 비밀번호를 전송하면 인증 토큰을 반환한다. */
  login: Scalars['JWT']
  /** 인증 토큰과 같이 요청하면 로그아웃 성공 여부를 반환한다. */
  logout: Scalars['Boolean']
  /** 사용자 배달 주소를 업데이트한다. */
  updateDeliveryAddress: Scalars['Boolean']
  updatePrimaryDeliveryAddress: Scalars['Boolean']
  /** 사용자의 메뉴 찜 목록을 업데이트한다. 해당 메뉴가 기존 찜 목록에 있으면 제거하고, 없으면 추가한다. */
  updateFavoriteMenus?: Maybe<Array<Scalars['ID']>>
  /** 사용자의 매장 찜 목록을 업데이트한다. 해당 매장이 기존 찜 목록에 있으면 제거하고, 없으면 추가한다. */
  updateFavoriteStores?: Maybe<Array<Scalars['ID']>>
}

export type MutationCreateMenuArgs = {
  input: MenuCreationInput
}

export type MutationSearchMenuCategoryArgs = {
  searchTerm: Scalars['String']
}

export type MutationModifyMenuArgs = {
  input: MenuModificationInput
}

export type MutationPickMenuArgs = {
  id: Scalars['ID']
}

export type MutationCreateOrderArgs = {
  input: OrderCreationInput
}

export type MutationUpdateOrderStatusArgs = {
  orderStatus: OrderStatus
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationCreateReviewArgs = {
  input: ReviewCreationInput
}

export type MutationCreateStoreArgs = {
  input: StoreCreationInput
}

export type MutationPickStoreArgs = {
  id: Scalars['ID']
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationLoginArgs = {
  email: Scalars['EmailAddress']
  passwordHash: Scalars['String']
}

export type MutationUpdateDeliveryAddressArgs = {
  input: Scalars['String']
}

export type MutationUpdatePrimaryDeliveryAddressArgs = {
  deliveryAddress: Scalars['String']
}

export type MutationUpdateFavoriteMenusArgs = {
  menuIds: Array<Scalars['ID']>
}

export type MutationUpdateFavoriteStoresArgs = {
  storeIds: Array<Scalars['ID']>
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  orderStatus: OrderStatus
  orderTotal: Scalars['Int']
  /** from other table */
  store: Store
  review?: Maybe<Review>
  menu?: Maybe<Array<Menu>>
}

export type OrderCreationInput = {
  menus: Array<MenuSelectionInput>
  payment: PaymentInput
  user: UserInfoInput
}

export enum OrderStatus {
  OrderWaiting = 'ORDER_WAITING',
  CookingInProgress = 'COOKING_IN_PROGRESS',
  DeliveryInProgress = 'DELIVERY_IN_PROGRESS',
  DeliveryCompletion = 'DELIVERY_COMPLETION',
}

/** 결제는 어디서 어떻게 이뤄질까? */
export type PaymentInput = {
  paymentId: Scalars['ID']
  paymentDate: Scalars['DateTime']
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  contents: Array<Scalars['String']>
  commentCount: Scalars['Int']
  likeCount: Scalars['Int']
  storeId: Scalars['ID']
  /** nullable */
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /** 해당 글을 작성한 매장 정보를 반환한다. */
  store: Store
  /** from other table - nullable */
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type PostCreationInput = {
  /** 글 내용 중에 줄 바꿈 1개 당 `\n`을 1개 사용한다. */
  content: Scalars['String']
  storeId: Scalars['ID']
  /** nullable */
  imageUrls?: Maybe<Array<Scalars['URL']>>
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type Query = {
  __typename?: 'Query'
  /** 로그인 시 사용자 맞춤 메뉴 목록을 반환한다. 비로그인 시 일반 메뉴 목록을 반환한다. */
  menus: Array<Menu>
  /** 특정 카테고리에 속하는 메뉴 목록을 반환한다. */
  menusByCategory: Array<Menu>
  /** 특정 테마에 속하는 메뉴 목록을 반환한다. */
  menusByTheme: Array<Menu>
  /** 특정 매장에서 판매하는 메뉴 목록을 반환한다. */
  menusByStore: Array<Menu>
  /** 특정 메뉴의 세부 정보를 반환한다. */
  menu?: Maybe<Menu>
  /** 메뉴 카테고리 목록을 반환한다. */
  menuCategories: Array<Scalars['String']>
  /** 메뉴 테마 목록을 반환한다. */
  menuThemes: Array<Scalars['String']>
  /** 사용자의 주문 목록을 반환한다. */
  orders?: Maybe<Array<Order>>
  /** 특정 주문에 대한 상세 정보를 반환한다. */
  order?: Maybe<Order>
  /** 특정 매장이 쓴 글을 반환한다. */
  postsByStore: Array<Post>
  /** 특정 주소 기반 여러 매장이 쓴 글을 반환한다. */
  postsByAddress: Array<Post>
  /** 특정 글 정보를 반환한다. */
  post?: Maybe<Post>
  /** 사용자가 작성한 리뷰 목록을 반환한다. */
  reviews?: Maybe<Array<Post>>
  /** 특정 매장의 리뷰 목록을 반환한다. */
  reviewsByStore?: Maybe<Array<Post>>
  /** 여러 메뉴의 리뷰 목록을 반환한다. */
  reviewsByMenu?: Maybe<Array<Post>>
  /** 특정 글 정보를 반환한다. */
  review?: Maybe<Post>
  /** 매장 목록을 반환한다. */
  stores?: Maybe<Array<Store>>
  /** 특정 매장을 반환한다. */
  store?: Maybe<Store>
  /** 인증 토큰과 같이 요청하면 사용자 정보를 반환한다. */
  me: User
}

export type QueryMenusByCategoryArgs = {
  category: Scalars['String']
}

export type QueryMenusByThemeArgs = {
  theme: Scalars['String']
}

export type QueryMenusByStoreArgs = {
  storeId: Scalars['ID']
}

export type QueryMenuArgs = {
  id: Scalars['ID']
}

export type QueryOrderArgs = {
  id: Scalars['ID']
}

export type QueryPostsByStoreArgs = {
  storeId: Scalars['ID']
}

export type QueryPostsByAddressArgs = {
  address: Scalars['String']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryReviewsByStoreArgs = {
  storeId: Scalars['ID']
}

export type QueryReviewsByMenuArgs = {
  menuIds: Array<Scalars['ID']>
}

export type QueryReviewArgs = {
  id: Scalars['ID']
}

export type QueryStoreArgs = {
  id: Scalars['ID']
}

export enum Rating {
  Delicious = 'DELICIOUS',
  Good = 'GOOD',
  Bad = 'BAD',
}

export type RegisterInput = {
  email: Scalars['EmailAddress']
  passwordHash: Scalars['String']
  /** nullable */
  name?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  gender?: Maybe<Scalars['String']>
  birthDate?: Maybe<Scalars['DateTime']>
  imageUrl?: Maybe<Scalars['URL']>
  deliveryAddress?: Maybe<Scalars['String']>
  preference?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type Review = {
  __typename?: 'Review'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  helpingOthersCount: Scalars['Int']
  rating: Rating
  goodPointContent?: Maybe<Scalars['String']>
  desiredPointContent?: Maybe<Scalars['String']>
}

export type ReviewCreationInput = {
  menuIds: Scalars['ID']
  rating: Rating
  orderId: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  goodPointContent?: Maybe<Scalars['String']>
  desiredPointContent?: Maybe<Scalars['String']>
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type Store = {
  __typename?: 'Store'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  name: Scalars['String']
  address: Scalars['String']
  businessRegistrationName: Scalars['String']
  businessRegistrationNumber: Scalars['String']
  businessRegistrationAddress: Scalars['String']
  businessRepresentativeName: Scalars['String']
  deliveryCharge: Scalars['Int']
  minimumDeliveryAmount: Scalars['Int']
  deliciousReviewCount: Scalars['Int']
  deliciousReviewRatio: Scalars['Int']
  fineReviewCount: Scalars['Int']
  fineReviewRatio: Scalars['Int']
  positiveReviewCount: Scalars['Int']
  positiveReviewRatio: Scalars['Int']
  badReviewCount: Scalars['Int']
  badReviewRatio: Scalars['Int']
  totalReviewCount: Scalars['Int']
  newOrderCount: Scalars['Int']
  newOrderRatio: Scalars['Int']
  reorderCount: Scalars['Int']
  reorderRatio: Scalars['Int']
  totalOrderCount: Scalars['Int']
  newCustomerCount: Scalars['Int']
  newCustomerRatio: Scalars['Int']
  regularCustomerCount: Scalars['Int']
  regularCustomerRatio: Scalars['Int']
  totalCustomerCount: Scalars['Int']
  favoriteCount: Scalars['Int']
  clickCount: Scalars['Int']
  postCount: Scalars['Int']
  userId: Scalars['ID']
  /** nullable */
  reviewEventContent?: Maybe<Scalars['String']>
  regularCustomerEventContent?: Maybe<Scalars['String']>
  minimumDeliveryTime?: Maybe<Scalars['Int']>
  maximumDeliveryTime?: Maybe<Scalars['Int']>
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /** 해당 매장에서 판매 중인 메뉴 목록을 반환한다. */
  menus: Array<Menu>
  /** 해당 매장을 소유한 사용자 정보를 반환한다. */
  user: User
  /** from other table - nullable */
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
  posts?: Maybe<Array<Post>>
}

export type StoreCreationInput = {
  name: Scalars['String']
  address: Scalars['String']
  /** nullable */
  reviewEventContent?: Maybe<Scalars['String']>
  regularCustomerEventContent?: Maybe<Scalars['String']>
  deliveryTimeMin?: Maybe<Scalars['Int']>
  deliveryTimeMax?: Maybe<Scalars['Int']>
  imageUrls?: Maybe<Array<Scalars['String']>>
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  modificationDate: Scalars['DateTime']
  email: Scalars['EmailAddress']
  point: Scalars['Int']
  /** nullable */
  name?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  gender?: Maybe<Scalars['String']>
  birthDate?: Maybe<Scalars['DateTime']>
  imageUrls?: Maybe<Array<Scalars['URL']>>
  deliveryAddresses?: Maybe<Scalars['String']>
  representativeDeliveryAddress?: Maybe<Scalars['String']>
  /** from other table - nullable */
  favoriteMenus?: Maybe<Array<Menu>>
  favoriteStores?: Maybe<Array<Store>>
  orders?: Maybe<Array<Order>>
  preference?: Maybe<Array<Scalars['NonEmptyString']>>
  regularStores?: Maybe<Array<Store>>
}

export type UserInfoInput = {
  deliveryAddress: Scalars['String']
  reviewReward?: Maybe<Scalars['String']>
  regularReward?: Maybe<Scalars['String']>
  deliveryRequest?: Maybe<Scalars['String']>
  storeRequest?: Maybe<Scalars['String']>
  point?: Maybe<Scalars['Int']>
  coupon?: Maybe<Scalars['ID']>
}

export type MenuCardFragment = { __typename?: 'Menu' } & Pick<
  Menu,
  'id' | 'name' | 'price' | 'imageUrls' | 'favorite' | 'hashtags'
> & {
    store: { __typename?: 'Store' } & Pick<
      Store,
      'id' | 'name' | 'deliveryCharge' | 'minimumDeliveryTime' | 'maximumDeliveryTime'
    >
  }

export type PostCardFragment = { __typename?: 'Post' } & Pick<
  Post,
  | 'id'
  | 'creationDate'
  | 'modificationDate'
  | 'contents'
  | 'commentCount'
  | 'likeCount'
  | 'imageUrls'
>

export type StoreCardFragment = { __typename?: 'Store' } & Pick<Store, 'id' | 'name'>

export type LoginMutationVariables = Exact<{
  email: Scalars['EmailAddress']
  passwordHash: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'login'>

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'register'>

export type FavoriteMenusQueryVariables = Exact<{ [key: string]: never }>

export type FavoriteMenusQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & {
    favoriteMenus?: Maybe<Array<{ __typename?: 'Menu' } & MenuCardFragment>>
  }
}

export type FavoriteStoresQueryVariables = Exact<{ [key: string]: never }>

export type FavoriteStoresQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & {
    favoriteStores?: Maybe<
      Array<
        { __typename?: 'Store' } & Pick<
          Store,
          'id' | 'name' | 'minimumDeliveryTime' | 'maximumDeliveryTime' | 'minimumDeliveryAmount'
        >
      >
    >
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
}

export type MenusQueryVariables = Exact<{ [key: string]: never }>

export type MenusQuery = { __typename?: 'Query' } & {
  menus: Array<
    { __typename?: 'Menu' } & Pick<
      Menu,
      | 'id'
      | 'name'
      | 'price'
      | 'positiveReviewRatio'
      | 'totalReviewCount'
      | 'reorderRatio'
      | 'totalOrderCount'
      | 'imageUrls'
      | 'favorite'
      | 'hashtags'
    > & {
        store: { __typename?: 'Store' } & Pick<
          Store,
          'id' | 'name' | 'deliveryCharge' | 'minimumDeliveryTime' | 'maximumDeliveryTime'
        >
      }
  >
}

export type PostsByAddressQueryVariables = Exact<{ [key: string]: never }>

export type PostsByAddressQuery = { __typename?: 'Query' } & {
  postsByAddress: Array<
    { __typename?: 'Post' } & {
      store: { __typename?: 'Store' } & Pick<Store, 'id' | 'name' | 'address' | 'imageUrls'>
    } & PostCardFragment
  >
}

export type StorePostsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type StorePostsQuery = { __typename?: 'Query' } & {
  store?: Maybe<
    { __typename?: 'Store' } & Pick<Store, 'id'> & {
        posts?: Maybe<Array<{ __typename?: 'Post' } & PostCardFragment>>
      }
  >
}

export const MenuCardFragmentDoc = gql`
  fragment menuCard on Menu {
    id
    name
    price
    imageUrls
    favorite
    store {
      id
      name
      deliveryCharge
      minimumDeliveryTime
      maximumDeliveryTime
    }
    hashtags
  }
`
export const PostCardFragmentDoc = gql`
  fragment postCard on Post {
    id
    creationDate
    modificationDate
    contents
    commentCount
    likeCount
    imageUrls
  }
`
export const StoreCardFragmentDoc = gql`
  fragment storeCard on Store {
    id
    name
  }
`
export const LoginDocument = gql`
  mutation Login($email: EmailAddress!, $passwordHash: String!) {
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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const FavoriteMenusDocument = gql`
  query FavoriteMenus {
    me {
      favoriteMenus {
        ...menuCard
      }
    }
  }
  ${MenuCardFragmentDoc}
`

/**
 * __useFavoriteMenusQuery__
 *
 * To run a query within a React component, call `useFavoriteMenusQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteMenusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteMenusQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoriteMenusQuery(
  baseOptions?: Apollo.QueryHookOptions<FavoriteMenusQuery, FavoriteMenusQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FavoriteMenusQuery, FavoriteMenusQueryVariables>(
    FavoriteMenusDocument,
    options
  )
}
export function useFavoriteMenusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FavoriteMenusQuery, FavoriteMenusQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FavoriteMenusQuery, FavoriteMenusQueryVariables>(
    FavoriteMenusDocument,
    options
  )
}
export type FavoriteMenusQueryHookResult = ReturnType<typeof useFavoriteMenusQuery>
export type FavoriteMenusLazyQueryHookResult = ReturnType<typeof useFavoriteMenusLazyQuery>
export type FavoriteMenusQueryResult = Apollo.QueryResult<
  FavoriteMenusQuery,
  FavoriteMenusQueryVariables
>
export const FavoriteStoresDocument = gql`
  query FavoriteStores {
    me {
      favoriteStores {
        id
        name
        minimumDeliveryTime
        maximumDeliveryTime
        minimumDeliveryAmount
      }
    }
  }
`

/**
 * __useFavoriteStoresQuery__
 *
 * To run a query within a React component, call `useFavoriteStoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteStoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteStoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoriteStoresQuery(
  baseOptions?: Apollo.QueryHookOptions<FavoriteStoresQuery, FavoriteStoresQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FavoriteStoresQuery, FavoriteStoresQueryVariables>(
    FavoriteStoresDocument,
    options
  )
}
export function useFavoriteStoresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FavoriteStoresQuery, FavoriteStoresQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FavoriteStoresQuery, FavoriteStoresQueryVariables>(
    FavoriteStoresDocument,
    options
  )
}
export type FavoriteStoresQueryHookResult = ReturnType<typeof useFavoriteStoresQuery>
export type FavoriteStoresLazyQueryHookResult = ReturnType<typeof useFavoriteStoresLazyQuery>
export type FavoriteStoresQueryResult = Apollo.QueryResult<
  FavoriteStoresQuery,
  FavoriteStoresQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      email
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const MenusDocument = gql`
  query Menus {
    menus {
      id
      name
      price
      positiveReviewRatio
      totalReviewCount
      reorderRatio
      totalOrderCount
      imageUrls
      favorite
      store {
        id
        name
        deliveryCharge
        minimumDeliveryTime
        maximumDeliveryTime
      }
      hashtags
    }
  }
`

/**
 * __useMenusQuery__
 *
 * To run a query within a React component, call `useMenusQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenusQuery({
 *   variables: {
 *   },
 * });
 */
export function useMenusQuery(
  baseOptions?: Apollo.QueryHookOptions<MenusQuery, MenusQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MenusQuery, MenusQueryVariables>(MenusDocument, options)
}
export function useMenusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MenusQuery, MenusQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MenusQuery, MenusQueryVariables>(MenusDocument, options)
}
export type MenusQueryHookResult = ReturnType<typeof useMenusQuery>
export type MenusLazyQueryHookResult = ReturnType<typeof useMenusLazyQuery>
export type MenusQueryResult = Apollo.QueryResult<MenusQuery, MenusQueryVariables>
export const PostsByAddressDocument = gql`
  query PostsByAddress {
    postsByAddress(address: "") {
      ...postCard
      store {
        id
        name
        address
        imageUrls
      }
    }
  }
  ${PostCardFragmentDoc}
`

/**
 * __usePostsByAddressQuery__
 *
 * To run a query within a React component, call `usePostsByAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsByAddressQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsByAddressQuery, PostsByAddressQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsByAddressQuery, PostsByAddressQueryVariables>(
    PostsByAddressDocument,
    options
  )
}
export function usePostsByAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsByAddressQuery, PostsByAddressQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsByAddressQuery, PostsByAddressQueryVariables>(
    PostsByAddressDocument,
    options
  )
}
export type PostsByAddressQueryHookResult = ReturnType<typeof usePostsByAddressQuery>
export type PostsByAddressLazyQueryHookResult = ReturnType<typeof usePostsByAddressLazyQuery>
export type PostsByAddressQueryResult = Apollo.QueryResult<
  PostsByAddressQuery,
  PostsByAddressQueryVariables
>
export const StorePostsDocument = gql`
  query StorePosts($id: ID!) {
    store(id: $id) {
      id
      posts {
        ...postCard
      }
    }
  }
  ${PostCardFragmentDoc}
`

/**
 * __useStorePostsQuery__
 *
 * To run a query within a React component, call `useStorePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStorePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStorePostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStorePostsQuery(
  baseOptions: Apollo.QueryHookOptions<StorePostsQuery, StorePostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<StorePostsQuery, StorePostsQueryVariables>(StorePostsDocument, options)
}
export function useStorePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StorePostsQuery, StorePostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<StorePostsQuery, StorePostsQueryVariables>(StorePostsDocument, options)
}
export type StorePostsQueryHookResult = ReturnType<typeof useStorePostsQuery>
export type StorePostsLazyQueryHookResult = ReturnType<typeof useStorePostsLazyQuery>
export type StorePostsQueryResult = Apollo.QueryResult<StorePostsQuery, StorePostsQueryVariables>
