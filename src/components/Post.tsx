import TPost from 'src/types/Post'
import TStore from 'src/types/Store'
import styled from 'styled-components'

const StyledImg = styled.img`
  width: 3rem;
  height: 3rem;
  margin: 0.5rem;
  object-fit: cover;
  border-radius: 50%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GridContainerGap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  gap: 1rem;
`

type Props = {
  post: TPost
  store: TStore
  loading: boolean
}

function Post({ post, store, loading }: Props) {
  if (loading) {
    return <div />
  }

  return (
    <div>
      <FlexContainerBetween>
        <GridContainerGap>
          <StyledImg
            src="https://i.pinimg.com/originals/3f/3d/d9/3f3dd9219f7bb1c9617cf4f154b70383.jpg"
            alt="profile"
          />
          <NoMarginH3>{store.name}</NoMarginH3>
          <div>{store.location}</div>
        </GridContainerGap>
        <div>...</div>
      </FlexContainerBetween>
      <div>
        <button>{'<-'}</button>
        <img src="" alt="post" />
        <button>{'->'}</button>
      </div>
      <div>
        <button>좋아요</button>
        <button>댓글</button>
        <button>공유</button>
        <div>Photo location indicator</div>
        <button>저장</button>
      </div>
      <div>... 님 외 ... 명이 좋아합니다.</div>
      <p>글 내용</p>
      <div>글 내용 더 보기</div>
      <div>댓글 ... 개 모두 보기</div>
      <ul>
        <li>
          <div>댓글 작성자</div>
          <p>댓글 내용</p>
          <div>댓글 좋아요</div>
        </li>
        <li>
          <div>댓글 작성자2</div>
          <p>댓글 내용2</p>
        </li>
      </ul>
      <div>글 작성 일시</div>
    </div>
  )
}

export default Post
