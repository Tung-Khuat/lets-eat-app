import styled from 'styled-components'
import RectangleSkeleton from '../../components/feedback/loadingIndicators/RectangleSkeleton'

const TITLE_HEIGHT = 32
const SUBTITLE_HEIGHT = 24
const MEAL_WIDTH = 350
const MEAL_HEIGHT = 250

const PlaceHolderContainer = styled.section`
   display: flex;
   flex-direction: column;
   border: 1px solid var(--color-text-base);
   border-radius: 16px;
   padding: 32px;
   background-color: white;
   gap: 16px;
   width: 784px;
`
const HeaderContainer = styled.header`
   display: flex;
   gap: 16px;
`
const DateControllerContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
   place-items: center;
`
const MealsContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, ${MEAL_WIDTH}px);
   gap: 16px;
`

export default function MealPlannerPlaceholder() {
   return (
      <PlaceHolderContainer>
         <HeaderContainer>
            <RectangleSkeleton width={'180px'} height={`${TITLE_HEIGHT}px`} />
            <RectangleSkeleton width={'250px'} height={`${TITLE_HEIGHT}px`} />
         </HeaderContainer>
         <div style={{ width: 200, display: 'flex' }}>
            <DateControllerContainer>
               <RectangleSkeleton
                  width={'100px'}
                  height={`${SUBTITLE_HEIGHT}px`}
               />
               <RectangleSkeleton width={'64px'} height={`60px`} />
            </DateControllerContainer>
         </div>
         <MealsContainer>
            <RectangleSkeleton
               width={`${MEAL_WIDTH}px`}
               height={`${MEAL_HEIGHT}px`}
            />
            <RectangleSkeleton
               width={`${MEAL_WIDTH}px`}
               height={`${MEAL_HEIGHT}px`}
            />
         </MealsContainer>
      </PlaceHolderContainer>
   )
}
