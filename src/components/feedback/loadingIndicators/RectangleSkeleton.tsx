import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
		0% {
			opacity: 0.7;
		}

		50% {
			opacity: 0.2;
		}

		100% {
			opacity: 0.7;
	}
`

const AnimatedPulse = styled.div<{ width?: string; height?: string }>`
   width: ${({ width }) => (width ? width : '100%')};
   height: ${({ height }) => (height ? height : '100%')};
   min-width: 10px;
   min-height: 10px;
   background: #ededed;
   border-radius: 4px;
   position: relative;
   overflow: hidden;
   opacity: 0.95;
   &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(-180deg, #bcc5ce 0%, #929ead 98%),
         radial-gradient(
            at top left,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(0, 0, 0, 0.3) 100%
         );
      background-blend-mode: screen;
      background-size: cover;
      animation: ${pulse} 1.5s infinite alternate;
      animation-timing-function: cubic-bezier(0.15, 0.56, 0.92, 0.29);
   }
`

interface IRectangleSkeleton {
   width?: string
   height?: string
}

export default function RectangleSkeleton({
   width,
   height,
}: IRectangleSkeleton) {
   return <AnimatedPulse width={width} height={height} />
}
