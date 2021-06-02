import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import ClientSideLink from './atoms/ClientSideLink'

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  overflow: hidden;

  border: 1px solid;
`

const SquareFrame = styled.div`
  padding-top: 100%;
  position: relative;
`

const Yellow = styled.div`
  position: relative;
`

const H1 = styled.h1`
  position: absolute;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

function NewCard() {
  return (
    <Card>
      <SquareFrame>
        <ClientSideLink href="/">
          <Image
            src="https://t1.daumcdn.net/cfile/tistory/9956113D5E3F830718"
            alt="menu"
            layout="fill"
            objectFit="cover"
          />
        </ClientSideLink>
      </SquareFrame>
      <Yellow>
        <H1>
          asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
        </H1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
        <h1>asdf</h1>
      </Yellow>
    </Card>
  )
}

export default NewCard
