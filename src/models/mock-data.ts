import TMenu from 'src/types/Menu'
import TOrder from 'src/types/Order'
import TPost from 'src/types/Post'
import TStore from 'src/types/Store'

export const username = 'username'

export const menus: TMenu[] = [
  {
    id: '0',
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_F22044335599802DDF4A7ABF5778ACE5.jpg',
    name: '팥빙수',
    price: 5900,
    likeCount: 644,
    likeRatio: 77,
    reviewCount: 429,
    orderCount: 4213,
    reorderRatio: 23,
    hashtags: ['#달달', "달콤", '#비건', '#다이어트'],
    bookmark: true,
  },
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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

  {
    id: '6',
    imageUrl:
      'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg',
    name: '슈크림라떼',
    price: 3000,
    likeCount: 1442,
    likeRatio: 67,
    reviewCount: 123456789,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#슈크림', '#달달', '#봄음료', '#달콤'],
    bookmark: false,
  },
  {
    id: '7',
    imageUrl:
      'https://post-phinf.pstatic.net/MjAxOTA4MjJfMjc3/MDAxNTY2NDQwMjY4MDA1.iuAYTuWj97NoOtuI5ha2cPrtO0V2zCLv5U8VPe8GNuwg.LMKtLv4P4rU8d3Ow-NBkFZJDNNJMDuES14lsvohKLU4g.JPEG/%EB%B0%80%ED%91%80%EC%9C%A0%EB%B0%94%EB%8B%88.jpg?type=w1200',
    name: '밀푀유 바니',
    price: 9500,
    likeCount: 1442,
    likeRatio: 67,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#마얘', '#정통프렌치디저트', '#바닐라크림', '#패스츄리', '#고소', '#달달'],
    bookmark: false,
  },
  {
    id: '8',
    imageUrl:
      'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg',
    name: '슈크림라떼',
    price: 3000,
    likeCount: 1442,
    likeRatio: 67,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#슈크림', '#달달', '#봄음료', '#달콤'],
    bookmark: false,
  },
  {
    id: '9',
    imageUrl:
      'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg',
    name: '슈크림라떼',
    price: 3000,
    likeCount: 1442,
    likeRatio: 67,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#슈크림', '#달달', '#봄음료', '#달콤'],
    bookmark: false,
  },
  {
    id: '10',
    imageUrl:
      'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg',
    name: '슈크림라떼',
    price: 3000,
    likeCount: 1442,
    likeRatio: 67,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#슈크림', '#달달', '#봄음료', '#달콤'],
    bookmark: false,
  },
  {
    id: '11',
    imageUrl:
      'https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021021514073200118b45d942afb10624586229.jpg',
    name: '슈크림라떼',
    price: 3000,
    likeCount: 1442,
    likeRatio: 67,
    reviewCount: 1294,
    orderCount: 19744,
    reorderRatio: 67,
    hashtags: ['#슈크림', '#달달', '#봄음료', '#달콤'],
    bookmark: false,
  },
]

export const store: TStore = {
  id: '0',
  name: '스노우플라워',
  deliveryFees: [2500],
  deliveryTimeMin: 10,
  deliveryTimeMax: 19,
  reorderRatio: 82,
  regularCount: 41,
  location: '흑석동',
  imageUrl:
    'https://mp-seoul-image-production-s3.mangoplate.com/879146_1528178423311716.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80',
  hashtags: ['#얼죽이', '#팥빙수맛집'],
}

export const store2: TStore = {
  id: '1',
  name: '프랑세즈',
  deliveryFees: [1500],
  deliveryTimeMin: 9,
  deliveryTimeMax: 15,
  reorderRatio: 64,
  regularCount: 292,
  location: '흑석동',
  imageUrl:
    'https://mblogthumb-phinf.pstatic.net/MjAyMDA4MDlfNCAg/MDAxNTk2OTQ5Njc3OTc3.3zFvcpUO_CcP09zL4yRd6GRP2V0sgyFjkMNgVHlwinsg.yaEiCjPejdDhbjze1TG-WREiO6zXugTQj4F4YCuWBREg.JPEG.jwani84/1596949677506.jpg?type=w800',
  hashtags: ['#빵돌이빵순이', '#달달한케이크'],
}

export const store3: TStore = {
  id: '2',
  name: '스타벅스',
  deliveryFees: [2000],
  deliveryTimeMin: 13,
  deliveryTimeMax: 25,
  reorderRatio: 35,
  regularCount: 27,
  location: '흑석동',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
  hashtags: ['#무난', '#인테리어'],
}

