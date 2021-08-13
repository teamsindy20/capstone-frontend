import styled, { keyframes } from 'styled-components'

export const Padding = styled.div`
  padding: 1rem;
`

export const FlexContainerAlignCenter = styled.div`
  display: flex;
  align-items: center;
`

export const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FlexContainerBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FlexContainerAround = styled.div`
  display: flex;
  justify-content: space-around;
`

export const FlexContainerColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

export const focusInExpandFwd = keyframes`
  0% {
    letter-spacing: -0.5em;
    transform: translateZ(-800px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    filter: blur(0);
    opacity: 1;
  }
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const SkeletonGradient = styled.div`
  background: #eee;
  overflow: hidden;

  ::before {
    content: '';
    display: block;
    position: absolute;
    left: -30vw;
    top: 0;
    height: 100%;
    width: 30vw;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 25%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes shine {
    0% {
      left: -30vw;
    }
    66% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`

export const SkeletonImage = styled(SkeletonGradient)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

export const SkeletonText = styled(SkeletonGradient)<{ width?: string; height?: string }>`
  position: relative;
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '1rem' }) => height};
`

export const NoMarginH2 = styled.h2`
  margin: 0;
`
