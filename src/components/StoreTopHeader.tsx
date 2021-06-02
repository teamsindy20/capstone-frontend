import React, { useRef, ReactText } from 'react'
import { toast } from 'react-toastify'
import { handleApolloError } from 'src/apollo/error'
import { usePickStoreMutation, useStoreLazyQuery } from 'src/graphql/generated/types-and-hooks'
import useGoBack from 'src/hooks/useGoBack'

type Props = {
  store: string
}

function StoreTopHeader({ store }: Props) {
  const goBack = useGoBack()

  const [storeLazyQuery, { loading: isStoreLoading }] = useStoreLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const toastId = useRef<ReactText>('')

  const [pickStore, { loading }] = usePickStoreMutation({
    onCompleted: (data) => {
      function restorePicking() {
        pickStore({ variables: { id: store.id } })
      }

      if (data.pickStore) {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{store.name}</b>을 찜했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      } else {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{store.name}</b>의 찜을 해제했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      }

      storeLazyQuery({ variables: { id: store.id } }) // storeId는 button disabled 로 항상 not null
    },
    onError: handleApolloError,
  })

  return (
    <TopHeader>
      <FlexContainerBetweenCenter>
        <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
        <div>{store.name}</div>
        <FlexContainerAlignCenter>
          <Tooltip title="매장 찜하기">
            <Button
              shape="circle"
              icon={<HeartOutlined />}
              disabled={loading}
              onClick={() => {
                pickStore({ variables: { id: store.id } })
              }}
            />
          </Tooltip>
          <Tooltip title="알림설정">
            <Button shape="circle" icon={<BellOutlined />} />
          </Tooltip>
        </FlexContainerAlignCenter>
      </FlexContainerBetweenCenter>
    </TopHeader>
  )
}

export default StoreTopHeader
