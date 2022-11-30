import { Icon } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import LetsEatLogo from '../../components/logo/LetsEatLogo'
import {
   HighlightText,
   StandardCard,
} from '../../components/StyledComponents/common'
import routes from '../../routes'

export const SIDEBAR_WIDTH = 300

const SidebarCard = styled(StandardCard)`
   width: ${SIDEBAR_WIDTH}px;
   position: fixed;
   height: calc(100% - 6px);
   padding: 0;
`
const Logo = styled.div`
   margin-top: 72px;
   margin-bottom: 48px;
`
const MenuGroup = styled.ul`
   margin: 56px 40px;
   padding: 0;
   font-size: 1.2em;
   position: relative;
   &:after {
      content: ' ';
      width: 70%;
      border-bottom: 1px solid var(--color-text-muted);
      display: block;
      position: absolute;
      bottom: -36px;
      opacity: 0.2;
      left: 50%;
      transform: translateX(-50%);
   }
   &:last-of-type:after {
      border-bottom: none;
   }
`
const UserProfileSection = styled.div`
   margin: 16px 40px;
   display: flex;
   gap: 16px;
   align-items: center;
   font-size: 1.2em;
   cursor: pointer;
`
const MenuItem = styled.li`
   margin-block: 4px;
   padding: 4px;
   list-style: none;
   display: flex;
   gap: 16px;
   align-items: center;
   cursor: pointer;
   &:hover {
      color: var(--color-text-highlight);
   }
`

const Sidebar: React.FC = () => {
   const [menuGroups, setMenuGroups] = useState([])
   const accountUser = useSelector(
      ({ app: { currentLocalAuthUser } }: any) => currentLocalAuthUser
   )

   useEffect(() => {
      const groups = routes.reduce((accumulatedGroups, currentRoute) => {
         const currentGroupName = currentRoute.sidebarMenuGroup
         if (currentGroupName && typeof currentGroupName === 'string') {
            const currentGroupInAccumulator =
               accumulatedGroups[
                  currentGroupName as keyof typeof accumulatedGroups
               ] || []

            return {
               ...accumulatedGroups,
               [currentGroupName]: [...currentGroupInAccumulator, currentRoute],
            }
         }
         return accumulatedGroups
      }, {})
      setMenuGroups(Object.values(groups))
   }, [routes])

   const renderMenuGroup = (menuGroup: any) => {
      return (
         <MenuGroup>
            {menuGroup.map((menuItem: any) => (
               <MenuItem>{menuItem.title}</MenuItem>
            ))}
         </MenuGroup>
      )
   }

   return (
      <SidebarCard>
         <>
            <Logo>
               <LetsEatLogo />
            </Logo>

            {accountUser ? (
               <UserProfileSection>
                  <>
                     <Avatar name={accountUser.displayName} round size={'50'} />
                     <div>
                        {accountUser.displayName}
                        <HighlightText
                           style={{
                              fontStyle: 'italic',
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '0.75em',
                           }}
                        >
                           <Icon style={{ fontSize: '1em' }}>edit</Icon>
                           <span>Edit</span>
                        </HighlightText>
                     </div>
                  </>
               </UserProfileSection>
            ) : null}

            {menuGroups.length > 0 && menuGroups.map(renderMenuGroup)}
         </>
      </SidebarCard>
   )
}

export default Sidebar
