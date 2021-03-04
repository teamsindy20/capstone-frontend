type Props = {
  post: any
}

function Post({ post }: Props) {
  return (
    <div>
      <div>
        <div>매장 프로필</div>
        <div>매장 이름</div>
        <div>...</div>
      </div>
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
