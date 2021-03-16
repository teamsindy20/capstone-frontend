import TMenu from 'src/types/Menu'
import TOrder from 'src/types/Order'
import TPost from 'src/types/Post'
import TStore from 'src/types/Store'

export const menus: TMenu[] = [
  {
    id: 0,
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_F22044335599802DDF4A7ABF5778ACE5.jpg',
    name: '팥빙수',
    price: 5900,
    likeCount: 644,
    likeRatio: 77,
    reviewCount: 429,
    orderCount: 4213,
    reorderRatio: 23,
    hashtags: ['#달달', '#비건', '#다이어트'],
    bookmark: true,
  },
  {
    id: 1,
    imageUrl:
      'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg',
    name: '메리딸기',
    price: 6500,
    likeCount: 244,
    likeRatio: 92,
    reviewCount: 229,
    orderCount: 2974,
    reorderRatio: 43,
    hashtags: ['#달달', '#딸기', '#라떼'],
    bookmark: false,
  },
  {
    id: 2,
    imageUrl:
      'https://globalassets.starbucks.com/assets/55525cd1303a4b18958b05f0705b4cbb.jpg?impolicy=1by1_wide_1242',
    name: '나이트로 콜드 브루 톨(355ml)',
    price: 5800,
    likeCount: 2442,
    likeRatio: 78,
    reviewCount: 2294,
    orderCount: 58766,
    reorderRatio: 45,
    hashtags: ['#씁쓸', '#콜드브루', '#스타벅스'],
    bookmark: false,
  },
  {
    id: 3,
    imageUrl:
      'https://image.istarbucks.co.kr/upload/store/skuimg/2019/11/[9300000002488]_20191106172218633.jpg',
    name: '제주 한라봉 뺑오쇼콜라',
    price: 5800,
    likeCount: 1442,
    likeRatio: 58,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#한라봉필', '#초코스틱', '#패스츄리'],
    bookmark: false,
  },
  {
    id: 4,
    imageUrl: '',
    name: '제주 한라봉 뺑오쇼콜라',
    price: 5800,
    likeCount: 1442,
    likeRatio: 58,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#한라봉필', '#초코스틱', '#패스츄리'],
    bookmark: false,
  },
  {
    id: 5,
    imageUrl: 'http://belocal.kr/Files/28/News/202006/2101_20200610163604331.JPG',
    name: '춘천 감자빵',
    price: 3000,
    likeCount: 1442,
    likeRatio: 58,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#춘천', '#감자빵', '#고소'],
    bookmark: false,
  },
]

export const store: TStore = {
  name: '설빙',
  deliveryFees: [2500],
  deliveryTimeMin: 10,
  deliveryTimeMax: 19,
  reorderRatio: 82,
  location: '흑석동',
  imageUrl: 'http://image.newdaily.co.kr/site/data/img/2019/06/03/2019060300094_0.jpg',
}

export const store2: TStore = {
  name: '요거프레소',
  deliveryFees: [1500],
  deliveryTimeMin: 9,
  deliveryTimeMax: 15,
  reorderRatio: 32,
  location: '흑석동',
  imageUrl:
    'https://file.namu.moe/file/cbfb693725816fbffef427ed9273e3cf0d9a6457dc3bf01a518761a3ce872f365ab0b96a243764e0af20e2adfbc297cf',
}

export const store3: TStore = {
  name: '스타벅스',
  deliveryFees: [2000],
  deliveryTimeMin: 13,
  deliveryTimeMax: 25,
  reorderRatio: 62,
  location: '흑석동',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
}

export const store4: TStore = {
  name: '쥬시',
  deliveryFees: [2500],
  deliveryTimeMin: 10,
  deliveryTimeMax: 23,
  reorderRatio: 32,
  location: '흑석동',
  imageUrl: 'http://ojsfile.ohmynews.com/PHT_IMG_FILE/2019/0923/IE002549966_PHT.jpg',
}

export const store5: TStore = {
  name: '타임스퀘어 지하백화점',
  deliveryFees: [1000],
  deliveryTimeMin: 10,
  deliveryTimeMax: 23,
  reorderRatio: 32,
  location: '영등포',
  imageUrl:
    'https://lh3.googleusercontent.com/proxy/f3D00Ev7BKmh0gCB_0_4Z0PtbeipxwdhAN_mAKWsYZ-azAjMJRyHk7jEtKGcM141HV0HvpN0qinu4NmBkdFkPc3aSU6HudJbPSuHHvaqhbgqxQSCZSHuFjAeTbSGE10k8eSdRmIY2iPg6hiqwMD7xLwMpPKebVW1IPfF3DY7JOwq9V-6u_U',
}

export const posts: TPost[] = [
  {
    id: 0,
    content: '안녕히계세요 여러분~',
    imageUrl: [
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE',
    ],
    likeCount: 422,
    commentCount: 14,
  },
  {
    id: 1,
    content: '저는 이 세상의 모든 굴레와 속박을 벗어던지고 제 행복을 찾아 떠납니다!',
    imageUrl: [
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE',
    ],
    likeCount: 678,
    commentCount: 76,
  },
  {
    id: 2,
    content: '새로운 메뉴',
    imageUrl: [
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE',
    ],
    likeCount: 234,
    commentCount: 74,
  },
]

export enum OrderStatus {
  '접수 대기',
  '준비 중',
  '배달 중',
  '배달 완료',
}

export const orders: TOrder[] = [
  {
    id: 0,
    imageUrl: [
      'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg',
    ],
    menus: [menus[0], menus[1]],
    orderDate: new Date().toISOString(),
    orderTotal: 42430,
    orderStatus: OrderStatus['배달 완료'],
  },
]