export const store4: TStore = {
  id: '3',
  name: '디저트정',
  deliveryFees: [2500],
  deliveryTimeMin: 10,
  deliveryTimeMax: 23,
  reorderRatio: 38,
  regularCount: 384,
  location: '흑석동',
  imageUrl:
    'https://mblogthumb-phinf.pstatic.net/MjAyMDA3MjlfMjQy/MDAxNTk1OTg1ODAwNzUx.wtdCVsi3ovwvKe2Hsd6Spdillfz1ft_4vZ_gtG3lPtcg.jGfhSclKGmI0thYN3hOlE4NYDBUcKCObL-diY0EKBccg.JPEG.hyeminsecond/IMG_8474.JPG?type=w800',
  hashtags: ['#갓성비', '#마카마카'],
}

export const store5: TStore = {
  id: '4',
  name: '콜렉티보',
  deliveryFees: [1000],
  deliveryTimeMin: 10,
  deliveryTimeMax: 23,
  reorderRatio: 32,
  regularCount: 21,
  location: '영등포 타임스퀘어',
  imageUrl:
    'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDdfMjU3/MDAxNjE1MDQ0OTQwMDkz.mF-dURiMV6Pdo11mPU5v_D8C4NSHjnOM4VXH5dOe_X8g.6Atvg8SW7qUMr1Sqcadr0yPAzVQZ73xcjhylNSE_OsQg.JPEG.artforlove/SE-e19bde1b-e94c-49a3-af7a-e063cf4f157c.jpg?type=w800',
  hashtags: ['#다양', '#개성'],
}

export const store6: TStore = {
  id: '5',
  name: '마얘',
  deliveryFees: [1500],
  deliveryTimeMin: 20,
  deliveryTimeMax: 29,
  reorderRatio: 42,
  regularCount: 435,
  location: '여의도 더현대',
  imageUrl:
    'https://post-phinf.pstatic.net/MjAyMTAzMDlfNDMg/MDAxNjE1MjcwOTEzMDkx.iKy7VXccfQrXFJ9xcLZfYFD0uRVmKGXBNG2mnVZIoi8g.bncAOnbR4jmo9vf2kYJUuyDE5yobf0IBJK06HJ38g8gg.JPEG/seoultravel_1565899068128458059680254575519669482261410n.jpg?type=w1200',
  hashtags: ['#디저트천국', '#신규오픈'],
}

export const posts: TPost[] = [
  {
    id: '0',
    content:
      '오늘은 다음 주 준비 중인 온라인 행사를 위한 외부 촬영으로, 흑석동 오프라인 스토어는 운영하지 않습니다. 멋진 공간에서 촬영 중입니다. #결과물이 #두근두근 💛🤓💛',
    imageUrl: [
      'https://post-phinf.pstatic.net/MjAxNzAzMDJfMzIg/MDAxNDg4NDQwNzg5NjQz.PjCwCa-LsK0JhSj-YWuoMMQlhxNfOg5_fgzyCYHCPysg.aTQVrQ5QFduqEfsKc8BCh0CblDOf_vfezzM-dp7Qo3Ig.JPEG/image_4562399321488440004463.jpg?type=w1200',
    ],
    likeCount: 422,
    commentCount: 14,
  },
  {
    id: '1',
    content: '저는 이 세상의 모든 굴레와 속박을 벗어던지고 제 행복을 찾아 떠납니다!',
    imageUrl: [
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE',
    ],
    likeCount: 678,
    commentCount: 76,
  },
  {
    id: '2',
    content: '새로운 메뉴',
    imageUrl: [
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE',
    ],
    likeCount: 234,
    commentCount: 74,
  },
]

export const orders: TOrder[] = [
  {
    id: '0',
    imageUrl: [
      'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg',
    ],
    menus: [menus[0], menus[1]],
    orderDate: new Date().toISOString(),
    orderTotal: 42430,
    orderStatus: '배달 완료',
    review: { id: 0 },
    regularOrderDate: new Date().toISOString(),
    regularOrderCount: 3,
    store: store,
  },
  {
    id: '1',
    imageUrl: [
      'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg',
    ],
    menus: [menus[2], menus[3]],
    orderDate: new Date().toISOString(),
    orderTotal: 62430,
    orderStatus: '접수 대기',
    review: undefined,
    regularOrderDate: new Date().toISOString(),
    regularOrderCount: 4,
    store: store3,
  },
]
